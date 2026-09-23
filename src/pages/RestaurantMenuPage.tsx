import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Utensils, 
  Search, 
  Check, 
  UtensilsCrossed,
  Share2,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { STATIC_RESTAURANTS, Restaurant, MenuItem } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';

interface RestaurantMenuPageProps {
  navigate: (path: string) => void;
  restaurantId?: string;
}

export const RestaurantMenuPage: React.FC<RestaurantMenuPageProps> = ({ navigate, restaurantId }) => {
  const { showToast } = useData();

  // Find initial restaurant based on props or query param or default to first
  const currentId = restaurantId || new URLSearchParams(window.location.search).get('id') || STATIC_RESTAURANTS[0].id;
  
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(() => {
    return STATIC_RESTAURANTS.find((r) => r.id === currentId) || STATIC_RESTAURANTS[0];
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Update selected restaurant if restaurantId changes
  useEffect(() => {
    if (restaurantId) {
      const found = STATIC_RESTAURANTS.find((r) => r.id === restaurantId);
      if (found) {
        setSelectedRestaurant(found);
        setSearchQuery('');
      }
    }
  }, [restaurantId]);

  const filteredMenu = selectedRestaurant.menu.filter((item) => {
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.name_en.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesSearch;
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedRestaurant.name,
        text: `${selectedRestaurant.name} - খাবারের মেনু ও দাম | বোয়ালখালী অনলাইন সেবা`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('লিংক কপি করা হয়েছে!', 'success');
    }
  };

  const handleSwitchRestaurant = (r: Restaurant) => {
    setSelectedRestaurant(r);
    setSearchQuery('');
    window.history.pushState({}, '', `/restaurant/${r.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* 1. Top Navigation Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E4E6EB] shadow-2xs flex items-center justify-between gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#050505] hover:text-[#1877F2] transition-colors cursor-pointer bg-[#F0F2F5] hover:bg-[#E4E6EB] px-3 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমপেজে ফিরে যান</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#65676B] hover:text-[#050505] transition-colors cursor-pointer"
            title="শেয়ার করুন"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Restaurant Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-[#E4E6EB] shadow-md">
        <div className="relative h-56 sm:h-72 w-full">
          <img
            src={selectedRestaurant.image}
            alt={selectedRestaurant.name}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
        </div>

        {/* Content over Banner */}
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between text-white">
          {/* Top badges */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{selectedRestaurant.rating}</span>
                <span className="text-[10px] opacity-80">({selectedRestaurant.reviewsCount}+)</span>
              </span>
              <span className="bg-white/25 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                {selectedRestaurant.cuisine}
              </span>
            </div>

            <span className="bg-emerald-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
              খোলা আছে
            </span>
          </div>

          {/* Restaurant Details */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
              {selectedRestaurant.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-2xl">
              {selectedRestaurant.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-gray-300 pt-1">
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{selectedRestaurant.location}, {selectedRestaurant.union}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{selectedRestaurant.openHours}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                <Utensils className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{selectedRestaurant.menu.length} টি খাবারের মেনু</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Call to Order Hotline Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-3.5 sm:p-4 text-white shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base leading-tight">
              পার্সেল বা হোম ডেলিভারির জন্য সরাসরি কল করুন
            </h3>
            <p className="text-xs text-orange-100 mt-0.5">
              তাজা ও সুস্বাদু খাবারের নিশ্চয়তা
            </p>
          </div>
        </div>

        <a
          href={`tel:${selectedRestaurant.phone.replace(/[^0-9+]/g, '')}`}
          className="px-4 py-2.5 bg-white text-orange-600 hover:bg-orange-50 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95 shrink-0"
        >
          <Phone className="w-4 h-4 fill-current" />
          <span>অর্ডার করুন ({selectedRestaurant.phone})</span>
        </a>
      </div>

      {/* 4. Menu Section */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-4">
        {/* Search and Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Utensils className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#050505]">খাবারের সম্পূর্ণ তালিকা</h2>
              <p className="text-[11px] text-[#65676B]">ছবি, বিবরণ ও নির্ধারিত মূল্য তালিকা ({filteredMenu.length} টি খাবার)</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="খাবারের নাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:outline-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Food Items Grid (In 1 row 2 items) */}
        {filteredMenu.length === 0 ? (
          <div className="py-14 text-center text-[#65676B] space-y-2">
            <Utensils className="w-12 h-12 mx-auto text-gray-300" />
            <p className="text-sm font-bold text-[#050505]">কোনো খাবার পাওয়া যায়নি</p>
            <p className="text-xs">অন্য নাম দিয়ে অনুসন্ধান করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-2.5 sm:p-3.5 border border-[#E4E6EB] hover:border-orange-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Food Image */}
                  <div className="relative w-full h-28 sm:h-44 rounded-xl overflow-hidden bg-gray-100 mb-2 sm:mb-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="font-bold text-xs sm:text-base text-[#050505] leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">{item.name_en}</p>
                    <p className="text-[11px] sm:text-xs text-[#65676B] line-clamp-2 leading-relaxed pt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Price and Order Button */}
                <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#65676B] block leading-none">মূল্য</span>
                    <span className="text-xs sm:text-base font-black text-[#1877F2]">
                      ৳ {item.price}
                    </span>
                  </div>

                  <a
                    href={`tel:${selectedRestaurant.phone.replace(/[^0-9+]/g, '')}`}
                    onClick={() => showToast(`${item.name} অর্ডারের জন্য কল করা হচ্ছে...`, 'info')}
                    className="w-full sm:w-auto px-2 sm:px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-[10px] sm:text-xs rounded-xl flex items-center justify-center gap-1 shadow-2xs cursor-pointer transition-transform active:scale-95 shrink-0"
                  >
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                    <span>অর্ডার কল</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Switch to other restaurants in Boalkhali */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm sm:text-base font-bold text-[#050505]">
              বোয়ালখালীর অন্যান্য রেস্টুরেন্ট ও ক্যাফে
            </h2>
          </div>
          <span className="text-xs text-[#65676B]">মেনু দেখতে ক্লিক করুন</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {STATIC_RESTAURANTS.filter((r) => r.id !== selectedRestaurant.id).map((r) => (
            <div
              key={r.id}
              onClick={() => handleSwitchRestaurant(r)}
              className="bg-[#F0F2F5] hover:bg-white rounded-2xl p-3 border border-[#E4E6EB] hover:border-orange-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex gap-3 group"
            >
              <img
                src={r.image}
                alt={r.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#050505] group-hover:text-orange-600 truncate">
                    {r.name}
                  </h4>
                  <p className="text-[10px] text-[#65676B] truncate">{r.cuisine}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-orange-600 font-bold">
                  <span>{r.menu.length} টি মেনু</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
