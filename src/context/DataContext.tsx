import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../data/staticData.js';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PortalNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'emergency' | 'news' | 'service' | 'order';
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface DataContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  notifications: PortalNotification[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;

  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
  removeToast: (id: string) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('boalkhali_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Notifications
  const [notifications, setNotifications] = useState<PortalNotification[]>([
    {
      id: 'notif-1',
      title: 'কালুরঘাট নতুন সেতু অগ্রগতি',
      message: 'চট্টগ্রাম-বোয়ালখালী সংযোগে দ্রুত কাজ এগিয়ে চলছে। বিস্তারিত সংবাদ বিভাগে দেখুন।',
      time: '১০ মিনিট আগে',
      unread: true,
      type: 'news',
    },
    {
      id: 'notif-2',
      title: 'উপজেলা ফ্রি হেলথ ক্যাম্প',
      message: 'আগামী শুক্রবার বোয়ালখালী স্বাস্থ্য কমপ্লেক্সে বিনামূল্যে বিশেষজ্ঞ পরামর্শ ও ওষুধ প্রদান।',
      time: '১ ঘণ্টা আগে',
      unread: true,
      type: 'service',
    },
    {
      id: 'notif-3',
      title: 'জরুরি অ্যাম্বুলেন্স সেবা চালু',
      message: 'বোয়ালখালী উপজেলার জন্য নতুন ২টি সরকারি লাইফ সাপোর্ট অ্যাম্বুলেন্স সার্বক্ষণিক প্রস্তুত।',
      time: '৩ ঘণ্টা আগে',
      unread: true,
      type: 'emergency',
    },
  ]);

  useEffect(() => {
    try {
      localStorage.setItem('boalkhali_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success', duration = 1400) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" কার্টে যুক্ত হয়েছে!`, 'success');
  }, [showToast]);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('পণ্যটি কার্ট থেকে সরানো হয়েছে', 'info');
  }, [showToast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    showToast('কার্ট খালি করা হয়েছে', 'info');
  }, [showToast]);

  const markNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const unreadNotificationCount = notifications.filter((n) => n.unread).length;

  return (
    <DataContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        toasts,
        showToast,
        removeToast,
        isCartOpen,
        setIsCartOpen,
        isMenuOpen,
        setIsMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
