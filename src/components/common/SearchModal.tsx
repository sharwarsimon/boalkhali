import React, { useState } from 'react';
import { Search, X, ChevronRight, Phone, Wrench, ShoppingBag, Newspaper, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext.js';
import { STATIC_NEWS, STATIC_HANDYMEN, STATIC_PRODUCTS, STATIC_UNIONS, STATIC_EMERGENCY_GROUPS } from '../../data/staticData.js';

interface SearchModalProps {
  navigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ navigate }) => {
  const { isSearchOpen, setIsSearchOpen } = useData();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search through all data
  const filteredNews = cleanQuery ? STATIC_NEWS.filter(n => 
    n.title.toLowerCase().includes(cleanQuery) || 
    n.excerpt.toLowerCase().includes(cleanQuery) ||
    n.category.toLowerCase().includes(cleanQuery)
  ).slice(0, 3) : [];

  const filteredHandymen = cleanQuery ? STATIC_HANDYMEN.filter(h =>
    h.name.toLowerCase().includes(cleanQuery) ||
    h.serviceCategory.toLowerCase().includes(cleanQuery) ||
    h.union.toLowerCase().includes(cleanQuery) ||
    h.skills.some(s => s.toLowerCase().includes(cleanQuery))
  ).slice(0, 3) : [];

  const filteredProducts = cleanQuery ? STATIC_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(cleanQuery) ||
    p.category.toLowerCase().includes(cleanQuery) ||
    p.seller.toLowerCase().includes(cleanQuery)
  ).slice(0, 3) : [];

  const filteredUnions = cleanQuery ? STATIC_UNIONS.filter(u =>
    u.name.toLowerCase().includes(cleanQuery) ||
    u.name_en.toLowerCase().includes(cleanQuery) ||
    u.prominent_villages.some(v => v.toLowerCase().includes(cleanQuery))
  ).slice(0, 3) : [];

  const totalResults = filteredNews.length + filteredHandymen.length + filteredProducts.length + filteredUnions.length;

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative mx-auto max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150">
        {/* Search Header Input */}
        <div className="flex items-center px-4 border-b border-[#E4E6EB] bg-slate-50">
          <Search className="w-5 h-5 text-[#1877F2] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="বোয়ালখালীতে খুঁজুন... (যেমন: ডাক্তার, পুলিশ, ইলেকট্রিশিয়ান, পেয়ারা, শাকপুরা)"
            className="w-full py-3.5 px-3 bg-transparent text-xs sm:text-sm text-[#050505] placeholder-[#65676B] focus:outline-hidden"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#65676B] hover:text-black rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4">
          {!query.trim() ? (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#65676B] uppercase tracking-wider">
                জনপ্রিয় সার্চ ও ক্যাটাগরি
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'জরুরি অ্যাম্বুলেন্স', path: '/numbers' },
                  { label: 'বোয়ালখালী থানা পুলিশ', path: '/numbers' },
                  { label: 'ইলেকট্রিশিয়ান মিস্ত্রী', path: '/handyman' },
                  { label: 'প্লাম্বার সার্ভিস', path: '/handyman' },
                  { label: 'বোয়ালখালী তাজা পেয়ারা', path: '/shop' },
                  { label: 'কালুরঘাট সেতু খবর', path: '/news' },
                  { label: '১০ ইউনিয়ন পরিষদ তথ্য', path: '/upozila-info' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.path)}
                    className="text-xs bg-[#F0F2F5] hover:bg-blue-50 hover:text-[#1877F2] px-3 py-1.5 rounded-full border border-[#E4E6EB] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-[#65676B] space-y-2">
              <p className="text-sm font-semibold">"{query}" এর জন্য কোনো সরাসরি ফলাফল পাওয়া যায়নি</p>
              <p className="text-xs">বানান ঠিক আছে কিনা পরীক্ষা করে পুনরায় চেষ্টা করুন বা প্রধান মেনু ব্রাউজ করুন।</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Handymen */}
              {filteredHandymen.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#1877F2] flex items-center gap-1.5 uppercase">
                    <Wrench className="w-3.5 h-3.5" />
                    হ্যান্ডিম্যান সেবা ({filteredHandymen.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredHandymen.map((h) => (
                      <div
                        key={h.id}
                        onClick={() => handleSelect('/handyman')}
                        className="p-2.5 bg-[#F0F2F5] hover:bg-blue-50 rounded-xl border border-[#E4E6EB] flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={h.photo} alt={h.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="text-xs font-bold text-[#050505]">{h.name}</div>
                            <div className="text-[10px] text-[#65676B]">{h.serviceCategory} • {h.union}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shop Products */}
              {filteredProducts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 uppercase">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    শপ পণ্য ({filteredProducts.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect('/shop')}
                        className="p-2.5 bg-[#F0F2F5] hover:bg-emerald-50 rounded-xl border border-[#E4E6EB] flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover bg-white" />
                          <div>
                            <div className="text-xs font-bold text-[#050505]">{p.name}</div>
                            <div className="text-[10px] text-emerald-600 font-bold">৳{p.price} ({p.unit})</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {filteredNews.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-indigo-600 flex items-center gap-1.5 uppercase">
                    <Newspaper className="w-3.5 h-3.5" />
                    সংবাদ ({filteredNews.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredNews.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => handleSelect('/news')}
                        className="p-2.5 bg-[#F0F2F5] hover:bg-indigo-50 rounded-xl border border-[#E4E6EB] flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={n.image} alt={n.title} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#050505] truncate">{n.title}</div>
                            <div className="text-[10px] text-[#65676B]">{n.category} • {n.date}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Unions */}
              {filteredUnions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-teal-600 flex items-center gap-1.5 uppercase">
                    <MapPin className="w-3.5 h-3.5" />
                    ইউনিয়ন পরিষদ ({filteredUnions.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredUnions.map((u) => (
                      <div
                        key={u.id}
                        onClick={() => handleSelect(`/upozila-info?union=${u.id}`)}
                        className="p-2.5 bg-[#F0F2F5] hover:bg-teal-50 rounded-xl border border-[#E4E6EB] flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#050505]">{u.name}</div>
                          <div className="text-[10px] text-[#65676B]">{u.name_en} • চেয়ারম্যান: {u.chairman_name}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
