import { Router } from 'express';
import { db } from '../db.js';
import { requireAdmin, optionalAuth } from '../auth.js';
import { Subcategory } from '../../src/types.js';

const router = Router();

// Get all subcategories, optionally filtered by category
router.get('/', optionalAuth, (req: any, res) => {
  const { categoryId, categorySlug } = req.query;
  const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'moderator');

  let catId = categoryId as string | undefined;
  if (categorySlug && !catId) {
    const cat = db.getCategoryBySlug(categorySlug as string);
    if (cat) {
      catId = cat.id;
    }
  }

  let subcategories = db.getSubcategories(catId);
  if (!isAdmin) {
    subcategories = subcategories.filter(s => s.status === 'active');
  }

  const allListings = db.getListings({ status: 'active' });
  const allCategories = db.getCategories();

  const enriched = subcategories.map(sub => {
    const parentCat = allCategories.find(c => c.id === sub.category_id);
    const listingsCount = allListings.filter(l => l.subcategory_id === sub.id).length;
    return {
      ...sub,
      category_name: parentCat ? parentCat.name : '',
      category_slug: parentCat ? parentCat.slug : '',
      listingsCount
    };
  });

  res.json(enriched);
});

// Get single subcategory by ID or slug
router.get('/:idOrSlug', (req, res) => {
  const { idOrSlug } = req.params;
  const { categoryId, categorySlug } = req.query;

  let parentId = categoryId as string | undefined;
  if (categorySlug && !parentId) {
    const cat = db.getCategoryBySlug(categorySlug as string);
    if (cat) parentId = cat.id;
  }

  let subcategory = db.getSubcategoryById(idOrSlug);
  if (!subcategory) {
    subcategory = db.getSubcategoryBySlug(idOrSlug, parentId);
  }

  if (!subcategory) {
    return res.status(404).json({ error: 'Subcategory not found' });
  }

  const category = db.getCategoryById(subcategory.category_id);
  const listings = db.getListings({ subcategoryId: subcategory.id, status: 'active' });

  res.json({
    ...subcategory,
    category,
    listings
  });
});

// Create Subcategory (Admin)
router.post('/', requireAdmin, (req, res) => {
  const { category_id, name, name_en, slug, icon, description, sort_order, status } = req.body;

  if (!category_id || !name || !slug) {
    return res.status(400).json({ error: 'category_id, name, and slug are required' });
  }

  const category = db.getCategoryById(category_id);
  if (!category) {
    return res.status(400).json({ error: 'Selected parent category does not exist' });
  }

  const existing = db.getSubcategoryBySlug(slug, category_id);
  if (existing) {
    return res.status(400).json({ error: 'A subcategory with this slug already exists in this category' });
  }

  const newSubcategory: Subcategory = {
    id: `sub_${Date.now()}`,
    category_id,
    name,
    name_en: name_en || '',
    slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    icon: icon || 'Circle',
    description: description || '',
    sort_order: typeof sort_order === 'number' ? sort_order : db.getSubcategories(category_id).length + 1,
    status: status || 'active',
    created_at: new Date().toISOString(),
  };

  const created = db.createSubcategory(newSubcategory);
  res.status(201).json(created);
});

// Update Subcategory (Admin)
router.put('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (updates.slug) {
    updates.slug = updates.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  }

  const updated = db.updateSubcategory(id, updates);
  if (!updated) {
    return res.status(404).json({ error: 'Subcategory not found' });
  }

  res.json(updated);
});

// Delete Subcategory (Admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const deleted = db.deleteSubcategory(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Subcategory not found' });
  }
  res.json({ success: true, message: 'Subcategory deleted successfully' });
});

// Reorder Subcategories (Admin)
router.post('/reorder', requireAdmin, (req, res) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ error: 'orderedIds array is required' });
  }
  db.reorderSubcategories(orderedIds);
  res.json({ success: true });
});

export default router;
