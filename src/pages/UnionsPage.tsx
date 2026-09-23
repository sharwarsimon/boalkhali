import React, { useState } from 'react';
import { MapPin, ArrowLeft, ChevronRight, X, Phone, Users, Share2 } from 'lucide-react';
import { STATIC_UNIONS, UnionDetail } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';

interface UnionsPageProps {
  navigate: (path: string) => void;
}

export const UnionsPage: React.FC<UnionsPageProps> = ({ navigate }) => {
  const { showToast } = useData();
  const [selectedUnion, setSelectedUnion] = useState<UnionDetail | null>(null);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'বোয়ালখালী উপজেলার ইউনিয়নসমূহ',
        text: 'বোয়ালখালী উপজেলার ৯টি ইউনিয়ন ও সংশ্লিষ্ট চেয়ারম্যান-সচিবদের যোগাযোগ নম্বর।',
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
            <span className="text-[11px] font-bold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
              স্থানীয় সরকার প্রশাসন
            </span>
            <h1 className="text-lg sm:text-2xl font-black text-[#050505] tracking-tight mt-0.5">
              ইউনিয়ন সমুহ
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

      {/* Unions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATIC_UNIONS.map((union) => (
          <div
            key={union.id}
            onClick={() => setSelectedUnion(union)}
            className="bg-white rounded-2xl overflow-hidden border border-[#E4E6EB] shadow-2xs hover:border-[#1877F2] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-36 overflow-hidden bg-gray-100">
                <img
                  src={union.image}
                  alt={union.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-between p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold bg-[#1877F2] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                      {union.number}
                    </span>
                    <span className="text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {union.villages_count}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-200 font-semibold tracking-wide uppercase">
                      আয়তন: {union.area_sqkm}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 space-y-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#050505] group-hover:text-[#1877F2] transition-colors leading-snug">
                    {union.name}
                  </h3>
                  <p className="text-[11px] text-[#65676B]">{union.name_en}</p>
                </div>

                <p className="text-xs text-[#65676B] line-clamp-2 leading-relaxed">
                  {union.description}
                </p>

                <div className="pt-2 border-t border-gray-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#65676B]">চেয়ারম্যান:</span>
                    <strong className="text-[#050505]">{union.chairman_name}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#65676B]">জনসংখ্যা:</span>
                    <strong className="text-[#050505]">{union.population}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-2.5 bg-slate-50 border-t border-[#E4E6EB] flex items-center justify-between text-xs font-bold text-[#1877F2]">
              <span>সম্পূর্ণ তথ্য দেখুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Union Full Details Modal */}
      {selectedUnion && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-12 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedUnion(null)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150 z-10">
            <div className="relative w-full h-48 sm:h-56 bg-gray-200">
              <img
                src={selectedUnion.image}
                alt={selectedUnion.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#1877F2] text-white px-3 py-1 rounded-full shadow-xs">
                    {selectedUnion.number} • {selectedUnion.name_en}
                  </span>
                  <button
                    onClick={() => setSelectedUnion(null)}
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                    {selectedUnion.name}
                  </h2>
                  <p className="text-xs text-blue-200">বোয়ালখালী উপজেলা, চট্টগ্রাম</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <p className="text-xs sm:text-sm text-[#65676B] leading-relaxed bg-[#F0F2F5] p-3.5 rounded-xl border border-[#E4E6EB]">
                {selectedUnion.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center text-xs">
                <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-[#65676B] text-[10px] block">আয়তন</span>
                  <strong className="text-sm font-bold text-[#1877F2]">{selectedUnion.area_sqkm}</strong>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-[#65676B] text-[10px] block">জনসংখ্যা</span>
                  <strong className="text-sm font-bold text-emerald-700">{selectedUnion.population}</strong>
                </div>
                <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100 col-span-2 sm:col-span-1">
                  <span className="text-[#65676B] text-[10px] block">গ্রাম / মহল্লা</span>
                  <strong className="text-sm font-bold text-purple-700">{selectedUnion.villages_count}</strong>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#E4E6EB] space-y-2.5 text-xs">
                <h4 className="font-bold text-[#050505] text-xs">জনপ্রতিনিধি ও কার্যালয় যোগাযোগ:</h4>
                <div className="flex items-center justify-between gap-2 p-2 bg-[#F0F2F5] rounded-lg">
                  <div>
                    <span className="text-[10px] text-[#65676B] block">চেয়ারম্যান</span>
                    <strong className="text-xs text-[#050505]">{selectedUnion.chairman_name}</strong>
                  </div>
                  <a
                    href={`tel:${selectedUnion.chairman_phone}`}
                    className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{selectedUnion.chairman_phone}</span>
                  </a>
                </div>

                <div className="flex items-center justify-between gap-2 p-2 bg-[#F0F2F5] rounded-lg">
                  <div>
                    <span className="text-[10px] text-[#65676B] block">ইউপি সচিব</span>
                    <strong className="text-xs text-[#050505]">{selectedUnion.secretary_name}</strong>
                  </div>
                  <a
                    href={`tel:${selectedUnion.secretary_phone}`}
                    className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{selectedUnion.secretary_phone}</span>
                  </a>
                </div>
              </div>

              {/* Ward and Areas Breakdown */}
              {((selectedUnion.ward_details && selectedUnion.ward_details.length > 0) || (selectedUnion.wards && selectedUnion.wards.length > 0)) && (
                <div className="bg-white p-3.5 rounded-xl border border-[#E4E6EB] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[#050505] text-xs flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1877F2]" />
                      <span>ওয়ার্ড ও আওতাধীন এলাকা তালিকা</span>
                    </h4>
                    <span className="text-[10px] text-[#65676B] font-semibold">
                      {selectedUnion.ward_details ? selectedUnion.ward_details.length : selectedUnion.wards.length} টি ওয়ার্ড
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {selectedUnion.ward_details ? (
                      selectedUnion.ward_details.map((wd, wIdx) => (
                        <div key={wIdx} className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                          <span className="text-[11px] font-bold text-[#1877F2] bg-blue-50 px-2 py-0.5 rounded inline-block">
                            {wd.wardNo}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {wd.areas.map((ar, aIdx) => (
                              <span key={aIdx} className="text-[10px] text-[#334155] bg-white border border-gray-200 px-1.5 py-0.5 rounded">
                                {ar}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      selectedUnion.wards.map((wardName, wIdx) => (
                        <div key={wIdx} className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-[#334155]">
                          {wardName}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
