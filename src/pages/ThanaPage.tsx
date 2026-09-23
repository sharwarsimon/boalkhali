import React, { useState } from 'react';
import { 
  Shield, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  Copy, 
  Check, 
  Clock, 
  AlertTriangle, 
  FileText, 
  PhoneCall, 
  Navigation,
  ExternalLink,
  Users,
  BadgeAlert
} from 'lucide-react';
import { useData } from '../context/DataContext.js';

interface ThanaPageProps {
  navigate: (path: string) => void;
}

export const ThanaPage: React.FC<ThanaPageProps> = ({ navigate }) => {
  const { showToast } = useData();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    showToast(`${label} (${text}) কপি করা হয়েছে!`, 'success');
    setTimeout(() => setCopiedText(null), 2500);
  };

  const keyOfficers = [
    {
      role: 'অফিসার ইনচার্জ (OC)',
      name: 'মো. গোলাম সরোয়ার',
      phone: '01320-108295',
      note: 'সার্বিক আইনশৃঙ্খলা ও জরুরি প্রশাসনিক সহায়তার জন্য সরাসরি যোগাযোগ',
      badge: 'প্রধান কর্মকর্তা',
      accent: 'bg-blue-600',
    },
    {
      role: 'পুলিশ পরিদর্শক (তদন্ত)',
      name: 'তদন্ত শাখা ইনচার্জ',
      phone: '01320-108296',
      note: 'মামলা তদন্ত, অপরাধ দমন ও ফরেনসিক সমন্বয়',
      badge: 'তদন্ত শাখা',
      accent: 'bg-indigo-600',
    },
    {
      role: 'ডিউটি অফিসার (২৪ ঘণ্টা জরুরি)',
      name: 'থানা কন্ট্রোল ও ডিউটি ডেস্ক',
      phone: '01713-373678',
      altPhone: '01320-108298',
      note: 'যেকোনো মুহূর্তে তাৎক্ষণিক পুলিশ পেট্রোল ও জরুরি সহায়তার জন্য',
      badge: '২৪ ঘণ্টা হটলাইন',
      accent: 'bg-emerald-600',
    },
    {
      role: 'নারী ও শিশু হেল্প ডেস্ক',
      name: 'ডেডিকেটেড নারী পুলিশ অফিসার',
      phone: '01320-108299',
      note: 'পারিবারিক সহিংসতা, নারী নির্যাতন ও শিশুদের আইনি নিরাপত্তা ডেস্ক',
      badge: 'সহায়তা ডেস্ক',
      accent: 'bg-rose-600',
    },
    {
      role: 'সার্কেল অতিরিক্ত পুলিশ সুপার',
      name: 'পটিয়া ও বোয়ালখালী সার্কেল',
      phone: '01320-108290',
      note: 'সার্কেল হেডকোয়ার্টার্স ও আপিল পর্যবেক্ষণ',
      badge: 'সার্কেল এএসপি',
      accent: 'bg-amber-600',
    },
    {
      role: 'চট্টগ্রাম জেলা পুলিশ কন্ট্রোল রুম',
      name: 'জেলা পুলিশ সুপার কার্যালয়',
      phone: '01320-108398',
      note: 'জেলা হেডকোয়ার্টার্স সমন্বয় ও জরুরি অ্যালার্ট',
      badge: 'জেলা কন্ট্রোল',
      accent: 'bg-slate-700',
    },
  ];

  const outposts = [
    {
      name: 'কালুরঘাট পুলিশ ফাঁড়ি',
      location: 'কালুরঘাট ব্রিজ গোলচত্বর ও মোহনা পয়েন্ট',
      phone: '01320-108300',
      incharge: 'ইনচার্জ: এসআই মো. সাইফুল ইসলাম',
      desc: 'কালুরঘাট নতুন ও পুরাতন ব্রিজ, নদীপথ এবং সীমান্ত নিরাপত্তা মনিটরিং চৌকি।',
    },
    {
      name: 'শাকপুরা পুলিশ তদন্ত কেন্দ্র ও ক্যাম্প',
      location: 'শাকপুরা চৌমুহনী মোড়, বোয়ালখালী',
      phone: '01320-108301',
      incharge: 'ইনচার্জ: এসআই মো. কামরুল হাসান',
      desc: 'বোয়ালখালী মধ্য ও দক্ষিণাঞ্চল, বাজার নিরাপত্তা ও নিয়মিত ভ্রাম্যমাণ টহল।',
    },
    {
      name: 'কধুরখীল পুলিশ ক্যাম্প ও বিট ফাঁড়ি',
      location: 'কধুরখীল ইউনিয়ন পরিষদ রোড',
      phone: '01320-108303',
      incharge: 'বিট অফিসার: এএসআই মো. মহিউদ্দিন',
      desc: 'কধুরখীল ও পশ্চিমাঞ্চলীয় জনবসতির স্থানীয় বিট পুলিশিং সেবা।',
    },
  ];

  const gdSteps = [
    {
      title: '১. অনলাইন জিডি (Online GD)',
      desc: 'ডকুমেন্ট হারানো, পাসপোর্ট বা পরিচয়পত্র হারানোর ক্ষেত্রে "Online GD" অ্যাপ বা gd.police.gov.bd ওয়েবসাইটে গিয়ে ঘরে বসেই জিডি করা যায়।',
    },
    {
      title: '২. থানায় লিখিত অভিযোগ ও জিডি',
      desc: 'অফিসার ইনচার্জ (OC) বরাবর লিখিত আবেদন সাদা কাগজে লিখে ডিউটি অফিসারের নিকট জমা দিলে তাৎক্ষণিক রিসিভড কপি ও জিডি নম্বর প্রদান করা হয়।',
    },
    {
      title: '৩. জরুরি সহায়তা (জাতীয় হেল্পলাইন ৯৯৯)',
      desc: 'যেকোনো অপরাধ, দুর্ঘটনা, পারিবারিক বা সামাজিক সহিংসতায় টোল-ফ্রি ৯৯৯ এ কল করলে নিকটস্থ পুলিশ পেট্রোল ভ্যান আপনার কাছে দ্রুত পৌঁছাবে।',
    },
  ];

  return (
    <div className="space-y-5 pb-16 animate-in fade-in duration-200">
      {/* 1. Header Navigation */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] rounded-2xl transition-colors cursor-pointer"
            title="হোমে ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
                আইনশৃঙ্খলা ও নাগরিক নিরাপত্তা
              </span>
              <span className="text-[11px] text-[#65676B] font-medium hidden sm:inline">
                চট্টগ্রাম জেলা পুলিশ
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-[#050505] tracking-tight mt-0.5">
              বোয়ালখালী উপজেলা থানা
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:999"
            className="flex-1 sm:flex-none px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>জরুরি কল: ৯৯৯</span>
          </a>
        </div>
      </div>

      {/* 2. Quick Emergency Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold">২৪ ঘণ্টা নাগরিক পুলিশি সেবা</h2>
                <p className="text-xs text-blue-200">শান্তি, শৃঙ্খলা ও নিরাপত্তা রক্ষায় সর্বদা আপনার পাশে</p>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ডিউটি অফিসার সক্রিয়</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-blue-200 block">ডিউটি অফিসার (মোবাইল)</span>
                <strong className="text-base sm:text-lg font-black tracking-wide text-white">01713-373678</strong>
              </div>
              <a
                href="tel:01713373678"
                className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xs transition-colors"
                title="সরাসরি কল করুন"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-blue-200 block">ডিউটি অফিসার (টিঅ্যান্ডটি / বিটিসিএল)</span>
                <strong className="text-base sm:text-lg font-black tracking-wide text-white">01320-108298</strong>
              </div>
              <a
                href="tel:01320108298"
                className="w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-xs transition-colors"
                title="সরাসরি কল করুন"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Officers & Direct Contacts Grid */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#050505]">থানার কর্মকর্তা ও যোগাযোগ নম্বর</h2>
            <p className="text-xs text-[#65676B]">সরাসরি ডায়াল করুন অথবা নম্বর কপি করে সংরক্ষণ করুন</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {keyOfficers.map((officer, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0] hover:border-blue-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-md bg-slate-800">
                    {officer.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#050505] leading-snug">{officer.role}</h3>
                <p className="text-xs font-semibold text-blue-700">{officer.name}</p>
                <p className="text-[11px] text-[#65676B] leading-relaxed">{officer.note}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <span className="text-xs font-black text-[#050505]">{officer.phone}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(officer.phone, officer.role)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                    title="কপি করুন"
                  >
                    {copiedText === officer.phone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={`tel:${officer.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>কল</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Police Outposts & Camps (পুলিশ ফাঁড়ি ও তদন্ত কেন্দ্র) */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <BadgeAlert className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#050505]">পুলিশ ফাঁড়ি ও তদন্ত কেন্দ্রসমূহ</h2>
            <p className="text-xs text-[#65676B]">বোয়ালখালী উপজেলার অন্তর্গত পুলিশ ফাঁড়ি ও নিরাপত্তা চেকপোস্ট</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {outposts.map((outpost, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-[#E4E6EB] hover:border-amber-400 shadow-2xs space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-[#050505]">{outpost.name}</h3>
                <div className="flex items-start gap-1 text-[11px] text-amber-800 font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{outpost.location}</span>
                </div>
                <p className="text-[11px] text-slate-700 font-semibold">{outpost.incharge}</p>
                <p className="text-[11px] text-[#65676B] leading-relaxed">{outpost.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">{outpost.phone}</span>
                <a
                  href={`tel:${outpost.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs"
                >
                  <Phone className="w-3 h-3" />
                  <span>কল করুন</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GD / Complaint Guidelines */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <FileText className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#050505]">অভিযোগ ও সাধারণ ডায়েরি (GD) করার নিয়ম</h2>
            <p className="text-xs text-[#65676B]">নিরাপত্তা ও আইনি সুরক্ষায় জরুরি দিকনির্দেশনা</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {gdSteps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-[#050505]">{step.title}</h3>
              <p className="text-xs text-[#65676B] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Location & Address */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
            <MapPin className="w-4 h-4" />
            <span>থানার ভৌগোলিক অবস্থান</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#050505]">
            বোয়ালখালী থানা ভবন, পৌরসভা প্রধান সড়ক, পশ্চিম গোমদণ্ডী, বোয়ালখালী, চট্টগ্রাম।
          </h3>
          <p className="text-xs text-[#65676B]">
            গোমদণ্ডী পাইলট হাই স্কুল ও পৌরসভা কার্যালয়ের নিকটে অবস্থিত।
          </p>
        </div>

        <a
          href="https://maps.google.com/?q=Boalkhali+Police+Station+Chattogram"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>গুগল ম্যাপে দেখুন</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>
    </div>
  );
};
