import React from 'react';
import { HeartPulse, Phone, Clock, MapPin, Ambulance, ShieldCheck, Activity, Stethoscope } from 'lucide-react';

interface HospitalTabProps {
  onCopy: (text: string, label: string) => void;
}

export const HospitalTab: React.FC<HospitalTabProps> = ({ onCopy }) => {
  const hospitals = [
    {
      name: 'বোয়ালখালী উপজেলা স্বাস্থ্য কমপ্লেক্স (সরকারি ৫০ শয্যা হাসপাতাল)',
      type: 'সরকারি প্রধান হাসপাতাল',
      location: 'শাকপুরা, বোয়ালখালী (হাসপাতাল রোড)',
      emergencyPhone: '01712-889900',
      altPhone: '01819-445566',
      hours: 'জরুরি বিভাগ: ২৪ ঘণ্টা খোলা',
      services: ['২৪ ঘণ্টা জরুরি চিকিৎসা', 'আউটডোর ও ইন্ডোর সেবা', 'সরকারি অ্যাম্বুলেন্স', 'গর্ভবতী মা ও শিশু স্বাস্থ্য', 'প্যাথলজি ও এক্স-রে'],
      badge: '৫০ শয্যা বিশিষ্ট',
    },
    {
      name: 'কধুরখীল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
      type: 'সরকারি উপ-স্বাস্থ্য কেন্দ্র',
      location: 'কধুরখীল বাজার রোড, বোয়ালখালী',
      emergencyPhone: '01815-334455',
      hours: 'সকাল ৮:৩০ - দুপুর ২:৩০ (শুক্রবার বন্ধ)',
      services: ['সাধারণ প্রাথমিক চিকিৎসা', 'ফ্রি সরকারি ওষুধ বিতরণ', 'ইপিআই টিকাদান'],
      badge: 'ইউনিয়ন কেন্দ্র',
    },
    {
      name: 'সারোয়াতলী ইউনিয়ন পরিবার কল্যাণ কেন্দ্র',
      type: 'মা ও শিশু কল্যাণ কেন্দ্র',
      location: 'সারোয়াতলী ইউনিয়ন পরিষদ সংলগ্ন',
      emergencyPhone: '01816-445566',
      hours: 'সকাল ৯:০০ - দুপুর ৩:০০',
      services: ['স্বাভাবিক প্রসব সেবা (Normal Delivery)', 'মা ও শিশু স্বাস্থ্য পরামর্শ', 'ফ্রি আয়রন ও ভিটামিন বিতরণ'],
      badge: 'পরিবার কল্যাণ',
    },
    {
      name: 'শাকপুরা সেন্ট্রাল ডিজিটাল ডায়াগনস্টিক অ্যান্ড হাসপাতাল',
      type: 'বেসরকারি ডায়াগনস্টিক ও ক্লিনিক',
      location: 'শাকপুরা চৌমুহনী মোড়, বোয়ালখালী',
      emergencyPhone: '01819-778899',
      hours: 'সকাল ৭:০০ - রাত ১০:০০ (জরুরি সেবা সার্বক্ষণিক)',
      services: ['ডিজিটাল এক্স-রে ও আল্ট্রাসনোগ্রাফি', 'কম্পিউটারাইজড রক্ত পরীক্ষা', 'বিশেষজ্ঞ ডাক্তার চেম্বার'],
      badge: 'ডায়াগনস্টিক',
    },
    {
      name: 'গোমদণ্ডী সেবা পলিলেব ও কনসালটেশন সেন্টার',
      type: 'স্পেশালাইজড ডক্টরস পয়েন্ট',
      location: 'গোমদণ্ডী রেলস্টেশন রোড, বোয়ালখালী',
      emergencyPhone: '01812-332211',
      hours: 'সকাল ৮:০০ - রাত ৯:০০',
      services: ['মেডিসিন ও শিশু বিশেষজ্ঞ', 'ইসিজি ও ডায়াবেটিস টেস্ট', 'নেবুলাইজার ও জরুরি ড্রেসিং'],
      badge: 'কনসালটেশন',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 24/7 Hotline Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl p-4 sm:p-5 text-white shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-white animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              জরুরি স্বাস্থ্য সহায়তা
            </span>
          </div>
          <span className="text-xs font-bold bg-white text-red-600 px-2.5 py-0.5 rounded-full">
            ২৪ ঘণ্টা সেবা
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-base sm:text-xl font-black">
            বোয়ালখালী স্বাস্থ্য কমপ্লেক্স ও অ্যাম্বুলেন্স জরুরি কল
          </h2>
          <p className="text-xs text-rose-100">
            জরুরি প্রয়োজনে যে কোনো সময় সরাসরি কল করুন বোয়ালখালী উপজেলা স্বাস্থ্য কন্ট্রোল ডেস্কে
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href="tel:01712889900"
            className="px-4 py-2 bg-white text-red-700 hover:bg-rose-50 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>হাসপাতাল জরুরি: ০১৭১২-৮৮৯৯০০</span>
          </a>
          <a
            href="tel:16263"
            className="px-4 py-2 bg-red-900/60 hover:bg-red-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-white/20"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>স্বাস্থ্য বাতায়ন: ১৬২৬৩ (ফ্রি)</span>
          </a>
        </div>
      </div>

      {/* Hospital List */}
      <div className="space-y-3.5">
        {hospitals.map((hosp, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md">
                    {hosp.badge}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    {hosp.type}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#050505]">
                  {hosp.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-[#65676B]">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{hosp.location}</span>
                </div>
              </div>

              <a
                href={`tel:${hosp.emergencyPhone}`}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>কল করুন</span>
              </a>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5" />
              <span>{hosp.hours}</span>
            </div>

            {/* Services bullets */}
            <div className="pt-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                উপলব্ধ সেবাসমূহ:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {hosp.services.map((srv, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full"
                  >
                    • {srv}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
