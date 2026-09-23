import { Router } from 'express';
import { db } from '../db.js';
import { requireAdmin, optionalAuth } from '../auth.js';
import { Category } from '../../src/types.js';

const router = Router();

// Get all categories
router.get('/', optionalAuth, (req: any, res) => {
  const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'moderator');
  let categories = db.getCategories();
  
  if (!isAdmin) {
    categories = categories.filter(c => c.status === 'active');
  }

  // Attach subcategory counts and listing counts
  const allSubcategories = db.getSubcategories();
  const allListings = db.getListings({ status: 'active' });

  const enriched = categories.map(cat => {
    const subcats = allSubcategories.filter(s => s.category_id === cat.id && (isAdmin || s.status === 'active'));
    const listings = allListings.filter(l => l.category_id === cat.id);
    return {
      ...cat,
      subcategoriesCount: subcats.length,
      listingsCount: listings.length,
      subcategories: subcats
    };
  });

  res.json(enriched);
});

// Get single category by ID or slug
router.get('/:idOrSlug', (req, res) => {
  const { idOrSlug } = req.params;
  let category = db.getCategoryById(idOrSlug);
  if (!category) {
    category = db.getCategoryBySlug(idOrSlug);
  }

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const subcategories = db.getSubcategories(category.id).filter(s => s.status === 'active');
  const listings = db.getListings({ categoryId: category.id, status: 'active' });

  res.json({
    ...category,
    subcategories,
    listings
  });
});

// Create Category (Admin)
router.post('/', requireAdmin, (req, res) => {
  const { name, name_en, slug, icon, description, sort_order, status, show_on_home } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ error: 'Category name and slug are required' });
  }

  const existing = db.getCategoryBySlug(slug);
  if (existing) {
    return res.status(400).json({ error: 'A category with this slug already exists' });
  }

  const newCategory: Category = {
    id: `cat_${Date.now()}`,
    name,
    name_en: name_en || '',
    slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    icon: icon || 'Folder',
    description: description || '',
    sort_order: typeof sort_order === 'number' ? sort_order : db.getCategories().length + 1,
    status: status || 'active',
    show_on_home: show_on_home !== undefined ? show_on_home : true,
    created_at: new Date().toISOString(),
  };

  const created = db.createCategory(newCategory);
  res.status(201).json(created);
});

// Update Category (Admin)
router.put('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (updates.slug) {
    updates.slug = updates.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const existing = db.getCategoryBySlug(updates.slug);
    if (existing && existing.id !== id) {
      return res.status(400).json({ error: 'Another category with this slug already exists' });
    }
  }

  const updated = db.updateCategory(id, updates);
  if (!updated) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json(updated);
});

// Delete Category (Admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const deleted = db.deleteCategory(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json({ success: true, message: 'Category deleted successfully' });
});

// Reorder Categories (Admin)
router.post('/reorder', requireAdmin, (req, res) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ error: 'orderedIds array is required' });
  }
  db.reorderCategories(orderedIds);
  res.json({ success: true, categories: db.getCategories() });
});

export default router;
