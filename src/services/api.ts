import { Category, Subcategory, Listing, User, Post, Comment, Message, Conversation } from '../types.js';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('boalkhali_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      if (data && data.error) {
        errorMsg = data.error;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

export const api = {
  // Auth & Users
  login: (credentials: { username?: string; email?: string; phone?: string; password: string }) =>
    request<{ success: boolean; token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (data: { name: string; email?: string; phone?: string; password: string; avatar?: string }) =>
    request<{ success: boolean; token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () =>
    request<{ user: User; bookmarks: Listing[]; myListings: Listing[]; myPosts: Post[] }>('/auth/me'),

  updateProfile: (data: { name?: string; phone?: string; bio?: string; avatar?: string; current_password?: string; new_password?: string }) =>
    request<{ success: boolean; user: User }>('/auth/update-profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAdminUsers: () => request<User[]>('/users/admin/users'),

  updateAdminUser: (id: string, data: Partial<User> & { password?: string }) =>
    request<User>(`/users/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteAdminUser: (id: string) =>
    request<{ success: boolean }>(`/users/admin/users/${id}`, {
      method: 'DELETE',
    }),

  // Categories
  getCategories: () => request<Category[]>('/categories'),

  getCategory: (idOrSlug: string) =>
    request<Category & { subcategories: Subcategory[]; listings: Listing[] }>(`/categories/${idOrSlug}`),

  createCategory: (data: Partial<Category>) =>
    request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCategory: (id: string, data: Partial<Category>) =>
    request<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCategory: (id: string) =>
    request<{ success: boolean }>(`/categories/${id}`, {
      method: 'DELETE',
    }),

  reorderCategories: (orderedIds: string[]) =>
    request<{ success: boolean }>('/categories/reorder', {
      method: 'POST',
      body: JSON.stringify({ orderedIds }),
    }),

  // Subcategories
  getSubcategories: (params?: { categoryId?: string; categorySlug?: string }) => {
    const query = new URLSearchParams();
    if (params?.categoryId) query.append('categoryId', params.categoryId);
    if (params?.categorySlug) query.append('categorySlug', params.categorySlug);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request<(Subcategory & { category_name?: string; category_slug?: string; listingsCount?: number })[]>(`/subcategories${queryString}`);
  },

  getSubcategory: (idOrSlug: string, categorySlug?: string) => {
    const query = categorySlug ? `?categorySlug=${categorySlug}` : '';
    return request<Subcategory & { category?: Category; listings: Listing[] }>(`/subcategories/${idOrSlug}${query}`);
  },

  createSubcategory: (data: Partial<Subcategory>) =>
    request<Subcategory>('/subcategories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateSubcategory: (id: string, data: Partial<Subcategory>) =>
    request<Subcategory>(`/subcategories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteSubcategory: (id: string) =>
    request<{ success: boolean }>(`/subcategories/${id}`, {
      method: 'DELETE',
    }),

  reorderSubcategories: (orderedIds: string[]) =>
    request<{ success: boolean }>('/subcategories/reorder', {
      method: 'POST',
      body: JSON.stringify({ orderedIds }),
    }),

  // Listings
  getListings: (filters?: {
    categoryId?: string;
    subcategoryId?: string;
    categorySlug?: string;
    subcategorySlug?: string;
    status?: string;
    featured?: boolean;
    search?: string;
  }) => {
    const query = new URLSearchParams();
    if (filters?.categoryId) query.append('categoryId', filters.categoryId);
    if (filters?.subcategoryId) query.append('subcategoryId', filters.subcategoryId);
    if (filters?.categorySlug) query.append('categorySlug', filters.categorySlug);
    if (filters?.subcategorySlug) query.append('subcategorySlug', filters.subcategorySlug);
    if (filters?.status) query.append('status', filters.status);
    if (filters?.featured !== undefined) query.append('featured', String(filters.featured));
    if (filters?.search) query.append('search', filters.search);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request<(Listing & { category_name?: string; category_slug?: string; subcategory_name?: string; subcategory_slug?: string; is_bookmarked?: boolean })[]>(`/listings${queryString}`);
  },

  getListing: (idOrSlug: string) =>
    request<Listing & { category?: Category; subcategory?: Subcategory; is_bookmarked?: boolean; related?: Listing[] }>(`/listings/${idOrSlug}`),

  createListing: (data: Partial<Listing>) =>
    request<Listing>('/listings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateListing: (id: string, data: Partial<Listing>) =>
    request<Listing>(`/listings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteListing: (id: string) =>
    request<{ success: boolean }>(`/listings/${id}`, {
      method: 'DELETE',
    }),

  duplicateListing: (id: string) =>
    request<Listing>(`/listings/${id}/duplicate`, {
      method: 'POST',
    }),

  reorderListings: (orderedIds: string[]) =>
    request<{ success: boolean }>('/listings/reorder', {
      method: 'POST',
      body: JSON.stringify({ orderedIds }),
    }),

  toggleBookmark: (id: string) =>
    request<{ bookmarked: boolean }>(`/listings/${id}/bookmark`, {
      method: 'POST',
    }),

  // Posts
  getPosts: () => request<Post[]>('/posts'),
  getAdminPosts: (status?: string) => request<Post[]>(`/posts/admin${status ? `?status=${status}` : ''}`),
  createPost: (data: { title?: string; content: string; image?: string; category?: string }) =>
    request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  likePost: (id: string) =>
    request<Post>(`/posts/${id}/like`, {
      method: 'POST',
    }),
  getComments: (postId: string) => request<Comment[]>(`/posts/${postId}/comments`),
  addComment: (postId: string, content: string) =>
    request<Comment>(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),
  updateAdminPost: (id: string, data: Partial<Post>) =>
    request<Post>(`/posts/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deletePost: (id: string) =>
    request<{ success: boolean }>(`/posts/${id}`, {
      method: 'DELETE',
    }),

  // Messages
  getConversations: () =>
    request<{ conversation: Conversation; unreadCount: number; partner: User | undefined }[]>('/messages/conversations'),
  getMessages: (conversationId: string) => request<Message[]>(`/messages/${conversationId}`),
  sendMessage: (data: { conversation_id?: string; receiver_id?: string; message: string; attachment?: string }) =>
    request<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  startConversation: (targetUserId?: string, initialMessage?: string, targetName?: string, targetAvatar?: string) =>
    request<{ conversationId: string; isNew: boolean }>('/messages/start', {
      method: 'POST',
      body: JSON.stringify({ 
        target_user_id: targetUserId, 
        initial_message: initialMessage,
        target_name: targetName,
        target_avatar: targetAvatar
      }),
    }),

  // Admin & Settings
  getStats: () => request<any>('/admin/stats'),
  getSettings: () => request<any>('/settings'),
  updateSettings: (data: any) =>
    request<any>('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  resetDatabase: () =>
    request<{ success: boolean; message: string }>('/admin/reset-data', {
      method: 'POST',
    }),
};
