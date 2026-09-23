import React from 'react';
import { Waves, Trees, Sun, Compass, Fish, Sparkles, MapPin } from 'lucide-react';

export const NatureTab: React.FC = () => {
  const natureFeatures = [
    {
      title: 'ঐতিহাসিক কর্ণফুলী নদী',
      tag: 'প্রধান নদী',
      desc: 'বোয়ালখালীর পশ্চিম সীমানা ঘেঁষে প্রবাহিত চিরযৌবনা কর্ণফুলী নদী। এখানকার জেলেরা ঐতিহ্যবাহী দেশীয় নৌকায় মাছ শিকার করেন। নদী তীরের সূর্যাস্ত এবং কালুরঘাট রিভারভিউ পয়েন্ট প্রকৃতির অপার সৌন্দর্যের আধার।',
      icon: Waves,
      color: 'text-sky-600 bg-sky-50',
    },
    {
      title: 'বোয়ালখালী ও চান্দখালী খাল',
      tag: 'প্রাকৃতিক জলপথ',
      desc: 'উপজেলার বুক চিরে প্রবাহিত বোয়ালখালী খাল ও চান্দখালী সংযোগ খাল। শত বছর ধরে এই খালগুলো কৃষি সেচ, পানি নিষ্কাশন এবং নৌপথে পণ্য পরিবহনের অন্যতম প্রাকৃতিক মাধ্যম হিসেবে ব্যবহৃত হয়ে আসছে।',
      icon: Fish,
      color: 'text-teal-600 bg-teal-50',
    },
    {
      title: 'কড়লডেঙ্গা পাহাড় ও চিরসবুজ অরণ্য',
      tag: 'পাহাড় ও বনানী',
      desc: 'চট্টগ্রামের উপকূলীয় সমতলভূমির মাঝে এক অনন্য প্রাকৃতিক বিস্ময় কড়লডেঙ্গা পাহাড়শ্রেণী। গভীর সবুজ বনভূমি, হরেক প্রজাতির পাখি, পাহাড়ি ঝিরি ও নির্জন পরিবেশ বোয়ালখালীকে এক শান্ত রূপ দান করেছে।',
      icon: Trees,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'বিখ্যাত কধুরখীল ও কড়লডেঙ্গা পেয়ারা বাগান',
      tag: 'কৃষি ঐতিহ্য',
      desc: 'বোয়ালখালীর রসালো মিষ্টি পেয়ারা পুরো বাংলাদেশে সমাদৃত। বর্ষা মৌসুমে পাহাড়ি ঢালে সারি সারি পেয়ারা বাগানের সবুজের সমারোহ এবং স্থানীয় কৃষকদের ব্যস্ততা প্রকৃতিপ্রেমীদের মুগ্ধ করে।',
      icon: Sun,
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Nature Banner */}
      <div className="relative rounded-2xl overflow-hidden h-44 sm:h-56 bg-slate-900 flex items-end p-4 sm:p-6 text-white border border-[#E4E6EB]">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80"
          alt="Boalkhali River and Nature"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="relative z-10 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold bg-emerald-600 px-2.5 py-0.5 rounded-full">
            প্রাকৃতিক রূপবৈচিত্র্য
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-white">
            নদী, খাল, সবুজ পাহাড় ও কৃষি ঐতিহ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
            কর্ণফুলীর মিষ্টি বাতাস, কড়লডেঙ্গার সুউচ্চ পাহাড় এবং চারপাশের সবুজ শ্যামল প্রান্তর নিয়ে রূপসী বোয়ালখালী।
          </p>
        </div>
      </div>

      {/* Grid of 4 Natural Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {natureFeatures.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs hover:border-emerald-400 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-[#050505]">
                {item.title}
              </h3>

              <p className="text-xs text-[#4A5568] leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
