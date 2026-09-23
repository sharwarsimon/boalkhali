import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import { generateToken, authenticateToken, requireAdmin, loginRateLimiter, AuthenticatedRequest } from '../auth.js';
import { User } from '../../src/types.js';

const router = Router();

// Login (Admin or General User)
router.post('/login', loginRateLimiter, async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const identifier = username || email || phone;

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Username/Email/Phone and Password are required' });
    }

    const user = db.getUserByPhoneOrUsername(identifier);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.status === 'disabled') {
      return res.status(403).json({ error: 'Your account has been deactivated. Please contact support.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    // Return sanitized user object
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, avatar } = req.body;

    if (!name || !password || (!email && !phone)) {
      return res.status(400).json({ error: 'Name, password, and at least email or phone are required' });
    }

    if (email) {
      const existingEmail = db.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'An account with this email already exists' });
      }
    }

    const password_hash = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email: email ? email.toLowerCase() : `user_${Date.now()}@boalkhali.com`,
      phone: phone || '',
      password_hash,
      avatar: avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      role: 'user',
      status: 'active',
      created_at: now,
    };

    const created = db.createUser(newUser);
    const token = generateToken(created);

    const { password_hash: _, ...userWithoutPassword } = created;

    res.status(201).json({
      success: true,
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// Get current user profile + bookmarks + listings
router.get('/me', authenticateToken, (req: AuthenticatedRequest, res) => {
  const user = req.user!;
  const { password_hash, ...userWithoutPassword } = user;
  const bookmarks = db.getBookmarks(user.id);
  const myListings = db.getListings().filter(l => l.created_by === user.id);
  const myPosts = db.getPosts().filter(p => p.user_id === user.id);

  res.json({
    user: userWithoutPassword,
    bookmarks,
    myListings,
    myPosts
  });
});

// Update Profile / Change Password
router.put('/update-profile', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const user = req.user!;
    const { name, phone, bio, avatar, current_password, new_password } = req.body;

    const updates: Partial<User> = {};

    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (bio !== undefined) updates.bio = bio;
    if (avatar) updates.avatar = avatar;

    if (new_password) {
      if (!current_password) {
        return res.status(400).json({ error: 'Current password is required to set a new password' });
      }

      const isMatch = await bcrypt.compare(current_password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password does not match' });
      }

      if (new_password.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters' });
      }

      updates.password_hash = await bcrypt.hash(new_password, 10);
    }

    const updated = db.updateUser(user.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password_hash, ...userWithoutPassword } = updated;
    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Admin: List all users
router.get('/admin/users', requireAdmin, (req, res) => {
  const users = db.getUsers().map(u => {
    const { password_hash, ...rest } = u;
    return rest;
  });
  res.json(users);
});

// Admin: Update User (Role, Status, Info)
router.put('/admin/users/:id', requireAdmin, async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const { role, status, name, phone, email, password } = req.body;

  const target = db.getUserById(id);
  if (!target) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Prevent disabling main super admin if needed
  if (target.email === 'simo@boalkhali.com' && status === 'disabled') {
    return res.status(400).json({ error: 'Cannot deactivate primary super administrator' });
  }

  const updates: Partial<User> = {};
  if (role) updates.role = role;
  if (status) updates.status = status;
  if (name) updates.name = name;
  if (phone) updates.phone = phone;
  if (email) updates.email = email;
  if (password && password.length >= 6) {
    updates.password_hash = await bcrypt.hash(password, 10);
  }

  const updated = db.updateUser(id, updates);
  const { password_hash, ...userWithoutPassword } = updated!;
  res.json(userWithoutPassword);
});

// Admin: Delete User
router.delete('/admin/users/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const target = db.getUserById(id);

  if (!target) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (target.email === 'simo@boalkhali.com') {
    return res.status(400).json({ error: 'Cannot delete primary super administrator' });
  }

  db.deleteUser(id);
  res.json({ success: true, message: 'User deleted successfully' });
});

export default router;
