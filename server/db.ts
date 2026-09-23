import fs from 'fs';
import path from 'path';
import { DatabaseSchema, Category, Subcategory, Listing, User, Post, Comment, Message, Conversation, Bookmark } from '../src/types.js';
import { getInitialSeedData } from './seedData.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'boalkhali.json');

// In-memory cache + persistent JSON storage
class DatabaseEngine {
  private data: DatabaseSchema;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch (err) {
        console.error('Error creating data directory:', err);
      }
    }
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.categories) && parsed.categories.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read existing database, re-seeding with fresh defaults:', err);
    }

    const seeded = getInitialSeedData();
    this.saveDataDirect(seeded);
    return seeded;
  }

  private saveDataDirect(data: DatabaseSchema) {
    try {
      this.ensureDataDir();
      const tmpFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tmpFile, DB_FILE);
    } catch (err) {
      console.error('Error persisting database:', err);
    }
  }

  public save() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.saveDataDirect(this.data);
    }, 50);
  }

  // --- Users ---
  public getUsers(): User[] {
    return this.data.users;
  }

  public getUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserByPhoneOrUsername(identifier: string): User | undefined {
    const idf = identifier.trim().toLowerCase();
    return this.data.users.find(u => 
      u.email.toLowerCase() === idf || 
      u.phone === idf || 
      u.name.toLowerCase() === idf ||
      (idf === 'simo' && u.email === 'simo@boalkhali.com')
    );
  }

  public createUser(user: User): User {
    this.data.users.unshift(user);
    this.save();
    return user;
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    this.data.users[idx] = { ...this.data.users[idx], ...updates };
    this.save();
    return this.data.users[idx];
  }

  public deleteUser(id: string): boolean {
    const initialLen = this.data.users.length;
    this.data.users = this.data.users.filter(u => u.id !== id);
    if (this.data.users.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Categories ---
  public getCategories(): Category[] {
    return [...this.data.categories].sort((a, b) => a.sort_order - b.sort_order);
  }

  public getCategoryById(id: string): Category | undefined {
    return this.data.categories.find(c => c.id === id);
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    return this.data.categories.find(c => c.slug.toLowerCase() === slug.toLowerCase());
  }

  public createCategory(category: Category): Category {
    this.data.categories.push(category);
    this.save();
    return category;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | undefined {
    const idx = this.data.categories.findIndex(c => c.id === id);
    if (idx === -1) return undefined;
    this.data.categories[idx] = { ...this.data.categories[idx], ...updates };
    this.save();
    return this.data.categories[idx];
  }

  public deleteCategory(id: string): boolean {
    const initialLen = this.data.categories.length;
    this.data.categories = this.data.categories.filter(c => c.id !== id);
    // Cascade delete subcategories and listings
    this.data.subcategories = this.data.subcategories.filter(s => s.category_id !== id);
    this.data.listings = this.data.listings.filter(l => l.category_id !== id);
    if (this.data.categories.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  public reorderCategories(orderedIds: string[]): boolean {
    orderedIds.forEach((id, index) => {
      const cat = this.data.categories.find(c => c.id === id);
      if (cat) {
        cat.sort_order = index + 1;
      }
    });
    this.save();
    return true;
  }

  // --- Subcategories ---
  public getSubcategories(categoryId?: string): Subcategory[] {
    let list = [...this.data.subcategories];
    if (categoryId) {
      list = list.filter(s => s.category_id === categoryId);
    }
    return list.sort((a, b) => a.sort_order - b.sort_order);
  }

  public getSubcategoryById(id: string): Subcategory | undefined {
    return this.data.subcategories.find(s => s.id === id);
  }

  public getSubcategoryBySlug(slug: string, categoryId?: string): Subcategory | undefined {
    return this.data.subcategories.find(s => {
      const matchSlug = s.slug.toLowerCase() === slug.toLowerCase();
      return categoryId ? matchSlug && s.category_id === categoryId : matchSlug;
    });
  }

  public createSubcategory(subcategory: Subcategory): Subcategory {
    this.data.subcategories.push(subcategory);
    this.save();
    return subcategory;
  }

  public updateSubcategory(id: string, updates: Partial<Subcategory>): Subcategory | undefined {
    const idx = this.data.subcategories.findIndex(s => s.id === id);
    if (idx === -1) return undefined;
    this.data.subcategories[idx] = { ...this.data.subcategories[idx], ...updates };
    this.save();
    return this.data.subcategories[idx];
  }

  public deleteSubcategory(id: string): boolean {
    const initialLen = this.data.subcategories.length;
    this.data.subcategories = this.data.subcategories.filter(s => s.id !== id);
    // Cascade delete listings
    this.data.listings = this.data.listings.filter(l => l.subcategory_id !== id);
    if (this.data.subcategories.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  public reorderSubcategories(orderedIds: string[]): boolean {
    orderedIds.forEach((id, index) => {
      const sub = this.data.subcategories.find(s => s.id === id);
      if (sub) {
        sub.sort_order = index + 1;
      }
    });
    this.save();
    return true;
  }

  // --- Listings ---
  public getListings(filters?: {
    categoryId?: string;
    subcategoryId?: string;
    status?: string;
    featured?: boolean;
    search?: string;
  }): Listing[] {
    let list = [...this.data.listings];

    if (filters?.categoryId) {
      list = list.filter(l => l.category_id === filters.categoryId);
    }
    if (filters?.subcategoryId) {
      list = list.filter(l => l.subcategory_id === filters.subcategoryId);
    }
    if (filters?.status) {
      list = list.filter(l => l.status === filters.status);
    }
    if (filters?.featured !== undefined) {
      list = list.filter(l => l.featured === filters.featured);
    }
    if (filters?.search) {
      const query = filters.search.toLowerCase().trim();
      list = list.filter(l => 
        l.title.toLowerCase().includes(query) ||
        (l.title_en && l.title_en.toLowerCase().includes(query)) ||
        l.short_description.toLowerCase().includes(query) ||
        l.description.toLowerCase().includes(query) ||
        l.address.toLowerCase().includes(query) ||
        l.area.toLowerCase().includes(query) ||
        l.union.toLowerCase().includes(query) ||
        l.phone.includes(query)
      );
    }

    return list.sort((a, b) => (a.sort_order || 999) - (b.sort_order || 999));
  }

  public getListingById(id: string): Listing | undefined {
    return this.data.listings.find(l => l.id === id);
  }

  public getListingBySlug(slug: string): Listing | undefined {
    return this.data.listings.find(l => l.slug.toLowerCase() === slug.toLowerCase());
  }

  public createListing(listing: Listing): Listing {
    this.data.listings.push(listing);
    this.save();
    return listing;
  }

  public updateListing(id: string, updates: Partial<Listing>): Listing | undefined {
    const idx = this.data.listings.findIndex(l => l.id === id);
    if (idx === -1) return undefined;
    this.data.listings[idx] = { 
      ...this.data.listings[idx], 
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.save();
    return this.data.listings[idx];
  }

  public deleteListing(id: string): boolean {
    const initialLen = this.data.listings.length;
    this.data.listings = this.data.listings.filter(l => l.id !== id);
    this.data.bookmarks = this.data.bookmarks.filter(b => b.listing_id !== id);
    if (this.data.listings.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  public incrementListingView(id: string): void {
    const item = this.getListingById(id);
    if (item) {
      item.views_count = (item.views_count || 0) + 1;
      this.save();
    }
  }

  public reorderListings(orderedIds: string[]): boolean {
    orderedIds.forEach((id, index) => {
      const listing = this.data.listings.find(l => l.id === id);
      if (listing) {
        listing.sort_order = index + 1;
      }
    });
    this.save();
    return true;
  }

  // --- Posts & Community ---
  public getPosts(status?: string): Post[] {
    let list = [...this.data.posts];
    if (status) {
      list = list.filter(p => p.status === status);
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public getPostById(id: string): Post | undefined {
    return this.data.posts.find(p => p.id === id);
  }

  public createPost(post: Post): Post {
    this.data.posts.unshift(post);
    this.save();
    return post;
  }

  public updatePost(id: string, updates: Partial<Post>): Post | undefined {
    const idx = this.data.posts.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    this.data.posts[idx] = { ...this.data.posts[idx], ...updates };
    this.save();
    return this.data.posts[idx];
  }

  public deletePost(id: string): boolean {
    const initialLen = this.data.posts.length;
    this.data.posts = this.data.posts.filter(p => p.id !== id);
    this.data.comments = this.data.comments.filter(c => c.post_id !== id);
    if (this.data.posts.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Comments ---
  public getComments(postId: string): Comment[] {
    return this.data.comments
      .filter(c => c.post_id === postId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  public createComment(comment: Comment): Comment {
    this.data.comments.push(comment);
    const post = this.getPostById(comment.post_id);
    if (post) {
      post.comments_count = (post.comments_count || 0) + 1;
    }
    this.save();
    return comment;
  }

  // --- Messages & Conversations ---
  public getConversations(userId: string): { conversation: Conversation; unreadCount: number; partner: User | undefined }[] {
    const userConvs = this.data.conversations.filter(c => c.participants.includes(userId));
    
    return userConvs.map(c => {
      const partnerId = c.participants.find(p => p !== userId) || userId;
      const partner = this.getUserById(partnerId);
      const unreadCount = this.data.messages.filter(m => 
        m.conversation_id === c.id && 
        m.receiver_id === userId && 
        !m.read_at
      ).length;

      return {
        conversation: c,
        unreadCount,
        partner
      };
    }).sort((a, b) => new Date(b.conversation.last_message_at || b.conversation.created_at).getTime() - 
                      new Date(a.conversation.last_message_at || a.conversation.created_at).getTime());
  }

  public getMessages(conversationId: string, currentUserId?: string): Message[] {
    if (currentUserId) {
      // Mark as read
      this.data.messages.forEach(m => {
        if (m.conversation_id === conversationId && m.receiver_id === currentUserId && !m.read_at) {
          m.read_at = new Date().toISOString();
        }
      });
      this.save();
    }
    return this.data.messages
      .filter(m => m.conversation_id === conversationId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  public createMessage(msg: Message): Message {
    this.data.messages.push(msg);
    // Update conversation
    let conv = this.data.conversations.find(c => c.id === msg.conversation_id);
    if (conv) {
      conv.last_message = msg.message;
      conv.last_message_at = msg.created_at;
    } else {
      conv = {
        id: msg.conversation_id,
        participants: [msg.sender_id, msg.receiver_id],
        last_message: msg.message,
        last_message_at: msg.created_at,
        created_at: msg.created_at
      };
      this.data.conversations.push(conv);
    }
    this.save();
    return msg;
  }

  // --- Bookmarks ---
  public getBookmarks(userId: string): Listing[] {
    const bms = this.data.bookmarks.filter(b => b.user_id === userId);
    const listingIds = bms.map(b => b.listing_id);
    return this.data.listings.filter(l => listingIds.includes(l.id));
  }

  public toggleBookmark(userId: string, listingId: string): boolean {
    const idx = this.data.bookmarks.findIndex(b => b.user_id === userId && b.listing_id === listingId);
    if (idx !== -1) {
      this.data.bookmarks.splice(idx, 1);
      this.save();
      return false; // unbookmarked
    } else {
      this.data.bookmarks.push({
        id: `bm_${Date.now()}`,
        user_id: userId,
        listing_id: listingId,
        created_at: new Date().toISOString()
      });
      this.save();
      return true; // bookmarked
    }
  }

  public isBookmarked(userId: string, listingId: string): boolean {
    return this.data.bookmarks.some(b => b.user_id === userId && b.listing_id === listingId);
  }

  // --- Settings ---
  public getSettings() {
    return this.data.settings;
  }

  public updateSettings(settings: Partial<DatabaseSchema['settings']>) {
    this.data.settings = { ...this.data.settings, ...settings };
    this.save();
    return this.data.settings;
  }

  // --- Stats for Admin Dashboard ---
  public getStats() {
    return {
      totalCategories: this.data.categories.length,
      totalSubcategories: this.data.subcategories.length,
      totalListings: this.data.listings.length,
      totalUsers: this.data.users.length,
      totalPosts: this.data.posts.length,
      totalMessages: this.data.messages.length,
      activeListings: this.data.listings.filter(l => l.status === 'active').length,
      verifiedListings: this.data.listings.filter(l => l.verified).length,
      featuredListings: this.data.listings.filter(l => l.featured).length,
      pendingPosts: this.data.posts.filter(p => p.status === 'pending').length,
      recentListings: [...this.data.listings].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5),
      recentUsers: [...this.data.users].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5),
      recentPosts: [...this.data.posts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5),
    };
  }

  // Reset to default seed
  public resetToDefaults() {
    this.data = getInitialSeedData();
    this.saveDataDirect(this.data);
    return true;
  }
}

export const db = new DatabaseEngine();
