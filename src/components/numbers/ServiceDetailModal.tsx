import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  Search, 
  PhoneCall,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ServiceCardItem } from '../../data/numbersDirectoryData.js';
import { ServiceCardIcon } from './ServiceCardIcon.js';
import { useData } from '../../context/DataContext.js';

interface ServiceDetailModalProps {
  item: ServiceCardItem | null;
  onClose: () => void;
  navigate: (path: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ item, onClose, navigate }) => {
  const { showToast } = useData();
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  if (!item) return null;

  const handleCopy = (phone: string, label: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    showToast(`${label} (${phone}) কপি করা হয়েছে!`, 'success');
    setTimeout(() => setCopiedPhone(null), 2500);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-200 z-10 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E4E6EB] bg-gradient-to-b from-slate-50 to-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="shrink-0">
              <ServiceCardIcon type={item.iconType} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#050505] truncate">
                  {item.title}
                </h2>
                <span className="text-[11px] font-bold text-[#1877F2] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {item.contacts.length} টি জরুরি নম্বর
                </span>
              </div>
              <p className="text-xs text-[#65676B] line-clamp-1 mt-0.5">
                {item.description}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-[#65676B] flex items-center justify-center cursor-pointer transition-colors shrink-0"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search / Filter bar inside modal */}
        <div className="p-3 sm:px-5 bg-gray-50 border-b border-[#E4E6EB] flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={`${item.title} সম্পর্কিত নম্বর বা নাম খুঁজুন...`}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#CED0D4] rounded-xl text-xs focus:outline-[#1877F2] transition-colors"
            />
          </div>
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              className="text-xs text-[#1877F2] font-semibold px-2 py-1 hover:underline cursor-pointer"
            >
              রিসেট
            </button>
          )}
        </div>

        {/* Contacts List Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {item.id === 'famous-personalities' && (
            <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-purple-950 font-bold block">বোয়ালখালীর মনীষী ও ইতিহাস:</strong>
                <p className="text-purple-800 text-[11px] mt-0.5">
                  সূর্য সেন, ড. আহমদ শরীফ, বেণীমাধব বড়ুয়াসহ বোয়ালখালীর সকল কৃতি ব্যক্তিত্বের সচিত্র জীবনকথা ও অবদান পড়ুন।
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  navigate('/upozila-info?tab=famous');
                }}
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-2xs shrink-0 cursor-pointer text-xs"
              >
                <span>মনীষী গ্যালারি দেখুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {filteredContacts.length === 0 ? (
            <div className="py-10 text-center text-[#65676B] space-y-2">
              <PhoneCall className="w-10 h-10 mx-auto text-gray-300" />
              <p className="text-sm font-bold text-[#050505]">কোনো তথ্য পাওয়া যায়নি</p>
              <p className="text-xs">অন্য শব্দ দিয়ে অনুসন্ধান করুন।</p>
            </div>
          ) : (
            filteredContacts.map((contact, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 bg-white rounded-2xl border border-[#E4E6EB] hover:border-blue-300 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm sm:text-base text-[#050505] leading-snug">
                      {contact.label}
                    </h3>
                    {contact.available24h && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>২৪ ঘণ্টা</span>
                      </span>
                    )}
                  </div>

                  {contact.designation && (
                    <p className="text-xs font-semibold text-[#65676B]">
                      {contact.designation}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-[11px] text-[#65676B] flex-wrap pt-0.5">
                    {contact.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                        <span>{contact.location}</span>
                      </span>
                    )}
                    {contact.note && (
                      <span className="text-gray-500 italic">
                        • {contact.note}
                      </span>
                    )}
                  </div>

                  {/* নম্বর নিচে পরিষ্কারভাবে প্রদর্শন */}
                  <div className="pt-1">
                    <span className="font-mono font-bold text-xs sm:text-sm text-[#1877F2] bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-100 inline-block">
                      {contact.phone}
                    </span>
                  </div>
                </div>

                {/* Right Action Bar */}
                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(contact.phone, contact.label)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 cursor-pointer transition-colors"
                      title="নম্বর কপি করুন"
                    >
                      {copiedPhone === contact.phone ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>কল দিন</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-gray-50 border-t border-[#E4E6EB] flex items-center justify-between text-xs text-[#65676B]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>বোয়ালখালী পোর্টাল ভেরিফাইড নম্বর</span>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white border border-[#CED0D4] rounded-lg text-[#050505] font-semibold hover:bg-gray-100 cursor-pointer text-xs"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
