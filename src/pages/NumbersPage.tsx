import React, { useState } from 'react';
import { 
  PhoneCall, 
  Search, 
  Copy, 
  Phone, 
  Check, 
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info
} from 'lucide-react';
import { NUMBERS_SECTIONS, ServiceCardItem, ServiceContact } from '../data/numbersDirectoryData.js';
import { ServiceCardIcon } from '../components/numbers/ServiceCardIcon.js';
import { useData } from '../context/DataContext.js';

interface NumbersPageProps {
  navigate: (path: string) => void;
}

export const NumbersPage: React.FC<NumbersPageProps> = ({ navigate }) => {
  const { showToast } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopy = (phone: string, label: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    showToast(`${label} (${phone}) নম্বর কপি করা হয়েছে!`, 'success');
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  // Search logic across all categories & contacts
  const isSearching = searchQuery.trim().length > 0;
  const searchResults: { service: ServiceCardItem; contact: ServiceContact }[] = [];

  if (isSearching) {
    const q = searchQuery.toLowerCase().trim();
    NUMBERS_SECTIONS.forEach((sec) => {
      sec.items.forEach((item) => {
        item.contacts.forEach((contact) => {
          if (
            contact.label.toLowerCase().includes(q) ||
            contact.phone.toLowerCase().includes(q) ||
            (contact.designation && contact.designation.toLowerCase().includes(q)) ||
            (contact.location && contact.location.toLowerCase().includes(q)) ||
            (contact.note && contact.note.toLowerCase().includes(q)) ||
            item.title.toLowerCase().includes(q) ||
            sec.title.toLowerCase().includes(q)
          ) {
            searchResults.push({ service: item, contact });
          }
        });
      });
    });
  }

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#E4E6EB] space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-[#050505]">
                  বোয়ালখালী উপজেলা
                </h1>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  ডিরেক্টরি
                </span>
              </div>
              <p className="text-xs text-[#65676B]">
                জরুরি সেবা, স্বাস্থ্য, পরিবহন ও উপজেলা প্রশাসন যোগাযোগ নম্বর
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="যেকোনো সেবা বা নম্বর অনুসন্ধান করুন..."
              className="w-full pl-9 pr-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:outline-[#1877F2] transition-colors"
            />
          </div>
        </div>

        {/* 999 Compact Highlight Strip */}
        {!isSearching && (
          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl px-3.5 py-2 sm:py-2.5 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-bold whitespace-nowrap">জাতীয় জরুরি হেল্পলাইন: 999</span>
                <span className="text-[11px] text-red-100 hidden sm:inline">• টোল-ফ্রি ২৪ ঘণ্টা পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স</span>
              </div>
            </div>
            <a
              href="tel:999"
              className="px-3 py-1 bg-white text-red-600 hover:bg-red-50 font-bold text-xs rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-transform active:scale-95"
            >
              <Phone className="w-3 h-3 fill-current" />
              <span>কল দিন (৯৯৯)</span>
            </a>
          </div>
        )}
      </div>

      {/* SEARCH RESULTS VIEW */}
      {isSearching ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-[#050505]">
              অনুসন্ধানের ফলাফল: {searchResults.length} টি নম্বর পাওয়া গেছে
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#1877F2] font-semibold hover:underline cursor-pointer"
            >
              ক্লিয়ার করুন
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-2xl p-6 border border-[#E4E6EB] text-[#65676B] space-y-2">
              <PhoneCall className="w-10 h-10 mx-auto text-gray-300" />
              <p className="font-bold text-sm text-[#050505]">কোনো নম্বর পাওয়া যায়নি</p>
              <p className="text-xs">অন্য শব্দ বা সঠিক বানানে অনুসন্ধান করুন।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {searchResults.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-[#E4E6EB] shadow-2xs hover:border-blue-300 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        {res.service.title}
                      </span>
                      {res.contact.designation && (
                        <span className="text-[11px] text-[#65676B] font-semibold">
                          • {res.contact.designation}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-[#050505] leading-snug">
                      {res.contact.label}
                    </h3>
                    {res.contact.location && (
                      <p className="text-xs text-[#65676B]">📍 {res.contact.location}</p>
                    )}
                    {res.contact.note && (
                      <p className="text-xs text-[#65676B]">{res.contact.note}</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-[#1877F2] text-sm">
                      {res.contact.phone}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(res.contact.phone, res.contact.label)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 cursor-pointer"
                        title="কপি করুন"
                      >
                        {copiedPhone === res.contact.phone ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={`tel:${res.contact.phone.replace(/[^0-9+]/g, '')}`}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 fill-current" />
                        <span>কল দিন</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* MAIN 3-COLUMN SECTIONS VIEW AS REQUESTED */
        <div className="space-y-6">
          {NUMBERS_SECTIONS.map((section) => (
            <div key={section.id} className="space-y-3">
              {/* Section Header with orange ">>" accent */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-orange-500 font-extrabold text-base tracking-tighter select-none">
                  &gt;&gt;
                </span>
                <h2 className="text-base sm:text-lg font-bold text-[#050505] tracking-tight">
                  {section.title}
                </h2>
              </div>

              {/* 3-Column Grid on Mobile, 6 on Desktop */}
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/numbers/${item.id}`)}
                    className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E4E6EB] hover:border-[#1877F2] shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center text-center gap-2 sm:gap-2.5 active:scale-95"
                  >
                    {/* Badge Icon */}
                    <div className="pt-1">
                      <ServiceCardIcon type={item.iconType} />
                    </div>

                    {/* Title */}
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-xs sm:text-sm text-[#050505] group-hover:text-[#1877F2] transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <span className="text-[10px] text-[#65676B] block">
                        {item.contacts.length} টি নম্বর
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
