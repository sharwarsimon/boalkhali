import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from './db.js';
import { User } from '../src/types.js';

const JWT_SECRET = process.env.JWT_SECRET || 'boalkhali_portal_secret_key_2026';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err || !decoded) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    const user = db.getUserById(decoded.id);
    if (!user || user.status === 'disabled') {
      return res.status(403).json({ error: 'User not found or deactivated' });
    }

    req.user = user;
    next();
  });
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  authenticateToken(req, res, () => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'moderator')) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied: Administrator privileges required' });
    }
  });
}

export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (!err && decoded) {
      const user = db.getUserById(decoded.id);
      if (user && user.status === 'active') {
        req.user = user;
      }
    }
    next();
  });
}

// Simple in-memory rate limiter for login
const loginAttempts: Record<string, { count: number; resetTime: number }> = {};

export function loginRateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxAttempts = 10;

  if (!loginAttempts[ip] || now > loginAttempts[ip].resetTime) {
    loginAttempts[ip] = { count: 1, resetTime: now + windowMs };
    return next();
  }

  loginAttempts[ip].count++;

  if (loginAttempts[ip].count > maxAttempts) {
    return res.status(429).json({ 
      error: 'Too many login attempts. Please wait a minute before trying again.' 
    });
  }

  next();
}
