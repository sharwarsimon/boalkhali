import { Router } from 'express';
import { db } from '../db.js';
import { requireAdmin, authenticateToken, optionalAuth, AuthenticatedRequest } from '../auth.js';
import { Listing } from '../../src/types.js';

const router = Router();

// Helper to generate a URL-friendly slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || `listing-${Date.now()}`;
}

// Get all listings with filters
router.get('/', optionalAuth, (req: AuthenticatedRequest, res) => {
  const { 
    categoryId, 
    subcategoryId, 
    categorySlug, 
    subcategorySlug, 
    status, 
    featured, 
    search 
  } = req.query;

  const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'moderator');

  let resolvedCatId = categoryId as string | undefined;
  let resolvedSubcatId = subcategoryId as string | undefined;

  if (categorySlug && !resolvedCatId) {
    const cat = db.getCategoryBySlug(categorySlug as string);
    if (cat) resolvedCatId = cat.id;
  }

  if (subcategorySlug && !resolvedSubcatId) {
    const sub = db.getSubcategoryBySlug(subcategorySlug as string, resolvedCatId);
    if (sub) resolvedSubcatId = sub.id;
  }

  let listings = db.getListings({
    categoryId: resolvedCatId,
    subcategoryId: resolvedSubcatId,
    status: isAdmin ? (status as string) : 'active',
    featured: featured !== undefined ? featured === 'true' : undefined,
    search: search as string,
  });

  const allCategories = db.getCategories();
  const allSubcategories = db.getSubcategories();

  const enriched = listings.map(l => {
    const cat = allCategories.find(c => c.id === l.category_id);
    const sub = allSubcategories.find(s => s.id === l.subcategory_id);
    const isBookmarked = req.user ? db.isBookmarked(req.user.id, l.id) : false;

    return {
      ...l,
      category_name: cat ? cat.name : '',
      category_slug: cat ? cat.slug : '',
      subcategory_name: sub ? sub.name : '',
      subcategory_slug: sub ? sub.slug : '',
      is_bookmarked: isBookmarked
    };
  });

  res.json(enriched);
});

// Get single listing by ID or Slug
router.get('/:idOrSlug', optionalAuth, (req: AuthenticatedRequest, res) => {
  const { idOrSlug } = req.params;
  let listing = db.getListingById(idOrSlug);
  if (!listing) {
    listing = db.getListingBySlug(idOrSlug);
  }

  if (!listing) {
    return res.status(404).json({ error: 'Listing not found' });
  }

  // Increment view counter
  db.incrementListingView(listing.id);

  const category = db.getCategoryById(listing.category_id);
  const subcategory = db.getSubcategoryById(listing.subcategory_id);
  const isBookmarked = req.user ? db.isBookmarked(req.user.id, listing.id) : false;

  // Get related listings in same subcategory
  const related = db.getListings({ 
    subcategoryId: listing.subcategory_id, 
    status: 'active' 
  }).filter(l => l.id !== listing!.id).slice(0, 4);

  res.json({
    ...listing,
    category,
    subcategory,
    is_bookmarked: isBookmarked,
    related
  });
});

// Create Listing (Admin or logged-in user with pending/active)
router.post('/', authenticateToken, (req: AuthenticatedRequest, res) => {
  const {
    category_id,
    subcategory_id,
    display_type = 'business',
    title,
    title_en,
    slug,
    short_description,
    description,
    image,
    gallery = [],
    phone,
    alt_phone,
    email,
    website,
    address,
    area = '',
    union = '',
    latitude,
    longitude,
    opening_hours,
    verified = false,
    featured = false,
    status,
    sort_order
  } = req.body;

  if (!category_id || !subcategory_id || !title || !phone) {
    return res.status(400).json({ error: 'Title, phone, category and subcategory are required' });
  }

  const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'moderator');

  let finalSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : generateSlug(title_en || title);
  if (db.getListingBySlug(finalSlug)) {
    finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
  }

  const now = new Date().toISOString();
  const newListing: Listing = {
    id: `lst_${Date.now()}`,
    category_id,
    subcategory_id,
    display_type,
    title,
    title_en: title_en || '',
    slug: finalSlug,
    short_description: short_description || '',
    description: description || '',
    image: image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    gallery: Array.isArray(gallery) ? gallery : [],
    phone,
    alt_phone: alt_phone || '',
    email: email || '',
    website: website || '',
    address: address || '',
    area,
    union,
    latitude: latitude ? parseFloat(latitude) : undefined,
    longitude: longitude ? parseFloat(longitude) : undefined,
    opening_hours: opening_hours || '',
    verified: isAdmin ? Boolean(verified) : false,
    featured: isAdmin ? Boolean(featured) : false,
    status: isAdmin ? (status || 'active') : 'pending',
    sort_order: typeof sort_order === 'number' ? sort_order : db.getListings().length + 1,
    views_count: 0,
    likes_count: 0,
    created_by: req.user?.id,
    created_at: now,
    updated_at: now,
  };

  const created = db.createListing(newListing);
  res.status(201).json(created);
});

// Update Listing
router.put('/:id', authenticateToken, (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const listing = db.getListingById(id);

  if (!listing) {
    return res.status(404).json({ error: 'Listing not found' });
  }

  const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'moderator');
  const isOwner = req.user && listing.created_by === req.user.id;

  if (!isAdmin && !isOwner) {
    return res.status(403).json({ error: 'Permission denied to edit this listing' });
  }

  const updates = { ...req.body };

  // Only admins can change verification & feature status directly
  if (!isAdmin) {
    delete updates.verified;
    delete updates.featured;
  }

  if (updates.slug) {
    updates.slug = updates.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const existing = db.getListingBySlug(updates.slug);
    if (existing && existing.id !== id) {
      return res.status(400).json({ error: 'Another listing with this slug already exists' });
    }
  }

  const updated = db.updateListing(id, updates);
  res.json(updated);
});

// Delete Listing
router.delete('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const deleted = db.deleteListing(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Listing not found' });
  }
  res.json({ success: true, message: 'Listing deleted successfully' });
});

// Duplicate Listing (Admin)
router.post('/:id/duplicate', requireAdmin, (req, res) => {
  const { id } = req.params;
  const original = db.getListingById(id);

  if (!original) {
    return res.status(404).json({ error: 'Listing not found' });
  }

  const now = new Date().toISOString();
  const duplicated: Listing = {
    ...original,
    id: `lst_${Date.now()}`,
    title: `${original.title} (Copy)`,
    slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
    views_count: 0,
    likes_count: 0,
    created_at: now,
    updated_at: now,
  };

  const created = db.createListing(duplicated);
  res.status(201).json(created);
});

// Reorder Listings
router.post('/reorder', requireAdmin, (req, res) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ error: 'orderedIds array is required' });
  }
  db.reorderListings(orderedIds);
  res.json({ success: true });
});

// Bookmark toggle
router.post('/:id/bookmark', authenticateToken, (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const isBookmarked = db.toggleBookmark(userId, id);
  res.json({ bookmarked: isBookmarked });
});

export default router;
