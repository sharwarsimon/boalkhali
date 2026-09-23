import React from 'react';
import { 
  Home, 
  Newspaper, 
  PhoneCall, 
  Wrench, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext.js';

interface MobileBottomNavProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPath, navigate }) => {
  const { cartCount } = useData();

  const navItems = [
    { 
      label: 'হোম', 
      label_en: 'Home', 
      path: '/', 
      icon: Home, 
      isActive: currentPath === '/' 
    },
    { 
      label: 'সংবাদ', 
      label_en: 'News', 
      path: '/news', 
      icon: Newspaper, 
      isActive: currentPath === '/news' || currentPath.startsWith('/news/') 
    },
    { 
      label: 'নাম্বার', 
      label_en: 'Numbers', 
      path: '/numbers', 
      icon: PhoneCall, 
      isActive: currentPath === '/numbers' || currentPath === '/emergency-numbers' || currentPath === '/emergency' 
    },
    { 
      label: 'হ্যান্ডিম্যান', 
      label_en: 'Handyman', 
      path: '/handyman', 
      icon: Wrench, 
      isActive: currentPath === '/handyman' 
    },
    { 
      label: 'শপ', 
      label_en: 'Shop', 
      path: '/shop', 
      icon: ShoppingBag, 
      isActive: currentPath === '/shop',
      badge: cartCount > 0 ? cartCount : null
    },
  ];

  return (
    <nav 
      id="mobile-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E4E6EB] shadow-[0_-2px_12px_rgba(0,0,0,0.08)] py-1 px-1.5 flex items-center justify-around safe-bottom"
      role="navigation"
      aria-label="Mobile App Navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            id={`mobile-nav-${item.label_en.toLowerCase()}`}
            onClick={() => navigate(item.path)}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 relative transition-all active:scale-95 cursor-pointer ${
              item.isActive
                ? 'text-[#1877F2]'
                : 'text-[#65676B] hover:text-[#050505]'
            }`}
          >
            {/* Icon Container with Badge */}
            <div className="relative">
              <div className={`p-1 rounded-xl transition-colors ${
                item.isActive ? 'bg-blue-50' : 'bg-transparent'
              }`}>
                <Icon 
                  className={`w-5 h-5 transition-transform duration-150 ${
                    item.isActive ? 'stroke-[2.5] text-[#1877F2]' : 'stroke-[1.8]'
                  }`} 
                />
              </div>

              {/* Dynamic Badge (e.g. cart item count) */}
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span className={`text-[10px] tracking-tight leading-tight ${
              item.isActive ? 'font-bold text-[#1877F2]' : 'font-medium text-[#65676B]'
            }`}>
              {item.label}
            </span>

            {/* Active Indicator Pip */}
            {item.isActive && (
              <span className="w-1 h-1 rounded-full bg-[#1877F2] mt-0.5 animate-in zoom-in duration-150" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
