import React from 'react';
import { 
  User, 
  Settings, 
  Bookmark, 
  PlusCircle, 
  ShieldCheck, 
  MessageSquare, 
  PhoneCall, 
  LogOut, 
  LogIn, 
  UserPlus, 
  ChevronRight, 
  HelpCircle, 
  Share2, 
  FileText,
  Info,
  CheckCircle2,
  Store,
  MapPin,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useData } from '../context/DataContext.js';

interface AccountPageProps {
  navigate: (path: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ navigate }) => {
  const { user, isAdmin, logout } = useAuth();
  const { bookmarks, addToast } = useData();

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Boalkhali.com - বোয়ালখালী তথ্য ও সেবা',
        text: 'বোয়ালখালী উপজেলার ডিজিটাল তথ্য ভাণ্ডার ও প্রয়োজনীয় জরুরি সেবা ডিরেক্টরি।',
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      addToast('লিঙ্ক কপি হয়েছে!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-16">
      {/* Facebook Style Menu Header */}
      <div className="bg-white border-b border-[#E4E6EB] py-4 px-4 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-black text-[#050505]">
            মেনু ও অ্যাকাউন্ট
          </h1>
          <button
            onClick={() => navigate('/settings')}
            className="w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] flex items-center justify-center transition-colors"
            title="সেটিংস"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-3.5">
        {/* User Profile Card */}
        {user ? (
          <div 
            id="account-profile-card"
            onClick={() => navigate('/profile')}
            className="bg-white rounded-2xl p-4 border border-[#E4E6EB] shadow-2xs hover:border-[#1877F2]/60 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name)}`}
                alt={user.name}
                className="w-13 h-13 rounded-full object-cover border-2 border-[#1877F2]/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-[#050505]">{user.name}</h3>
                  {isAdmin && (
                    <span className="text-[10px] font-bold bg-blue-100 text-[#1877F2] px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#65676B] mt-0.5">{user.phone || user.email}</p>
                <span className="text-[11px] text-[#1877F2] font-semibold hover:underline mt-0.5 block">
                  প্রোফাইল দেখুন ও এডিট করুন
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#65676B]" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F0F2F5] text-[#65676B] flex items-center justify-center font-bold">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#050505]">অ্যাকাউন্টে লগইন করুন</h3>
                <p className="text-xs text-[#65676B]">লিস্টিং যোগ করতে ও বুকমার্ক সংরক্ষণ করতে লগইন করুন</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                id="account-login-btn"
                onClick={() => navigate('/login')}
                className="py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-xs sm:text-sm font-bold shadow-2xs transition-all flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                লগইন
              </button>
              <button
                id="account-register-btn"
                onClick={() => navigate('/register')}
                className="py-2.5 bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                নতুন একাউন্ট
              </button>
            </div>
          </div>
        )}

        {/* Shortcuts Section (Facebook App Style 2-Column Grid) */}
        <div>
          <h3 className="text-xs font-bold text-[#65676B] uppercase tracking-wider mb-2 px-1">
            শর্টকাট ও জরুরি সেবা
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {/* Add Listing */}
            <div
              id="shortcut-add-listing"
              onClick={() => navigate('/add-listing')}
              className="bg-white rounded-2xl p-3.5 border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#050505]">লিস্টিং যোগ করুন</h4>
              <p className="text-[11px] text-[#65676B] line-clamp-1">নতুন সেবা বা প্রতিষ্ঠান</p>
            </div>

            {/* Community */}
            <div
              id="shortcut-community"
              onClick={() => navigate('/community')}
              className="bg-white rounded-2xl p-3.5 border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#050505]">বোয়ালখালী কমিউনিটি</h4>
              <p className="text-[11px] text-[#65676B] line-clamp-1">নাগরিক মতামত ও পোস্ট</p>
            </div>

            {/* Bookmarks */}
            <div
              id="shortcut-bookmarks"
              onClick={() => navigate('/profile')}
              className="bg-white rounded-2xl p-3.5 border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#050505]">বুকমার্কস</h4>
              <p className="text-[11px] text-[#65676B] line-clamp-1">সংরক্ষিত তথ্য ({bookmarks?.length || 0})</p>
            </div>

            {/* Messenger / Chat */}
            <div
              id="shortcut-chat"
              onClick={() => navigate('/chat')}
              className="bg-white rounded-2xl p-3.5 border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#050505]">মেসেঞ্জার চ্যাট</h4>
              <p className="text-[11px] text-[#65676B] line-clamp-1">লাইভ মেসেজ ও সহায়তা</p>
            </div>

            {/* Emergency Directory */}
            <div
              id="shortcut-emergency"
              onClick={() => navigate('/emergency-numbers')}
              className="bg-white rounded-2xl p-3.5 border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
            >
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#050505]">জরুরি নাম্বার</h4>
              <p className="text-[11px] text-[#65676B] line-clamp-1">অ্যাম্বুলেন্স, পুলিশ, ফায়ার</p>
            </div>

            {/* Upozila Info */}
            <div
              id="shortcut-upozila"
              onClick={() => navigate('/upozila-info')}
              className="bg-white rounded-2xl p-3.5 border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#050505]">উপজেলা তথ্য</h4>
              <p className="text-[11px] text-[#65676B] line-clamp-1">ইতিহাস, ১০ ইউনিয়ন পরিষদ</p>
            </div>

            {/* Admin Panel (if Admin) */}
            {isAdmin && (
              <div
                id="shortcut-admin"
                onClick={() => navigate('/adm')}
                className="bg-white rounded-2xl p-3.5 border border-blue-200 bg-blue-50/40 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1877F2]">অ্যাডমিন প্যানেল</h4>
                <p className="text-[11px] text-[#65676B] line-clamp-1">ক্যাটাগরি, লিস্টিং ও সেটিংস</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Links & Actions */}
        <div className="bg-white rounded-2xl border border-[#E4E6EB] overflow-hidden shadow-2xs divide-y divide-[#E4E6EB]">
          <button
            onClick={handleShareApp}
            className="w-full p-3.5 text-left text-xs sm:text-sm font-semibold text-[#050505] hover:bg-[#F0F2F5] transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Share2 className="w-4 h-4 text-[#65676B]" />
              <span>অ্যাপটি বন্ধুদের সাথে শেয়ার করুন</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#65676B]" />
          </button>

          <button
            onClick={() => navigate('/search')}
            className="w-full p-3.5 text-left text-xs sm:text-sm font-semibold text-[#050505] hover:bg-[#F0F2F5] transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#65676B]" />
              <span>সকল ডিরেক্টরি ব্রাউজ করুন</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#65676B]" />
          </button>

          {user && (
            <button
              onClick={() => logout()}
              className="w-full p-3.5 text-left text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <LogOut className="w-4 h-4" />
                <span>লগআউট করুন</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* App Version & Credits */}
        <div className="text-center text-[11px] text-[#65676B] pt-2">
          Boalkhali.com Portal • v2.1.0 • বোয়ালখালী, চট্টগ্রাম
        </div>
      </main>
    </div>
  );
};
