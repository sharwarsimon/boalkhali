import React, { useState } from 'react';
import { Moon, MapPin, Calendar, Sparkles, Phone, Compass, ChevronRight, X } from 'lucide-react';
import { STATIC_MAZARS, MazarDetail } from '../../data/staticData.js';

interface MazarTabProps {
  onCopy?: (text: string, label: string) => void;
}

export const MazarTab: React.FC<MazarTabProps> = ({ onCopy }) => {
  const [selectedMazar, setSelectedMazar] = useState<MazarDetail | null>(null);

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-5 sm:p-6 text-white space-y-2.5 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Moon className="w-4.5 h-4.5 text-emerald-300" />
          </div>
          <span className="text-xs font-bold text-emerald-300 tracking-wide uppercase">আধ্যাত্মিক ঐতিহ্য</span>
        </div>
        <h2 className="text-lg sm:text-2xl font-black leading-tight">
          বোয়ালখালীর ঐতিহাসিক মাজার ও দরবার শরীফ
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-3xl">
          শতবর্ষের সুফি-সাধক ও কামেল বুজুর্গদের পুণ্যভূমি বোয়ালখালী। যুগ যুগ ধরে শান্তি, মানবপ্রেম ও আধ্যাত্মিক চর্চার কেন্দ্রবিন্দু এই পবিত্র মাজার ও দরগাহসমূহ।
        </p>
      </div>

      {/* Grid of Mazars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STATIC_MAZARS.map((mazar) => (
          <div
            key={mazar.id}
            onClick={() => setSelectedMazar(mazar)}
            className="bg-white rounded-2xl overflow-hidden border border-[#E4E6EB] shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Photo Banner */}
              <div className="relative h-44 w-full overflow-hidden bg-emerald-50">
                <img
                  src={mazar.image}
                  alt={mazar.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-emerald-900/80 backdrop-blur-xs text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Moon className="w-3 h-3 text-emerald-300" />
                  <span>পবিত্র দরগাহ ও মাজার</span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{mazar.union}</span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#050505] group-hover:text-emerald-700 transition-colors leading-snug">
                  {mazar.name}
                </h3>

                <p className="text-xs text-[#65676B] line-clamp-2 leading-relaxed">
                  {mazar.history}
                </p>

                {mazar.annualUrs && (
                  <div className="p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-100 flex items-start gap-2 text-xs text-emerald-900">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-medium leading-tight">{mazar.annualUrs}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-2.5 bg-slate-50 border-t border-[#E4E6EB] flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>বিস্তারিত ও অবস্থান দেখুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Mazar Detail Modal */}
      {selectedMazar && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-12">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedMazar(null)}
          />

          <div className="relative mx-auto max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#E4E6EB] flex items-center justify-between bg-emerald-50">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-emerald-700" />
                <span>মাজার ও দরবার পরিচিতি</span>
              </span>
              <button
                onClick={() => setSelectedMazar(null)}
                className="w-8 h-8 rounded-full hover:bg-emerald-200 text-[#65676B] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="h-52 w-full rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={selectedMazar.image}
                  alt={selectedMazar.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#050505]">{selectedMazar.name}</h3>
                <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedMazar.location}</span>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#65676B] leading-relaxed">
                {selectedMazar.history}
              </p>

              <div className="bg-[#F0F2F5] p-3.5 rounded-xl border border-[#E4E6EB] space-y-2 text-xs">
                {selectedMazar.annualUrs && (
                  <div className="space-y-0.5">
                    <strong className="text-[#050505] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      বার্ষিক ওরশ ও মাহফিল:
                    </strong>
                    <p className="text-[#65676B]">{selectedMazar.annualUrs}</p>
                  </div>
                )}

                <div className="space-y-0.5 pt-1 border-t border-gray-200">
                  <strong className="text-[#050505] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    বৈশিষ্ট্য ও গুরুত্ব:
                  </strong>
                  <p className="text-[#65676B]">{selectedMazar.specialty}</p>
                </div>
              </div>

              {selectedMazar.phone && (
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-[#65676B]">খাদেম / পরিচালনা কমিটি যোগাযোগ:</span>
                  <a
                    href={`tel:${selectedMazar.phone}`}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedMazar.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
