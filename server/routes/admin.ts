import { Router } from 'express';
import { db } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

// Dashboard Statistics
router.get('/stats', requireAdmin, (req, res) => {
  const stats = db.getStats();
  res.json(stats);
});

// Update Platform Settings
router.put('/settings', requireAdmin, (req, res) => {
  const settings = db.updateSettings(req.body);
  res.json(settings);
});

// Reset database to default seed
router.post('/reset-data', requireAdmin, (req, res) => {
  db.resetToDefaults();
  res.json({ success: true, message: 'Database reset to default authentic seed data.' });
});

export default router;
