import React from 'react';
import { Building, MapPin, Phone, Users, Shield, FileText, CheckCircle2, Award, Clock } from 'lucide-react';

interface MunicipalityTabProps {
  onCopy: (text: string, label: string) => void;
}

export const MunicipalityTab: React.FC<MunicipalityTabProps> = ({ onCopy }) => {
  const wards = [
    {
      no: 'ওয়ার্ড নং-০১',
      area: 'কধুরখীল (উত্তর ও পশ্চিম অংশ)',
      areas: ['কধুরখীল (উত্তর অংশ)', 'কধুরখীল (পশ্চিম অংশ)'],
      pop: '৮,৫০০+',
      councilor: 'মোঃ রফিকুল ইসলাম',
      phone: '01819-112233'
    },
    {
      no: 'ওয়ার্ড নং-০২',
      area: 'কধুরখীল (পাঠান পাড়া) ও পূর্ব গোমদণ্ডী',
      areas: ['কধুরখীল (পাঠান পাড়া অংশ)', 'পূর্ব গোমদণ্ডী (২ নং ওয়ার্ড অংশ)'],
      pop: '৯,২০০+',
      councilor: 'মোঃ কামাল উদ্দিন',
      phone: '01818-223344'
    },
    {
      no: 'ওয়ার্ড নং-০৩',
      area: 'পূর্ব গোমদণ্ডী (৩ নং ওয়ার্ড)',
      areas: ['পূর্ব গোমদণ্ডী (৩ নং ওয়ার্ড অংশ-১)', 'পূর্ব গোমদণ্ডী (৩ নং ওয়ার্ড অংশ-২)'],
      pop: '৭,৮০০+',
      councilor: 'আব্দুল কাদের',
      phone: '01817-334455'
    },
    {
      no: 'ওয়ার্ড নং-০৪',
      area: 'পূর্ব গোমদণ্ডী (৪ নং ওয়ার্ড)',
      areas: ['পূর্ব গোমদণ্ডী (৪ নং ওয়ার্ড অংশ-১)', 'পূর্ব গোমদণ্ডী (৪ নং ওয়ার্ড অংশ-২)'],
      pop: '১০,৫০০+',
      councilor: 'নজরুল ইসলাম',
      phone: '01816-445566'
    },
    {
      no: 'ওয়ার্ড নং-০৫',
      area: 'পূর্ব গোমদণ্ডী (৫ নং ওয়ার্ড)',
      areas: ['পূর্ব গোমদণ্ডী (৫ নং ওয়ার্ড অংশ-১)', 'পূর্ব গোমদণ্ডী (৫ নং ওয়ার্ড অংশ-২)'],
      pop: '৮,১০০+',
      councilor: 'সেলিম চৌধুরী',
      phone: '01815-556677'
    },
    {
      no: 'ওয়ার্ড নং-০৬',
      area: 'পূর্ব গোমদণ্ডী (৬ নং ওয়ার্ড)',
      areas: ['পূর্ব গোমদণ্ডী (৬ নং ওয়ার্ড অংশ-১)', 'পূর্ব গোমদণ্ডী (৬ নং ওয়ার্ড অংশ-২)'],
      pop: '৮,৯০০+',
      councilor: 'জহির আহমদ',
      phone: '01814-667788'
    },
    {
      no: 'ওয়ার্ড নং-০৭',
      area: 'পশ্চিম গোমদণ্ডী (৭ নং ওয়ার্ড)',
      areas: ['পশ্চিম গোমদণ্ডী (৭ নং ওয়ার্ড অংশ-১)', 'পশ্চিম গোমদণ্ডী (৭ নং ওয়ার্ড অংশ-২)'],
      pop: '৭,৩০০+',
      councilor: 'সুব্রত দে',
      phone: '01813-778899'
    },
    {
      no: 'ওয়ার্ড নং-০৮',
      area: 'পশ্চিম গোমদণ্ডী (৮ নং ওয়ার্ড)',
      areas: ['পশ্চিম গোমদণ্ডী (৮ নং ওয়ার্ড অংশ-১)', 'পশ্চিম গোমদণ্ডী (৮ নং ওয়ার্ড অংশ-২)'],
      pop: '৯,৪০০+',
      councilor: 'মোঃ মহিউদ্দিন',
      phone: '01812-889900'
    },
    {
      no: 'ওয়ার্ড নং-০৯',
      area: 'পশ্চিম গোমদণ্ডী (৯ নং ওয়ার্ড)',
      areas: ['পশ্চিম গোমদণ্ডী (৯ নং ওয়ার্ড অংশ-১)', 'পশ্চিম গোমদণ্ডী (৯ নং ওয়ার্ড অংশ-২)'],
      pop: '৮,৬০০+',
      councilor: 'আনোয়ার হোসেন',
      phone: '01811-990011'
    },
  ];

  const citizenServices = [
    { title: 'জন্ম ও মৃত্যু নিবন্ধন', desc: 'অনলাইনে আবেদন ও ৪৮ ঘণ্টার মধ্যে ডিজিটাল সনদ প্রদান।' },
    { title: 'নাগরিকত্ব ও ওয়ারিশ সনদ', desc: 'ওয়ার্ড কাউন্সিলর প্রত্যয়ন ও পৌর মেয়রের স্বাক্ষরযুক্ত সনদপত্র।' },
    { title: 'ট্রেড লাইসেন্স ইস্যু ও নবায়ন', desc: 'ব্যবসায়ীদের জন্য দ্রুততম সময়ে নতুন লাইসেন্স ও অনলাইন রিনিউয়াল।' },
    { title: 'ভবন নির্মাণ অনুমোদন', desc: 'পৌরসভার মাস্টারপ্ল্যান অনুযায়ী ভবন ও বাড়ি নির্মাণের প্ল্যান পাশ।' },
    { title: 'বর্জ্য অপসারণ ও পরিচ্ছন্নতা', desc: 'প্রতিদিন সকাল ও সন্ধ্যায় আধুনিক ময়লাবাহী গাড়ির মাধ্যমে বর্জ্য সংগ্রহ।' },
    { title: 'সড়ক বাতি ও ড্রেনেজ রক্ষণাবেক্ষণ', desc: 'প্রতিটি ওয়ার্ডে এলইডি স্ট্রিটলাইট ও জলাবদ্ধতা নিরসনে কাজ।' },
  ];

  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#050505]">বোয়ালখালী পৌরসভা কার্যালয়</h2>
            <p className="text-xs text-[#65676B]">স্থাপিত: ২০১২ ইং | শ্রেণি: ‘খ’ শ্রেণির আধুনিক পৌরসভা</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
          বোয়ালখালী পৌরসভা চট্টগ্রাম জেলার অন্যতম দ্রুত বর্ধনশীল উপশহর। গোমদণ্ডী, শাকপুরা ও তৎসংলগ্ন এলাকা নিয়ে গঠিত এই পৌরসভাটি নাগরিক সেবা, সড়ক অবকাঠামো, বর্জ্য ব্যবস্থাপনা ও বাণিজ্য সম্প্রসারণে কার্যকর ভূমিকা রাখছে।
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
            <span className="text-[#65676B] text-[10px] block">মোট আয়তন</span>
            <strong className="text-sm font-bold text-emerald-700">১৬.১২ বর্গ কি.মি.</strong>
          </div>
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100">
            <span className="text-[#65676B] text-[10px] block">পৌর জনসংখ্যা</span>
            <strong className="text-sm font-bold text-[#1877F2]">৭৮,৫০০+ জন</strong>
          </div>
          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100">
            <span className="text-[#65676B] text-[10px] block">ওয়ার্ড সংখ্যা</span>
            <strong className="text-sm font-bold text-purple-700">৯ টি ওয়ার্ড</strong>
          </div>
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
            <span className="text-[#65676B] text-[10px] block">পৌর ভোটার</span>
            <strong className="text-sm font-bold text-amber-700">৫২,৪০০+ জন</strong>
          </div>
        </div>

        {/* Administration Contacts */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-[#E4E6EB] space-y-2.5">
          <h3 className="text-xs font-bold text-[#050505] flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>পৌর প্রশাসন ও গুরুত্বপূর্ণ যোগাযোগ</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200">
              <div>
                <span className="font-bold text-[#050505] block">পৌর প্রশাসক / মেয়র সচিবালয়</span>
                <span className="text-[10px] text-[#65676B]">বোয়ালখালী পৌর ভবন</span>
              </div>
              <a
                href="tel:01819223344"
                className="px-2.5 py-1 bg-emerald-600 text-white rounded-md text-[11px] font-bold flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>কল</span>
              </a>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200">
              <div>
                <span className="font-bold text-[#050505] block">পৌর নির্বাহী কর্মকর্তা</span>
                <span className="text-[10px] text-[#65676B]">প্রশাসনিক শাখা</span>
              </div>
              <a
                href="tel:01815667788"
                className="px-2.5 py-1 bg-[#1877F2] text-white rounded-md text-[11px] font-bold flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>কল</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Citizen Services */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-[#050505] flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#1877F2]" />
          <span>পৌরসভার প্রধান নাগরিক সেবাসমূহ</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {citizenServices.map((srv, idx) => (
            <div key={idx} className="p-3 bg-[#F8FAFC] rounded-xl border border-gray-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#0F4A2E]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{srv.title}</span>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed pl-5">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9 Wards Grid */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#050505] flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>ওয়ার্ডভিত্তিক তথ্য ও কাউন্সিলর যোগাযোগ</span>
          </h3>
          <span className="text-[10px] text-[#65676B] font-semibold">৯টি ওয়ার্ড</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {wards.map((w, idx) => (
            <div key={idx} className="p-3 rounded-xl border border-gray-200 bg-white hover:border-[#1877F2] transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1877F2] bg-blue-50 px-2 py-0.5 rounded-md">
                  {w.no}
                </span>
                <span className="text-[10px] text-[#65676B]">জনসংখ্যা: {w.pop}</span>
              </div>

              <div className="text-xs space-y-1">
                <span className="text-[#64748B] text-[10px] block">অন্তর্ভুক্ত এলাকাসমূহ:</span>
                <div className="flex flex-wrap gap-1">
                  {w.areas.map((ar, aIdx) => (
                    <span key={aIdx} className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded font-medium">
                      {ar}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#64748B] block">কাউন্সিলর:</span>
                  <span className="text-xs font-bold text-[#0F172A]">{w.councilor}</span>
                </div>
                <a
                  href={`tel:${w.phone}`}
                  className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>কল</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
