import React, { useState } from 'react';
import { Sparkles, ArrowLeft, MapPin, Share2, X, Navigation, ExternalLink } from 'lucide-react';
import { STATIC_TOURIST_SPOTS, TouristSpot } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';

interface TouristSpotsPageProps {
  navigate: (path: string) => void;
}

export const TouristSpotsPage: React.FC<TouristSpotsPageProps> = ({ navigate }) => {
  const { showToast } = useData();
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'বোয়ালখালীর দর্শনীয় স্থানসমূহ',
        text: 'বোয়ালখালী উপজেলার ঐতিহাসিক ও নয়নাভিরাম দর্শনীয় পর্যটন স্থানসমূহ।',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('লিংক কপি করা হয়েছে!', 'success');
    }
  };

  return (
    <div className="space-y-5 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] rounded-2xl transition-colors cursor-pointer"
            title="হোমে ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
              ভ্রমণ, ইতিহাস ও ঐতিহ্য
            </span>
            <h1 className="text-lg sm:text-2xl font-black text-[#050505] tracking-tight mt-0.5">
              দর্শনীয় স্থান
            </h1>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="p-2.5 bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] rounded-2xl transition-colors cursor-pointer"
          title="শেয়ার করুন"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Tourist Spots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STATIC_TOURIST_SPOTS.map((spot) => (
          <div
            key={spot.id}
            onClick={() => setSelectedSpot(spot)}
            className="bg-white rounded-2xl overflow-hidden border border-[#E4E6EB] shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {spot.type}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-1 text-[11px] text-red-600 font-semibold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{spot.union}</span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#050505] group-hover:text-[#1877F2] transition-colors">
                  {spot.name}
                </h3>

                <p className="text-xs text-[#65676B] line-clamp-2 leading-relaxed">
                  {spot.description}
                </p>
              </div>
            </div>

            <div className="px-4 py-2.5 bg-slate-50 border-t border-[#E4E6EB] flex items-center justify-between text-xs font-bold text-[#1877F2]">
              <span>বিস্তারিত ও যাতায়াত দেখুন</span>
              <Navigation className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Spot Detail Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-12 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedSpot(null)}
          />

          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150 z-10 space-y-4">
            <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-gray-200">
              <img
                src={selectedSpot.image}
                alt={selectedSpot.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                    {selectedSpot.type}
                  </span>
                  <button
                    onClick={() => setSelectedSpot(null)}
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl leading-tight">{selectedSpot.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-amber-200 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedSpot.union}, বোয়ালখালী, চট্টগ্রাম</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-0 space-y-3">
              <div>
                <span className="text-[11px] font-bold text-[#65676B] block mb-1">স্থান পরিচিতি:</span>
                <p className="text-xs sm:text-sm text-[#050505] leading-relaxed bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                  {selectedSpot.description}
                </p>
              </div>

              <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 space-y-1">
                <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>কীভাবে যাবেন (যাতায়াত গাইড):</span>
                </span>
                <p className="text-xs text-blue-800 leading-relaxed">
                  {selectedSpot.how_to_go || 'চট্টগ্রাম শহর থেকে কালুরঘাট সেতু হয়ে সিএনজি বা বাসে করে বোয়ালখালী পৌঁছে স্থানীয় অটো-রিকশায় সরাসরি যাওয়া যায়।'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
