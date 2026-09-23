import React from 'react';
import { Bell, X, Check, ShieldAlert, Newspaper, Sparkles, CheckCheck } from 'lucide-react';
import { useData } from '../../context/DataContext.js';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, navigate }) => {
  const { notifications, markNotificationsAsRead } = useData();

  if (!isOpen) return null;

  const handleNotificationClick = (type: string) => {
    onClose();
    if (type === 'news') navigate('/news');
    else if (type === 'emergency') navigate('/numbers');
    else if (type === 'service') navigate('/handyman');
    else navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-[#E4E6EB] flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1877F2] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#050505]">নোটিফিকেশন ও ঘোষণা</h3>
              <p className="text-[10px] text-[#65676B]">বোয়ালখালী উপজেলার সর্বশেষ আপডেট</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={markNotificationsAsRead}
              className="text-[11px] font-bold text-[#1877F2] hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              পড়া হয়েছে
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#65676B] hover:text-black rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n.type)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                n.unread 
                  ? 'bg-blue-50/50 border-blue-200' 
                  : 'bg-[#F0F2F5] border-[#E4E6EB] hover:bg-gray-100'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {n.type === 'emergency' ? (
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                ) : n.type === 'news' ? (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Newspaper className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-[#050505] line-clamp-1">{n.title}</h4>
                  <span className="text-[10px] text-[#65676B] shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-[#65676B] mt-0.5 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
