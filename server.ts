import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import categoriesRouter from './server/routes/categories.js';
import subcategoriesRouter from './server/routes/subcategories.js';
import listingsRouter from './server/routes/listings.js';
import usersRouter from './server/routes/users.js';
import postsRouter from './server/routes/posts.js';
import messagesRouter from './server/routes/messages.js';
import adminRouter from './server/routes/admin.js';
import { db } from './server/db.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Request logger for API routes
  app.use('/api', (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[API] ${req.method} ${req.url}`);
    }
    next();
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Boalkhali.com API', timestamp: new Date().toISOString() });
  });

  // Public settings endpoint
  app.get('/api/settings', (req, res) => {
    res.json(db.getSettings());
  });

  // API Routes
  app.use('/api/categories', categoriesRouter);
  app.use('/api/subcategories', subcategoriesRouter);
  app.use('/api/listings', listingsRouter);
  app.use('/api/auth', usersRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/messages', messagesRouter);
  app.use('/api/admin', adminRouter);

  // Global error handler for API
  app.use('/api', (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('API Error:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  });

  // Frontend Serving (Vite middleware in dev, Static in prod)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Boalkhali.com full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
