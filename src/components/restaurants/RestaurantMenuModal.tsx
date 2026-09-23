import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Utensils, 
  Search, 
  Check, 
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Restaurant, MenuItem } from '../../data/staticData.js';
import { useData } from '../../context/DataContext.js';

interface RestaurantMenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export const RestaurantMenuModal: React.FC<RestaurantMenuModalProps> = ({ restaurant, onClose }) => {
  const { showToast } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!restaurant) return null;

  // Extract unique categories from menu
  const categories = ['all', ...Array.from(new Set(restaurant.menu.map((m) => m.category)))];

  const filteredMenu = restaurant.menu.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.name_en.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-200 z-10 flex flex-col max-h-[92vh]">
        {/* Header with Restaurant Banner */}
        <div className="relative w-full h-44 sm:h-52 bg-slate-900 overflow-hidden shrink-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-4 sm:p-5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{restaurant.rating}</span>
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {restaurant.cuisine}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-md"
                title="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {restaurant.name}
              </h2>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-gray-200">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{restaurant.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{restaurant.openHours}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact & Action Bar */}
        <div className="p-3 sm:px-5 bg-orange-50/70 border-b border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-orange-950 font-medium">
            <Utensils className="w-4 h-4 text-orange-600 shrink-0" />
            <span>হোম ডেলিভারি বা পার্সেলের জন্য সরাসরি রেস্টুরেন্টে কল করুন</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${restaurant.phone.replace(/[^0-9+]/g, '')}`}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{restaurant.phone}</span>
            </a>
          </div>
        </div>

        {/* Menu Category Pills & Search */}
        <div className="p-3 sm:px-5 bg-white border-b border-[#E4E6EB] space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="খাবারের নাম খুঁজুন (যেমন: বিরিয়ানি, মেজবানি, চাপ)..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:outline-[#1877F2] transition-colors"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#1877F2] font-semibold px-2 py-1 hover:underline cursor-pointer"
              >
                রিসেট
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1877F2] text-white shadow-2xs'
                    : 'bg-[#F0F2F5] text-[#65676B] hover:bg-[#E4E6EB]'
                }`}
              >
                {cat === 'all' ? 'সকল খাবার' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-[#65676B] uppercase tracking-wider">
              খাবারের মেনু তালিকা ({filteredMenu.length} টি আইটেম)
            </h3>
            <span className="text-xs font-semibold text-emerald-600">সবচেয়ে তাজা ও ফ্রেশ</span>
          </div>

          {filteredMenu.length === 0 ? (
            <div className="py-12 text-center text-[#65676B] space-y-2">
              <Utensils className="w-10 h-10 mx-auto text-gray-300" />
              <p className="text-sm font-bold text-[#050505]">কোনো খাবার পাওয়া যায়নি</p>
              <p className="text-xs">অন্য নাম দিয়ে অনুসন্ধান করুন।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3 border border-[#E4E6EB] hover:border-orange-300 shadow-2xs hover:shadow-xs transition-all flex gap-3 group"
                >
                  {/* Food Image */}
                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.2 rounded-md">
                      {item.category}
                    </div>
                  </div>

                  {/* Food Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs sm:text-sm text-[#050505] leading-snug group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-extrabold text-sm text-[#1877F2] shrink-0 whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                          ৳ {item.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">{item.name_en}</p>
                      <p className="text-[11px] text-[#65676B] line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-1.5 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-100">
                        উপলব্ধ
                      </span>
                      <a
                        href={`tel:${restaurant.phone.replace(/[^0-9+]/g, '')}`}
                        onClick={() => showToast(`${item.name} অর্ডারের জন্য কল করা হচ্ছে...`, 'info')}
                        className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>অর্ডার করুন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-[#E4E6EB] flex items-center justify-between text-xs text-[#65676B]">
          <span className="text-[11px]">
            * খাবারের দাম ও প্রাপ্যতা রেস্টুরেন্ট কর্তৃপক্ষের নিয়মানুযায়ী পরিবর্তিত হতে পারে।
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-white border border-[#CED0D4] rounded-xl text-[#050505] font-semibold hover:bg-gray-100 cursor-pointer text-xs shrink-0"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
