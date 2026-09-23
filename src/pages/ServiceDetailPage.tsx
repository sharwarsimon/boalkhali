import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  Search, 
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Share2,
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { NUMBERS_SECTIONS, ServiceCardItem, ServiceContact } from '../data/numbersDirectoryData.js';
import { ServiceCardIcon } from '../components/numbers/ServiceCardIcon.js';
import { useData } from '../context/DataContext.js';

interface ServiceDetailPageProps {
  navigate: (path: string) => void;
  serviceId?: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ navigate, serviceId }) => {
  const { showToast } = useData();
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  // Find all service items across sections
  const allServices: { sectionTitle: string; item: ServiceCardItem }[] = [];
  NUMBERS_SECTIONS.forEach((sec) => {
    sec.items.forEach((item) => {
      allServices.push({ sectionTitle: sec.title, item });
    });
  });

  // Determine current service item from serviceId or query params or default to first
  const currentServiceId = serviceId || new URLSearchParams(window.location.search).get('service') || allServices[0].item.id;
  const currentItemEntry = allServices.find((s) => s.item.id === currentServiceId) || allServices[0];
  const item = currentItemEntry.item;
  const sectionTitle = currentItemEntry.sectionTitle;

  const handleCopy = (phone: string, label: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    showToast(`${label} (${phone}) নম্বর কপি করা হয়েছে!`, 'success');
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${item.title} - বোয়ালখালী যোগাযোগ নম্বর`,
        text: `বোয়ালখালী ${item.title} ডিরেক্টরি ও যোগাযোগ নম্বর তালিকা`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('লিংক কপি করা হয়েছে!', 'success');
    }
  };

  const filteredContacts = item.contacts.filter((c) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase().trim();
    return (
      c.label.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.designation && c.designation.toLowerCase().includes(q)) ||
      (c.location && c.location.toLowerCase().includes(q)) ||
      (c.note && c.note.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* 1. Top Navigation Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E4E6EB] shadow-2xs flex items-center justify-between gap-3">
        <button
          onClick={() => navigate('/numbers')}
          className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#050505] hover:text-[#1877F2] transition-colors cursor-pointer bg-[#F0F2F5] hover:bg-[#E4E6EB] px-3.5 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          <span>সকল নম্বর তালিকায় ফিরে যান</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg border border-orange-200">
            {sectionTitle}
          </span>
          <button
            onClick={handleShare}
            className="p-2 sm:p-2.5 rounded-xl bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#65676B] hover:text-[#050505] transition-colors cursor-pointer"
            title="শেয়ার করুন"
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* 2. Service Hero Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 md:p-7 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="shrink-0 p-1">
              <ServiceCardIcon type={item.iconType} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-[#050505] leading-tight">
                  {item.title}
                </h1>
                <span className="text-xs sm:text-sm font-bold text-[#1877F2] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {item.contacts.length} টি দায়িত্বপ্রাপ্ত নম্বর
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#65676B] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {/* Quick Search inside this service */}
          <div className="relative w-full sm:w-80 shrink-0">
            <Search className="w-4.5 h-4.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="কর্মকর্তা, পদবি বা এলাকা খুঁজুন..."
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-sm focus:bg-white focus:outline-[#1877F2] transition-colors"
            />
          </div>
        </div>

        {/* 999 Helpline info strip for Emergency services */}
        {['police', 'fire-service', 'ambulance', 'hospital'].includes(item.id) && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-red-950">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>জরুরি পরিস্থিতিতে তাৎক্ষণিক জাতীয় হেল্পলাইন <strong>৯৯৯</strong> এ সরাসরি কল করতে পারেন।</span>
            </div>
            <a
              href="tel:999"
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs text-xs sm:text-sm"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>৯৯৯ কল</span>
            </a>
          </div>
        )}

        {/* Special link for famous personalities */}
        {item.id === 'famous-personalities' && (
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <strong className="text-purple-950 font-bold text-sm block">বোয়ালখালীর মনীষী ও ইতিহাস:</strong>
              <p className="text-purple-800 text-xs mt-0.5">
                মাস্টারদা সূর্য সেন, ড. আহমদ শরীফ, বেণীমাধব বড়ুয়াসহ বোয়ালখালীর সকল কৃতি ব্যক্তিত্বের সচিত্র জীবনকথা ও অবদান পড়ুন।
              </p>
            </div>
            <button
              onClick={() => navigate('/upozila-info?tab=famous')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-2xs shrink-0 cursor-pointer text-xs"
            >
              <span>মনীষী গ্যালারি দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Special link for Blood Donors directory */}
        {(item.id === 'blood-donors' || item.id.includes('blood')) && (
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <strong className="text-rose-950 font-bold text-sm block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse inline-block" />
                ব্যক্তিগত রক্তদাতাদের তালিকা ও রক্তদান তথ্য:
              </strong>
              <p className="text-rose-800 text-xs mt-0.5">
                বোয়ালখালীর ২০+ জন রক্তদাতার নাম, রক্তের গ্রুপ ও ইউনিয়ন অনুযায়ী ফিল্টার করে সরাসরি যোগাযোগ করুন।
              </p>
            </div>
            <button
              onClick={() => navigate('/blood-donors')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-2xs shrink-0 cursor-pointer text-xs"
            >
              <span>রক্তদাতাদের তালিকা খুলুন</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Numbers Directory Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-[#65676B] uppercase tracking-wider">
            যোগাযোগ তালিকা ({filteredContacts.length} টি)
          </h2>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>যাচাইকৃত নম্বর</span>
          </span>
        </div>

        {filteredContacts.length === 0 ? (
          <div className="py-14 text-center bg-white rounded-3xl p-6 border border-[#E4E6EB] text-[#65676B] space-y-2">
            <PhoneCall className="w-12 h-12 mx-auto text-gray-300" />
            <p className="text-sm font-bold text-[#050505]">কোনো নম্বর পাওয়া যায়নি</p>
            <p className="text-xs">অন্য নাম বা পদবি দিয়ে অনুসন্ধান করুন।</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredContacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E4E6EB] hover:border-[#1877F2] shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
              >
                {/* Left: Round Image + Name & Number */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <img
                    src={contact.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                    alt={contact.label}
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover shrink-0 border border-gray-200 shadow-2xs group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="font-bold text-base sm:text-lg text-[#050505] leading-snug">
                      {contact.label}
                    </h3>
                    {contact.designation && (
                      <p className="text-xs sm:text-sm text-[#65676B] leading-relaxed">
                        {contact.designation}
                      </p>
                    )}
                    {contact.location && (
                      <p className="text-xs text-[#65676B]">
                        📍 {contact.location}
                      </p>
                    )}
                    {contact.note && (
                      <p className="text-xs text-gray-500 italic">
                        {contact.note}
                      </p>
                    )}
                    {/* নাম্বারটি বর্ননার নিচে প্রদর্শন */}
                    <div className="pt-1">
                      <span className="font-mono font-bold text-sm sm:text-base text-[#1877F2] bg-blue-50 border border-blue-100 px-3 py-1 rounded-xl inline-flex items-center gap-1.5">
                        📞 {contact.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Copy & Call Buttons (same row) */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(contact.phone, contact.label)}
                    className="p-2.5 sm:p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer transition-colors shadow-2xs"
                    title="নম্বর কপি করুন"
                  >
                    {copiedPhone === contact.phone ? (
                      <Check className="w-4.5 h-4.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-4.5 h-4.5" />
                    )}
                  </button>

                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-4 sm:px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer transition-transform active:scale-95 shrink-0"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>কল</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Quick Switch to Other Services in Boalkhali */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm sm:text-base font-bold text-[#050505]">
              অন্যান্য জরুরি ও প্রয়োজনীয় সেবা
            </h2>
          </div>
          <button
            onClick={() => navigate('/numbers')}
            className="text-xs font-bold text-[#1877F2] hover:underline"
          >
            সকল সেবা দেখুন &gt;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {allServices
            .filter((s) => s.item.id !== item.id)
            .slice(0, 6)
            .map((s) => (
              <div
                key={s.item.id}
                onClick={() => {
                  window.history.pushState({}, '', `/numbers/${s.item.id}`);
                  navigate(`/numbers/${s.item.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#F0F2F5] hover:bg-white rounded-2xl p-3 border border-[#E4E6EB] hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col items-center text-center gap-1.5 group"
              >
                <ServiceCardIcon type={s.item.iconType} />
                <span className="font-bold text-xs text-[#050505] group-hover:text-[#1877F2] line-clamp-1">
                  {s.item.title}
                </span>
                <span className="text-[10px] text-[#65676B]">
                  {s.item.contacts.length} টি নম্বর
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
