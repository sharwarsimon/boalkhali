import React from 'react';
import { 
  Landmark, 
  MapPin, 
  Compass, 
  Award, 
  Sparkles, 
  Library, 
  Trees, 
  Mail, 
  Building, 
  School, 
  BookOpen, 
  Building2, 
  Layers, 
  Moon, 
  ChevronRight, 
  ExternalLink,
  Map as MapIcon,
  Phone,
  Calendar
} from 'lucide-react';
import { 
  STATIC_UNIONS, 
  STATIC_FAMOUS_PERSONS, 
  STATIC_TOURIST_SPOTS, 
  STATIC_MAZARS,
  STATIC_EDUCATION_INSTITUTES
} from '../../data/staticData.js';
import type { UpozilaTab } from '../../pages/UpozilaInfoPage.js';

interface AtAGlanceTabProps {
  navigate: (path: string) => void;
  onSelectTab: (tab: UpozilaTab) => void;
  onCopy?: (text: string, label: string) => void;
}

export const AtAGlanceTab: React.FC<AtAGlanceTabProps> = ({
  navigate,
  onSelectTab,
  onCopy
}) => {
  // Counts
  const unionCount = STATIC_UNIONS.length; // 9
  const primaryCount = STATIC_EDUCATION_INSTITUTES.filter(i => i.type === 'primary').length || 103;
  const secondaryCount = STATIC_EDUCATION_INSTITUTES.filter(i => i.type === 'secondary').length || 16;
  const collegeCount = STATIC_EDUCATION_INSTITUTES.filter(i => i.type === 'college').length || 6;
  const madrasaCount = STATIC_EDUCATION_INSTITUTES.filter(i => i.type === 'madrasa').length || 10;
  const mazarCount = STATIC_MAZARS.length; // 7

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Stats Bento */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E4E6EB] shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E6EB] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#FA3E3E] flex items-center justify-center font-bold shadow-2xs">
              <Landmark className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#050505]">এক নজরে বোয়ালখালী উপজেলা</h2>
              <p className="text-xs sm:text-sm text-[#65676B]">
                কর্ণফুলীর কোলঘেঁষে বিপ্লবী স্মৃতি, সংস্কৃতি ও আধ্যাত্মিক ঐতিহ্যের চিরসবুজ জনপদ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              চট্টগ্রাম জেলা • ৩নং অঞ্চল
            </span>
          </div>
        </div>

        {/* Intro Paragraph */}
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
          বোয়ালখালী বাংলাদেশের চট্টগ্রাম জেলার অন্তর্গত একটি ঐতিহ্যবাহী উপজেলা। এটি প্রমত্তা কর্ণফুলী নদীর পূর্ব তীরে 
          অবস্থিত। ব্রিটিশবিরোধী স্বাধীনতা বিপ্লবীদের স্মৃতিবিজড়িত মাটি, ১৯৭১-এর মহান মুক্তিযুদ্ধের কালুরঘাট প্রতিরোধ, 
          ঐতিহাসিক মেধস মুনির আশ্রম, সাধক পুরুষদের মাজার শরীফ এবং বিখ্যাত মিষ্টি পেয়ারা বাগানের জন্য বোয়ালখালী দেশজুড়ে পরিচিত।
        </p>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">মোট আয়তন</span>
            <span className="text-sm sm:text-base font-black text-slate-800">১৩৭.৬০ কি.মি.²</span>
          </div>

          <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
            <span className="text-[10px] text-blue-600 font-semibold block uppercase">জনসংখ্যা</span>
            <span className="text-sm sm:text-base font-black text-[#1877F2]">৩,২০,০০০+</span>
          </div>

          <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[10px] text-emerald-700 font-semibold block uppercase">প্রশাসন</span>
            <span className="text-sm sm:text-base font-black text-emerald-700">১ পৌর + ৯ ইউনিয়ন</span>
          </div>

          <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-100 text-center">
            <span className="text-[10px] text-amber-700 font-semibold block uppercase">প্রতিষ্ঠা</span>
            <span className="text-sm sm:text-base font-black text-amber-800">উপজেলা ১৯৮৩</span>
          </div>

          <div className="bg-cyan-50/70 p-3 rounded-2xl border border-cyan-100 text-center">
            <span className="text-[10px] text-cyan-700 font-semibold block uppercase">সীমানা নদী</span>
            <span className="text-sm sm:text-base font-black text-cyan-800">কর্ণফুলী ও চান্দখালী</span>
          </div>

          <div className="bg-purple-50/70 p-3 rounded-2xl border border-purple-100 text-center">
            <span className="text-[10px] text-purple-700 font-semibold block uppercase">পোস্ট কোড</span>
            <span className="text-sm sm:text-base font-black text-purple-700">৪৩০০</span>
          </div>
        </div>
      </div>

      {/* 2. উপজেলার নামকরণ */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-[#FA3E3E]">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-base sm:text-lg font-bold text-[#050505]">বোয়ালখালীর নামকরণ</h3>
        </div>
        <div className="bg-red-50/40 rounded-2xl p-4 border border-red-100/70 text-xs sm:text-sm text-[#334155] leading-relaxed space-y-2">
          <p>
            কর্ণফুলী নদীর পূর্বপ্রান্তের শাখা <strong>'বোয়ালখালী খাল'</strong> এর নামানুসারেই এই উপজেলার নামকরণ হয়েছে। 
            ইতিহাস অনুযায়ী অতীতে এ অঞ্চলের গভীর খালের পানিতে প্রচুর বৃহদাকার দেশীয় বোয়াল মাছ পাওয়া যেত।
          </p>
          <p>
            এছাড়াও প্রখ্যাত গবেষকদের মতানুসারে, প্রাচীনকালে কর্ণফুলী নদীর মোহনায় বসবাসকারী ক্ষুদ্র নৃ-গোষ্ঠী 
            <strong> 'বোয়ালিয়া'</strong> উপজাতির জনবসতি থেকেও এই ভূখণ্ডের নাম বোয়ালখালী হিসেবে প্রচলিত হয়।
          </p>
        </div>
      </div>

      {/* 3. মানচিত্র ও চতুর্সীমানা (কোন দিকে কি কি) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#050505]">উপজেলার মানচিত্র ও কোন দিকে কি কি</h3>
              <p className="text-[11px] text-[#65676B]">ভৌগোলিক চতুর্সীমানা ও গুরুত্বপূর্ণ সংযোগ পয়েন্ট</p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('map')}
            className="text-xs font-bold text-[#1877F2] hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors"
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>পূর্ণ মানচিত্র</span>
          </button>
        </div>

        {/* 4 Cardinal Directions Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">উ</span>
              <span className="font-bold text-xs text-emerald-900">উত্তর দিকে</span>
            </div>
            <p className="text-xs text-emerald-800 leading-snug">
              রাউজান উপজেলা এবং ঐতিহাসিক কর্ণফুলী নদী।
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#1877F2] text-white text-xs font-bold flex items-center justify-center">দ</span>
              <span className="font-bold text-xs text-blue-900">দক্ষিণ দিকে</span>
            </div>
            <p className="text-xs text-blue-800 leading-snug">
              পটিয়া উপজেলা এবং চন্দনাইশ উপজেলার পাহাড়ি সীমানা।
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-amber-600 text-white text-xs font-bold flex items-center justify-center">পূ</span>
              <span className="font-bold text-xs text-amber-900">পূর্ব দিকে</span>
            </div>
            <p className="text-xs text-amber-800 leading-snug">
              রাঙ্গুনিয়া উপজেলা এবং কড়লডেঙ্গার সুউচ্চ পাহাড়ি বনাঞ্চল।
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-purple-600 text-white text-xs font-bold flex items-center justify-center">প</span>
              <span className="font-bold text-xs text-purple-900">পশ্চিম দিকে</span>
            </div>
            <p className="text-xs text-purple-800 leading-snug">
              কর্ণফুলী নদী, চান্দগাঁও, মোহরা, বাকলিয়া ও চট্টগ্রাম সিটি কর্পোরেশন।
            </p>
          </div>
        </div>

        {/* Embedded Interactive Map Preview */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E4E6EB] h-64 sm:h-72 w-full shadow-2xs">
          <iframe
            title="Boalkhali Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=91.8800%2C22.3100%2C92.0300%2C22.4200&amp;layer=mapnik&amp;marker=22.3650%2C91.9500"
            className="w-full h-full border-0"
            loading="lazy"
          />
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs p-2 rounded-xl shadow-md flex items-center gap-2 text-xs">
            <a
              href="https://maps.google.com/?q=Boalkhali,Chittagong"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Maps এ খুলুন</span>
            </a>
          </div>
        </div>

        {/* Gateway Connections */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-[#65676B] flex flex-wrap items-center justify-between gap-2">
          <span><strong>প্রধান প্রবেশদ্বার:</strong> ঐতিহাসিক কালুরঘাট রেল ও সড়ক সেতু, গোমদণ্ডী রেলওয়ে স্টেশন ও আরাকান সড়ক।</span>
          <span className="text-[#1877F2] font-semibold">চট্টগ্রাম মূল শহর থেকে মাত্র ৮ কি.মি.</span>
        </div>
      </div>

      {/* 4. প্রশাসনিক ইউনিট: ইউনিয়ন সমুহ ও পৌরসভার তথ্য */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#050505]">প্রশাসনিক ইউনিট: ইউনিয়ন সমুহ ও পৌরসভা</h3>
              <p className="text-[11px] text-[#65676B]">১টি পৌরসভা (৯টি ওয়ার্ড) এবং ৯টি ইউনিয়ন পরিষদ</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('municipality')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              পৌরসভা তথ্য
            </button>
            <button
              onClick={() => onSelectTab('unions')}
              className="text-xs font-bold text-[#1877F2] hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              সকল ইউনিয়ন
            </button>
          </div>
        </div>

        {/* Municipality Card Highlight */}
        <div 
          onClick={() => onSelectTab('municipality')}
          className="bg-gradient-to-r from-purple-50 to-indigo-50/60 p-4 rounded-2xl border border-purple-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:shadow-xs transition-all"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-purple-600 text-white font-bold rounded text-[10px]">পৌরসভা</span>
              <h4 className="font-bold text-sm text-[#050505]">বোয়ালখালী পৌরসভা কার্যালয়</h4>
            </div>
            <p className="text-xs text-[#65676B]">
              আয়তন: ১৫.৯৭ কি.মি.² • মোট ৯টি ওয়ার্ড • সদর দপ্তর: গোমদণ্ডী পৌর ভবন
            </p>
          </div>
          <span className="text-xs font-bold text-purple-700 flex items-center gap-1 shrink-0 self-start sm:self-auto">
            <span>বিস্তারিত জানুন</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>

        {/* 9 Unions Grid List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {STATIC_UNIONS.map((union) => (
            <div
              key={union.id}
              onClick={() => onSelectTab('unions')}
              className="p-3 rounded-2xl bg-[#F0F2F5]/70 hover:bg-blue-50 border border-[#E4E6EB] hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#1877F2] bg-white px-2 py-0.5 rounded-md shadow-2xs">
                  {union.number}
                </span>
                <span className="text-[10px] text-[#65676B]">{union.villages_count}</span>
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-[#050505] group-hover:text-[#1877F2] transition-colors mt-1.5">
                {union.name}
              </h5>
              <p className="text-[10px] text-[#65676B] truncate">চেয়ারম্যান: {union.chairman_name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ইতিহাস ও ঐতিহ্য */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#050505]">ইতিহাস ও ঐতিহ্য</h3>
              <p className="text-[11px] text-[#65676B]">বিপ্লবী সূর্য সেনের স্মৃতি, মুক্তিযুদ্ধ ও প্রাচীন তীর্থস্থান</p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('history')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            সম্পূর্ণ ইতিহাস
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-1.5">
            <strong className="text-xs font-bold text-amber-900 block">ব্রিটিশবিরোধী স্বাধীনতা বিপ্লব</strong>
            <p className="text-xs text-[#65676B] leading-relaxed">
              মাস্টারদা সূর্য সেন, প্রীতিলতা ওয়াদ্দেদার ও বিপ্লবী কল্পনা দত্তের অন্যতম গোপন ঘাঁটি ছিল বোয়ালখালীর শ্রীপুর ও কধুরখীল।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-red-50/40 border border-red-200/60 space-y-1.5">
            <strong className="text-xs font-bold text-red-900 block">১৯৭১ মহান মুক্তিযুদ্ধ</strong>
            <p className="text-xs text-[#65676B] leading-relaxed">
              কালুরঘাট স্বাধীন বাংলা বেতার কেন্দ্র থেকে বঙ্গবন্ধুর ঐতিহাসিক স্বাধীনতা ঘোষণা সম্প্রচারিত হয়েছিল। কধুরখীলে বীর শহীদদের আত্মত্যাগ অমর।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-1.5">
            <strong className="text-xs font-bold text-emerald-900 block">ঐতিহাসিক মেধস মুনির আশ্রম ও দরবার</strong>
            <p className="text-xs text-[#65676B] leading-relaxed">
              কড়লডেঙ্গা পাহাড়ের চূড়ায় দুর্গাপূজার সূচনাপীঠ মেধস আশ্রম, শ্রীপুর বুড়াগোসাই মন্দির ও শতবর্ষের সুফি সাধকদের পবিত্র মাজার শরীফ।
            </p>
          </div>
        </div>
      </div>

      {/* 6. নদী ও প্রকৃতি */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#050505]">নদী ও প্রকৃতি</h3>
              <p className="text-[11px] text-[#65676B]">কর্ণফুলী-চান্দখালী নদী, কড়লডেঙ্গা পাহাড় ও মিষ্টি পেয়ারা বাগান</p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('nature')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            প্রকৃতি দর্শন
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#65676B] leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E4E6EB] space-y-1">
            <strong className="text-[#050505] font-bold block">কর্ণফুলী নদী ও চান্দখালী প্রবাহ:</strong>
            <p>
              বোয়ালখালীর পশ্চিম ও উত্তর পাশ দিয়ে প্রবাহিত খরস্রোতা কর্ণফুলী নদী এখানকার মানুষের প্রাণস্পন্দন। 
              চান্দখালী নদী ও বোয়ালখালী খাল অভ্যন্তরীণ কৃষিকাজ ও মাছ চাষে অফুরন্ত অবদান রেখে চলেছে।
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E4E6EB] space-y-1">
            <strong className="text-[#050505] font-bold block">সবুজ পাহাড়শ্রেণী ও পেয়ারা বাগান:</strong>
            <p>
              কড়লডেঙ্গার সুউচ্চ পাহাড়, ঔষধি বনরাজি এবং কধুরখীল-শাকপুরার দিগন্তজোড়া পেয়ারা বাগান বোয়ালখালীকে 
              প্রাকৃতিক সৌন্দর্যের এক অনন্য লীলাভূমিতে পরিণত করেছে।
            </p>
          </div>
        </div>
      </div>

      {/* 7. ডাকঘর ও কোড */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#050505]">ডাকঘর ও পোস্ট কোড</h3>
              <p className="text-[11px] text-[#65676B]">বোয়ালখালী উপজেলার প্রধান ও শাখা ডাকঘরসমূহের পোস্টাল কোড</p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('post_office')}
            className="text-xs font-bold text-orange-700 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            সকল ডাকঘর
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {[
            { name: 'বোয়ালখালী প্রধান', code: '৪৩০০', type: 'প্রধান ডাকঘর' },
            { name: 'কানুনগোপাড়া', code: '৪৩১০', type: 'সাব পোস্ট' },
            { name: 'শাকপুরা', code: '৪৩২০', type: 'সাব পোস্ট' },
            { name: 'কধুরখীল', code: '৪৩২১', type: 'সাব পোস্ট' },
            { name: 'চরণদ্বীপ', code: '৪৩২২', type: 'সাব পোস্ট' },
            { name: 'সারোয়াতলী', code: '৪৩২৩', type: 'সাব পোস্ট' },
            { name: 'ইকবাল পার্ক', code: '৪৩২৪', type: 'শাখা ডাকঘর' },
          ].map((post, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-[#F0F2F5]/80 border border-[#E4E6EB] text-center">
              <span className="text-[10px] text-[#65676B] block truncate">{post.name}</span>
              <strong className="text-sm font-black text-[#1877F2]">{post.code}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* 8. কৃতি ব্যক্তিত্ত্ব (Horizontally Scrollable Carousel) */}
      {/* Requirement: কৃতি ব্যক্তিত্ত্ব: ছবি (round), এর নিচে নাম, এর নিচে জন্ম মৃত্যু। horizontally scrollable হবে। ক্লিক করলে কৃতিব্যক্তিত্ব page এ নিয়ে যাবে। */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#050505]">কৃতি ব্যক্তিত্ব</h3>
              <p className="text-[11px] text-[#65676B]">বোয়ালখালীর গর্বিত কৃতী সন্তান ও ইতিহাস প্রণেতাগণ (ক্লিক করে বিস্তারিত দেখুন)</p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('famous')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex items-start gap-4 overflow-x-auto no-scrollbar py-2 px-1">
          {STATIC_FAMOUS_PERSONS.map((person) => (
            <button
              key={person.id}
              onClick={() => onSelectTab('famous')}
              className="flex flex-col items-center text-center shrink-0 w-24 sm:w-28 group cursor-pointer focus:outline-none"
            >
              {/* Round Photo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-purple-200 shadow-xs group-hover:scale-105 group-hover:border-purple-600 transition-all bg-purple-50">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Name Below */}
              <span className="font-bold text-xs sm:text-[13px] text-[#050505] group-hover:text-purple-700 transition-colors line-clamp-1 mt-2 text-center w-full">
                {person.name}
              </span>

              {/* Birth - Death Period Below */}
              <span className="text-[10px] sm:text-[11px] text-[#65676B] font-medium mt-0.5 line-clamp-1 text-center w-full">
                {person.period}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 9. দর্শনীয় স্থান (Horizontally Scrollable Carousel) */}
      {/* Requirement: দর্শনীয় স্থান: স্থানের ছবি, এর নিচে নাম। Horizontally scrollable হবে। যেকোনোটাতে ক্লিক করলে দর্শনীয় স্থান পেজে নিয়ে যাবে। */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-[#FA3E3E] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#050505]">দর্শনীয় স্থান</h3>
              <p className="text-[11px] text-[#65676B]">প্রাকৃতিক ও ঐতিহ্যের সেরা পর্যটন আকর্ষণসমূহ (ক্লিক করে বিস্তারিত দেখুন)</p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('tourist')}
            className="text-xs font-bold text-[#FA3E3E] hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex items-start gap-4 overflow-x-auto no-scrollbar py-2 px-1">
          {STATIC_TOURIST_SPOTS.map((spot) => (
            <button
              key={spot.id}
              onClick={() => onSelectTab('tourist')}
              className="flex flex-col items-start shrink-0 w-52 sm:w-60 group cursor-pointer text-left focus:outline-none"
            >
              {/* Spot Image */}
              <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden bg-gray-100 shadow-2xs group-hover:shadow-md transition-all relative">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {spot.type}
                </div>
              </div>

              {/* Name Below */}
              <span className="font-bold text-xs sm:text-[13px] text-[#050505] group-hover:text-[#1877F2] transition-colors line-clamp-1 mt-2">
                {spot.name}
              </span>

              {/* Union/Location */}
              <span className="text-[11px] text-[#65676B] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                <span className="line-clamp-1">{spot.union}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 10. সবার নিচে বাটন (Bottom Action Buttons with Name & Count) */}
      {/* Requirement: 
          সবার নিচে, 
          বাটন রাখবে নাম ও সংখ্যা সহ " ইউনিয়ন সমুহ", প্রাথমিক বিদ্যালয়, মাধ্যমিক বিদ্যালয়, কলেজ, মাদ্রাসা, মাজার । 
          প্রতিটিতে ক্লিক করলে এই সব গুলার জন্যে আলাদা পেজ আছেযে সেখানে যাবে।
      */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <ChevronRight className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#050505]">গুরুত্বপূর্ণ সেবা ও প্রতিষ্ঠান ডিরেক্টরি</h3>
            <p className="text-[11px] text-[#65676B]">নিচের যে কোনো বোতামে ক্লিক করে নির্দিষ্ট পেজের তালিকা ও তথ্য দেখুন</p>
          </div>
        </div>

        {/* 6 Grid Action Buttons with Name & Count */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {/* Button 1: ইউনিয়ন সমুহ */}
          <button
            onClick={() => onSelectTab('unions')}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-blue-50/70 hover:bg-blue-100 border border-blue-200 transition-all group text-left cursor-pointer active:scale-98 shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#050505] block leading-tight group-hover:text-[#1877F2] transition-colors">
                  ইউনিয়ন সমুহ
                </span>
                <span className="text-[11px] font-bold text-[#1877F2]">
                  {unionCount}টি ইউনিয়ন
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#1877F2] group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Button 2: প্রাথমিক বিদ্যালয় */}
          <button
            onClick={() => navigate('/education?type=primary')}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 transition-all group text-left cursor-pointer active:scale-98 shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <School className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#050505] block leading-tight group-hover:text-emerald-700 transition-colors">
                  প্রাথমিক বিদ্যালয়
                </span>
                <span className="text-[11px] font-bold text-emerald-700">
                  {primaryCount}টি বিদ্যালয়
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Button 3: মাধ্যমিক বিদ্যালয় */}
          <button
            onClick={() => navigate('/education?type=secondary')}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-sky-50/70 hover:bg-sky-100 border border-sky-200 transition-all group text-left cursor-pointer active:scale-98 shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#050505] block leading-tight group-hover:text-sky-700 transition-colors">
                  মাধ্যমিক বিদ্যালয়
                </span>
                <span className="text-[11px] font-bold text-sky-700">
                  {secondaryCount}টি বিদ্যালয়
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-sky-700 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Button 4: কলেজ */}
          <button
            onClick={() => navigate('/education?type=college')}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-purple-50/70 hover:bg-purple-100 border border-purple-200 transition-all group text-left cursor-pointer active:scale-98 shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#050505] block leading-tight group-hover:text-purple-700 transition-colors">
                  কলেজ
                </span>
                <span className="text-[11px] font-bold text-purple-700">
                  {collegeCount}টি কলেজ
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-700 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Button 5: মাদ্রাসা */}
          <button
            onClick={() => navigate('/education?type=madrasa')}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100 border border-amber-200 transition-all group text-left cursor-pointer active:scale-98 shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#050505] block leading-tight group-hover:text-amber-700 transition-colors">
                  মাদ্রাসা
                </span>
                <span className="text-[11px] font-bold text-amber-700">
                  {madrasaCount}টি মাদ্রাসা
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Button 6: মাজার */}
          <button
            onClick={() => onSelectTab('mazar')}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-teal-50/70 hover:bg-teal-100 border border-teal-200 transition-all group text-left cursor-pointer active:scale-98 shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#050505] block leading-tight group-hover:text-teal-800 transition-colors">
                  মাজার ও দরগাহ
                </span>
                <span className="text-[11px] font-bold text-teal-800">
                  {mazarCount}টি দরবার শরীফ
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-teal-800 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
