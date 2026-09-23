export type UserRole = 'admin' | 'moderator' | 'user';
export type UserStatus = 'active' | 'disabled' | 'pending' | 'banned';

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  phone: string;
  password_hash: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  bio?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  name_en?: string;
  slug: string;
  icon: string; // Lucide icon name or image URL
  description: string;
  sort_order: number;
  status: 'active' | 'inactive';
  show_on_home: boolean;
  created_at: string;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  name_en?: string;
  slug: string;
  icon: string;
  description: string;
  sort_order: number;
  status: 'active' | 'inactive';
  created_at: string;
}

export type ListingDisplayType = 'person' | 'organization' | 'place' | 'service' | 'business';

export interface Listing {
  id: string;
  category_id: string;
  subcategory_id: string;
  display_type: ListingDisplayType;
  title: string;
  title_en?: string;
  slug: string;
  short_description: string;
  description: string;
  image: string;
  gallery: string[];
  phone: string;
  alt_phone?: string;
  email?: string;
  website?: string;
  address: string;
  area: string;
  union: string;
  latitude?: number;
  longitude?: number;
  opening_hours?: string;
  verified: boolean;
  featured: boolean;
  status: 'active' | 'inactive' | 'pending';
  sort_order: number;
  views_count?: number;
  likes_count?: number;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  user_role: string;
  title?: string;
  content: string;
  image?: string;
  category?: string;
  likes: string[]; // user ids
  comments_count: number;
  status: 'approved' | 'pending' | 'rejected' | 'hidden';
  featured: boolean;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  content: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  attachment?: string;
  read_at?: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  participants: string[]; // user ids
  last_message?: string;
  last_message_at?: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  listing_id: string;
  created_at: string;
}

export interface DatabaseSchema {
  users: User[];
  categories: Category[];
  subcategories: Subcategory[];
  listings: Listing[];
  posts: Post[];
  comments: Comment[];
  messages: Message[];
  conversations: Conversation[];
  bookmarks: Bookmark[];
  settings: {
    site_name: string;
    site_title_bn: string;
    site_subtitle_bn: string;
    contact_phone: string;
    contact_email: string;
    address: string;
    about_text: string;
    emergency_notice?: string;
  };
}
