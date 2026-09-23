import React, { useState } from 'react';
import { Mail, Copy, Check, MapPin, Search, ShieldCheck } from 'lucide-react';

interface PostOfficeTabProps {
  onCopy: (text: string, label: string) => void;
}

export const PostOfficeTab: React.FC<PostOfficeTabProps> = ({ onCopy }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  const postOffices = [
    { name: 'বোয়ালখালী প্রধান ডাকঘর (Boalkhali HO)', code: '৪৩৬৬', union: 'পৌরসভা (গোমদণ্ডী)', type: 'হেড পোস্ট অফিস', services: 'রেজিস্টার্ড চিঠি, পার্সেল, জিইপি, সঞ্চয়পত্র' },
    { name: 'গোমদণ্ডী সাব পোস্ট অফিস (Gomdandi SO)', code: '৪৩৬৭', union: 'পশ্চিম গোমদণ্ডী', type: 'সাব পোস্ট অফিস', services: 'চিঠিপত্র বিলি, মানি অর্ডার, স্পিড পোস্ট' },
    { name: 'কধুরখীল পোস্ট অফিস (Kadhurkhil ED)', code: '৪৩৬৮', union: 'কধুরখীল', type: 'শাখা ডাকঘর', services: 'সাধারণ ডাক, পার্সেল ডেলিভারি' },
    { name: 'শাকপুরা পোস্ট অফিস (Shakpura SO)', code: '৪৩৭০', union: 'শাকপুরা', type: 'সাব পোস্ট অফিস', services: 'কুরিয়ার ও চিঠি বিলি, ডাক জীবন বীমা' },
    { name: 'কানুনগোপাড়া পোস্ট অফিস (Kanungopara SO)', code: '৪৩৭১', union: 'পোপাদিয়া', type: 'সাব পোস্ট অফিস', services: 'স্পিড পোস্ট, ডাক সঞ্চয় ব্যাংক' },
    { name: 'সারোয়াতলী পোস্ট অফিস (Sarwatali ED)', code: '৪৩৭২', union: 'সারোয়াতলী', type: 'শাখা ডাকঘর', services: 'সাধারণ ও রেজিস্টার্ড চিঠি গ্রহণ' },
    { name: 'পোপাদিয়া পোস্ট অফিস (Popadia ED)', code: '৪৩৭৩', union: 'পোপাদিয়া', type: 'শাখা ডাকঘর', services: 'চিঠিপত্র ও মানি অর্ডার' },
    { name: 'চরণদ্বীপ পোস্ট অফিস (Charandwip ED)', code: '৪৩৭৪', union: 'চরণদ্বীপ', type: 'শাখা ডাকঘর', services: 'সাধারণ ডাক বিলি' },
    { name: 'কড়লডেঙ্গা পোস্ট অফিস (Karaldenga ED)', code: '৪৩৭৫', union: 'কড়লডেঙ্গা', type: 'শাখা ডাকঘর', services: 'চিঠিপত্র ও পার্সেল সার্ভিস' },
    { name: 'আমুচিয়া পোস্ট অফিস (Amuchia ED)', code: '৪৩৭৬', union: 'আমুচিয়া', type: 'শাখা ডাকঘর', services: 'স্থানীয় পোস্টাল সার্ভিস' },
    { name: 'শ্রীপুর পোস্ট অফিস (Sreepur ED)', code: '৪৩৭৭', union: 'শ্রীপুর-খরণদ্বীপ', type: 'শাখা ডাকঘর', services: 'চিঠিপত্র ও সাধারণ ডাক' },
  ];

  const filtered = postOffices.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.includes(search) ||
      p.union.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyCode = (code: string, name: string) => {
    onCopy(code, `${name} পোস্ট কোড`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#050505]">বোয়ালখালী ডাকঘর ও পোস্টাল কোড তালিকা</h2>
              <p className="text-xs text-[#65676B]">বাংলাদেশ ডাক বিভাগ, বোয়ালখালী উপজেলা সার্কেল</p>
            </div>
          </div>
        </div>

        {/* Search Field */}
        <div className="relative">
          <input
            type="text"
            placeholder="ডাকঘরের নাম বা পোস্ট কোড দিয়ে খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Post Office Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((po, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 border border-[#E4E6EB] shadow-2xs hover:border-amber-400 transition-all flex flex-col justify-between space-y-2.5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {po.type}
                </span>
                <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{po.union}</span>
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#050505] leading-snug mt-1.5">
                {po.name}
              </h3>

              <p className="text-[11px] text-[#65676B] mt-1 leading-tight">
                {po.services}
              </p>
            </div>

            {/* Postal Code Block */}
            <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#65676B] block uppercase tracking-wider font-semibold">
                  পোস্টাল কোড
                </span>
                <span className="text-base font-black text-amber-600 tracking-wider">
                  {po.code}
                </span>
              </div>

              <button
                onClick={() => handleCopyCode(po.code, po.name)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedCode === po.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>কোড কপি</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
