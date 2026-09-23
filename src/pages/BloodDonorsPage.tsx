import React, { useState } from 'react';
import { 
  Droplet, 
  Search, 
  MapPin, 
  Phone, 
  Copy, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  ArrowLeft, 
  HeartHandshake,
  Calendar,
  AlertCircle,
  X
} from 'lucide-react';
import { STATIC_BLOOD_DONORS, BloodDonor } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';

interface BloodDonorsPageProps {
  navigate: (path: string) => void;
}

export const BloodDonorsPage: React.FC<BloodDonorsPageProps> = ({ navigate }) => {
  const { showToast } = useData();
  const [nameQuery, setNameQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('সব');
  const [selectedUnion, setSelectedUnion] = useState('সব');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const bloodGroups = ['সব', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const unionsList = [
    'সব',
    'বোয়ালখালী পৌরসভা',
    'কধুরখীল',
    'পশ্চিম গোমদণ্ডী',
    'শাকপুরা',
    'সারোয়াতলী',
    'পোপাদিয়া',
    'আমুচিয়া',
    'চরনদ্বীপ',
    'শ্রীপুর-খরণদ্বীপ',
    'আহল্লা করলডেঙ্গা',
  ];

  const hasActiveFilters = nameQuery.trim() !== '' || selectedBloodGroup !== 'সব' || selectedUnion !== 'সব';

  const handleClearFilters = () => {
    setNameQuery('');
    setSelectedBloodGroup('সব');
    setSelectedUnion('সব');
    showToast('ফিল্টার ক্লিয়ার করা হয়েছে', 'info');
  };

  const handleCopyPhone = (phone: string, name: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    showToast(`${name}-এর নম্বর (${phone}) কপি হয়েছে!`, 'success');
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const filteredDonors = STATIC_BLOOD_DONORS.filter((donor) => {
    const matchesName = !nameQuery.trim() || 
      donor.name.toLowerCase().includes(nameQuery.toLowerCase()) ||
      donor.village.toLowerCase().includes(nameQuery.toLowerCase()) ||
      (donor.club && donor.club.toLowerCase().includes(nameQuery.toLowerCase()));

    const matchesGroup = selectedBloodGroup === 'সব' || donor.bloodGroup === selectedBloodGroup;
    const matchesUnion = selectedUnion === 'সব' || donor.union.includes(selectedUnion) || selectedUnion.includes(donor.union);

    return matchesName && matchesGroup && matchesUnion;
  });

  const availableCount = STATIC_BLOOD_DONORS.filter(d => d.isAvailable).length;

  return (
    <div className="space-y-4 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#E4E6EB] space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center cursor-pointer transition-colors shrink-0"
              title="হোমে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold shrink-0">
                <Droplet className="w-5 h-5 fill-rose-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-[#050505] flex items-center gap-2">
                  <span>বোয়ালখালী ব্লাড ডোনার্স ডিরেক্টরি</span>
                </h1>
                <p className="text-xs text-[#65676B]">জরুরি রক্ত প্রয়োজনে সরাসরি যোগাযোগ করুন বোয়ালখালীর সেচ্ছাসেবী রক্তদাতাদের সাথে</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl">
              মোট রক্তদাতা: {STATIC_BLOOD_DONORS.length} জন
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              প্রস্তুত: {availableCount} জন
            </span>
          </div>
        </div>

        {/* Top Filter Bar: Name, Blood Group, Union and Clear Filter Icon */}
        <div className="pt-2 border-t border-[#E4E6EB] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#65676B] uppercase tracking-wider">রক্তদাতা ফিল্টার করুন:</span>
            {hasActiveFilters && (
              <span className="text-[11px] text-rose-600 font-semibold">ফিল্টার চালু রয়েছে</span>
            )}
          </div>

          {/* Combined Horizontal Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* 1. Name Filter Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                placeholder="দাতার নাম, এলাকা বা ক্লাব দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:outline-[#1877F2]"
              />
              {nameQuery && (
                <button 
                  onClick={() => setNameQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 2. Blood Group Dropdown */}
            <div className="flex items-center gap-1.5 sm:w-44 shrink-0">
              <span className="text-xs font-bold text-[#65676B] shrink-0">গ্রুপ:</span>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full py-2 px-2.5 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs font-bold text-rose-700 focus:bg-white focus:outline-[#1877F2] cursor-pointer"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg === 'সব' ? 'সকল গ্রুপের রক্ত (সব)' : `রক্তের গ্রুপ ${bg}`}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Union Dropdown */}
            <div className="flex items-center gap-1.5 sm:w-48 shrink-0">
              <span className="text-xs font-bold text-[#65676B] shrink-0">ইউনিয়ন:</span>
              <select
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value)}
                className="w-full py-2 px-2.5 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs font-semibold text-[#050505] focus:bg-white focus:outline-[#1877F2] cursor-pointer"
              >
                {unionsList.map((un) => (
                  <option key={un} value={un}>
                    {un === 'সব' ? 'সকল ইউনিয়ন ও পৌরসভা' : un}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Clear Filter Icon / Button */}
            <button
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
              title="ফিল্টার রিসেট / ক্লিয়ার করুন"
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                hasActiveFilters
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 shadow-xs'
                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${hasActiveFilters ? 'text-rose-600' : 'text-gray-400'}`} />
              <span className="hidden xs:inline">ক্লিয়ার ফিল্টার</span>
            </button>
          </div>

          {/* Quick Blood Group Buttons for Rapid Access */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <span className="text-[11px] font-semibold text-gray-500 shrink-0 mr-1">দ্রুত ফিল্টার:</span>
            {bloodGroups.map((bg) => {
              const isSelected = selectedBloodGroup === bg;
              const count = bg === 'সব' 
                ? STATIC_BLOOD_DONORS.length 
                : STATIC_BLOOD_DONORS.filter(d => d.bloodGroup === bg).length;

              return (
                <button
                  key={bg}
                  onClick={() => setSelectedBloodGroup(bg)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-rose-50/70 text-rose-700 border-rose-100 hover:bg-rose-100'
                  }`}
                >
                  <span>{bg}</span>
                  <span className={`ml-1 text-[10px] px-1 py-0.2 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white text-rose-800'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Donors Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredDonors.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl p-6 border border-[#E4E6EB] text-[#65676B] space-y-2">
            <Droplet className="w-10 h-10 mx-auto text-rose-300" />
            <p className="font-bold text-sm text-[#050505]">কোনো রক্তদাতা পাওয়া যায়নি</p>
            <p className="text-xs">ফিল্টার ক্লিয়ার করে অথবা রক্তের গ্রুপ পরিবর্তন করে আবার চেষ্টা করুন।</p>
            <button
              onClick={handleClearFilters}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ফিল্টার রিসেট করুন</span>
            </button>
          </div>
        ) : (
          filteredDonors.map((donor) => {
            return (
              <div
                key={donor.id}
                className="bg-white rounded-2xl p-4 border border-[#E4E6EB] hover:border-rose-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="space-y-3">
                  {/* Top Row: Avatar, Name, Group Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar with Blood Group badge */}
                      <div className="relative w-13 h-13 rounded-2xl overflow-hidden bg-rose-50 border border-rose-100 shrink-0">
                        {donor.avatar ? (
                          <img
                            src={donor.avatar}
                            alt={donor.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-rose-600 font-bold text-lg">
                            {donor.name[0]}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm sm:text-base text-[#050505] truncate">
                            {donor.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#65676B] mt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                            <span className="truncate">{donor.village}, {donor.union}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Blood Group Large Badge */}
                    <div className="text-center shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex flex-col items-center justify-center font-black shadow-xs">
                        <span className="text-base leading-none">{donor.bloodGroup}</span>
                        <span className="text-[8px] font-semibold tracking-tighter opacity-85">পজিটিভ/নেগেটিভ</span>
                      </div>
                    </div>
                  </div>

                  {/* Donor Stats Details */}
                  <div className="bg-[#F8F9FA] rounded-xl p-2.5 text-xs space-y-1.5 border border-gray-100">
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="text-[#65676B] flex items-center gap-1">
                        <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                        <span>রক্তদানের অভিজ্ঞতা:</span>
                      </span>
                      <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        {donor.totalDonations} বার রক্ত দিয়েছেন
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-700">
                      <span className="text-[#65676B] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>সর্বশেষ রক্তদান:</span>
                      </span>
                      <span className="font-medium text-gray-800">
                        {donor.lastDonationDate}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-700">
                      <span className="text-[#65676B] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>বর্তমান অবস্থা:</span>
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        donor.isAvailable
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {donor.isAvailable ? '✓ রক্তদানে প্রস্তুত' : 'বিশ্রামে আছেন'}
                      </span>
                    </div>

                    {donor.club && (
                      <div className="pt-1 border-t border-gray-200/60 text-[11px] text-gray-600 truncate">
                        সংগঠন: <strong className="text-gray-800">{donor.club}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Call and Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <a
                    href={`tel:${donor.phone}`}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>কল করুন ({donor.phone})</span>
                  </a>

                  <button
                    onClick={() => handleCopyPhone(donor.phone, donor.name)}
                    className="bg-[#F0F2F5] hover:bg-[#E4E6EB] text-gray-700 p-2 rounded-xl transition-colors cursor-pointer"
                    title="নম্বর কপি করুন"
                  >
                    {copiedPhone === donor.phone ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Emergency Blood Help Notice */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sm">জরুরি রক্ত গ্রহীতাদের জন্য পরামর্শ</p>
          <p className="leading-relaxed">
            রক্তদাতা ভাই ও বোনদের রক্তদানে উৎসাহ দিন এবং রক্তদানের নির্দিষ্ট বিরতি (৩-৪ মাস) বজায় রাখা হয়েছে কিনা নিশ্চিত করুন। রক্ত নেওয়ার পূর্বে চিকিৎসকের পরামর্শ অনুযায়ী ক্রস-ম্যাচিং ও স্ক্রিনিং পরীক্ষা অবশ্যই করিয়ে নিন।
          </p>
        </div>
      </div>
    </div>
  );
};
