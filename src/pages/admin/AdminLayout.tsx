import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Layers, 
  Tag, 
  ListPlus, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  Globe, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface AdminLayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPath, navigate, children }) => {
  const { user, logout, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'ড্যাশবোর্ড', path: '/adm', icon: LayoutDashboard },
    { label: 'ক্যাটাগরি সমূহ', path: '/adm/categories', icon: Layers },
    { label: 'সাবক্যাটাগরি সমূহ', path: '/adm/subcategories', icon: Tag },
    { label: 'সকল লিস্টিং', path: '/adm/listings', icon: FileText },
    { label: 'নতুন লিস্টিং যুক্ত', path: '/adm/listings/add', icon: PlusCircle },
    { label: 'ইউজার ব্যবস্থাপনা', path: '/adm/users', icon: Users },
    { label: 'কমিউনিটি পোস্ট', path: '/adm/posts', icon: MessageSquare },
    { label: 'পোর্টাল সেটিংস', path: '/adm/settings', icon: Settings },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-gray-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2" onClick={() => handleNav('/adm')}>
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-black">
            ব
          </div>
          <span className="font-bold text-sm tracking-tight">অ্যাডমিন ড্যাশবোর্ড</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-gray-300 hover:text-white rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-gray-300 flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Brand */}
          <div className="p-5 border-b border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              ব
            </div>
            <div>
              <div className="text-white font-extrabold text-base leading-none">Boalkhali.com</div>
              <div className="text-[11px] text-orange-400 font-semibold mt-1">অ্যাডমিন কন্ট্রোল</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const active = currentPath === item.path || (item.path !== '/adm' && currentPath.startsWith(item.path));
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                    active
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-gray-800 space-y-1.5">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4 text-orange-500" />
            <span>মূল ওয়েবসাইট দেখুন</span>
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/adm/login');
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
