import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Utensils,
  Share2
} from 'lucide-react';
import { STATIC_RESTAURANTS, Restaurant } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';

interface RestaurantsPageProps {
  navigate: (path: string) => void;
}

export const RestaurantsPage: React.FC<RestaurantsPageProps> = ({ navigate }) => {
  const { showToast } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = STATIC_RESTAURANTS.filter((r) => {
    const matchesSearch =
      !searchQuery.trim() ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      r.menu.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase().trim()));
    return matchesSearch;
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'বোয়ালখালীর সকল রেস্টুরেন্ট ও ক্যাফে তালিকা',
        text: 'বোয়ালখালী উপজেলার জনপ্রিয় সকল রেস্টুরেন্টের খাবারের মেনু, মূল্যতালিকা ও যোগাযোগ নম্বর।',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('লিংক কপি করা হয়েছে!', 'success');
    }
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      {/* 1. Header & Navigation */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E4E6EB] shadow-2xs flex items-center justify-between gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#050505] hover:text-[#1877F2] transition-colors cursor-pointer bg-[#F0F2F5] hover:bg-[#E4E6EB] px-3 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমে ফিরে যান</span>
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

      {/* 2. Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-3xl p-5 sm:p-7 text-white shadow-md space-y-3 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-black/25 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-full">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>বোয়ালখালী ফুড অ্যান্ড ডাইনিং ডিরেক্টরি</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
            বোয়ালখালীর জনপ্রিয় সকল রেস্টুরেন্ট ও ক্যাফে
          </h1>
          <p className="text-xs sm:text-sm text-orange-100">
            খাবারের সম্পূর্ণ তালিকা, ছবি, নির্ধারিত দাম এবং সরাসরি হোম ডেলিভারি ও পার্সেল অর্ডার করুন।
          </p>
        </div>

        {/* Floating Accent Utensil */}
        <div className="absolute right-4 bottom-2 sm:bottom-4 opacity-15 pointer-events-none">
          <UtensilsCrossed className="w-36 h-36 text-white" />
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E4E6EB] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="রেস্টুরেন্টের নাম, খাবার বা এলাকা খুঁজুন..."
              className="w-full pl-10 pr-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-orange-500 transition-colors"
            />
          </div>

          <div className="text-xs text-[#65676B] font-bold shrink-0">
            মোট রেস্টুরেন্ট: <span className="text-orange-600 font-extrabold">{filteredRestaurants.length} টি</span>
          </div>
        </div>
      </div>

      {/* 4. Restaurants Grid */}
      {filteredRestaurants.length === 0 ? (
        <div className="py-14 text-center bg-white rounded-3xl p-6 border border-[#E4E6EB] text-[#65676B] space-y-2">
          <Utensils className="w-12 h-12 mx-auto text-gray-300" />
          <p className="text-sm font-bold text-[#050505]">কোনো রেস্টুরেন্ট পাওয়া যায়নি</p>
          <p className="text-xs">অন্য কোনো নাম বা এলাকা দিয়ে অনুসন্ধান করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              className="bg-white rounded-2xl border border-[#E4E6EB] hover:border-orange-400 shadow-2xs hover:shadow-md transition-all cursor-pointer group overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Cover Image Banner */}
                <div className="relative w-full h-44 sm:h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{restaurant.rating}</span>
                        <span className="text-[10px] opacity-80">({restaurant.reviewsCount}+)</span>
                      </span>

                      <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        {restaurant.cuisine}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-orange-200 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>{restaurant.location}, {restaurant.union}</span>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base sm:text-lg text-[#050505] group-hover:text-orange-600 transition-colors leading-snug">
                      {restaurant.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#65676B] line-clamp-2 leading-relaxed">
                    {restaurant.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#65676B] pt-1">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{restaurant.openHours}</span>
                    </span>
                    <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                      {restaurant.menu.length} টি খাবারের আইটেম
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-4 py-3 bg-orange-50/70 border-t border-orange-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${restaurant.phone.replace(/[^0-9+]/g, '')}`}
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>{restaurant.phone}</span>
                </a>

                <div className="flex items-center gap-1 text-xs font-extrabold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                  <span>মেনু ও দাম দেখুন</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
