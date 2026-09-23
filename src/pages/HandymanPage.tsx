import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  MapPin, 
  Phone, 
  BadgeCheck, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Filter, 
  UserCheck,
  ShieldCheck,
  RotateCcw,
  X,
  MessageSquare
} from 'lucide-react';
import { STATIC_HANDYMEN, Handyman } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/api.js';

interface HandymanPageProps {
  navigate: (path: string) => void;
}

export const HandymanPage: React.FC<HandymanPageProps> = ({ navigate }) => {
  const { showToast } = useData();
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState('সব');
  const [selectedUnion, setSelectedUnion] = useState('সব');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [chatLoadingId, setChatLoadingId] = useState<string | null>(null);

  const servicesList = [
    'সব',
    'ইলেকট্রিশিয়ান',
    'প্লাম্বার ও স্যানিটারি',
    'এসি ও ফ্রিজ টেকনিশিয়ান',
    'মোটর ও পাম্প মেকানিক',
    'টাইলস ও মার্বেল মিস্ত্রী',
    'অ্যালুমিনিয়াম ও থাই গ্লাস',
    'গ্যাস স্টোভ ও সিলিন্ডার টেকনিশিয়ান',
    'সৌরবিদ্যুৎ ও আইপিএস মেকানিক',
    'কম্পিউটার ও ল্যাপটপ সার্ভিসিং',
    'মোটরসাইকেল ও অটো মেকানিক',
    'হোম অ্যাপ্লায়েন্স ও টিভি রিপেয়ার',
    'রং মিস্ত্রী',
    'কাঠমিস্ত্রী ও ফার্নিচার',
    'রাজমিস্ত্রী ও কনস্ট্রাকশন',
    'গ্রিল ও ওয়েল্ডিং',
    'সিসিটিভি ও সিকিউরিটি',
  ];

  const unionsList = [
    'সব',
    'বোয়ালখালী পৌরসভা',
    'কধুরখীল',
    'পশ্চিম গোমদণ্ডী',
    'শাকপুরা',
    'সারোয়াতলী',
    'পোপাদিয়া',
    'আমুচিয়া',
    'চরনদ্বীপ',
    'শ্রীপুর-খরণদ্বীপ',
    'আহল্লা করলডেঙ্গা',
  ];

  const hasActiveFilters = selectedService !== 'সব' || selectedUnion !== 'সব' || searchQuery.trim() !== '';

  const handleClearFilters = () => {
    setSelectedService('সব');
    setSelectedUnion('সব');
    setSearchQuery('');
    showToast('ফিল্টার ক্লিয়ার করা হয়েছে', 'info');
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleStartChat = async (hm: Handyman) => {
    if (!user) {
      showToast('চ্যাট করতে অনুগ্রহ করে প্রথমে লগইন বা রেজিস্ট্রেশন করুন', 'info');
      navigate('/login');
      return;
    }

    setChatLoadingId(hm.id);
    try {
      const initialMsg = `নমস্কার / আসসালামু আলাইকুম। Boalkhali.com পোর্টাল থেকে আপনার "${hm.serviceTitle}" সার্ভিসটি সম্পর্কে জানতে যোগাযোগ করছি।`;
      const res = await api.startConversation(
        hm.id,
        initialMsg,
        hm.name,
        hm.photo
      );
      showToast(`${hm.name}-এর সাথে ইন-অ্যাপ চ্যাট চালু হচ্ছে...`, 'success');
      navigate(`/chat?conv=${res.conversationId}`);
    } catch (err) {
      console.error('Chat error:', err);
      navigate('/chat');
    } finally {
      setChatLoadingId(null);
    }
  };

  const filteredHandymen = STATIC_HANDYMEN.filter((item) => {
    const matchesService = selectedService === 'সব' || item.serviceCategory === selectedService;
    const matchesUnion = selectedUnion === 'সব' || item.union.includes(selectedUnion) || selectedUnion.includes(item.union);
    const matchesSearch = !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesService && matchesUnion && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-12">
      {/* Page Header Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#E4E6EB] space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#050505]">বোয়ালখালী হ্যান্ডিম্যান ডিরেক্টরি</h1>
              <p className="text-xs sm:text-sm text-[#65676B]">অভিজ্ঞ ইলেকট্রিশিয়ান, প্লাম্বার, এসি টেকনিশিয়ান, মেকানিক ও মিস্ত্রী সেবা</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
              মোট কারিগর: {STATIC_HANDYMEN.length} জন
            </span>
            <div className="flex items-center gap-1.5 bg-blue-50 text-[#1877F2] text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl border border-blue-200">
              <ShieldCheck className="w-4 h-4" />
              <span>ভেরিফাইড টেকনিশিয়ান</span>
            </div>
          </div>
        </div>

        {/* Horizontal Service Category Scroll */}
        <div className="space-y-2 pt-2 border-t border-[#E4E6EB]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#65676B] uppercase tracking-wider">সার্ভিস ক্যাটাগরি:</span>
            <span className="text-[11px] text-[#1877F2] font-semibold">ডানে স্ক্রল করুন →</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {servicesList.map((svc) => {
              const isSelected = selectedService === svc;
              const count = svc === 'সব' 
                ? STATIC_HANDYMEN.length 
                : STATIC_HANDYMEN.filter(h => h.serviceCategory === svc).length;

              return (
                <button
                  key={svc}
                  onClick={() => setSelectedService(svc)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                    isSelected
                      ? 'bg-[#1877F2] text-white border-[#1877F2] shadow-xs'
                      : 'bg-[#F0F2F5] text-[#050505] border-transparent hover:bg-[#E4E6EB]'
                  }`}
                >
                  <span>{svc === 'সব' ? 'সকল সার্ভিস' : svc}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white text-gray-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Strictly Horizontal Filter Bar: Union, Search, and Clear Button */}
        <div className="pt-2 border-t border-[#E4E6EB]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Union Selector */}
            <div className="flex items-center gap-2 sm:w-56 shrink-0">
              <span className="text-xs font-bold text-[#65676B] shrink-0">ইউনিয়ন:</span>
              <select
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value)}
                className="w-full py-2 px-3 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs font-semibold text-[#050505] focus:bg-white focus:outline-[#1877F2] cursor-pointer"
              >
                {unionsList.map((un) => (
                  <option key={un} value={un}>
                    {un === 'সব' ? 'সকল ইউনিয়ন ও পৌরসভা (সব)' : un}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="নাম, দক্ষতা, সার্ভিস বা এলাকা দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:outline-[#1877F2]"
              />
            </div>

            {/* Clear Filter Button */}
            <button
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
              title="সকল ফিল্টার ক্লিয়ার করুন"
              className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                hasActiveFilters
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 shadow-xs'
                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${hasActiveFilters ? 'text-rose-600' : 'text-gray-400'}`} />
              <span>ফিল্টার ক্লিয়ার</span>
            </button>
          </div>
        </div>
      </div>

      {/* Handymen Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHandymen.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl p-6 border border-[#E4E6EB] text-[#65676B] space-y-2">
            <Wrench className="w-10 h-10 mx-auto text-gray-300" />
            <p className="font-bold text-sm text-[#050505]">কোনো টেকনিশিয়ান পাওয়া যায়নি</p>
            <p className="text-xs">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
          </div>
        ) : (
          filteredHandymen.map((hm) => {
            const isExpanded = expandedId === hm.id;
            return (
              <div
                key={hm.id}
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 shadow-2xs ${
                  isExpanded ? 'border-[#1877F2] ring-1 ring-blue-100 shadow-md' : 'border-[#E4E6EB] hover:border-gray-300'
                }`}
              >
                {/* Compact Primary View (Always Visible) */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    {/* Handyman Photo */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-[#E4E6EB] shrink-0">
                      <img
                        src={hm.photo}
                        alt={hm.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {hm.verified && (
                        <div 
                          className="absolute bottom-0 right-0 bg-[#1877F2] text-white p-0.5 rounded-tl-md"
                          title="ভেরিফাইড টেকনিশিয়ান"
                        >
                          <BadgeCheck className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Basic Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-bold text-base sm:text-lg text-[#050505] truncate flex items-center gap-1.5">
                          <span>{hm.name}</span>
                          {hm.verified ? (
                            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md shrink-0">
                              <BadgeCheck className="w-3.5 h-3.5" />
                              ভেরিফাইড
                            </span>
                          ) : (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md shrink-0">
                              তালিকাভুক্ত
                            </span>
                          )}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md shrink-0">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{hm.rating}</span>
                        </div>
                      </div>

                      {/* Service Title */}
                      <p className="text-xs sm:text-sm font-semibold text-[#1877F2] mt-0.5">
                        {hm.serviceCategory} • {hm.serviceTitle}
                      </p>

                      {/* Union & Ward Short */}
                      <div className="flex items-center gap-2 text-xs text-[#65676B] mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          {hm.union} ({hm.wardNo})
                        </span>
                        <span>•</span>
                        <span>অভিজ্ঞতা: {hm.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Buttons (Call with hidden number, FB icon, In-App Message, Details) */}
                  <div className="flex items-center gap-2 pt-1.5">
                    {/* 1. Direct Call Button (Number is strictly hidden) */}
                    <a
                      href={`tel:${hm.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      title="সরাসরি কল করুন"
                    >
                      <Phone className="w-4 h-4 fill-current" />
                      <span>কল করুন</span>
                    </a>

                    {/* 2. Facebook Profile Link in Icon */}
                    <a
                      href={hm.facebook || `https://www.facebook.com/search/top?q=${encodeURIComponent(hm.name + ' বোয়ালখালী')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 sm:px-3 sm:py-2.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#1877F2]/20 shrink-0"
                      title={`${hm.name}-এর ফেসবুক প্রোফাইল`}
                      aria-label={`${hm.name}-এর ফেসবুক`}
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="hidden sm:inline">ফেসবুক</span>
                    </a>

                    {/* 3. In-App Messenger Chat (Registered users only) */}
                    <button
                      onClick={() => handleStartChat(hm)}
                      disabled={chatLoadingId === hm.id}
                      className="flex-1 py-2.5 px-3 bg-[#1877F2] hover:bg-[#166fe5] disabled:bg-blue-300 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      title={user ? `${hm.name}-এর সাথে ইন-অ্যাপ চ্যাট করুন` : 'চ্যাট করতে লগইন আবশ্যক'}
                    >
                      {chatLoadingId === hm.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                      ) : (
                        <MessageSquare className="w-4 h-4 shrink-0" />
                      )}
                      <span>মেসেজ</span>
                    </button>

                    {/* 4. Expand/Collapse Toggle */}
                    <button
                      onClick={() => toggleExpand(hm.id)}
                      className={`p-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0 ${
                        isExpanded
                          ? 'bg-blue-50 border-blue-300 text-[#1877F2]'
                          : 'bg-[#F0F2F5] border-[#CED0D4] text-[#050505] hover:bg-[#E4E6EB]'
                      }`}
                      title={isExpanded ? 'সংক্ষেপ করুন' : 'বিস্তারিত'}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4.5 h-4.5" />
                      ) : (
                        <ChevronDown className="w-4.5 h-4.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Detailed Information (Toggled on click) */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50 border-t border-[#E4E6EB] space-y-3 animate-in fade-in duration-150">
                    {/* Work Details / Description */}
                    <div>
                      <h4 className="text-xs font-bold text-[#050505] mb-1">কাজের বিস্তারিত:</h4>
                      <p className="text-xs text-[#65676B] leading-relaxed bg-white p-2.5 rounded-xl border border-[#E4E6EB]">
                        {hm.description}
                      </p>
                    </div>

                    {/* Skills Tags */}
                    <div>
                      <h4 className="text-[11px] font-bold text-[#050505] mb-1">দক্ষতাসমূহ:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {hm.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-[#CED0D4] text-[#050505] text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Address & Availability Info Table */}
                    <div className="bg-white p-3 rounded-xl border border-[#E4E6EB] space-y-2 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[#65676B] shrink-0 font-medium">ইউনিয়ন ও ওয়ার্ড:</span>
                        <span className="font-bold text-[#050505] text-right">{hm.union} ইউনিয়ন, {hm.wardNo}</span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[#65676B] shrink-0 font-medium">বাড়ি/ঠিকানা:</span>
                        <span className="font-semibold text-[#050505] text-right">{hm.address}</span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#65676B] shrink-0 font-medium">কাজের সময়:</span>
                        <span className="font-semibold text-emerald-700 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {hm.availableHours}
                        </span>
                      </div>

                      {/* Contact Protection / Privacy Notice */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
                        <span className="text-[#65676B] shrink-0 font-medium">যোগাযোগ ব্যবস্থা:</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>নম্বর সুরক্ষিত (সরাসরি 'কল করুন' বা 'মেসেজ' বাটনে যোগাযোগ করুন)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
