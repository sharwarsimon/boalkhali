import React from 'react';
import { Map, MapPin, Compass, Navigation, ExternalLink, Globe } from 'lucide-react';

export const MapTab: React.FC = () => {
  const boundaries = [
    { dir: 'উত্তর দিকে', boundary: 'রাউজান উপজেলা ও কর্ণফুলী নদী', distance: 'প্রায় ১৫ কি.মি.' },
    { dir: 'দক্ষিণ দিকে', boundary: 'পটিয়া উপজেলা ও চন্দনাইশ সীমানা', distance: 'প্রায় ১৮ কি.মি.' },
    { dir: 'পূর্ব দিকে', boundary: 'রাঙ্গুনিয়া উপজেলা ও পাহাড়ি বনাঞ্চল', distance: 'প্রায় ১২ কি.মি.' },
    { dir: 'পশ্চিম দিকে', boundary: 'কর্ণফুলী নদী ও চট্টগ্রাম সিটি কর্পোরেশন (চান্দগাঁও / চান্দগাঁও থানা ও মোহরা)', distance: 'নদী পারাপার সেতু' },
  ];

  const mainBridgesAndRoads = [
    { name: 'কালুরঘাট নতুন কর্ণফুলী সেতু ও রেলসেতু', type: 'প্রধান সংযোগ সেতু', desc: 'চট্টগ্রাম শহরের সাথে বোয়ালখালীর মূল প্রবেশদ্বার ও রেল সংযোগ।' },
    { name: 'আরাকান রোড (চট্টগ্রাম-কক্সবাজার বিকল্প রুট)', type: 'মহাসড়ক', desc: 'গোমদণ্ডী, শাকপুরা হয়ে দক্ষিণ চট্টগ্রামের সাথে যোগাযোগের প্রধান ধমনী।' },
    { name: 'বোয়ালখালী বাইপাস সড়ক ও নদী তীরবর্তী বেড়িবাঁধ', type: 'বাইপাস সড়ক', desc: 'উপজেলা সদরের যানজট এড়িয়ে দ্রুত চলাচলের বিকল্প সড়ক।' },
    { name: 'গোমদণ্ডী রেলওয়ে স্টেশন ও লাইন', type: 'রেলপথ', desc: 'ঢাকা-চট্টগ্রাম-কক্সবাজার রুটের ঐতিহাসিক রেল যোগাযোগ স্টেশন।' },
  ];

  return (
    <div className="space-y-4">
      {/* Map Overview Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#050505]">বোয়ালখালী উপজেলা ভৌগোলিক মানচিত্র</h2>
              <p className="text-xs text-[#65676B]">ভৌগোলিক স্থানাঙ্ক: ২২°২২′ উত্তর ৯১°৫৬′ পূর্ব</p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Boalkhali+Upazila+Chattogram"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>গুগল ম্যাপে দেখুন</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Embedded Interactive Vector Map View */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-200 bg-slate-100 flex flex-col items-center justify-center">
          <iframe
            title="Boalkhali Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://www.openstreetmap.org/export/embed.html?bbox=91.8700%2C22.3000%2C92.0300%2C22.4200&layer=mapnik&marker=22.3650%2C91.9500"
            className="w-full h-full rounded-2xl filter saturate-110"
          />
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] text-gray-700 font-semibold shadow-xs border border-gray-200">
            OpenStreetMap • বোয়ালখালী উপজেলা
          </div>
        </div>

        {/* Mobile Google Maps Button */}
        <a
          href="https://maps.google.com/?q=Boalkhali+Upazila+Chattogram"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#1877F2] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span>গুগল ম্যাপে লাইভ লোকেশন দেখুন</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Geographic Boundaries Bento */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-[#050505] flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-600" />
          <span>চারদিকের ভৌগোলিক সীমানা</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {boundaries.map((b, idx) => (
            <div key={idx} className="p-3 bg-[#F8FAFC] rounded-xl border border-gray-100 flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide block">
                  {b.dir}
                </span>
                <p className="font-bold text-[#1E293B] text-xs leading-snug mt-0.5">{b.boundary}</p>
              </div>
              <span className="text-[10px] font-semibold text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200 shrink-0">
                {b.distance}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Roads & Bridges */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-[#050505] flex items-center gap-2">
          <Navigation className="w-4 h-4 text-indigo-600" />
          <span>যোগাযোগ ব্যবস্থা ও সংযোগ সড়ক</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {mainBridgesAndRoads.map((road, idx) => (
            <div key={idx} className="p-3 rounded-xl border border-gray-200 bg-white space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#050505]">{road.name}</h4>
                <span className="text-[9px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {road.type}
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">{road.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
