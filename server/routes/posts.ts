import { Router } from 'express';
import { db } from '../db.js';
import { authenticateToken, requireAdmin, optionalAuth, AuthenticatedRequest } from '../auth.js';
import { Post, Comment } from '../../src/types.js';

const router = Router();

// Get approved posts for public community feed
router.get('/', (req, res) => {
  const posts = db.getPosts('approved');
  res.json(posts);
});

// Admin: Get all posts (including pending/rejected/hidden)
router.get('/admin', requireAdmin, (req, res) => {
  const { status } = req.query;
  const posts = db.getPosts(status as string | undefined);
  res.json(posts);
});

// Create Post (authenticated)
router.post('/', authenticateToken, (req: AuthenticatedRequest, res) => {
  const user = req.user!;
  const { title, content, image, category } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Post content is required' });
  }

  const isAdmin = user.role === 'admin' || user.role === 'moderator';
  const now = new Date().toISOString();

  const newPost: Post = {
    id: `post_${Date.now()}`,
    user_id: user.id,
    user_name: user.name,
    user_avatar: user.avatar,
    user_role: user.role,
    title: title || '',
    content,
    image: image || undefined,
    category: category || 'সাধারণ',
    likes: [],
    comments_count: 0,
    status: isAdmin ? 'approved' : 'approved', // Automatically approve for smooth demo or allow admin to moderate
    featured: false,
    created_at: now,
  };

  const created = db.createPost(newPost);
  res.status(201).json(created);
});

// Toggle Like
router.post('/:id/like', authenticateToken, (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const post = db.getPostById(id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const likes = Array.isArray(post.likes) ? [...post.likes] : [];
  const idx = likes.indexOf(userId);

  if (idx !== -1) {
    likes.splice(idx, 1);
  } else {
    likes.push(userId);
  }

  const updated = db.updatePost(id, { likes });
  res.json(updated);
});

// Get Comments for Post
router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  const comments = db.getComments(id);
  res.json(comments);
});

// Add Comment
router.post('/:id/comments', authenticateToken, (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const user = req.user!;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Comment content is required' });
  }

  const post = db.getPostById(id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const newComment: Comment = {
    id: `comm_${Date.now()}`,
    post_id: id,
    user_id: user.id,
    user_name: user.name,
    user_avatar: user.avatar,
    content,
    created_at: new Date().toISOString(),
  };

  const created = db.createComment(newComment);
  res.status(201).json(created);
});

// Admin: Update Post Status (Approve / Reject / Feature / Hide)
router.put('/admin/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updated = db.updatePost(id, updates);
  if (!updated) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(updated);
});

// Delete Post (Author or Admin)
router.delete('/:id', authenticateToken, (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const post = db.getPostById(id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const isAdmin = req.user!.role === 'admin' || req.user!.role === 'moderator';
  const isAuthor = post.user_id === req.user!.id;

  if (!isAdmin && !isAuthor) {
    return res.status(403).json({ error: 'Permission denied' });
  }

  db.deletePost(id);
  res.json({ success: true, message: 'Post deleted successfully' });
});

export default router;
