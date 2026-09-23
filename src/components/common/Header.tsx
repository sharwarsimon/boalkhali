import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Users, 
  ShoppingBag,
  User, 
  Home, 
  Newspaper, 
  PhoneCall, 
  Wrench, 
  Sparkles,
  Zap,
  Phone,
  Briefcase
} from 'lucide-react';
import { useData } from '../../context/DataContext.js';
import { SideDrawerMenu } from './SideDrawerMenu.js';
import { CartDrawer } from './CartDrawer.js';
import { SearchModal } from './SearchModal.js';
import { NotificationModal } from './NotificationModal.js';
import { BoalkhaliLogo } from './BoalkhaliLogo.js';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const { 
    unreadNotificationCount, 
    setIsMenuOpen, 
    setIsSearchOpen 
  } = useData();
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navItems = [
    { label: 'হোম', label_en: 'Home', path: '/', icon: Home, isActive: currentPath === '/' },
    { label: 'সংবাদ', label_en: 'News', path: '/news', icon: Newspaper, isActive: currentPath === '/news' || currentPath.startsWith('/news/') },
    { label: 'চাকরি', label_en: 'Jobs', path: '/jobs', icon: Briefcase, isActive: currentPath === '/jobs' || currentPath.startsWith('/jobs/') },
    { label: 'নাম্বারসমূহ', label_en: 'Numbers', path: '/numbers', icon: PhoneCall, isActive: currentPath === '/numbers' || currentPath.startsWith('/numbers/') || currentPath === '/emergency-numbers' },
    { label: 'হ্যান্ডিম্যান', label_en: 'Handyman', path: '/handyman', icon: Wrench, isActive: currentPath === '/handyman' },
    { label: 'শপ', label_en: 'Shop', path: '/shop', icon: ShoppingBag, isActive: currentPath === '/shop' },
  ];

  return (
    <>
      <header className="w-full bg-white">
        {/* 1. TOP BAR: Smooth Running Marquee Ticker (Scrolls away with page) */}
        <div 
          id="top-marquee-bar"
          className="w-full bg-white text-black py-1.5 px-3 sm:px-6 lg:px-8 overflow-hidden border-b border-[#E4E6EB] select-none"
        >
          <div className="max-w-7xl mx-auto flex items-center">
            <div className="shrink-0 flex items-center gap-1.5 bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full uppercase shadow-2xs mr-2.5 z-10">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>লাইভ আপডেট</span>
            </div>

            <div className="overflow-hidden whitespace-nowrap flex-1 relative flex">
              <div className="animate-marquee text-xs sm:text-sm font-semibold text-black tracking-wide flex items-center shrink-0">
                <div className="flex items-center shrink-0 text-black">
                  <span className="mx-4">🔥 বোয়ালখালী উপজেলা ডিজিটাল তথ্য ভাণ্ডার ও সেবা পোর্টালে আপনাকে স্বাগতম!</span>
                  <span className="mx-4">🚨 জরুরি মুহূর্তে জাতীয় হেল্পলাইন: ৯৯৯</span>
                  <span className="mx-4">🚓 বোয়ালখালী থানা পুলিশ: ০১৩২০-১০৮২৫০ / ০১৩২০-১০৮২৫৫</span>
                  <span className="mx-4">🚒 বোয়ালখালী ফায়ার স্টেশন: ০১৭১২-৪৪৫৫88</span>
                  <span className="mx-4">🚑 বোয়ালখালী হাসপাতাল জরুরি অ্যাম্বুলেন্স: ০১৮১৪-২২৩৩৪৪</span>
                  <span className="mx-4">⚡ পল্লী বিদ্যুৎ অভিযোগ কেন্দ্র: ০১৭১২-৪৪৫৫১১</span>
                  <span className="mx-4">🛠️ ঘরের যেকোনো কাজে বোয়ালখালী হ্যান্ডিম্যান ডিরেক্টরি দেখুন</span>
                  <span className="mx-4">🛒 স্থানীয় তাজা ফলমূল ও পণ্য সরাসরি অর্ডার করতে বোয়ালখালী শপ ব্রাউজ করুন</span>
                </div>
                <div className="flex items-center shrink-0 text-black" aria-hidden="true">
                  <span className="mx-4">🔥 বোয়ালখালী উপজেলা ডিজিটাল তথ্য ভাণ্ডার ও সেবা পোর্টালে আপনাকে স্বাগতম!</span>
                  <span className="mx-4">🚨 জরুরি মুহূর্তে জাতীয় হেল্পলাইন: ৯৯৯</span>
                  <span className="mx-4">🚓 বোয়ালখালী থানা পুলিশ: ০১৩২০-১০৮২৫০ / ০১৩২০-১০৮২৫৫</span>
                  <span className="mx-4">🚒 বোয়ালখালী ফায়ার স্টেশন: ০১৭১২-৪৪৫৫88</span>
                  <span className="mx-4">🚑 বোয়ালখালী হাসপাতাল জরুরি অ্যাম্বুলেন্স: ০১৮১৪-২২৩৩৪৪</span>
                  <span className="mx-4">⚡ পল্লী বিদ্যুৎ অভিযোগ কেন্দ্র: ০১৭১২-৪৪৫৫১১</span>
                  <span className="mx-4">🛠️ ঘরের যেকোনো কাজে বোয়ালখালী হ্যান্ডিম্যান ডিরেক্টরি দেখুন</span>
                  <span className="mx-4">🛒 স্থানীয় তাজা ফলমূল ও পণ্য সরাসরি অর্ডার করতে বোয়ালখালী শপ ব্রাউজ করুন</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN HEADER BAR (Scrolls away with page) */}
        <div 
          id="main-app-header"
          className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 border-b border-[#E4E6EB]"
        >
          {/* Left: Hamburger Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger Menu Button */}
            <button
              id="header-hamburger-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              className="w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] flex items-center justify-center transition-colors cursor-pointer"
              title="মেনু খুলুন"
              aria-label="Toggle Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Official Logo */}
            <div
              id="header-logo"
              onClick={() => navigate('/')}
              className="cursor-pointer select-none group hover:opacity-95 transition-opacity"
            >
              <BoalkhaliLogo size="md" />
            </div>
          </div>

          {/* Right Actions: Search, Notification, Cart, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Icon Button */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] flex items-center justify-center transition-colors cursor-pointer"
              title="সার্চ করুন"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Notification Icon Button */}
            <button
              id="header-notification-btn"
              onClick={() => setIsNotifOpen(true)}
              className="relative w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] flex items-center justify-center transition-colors cursor-pointer"
              title="নোটিফিকেশন"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Community Icon Button (formerly Cart) */}
            <button
              id="header-community-btn"
              onClick={() => navigate('/community')}
              className={`relative w-9 h-9 rounded-full ${
                currentPath === '/community'
                  ? 'bg-blue-100 text-[#1877F2]'
                  : 'bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505]'
              } flex items-center justify-center transition-colors cursor-pointer`}
              title="বোয়ালখালী কমিউনিটি"
              aria-label="Community"
            >
              <Users className="w-4.5 h-4.5" />
            </button>

            {/* Account Profile with Default Avatar Photo */}
            <button
              id="header-profile-avatar-btn"
              onClick={() => navigate('/account')}
              className="w-9 h-9 rounded-full overflow-hidden border border-[#CED0D4] hover:ring-2 hover:ring-[#1877F2] transition-all cursor-pointer shrink-0 bg-gray-100"
              title="প্রোফাইল ও মেনু"
              aria-label="Account Profile"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>
      </header>

      {/* 3. STICKY NAVIGATION MENU BAR (Sticks to top on scroll) */}
      <nav 
        id="sticky-navigation-bar"
        className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E4E6EB] shadow-xs"
        role="navigation"
        aria-label="Main Sticky Navigation"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                id={`nav-item-${item.label_en.toLowerCase()}`}
                onClick={() => navigate(item.path)}
                className={`flex-1 py-2 sm:py-2.5 md:py-3 px-0.5 sm:px-1 flex flex-col items-center justify-center gap-0.5 sm:gap-1 relative transition-colors cursor-pointer group select-none min-w-0 ${
                  item.isActive
                    ? 'text-[#1877F2]'
                    : 'text-[#65676B] hover:bg-[#F0F2F5] hover:text-[#050505]'
                }`}
                title={`${item.label} (${item.label_en})`}
              >
                <Icon 
                  className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-150 group-active:scale-90 ${
                    item.isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                  }`} 
                />
                
                <span className={`text-xs sm:text-sm font-semibold leading-tight tracking-tight truncate max-w-full ${
                  item.isActive ? 'font-bold text-[#1877F2]' : ''
                }`}>
                  {item.label}
                </span>

                {/* Active Indicator Blue Bottom Bar */}
                {item.isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1877F2] rounded-t-full shadow-2xs animate-in fade-in duration-150" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Slide-out & Popup Modals */}
      <SideDrawerMenu navigate={navigate} currentPath={currentPath} />
      <CartDrawer navigate={navigate} />
      <SearchModal navigate={navigate} />
      <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} navigate={navigate} />
    </>
  );
};
