import React from 'react';
import { Library, Landmark, Award, Shield, BookOpen, Compass, Sparkles } from 'lucide-react';

export const HistoryTab: React.FC = () => {
  const milestones = [
    {
      era: 'নামকরণের ইতিবৃত্ত',
      title: '‘বোয়ালখালী’ নামের উৎপত্তি',
      desc: 'জনশ্রুতি অনুযায়ী বোয়ালখালী খালের নামানুসারে এই উপজেলার নামকরণ। কর্ণফুলী নদীর শাখা খালটিতে একসময় প্রচুর বৃহদাকার দেশীয় বোয়াল মাছ পাওয়া যেত। আবার কোনো কোনো ঐতিহাসিকের মতে, প্রাচীন বোয়ালিয়া উপজাতির বসতি থেকে এর নাম বোয়ালখালী হয়েছিল।',
      icon: Compass,
      tag: 'প্রাচীন ঐতিহ্য',
    },
    {
      era: '১৯৩০ এর দশক',
      title: 'ব্রিটিশবিরোধী স্বাধীনতা বিপ্লবের শক্তিকেন্দ্র',
      desc: 'চট্টগ্রাম অস্ত্রাগার দখলের মহানায়ক মাস্টারদা সূর্য সেন ও তাঁর বিপ্লবী সহযোদ্ধাদের অন্যতম প্রধান গোপন আশ্রয়স্থল ও ঘাঁটি ছিল বোয়ালখালীর শ্রীপুর ও কধুরখীল। বিপ্লবী কল্পনা দত্ত, তারকেশ্বর দস্তিদার ও প্রীতিলতা ওয়াদ্দেদারের পদচারণায় বোয়ালখালীর মাটি ধন্য হয়েছিল।',
      icon: Award,
      tag: 'বিপ্লবী সংগ্রাম',
    },
    {
      era: '১৯৭১ মহান মুক্তিযুদ্ধ',
      title: 'কালুরঘাট যুদ্ধ ও স্বাধীনতা সংগ্রাম',
      desc: '১৯৭১ সালের ২৫শে মার্চ কালুরঘাট স্বাধীন বাংলা বেতার কেন্দ্র থেকে বঙ্গবন্ধুর পক্ষে স্বাধীনতার ঐতিহাসিক ঘোষণা সম্প্রচারিত হয়েছিল। পাকিস্তানি হানাদার বাহিনীর বিরুদ্ধে বোয়ালখালীর কধুরখীল ও গোমদণ্ডীতে তীব্র প্রতিরোধ গড়ে তোলেন বীর মুক্তিযোদ্ধারা। অসংখ্য বীর শহীদের রক্তে রঞ্জিত হয়েছিল বোয়ালখালীর মাটি।',
      icon: Shield,
      tag: 'মুক্তিযুদ্ধ',
    },
    {
      era: 'প্রাচীন তীর্থ ও সংস্কৃতি',
      title: 'মেধস মুনির আশ্রম ও পৌরাণিক মাহাত্ম্য',
      desc: 'কড়লডেঙ্গা পাহাড়ের চূড়ায় অবস্থিত ঐতিহাসিক মেধস মুনির আশ্রম উপমহাদেশের সনাতন ধর্মাবলম্বীদের অন্যতম শ্রেষ্ঠ তীর্থ। পৌরাণিক বর্ণনা মতে, এই পবিত্র পাহাড়ে মহর্ষি মেধসের তত্ত্বাবধানে রাজা সুরথ ও সমাধি বৈশ্য প্রথম দুর্গাপূজা ও শ্রীশ্রী চণ্ডী আরাধনা করেছিলেন।',
      icon: Landmark,
      tag: 'আধ্যাত্মিক ঐতিহ্য',
    },
    {
      era: 'প্রশাসনিক বিবর্তন',
      title: 'থানা থেকে আধুনিক উপজেলায় রূপান্তর',
      desc: '১৯১০ সালে বোয়ালখালী থানা হিসেবে প্রতিষ্ঠিত হয়। পরবর্তীতে ১৯৮৩ সালে প্রশাসনিক বিকেন্দ্রীকরণের মাধ্যমে একে পূর্ণাঙ্গ উপজেলায় রূপান্তর করা হয় এবং ২০১২ সালে বোয়ালখালী পৌরসভা গঠিত হয়।',
      icon: Library,
      tag: 'প্রশাসনিক ইতিহাস',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F4A2E] to-[#166534] rounded-2xl p-5 sm:p-6 text-white space-y-2.5 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Library className="w-4.5 h-4.5 text-amber-300" />
          </div>
          <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">ঐতিহ্যবাহী বোয়ালখালী</span>
        </div>
        <h2 className="text-lg sm:text-2xl font-black leading-tight">
          ইতিহাস, ঐতিহ্য ও স্বাধীনতা সংগ্রামের গৌরবগাঁথা
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-3xl">
          কর্ণফুলীর পূর্ব পাড়ের এই প্রাচীন জনপদ কেবল তার প্রাকৃতিক সৌন্দর্যের জন্যই খ্যাত নয়; ব্রিটিশবিরোধী সশস্ত্র সংগ্রাম, ১৯৭১-এর মুক্তিযুদ্ধ এবং হাজার বছরের সাংস্কৃতিক ঐতিহ্যে বোয়ালখালী অবিস্মরণীয়।
        </p>
      </div>

      {/* History Timeline */}
      <div className="space-y-3.5">
        {milestones.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs hover:border-[#0F4A2E] transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  {item.era}
                </span>
                <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {item.tag}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#050505]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
