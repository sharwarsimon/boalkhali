import React, { useState } from 'react';
import { 
  Phone, 
  PhoneCall, 
  Search, 
  ShieldAlert, 
  Ambulance, 
  Flame, 
  HeartPulse, 
  Zap, 
  Droplet, 
  Scale, 
  Radio, 
  Copy, 
  Check, 
  ExternalLink,
  PlusCircle,
  HelpCircle,
  MapPin,
  Clock
} from 'lucide-react';
import { useData } from '../context/DataContext.js';

interface EmergencyNumbersPageProps {
  navigate: (path: string) => void;
}

interface EmergencyContact {
  id: string;
  category: 'ambulance' | 'police' | 'fire' | 'hospital' | 'electricity' | 'blood' | 'govt' | 'other';
  title: string;
  title_en: string;
  subtitle: string;
  phone: string;
  altPhone?: string;
  area: string;
  is24Hours: boolean;
  priority?: boolean;
}

const emergencyContacts: EmergencyContact[] = [
  // 1. Ambulance Services (অ্যাম্বুলেন্স)
  {
    id: 'amb-1',
    category: 'ambulance',
    title: 'বোয়ালখালী উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স',
    title_en: 'Boalkhali Health Complex Ambulance',
    subtitle: 'সরকারি জরুরি অ্যাম্বুলেন্স সেবা (২৪ ঘণ্টা)',
    phone: '+8801730324789',
    altPhone: '01817554433',
    area: 'বোয়ালখালী পৌরসভা / স্বাস্থ্য কমপ্লেক্স',
    is24Hours: true,
    priority: true,
  },
  {
    id: 'amb-2',
    category: 'ambulance',
    title: 'রেড ক্রিসেন্ট জরুরি অ্যাম্বুলেন্স (বোয়ালখালী)',
    title_en: 'Red Crescent Ambulance Boalkhali',
    subtitle: 'জরুরি রোগী পরিবহন ও আইসিইউ অ্যাম্বুলেন্স সাপোর্ট',
    phone: '+8801819654321',
    altPhone: '01712987654',
    area: 'বোয়ালখালী ও চট্টগ্রাম শহর সংযোগ',
    is24Hours: true,
    priority: true,
  },
  {
    id: 'amb-3',
    category: 'ambulance',
    title: 'আল-আমিন ফ্রি অ্যাম্বুলেন্স সার্ভিস বোয়ালখালী',
    title_en: 'Al-Amin Free Ambulance Service',
    subtitle: 'স্বেচ্ছাসেবী জরুরি ফ্রি ও স্বল্পমূল্যে অ্যাম্বুলেন্স সেবা',
    phone: '+8801822446688',
    altPhone: '01833557799',
    area: 'শাকপুরা, কানুনগোপাড়া ও কালুরঘাট এলাকা',
    is24Hours: true,
  },
  {
    id: 'amb-4',
    category: 'ambulance',
    title: 'কালুরঘাট সেতু জরুরি অ্যাম্বুলেন্স স্ট্যান্ড',
    title_en: 'Kalurghat Bridge Emergency Ambulance',
    subtitle: 'চট্টগ্রাম মেডিকেল (চমেক) দ্রুত রোগী পরিবহনের জন্য সার্বক্ষণিক প্রস্তুত',
    phone: '+8801814112233',
    area: 'কালুরঘাট ও পশ্চিম গোমদণ্ডী',
    is24Hours: true,
  },
  {
    id: 'amb-5',
    category: 'ambulance',
    title: 'সারোয়াতলী মানবকল্যাণ অ্যাম্বুলেন্স',
    title_en: 'Saroatoli Welfare Ambulance Service',
    subtitle: 'সারোয়াতলী ও পোপাদিয়া ইউনিয়ন জরুরি অ্যাম্বুলেন্স',
    phone: '+8801816778899',
    area: 'সারোয়াতলী ও পূর্ব বোয়ালখালী',
    is24Hours: true,
  },

  // 2. Police & Law Enforcement (পুলিশ ও প্রশাসন)
  {
    id: 'pol-1',
    category: 'police',
    title: 'বোয়ালখালী থানা (অফিসার ইনচার্জ - OC)',
    title_en: 'Boalkhali Police Station (OC)',
    subtitle: 'আইনশৃঙ্খলা ও থানা প্রশাসনিক সহায়তা',
    phone: '+8801713373656',
    altPhone: '031682020',
    area: 'বোয়ালখালী থানা ভবন',
    is24Hours: true,
    priority: true,
  },
  {
    id: 'pol-2',
    category: 'police',
    title: 'বোয়ালখালী থানা ডিউটি অফিসার',
    title_en: 'Boalkhali Thana Duty Officer',
    subtitle: 'তাৎক্ষণিক অভিযোগ, জিডি ও জরুরি পুলিশ সহায়তা',
    phone: '+8801320108345',
    area: 'থানা কন্ট্রোল রুম',
    is24Hours: true,
    priority: true,
  },
  {
    id: 'pol-3',
    category: 'police',
    title: 'উপজেলা নির্বাহী অফিসার (UNO) বোয়ালখালী',
    title_en: 'Upazila Nirbahi Officer (UNO) Boalkhali',
    subtitle: 'উপজেলা প্রশাসন ও সার্বিক নিয়ন্ত্রণ',
    phone: '+8801705411250',
    area: 'উপজেলা পরিষদ কার্যালয়',
    is24Hours: false,
  },
  {
    id: 'pol-4',
    category: 'police',
    title: 'সহকারী কমিশনার (ভূমি) / এসিল্যান্ড',
    title_en: 'Assistant Commissioner (Land) Boalkhali',
    subtitle: 'ভূমি প্রশাসন ও এক্সিকিউটিভ ম্যাজিস্ট্রেট সেবা',
    phone: '+8801705411251',
    area: 'ভূমি অফিস, বোয়ালখালী',
    is24Hours: false,
  },

  // 3. Fire Service & Civil Defense (ফায়ার সার্ভিস)
  {
    id: 'fire-1',
    category: 'fire',
    title: 'বোয়ালখালী ফায়ার সার্ভিস ও সিভিল ডিফেন্স স্টেশন',
    title_en: 'Boalkhali Fire Service Station',
    subtitle: 'অগ্নিনির্বাপণ ও যেকোনো দুর্যোগে জরুরি উদ্ধার কাজ',
    phone: '+8801730009999',
    altPhone: '031681999',
    area: 'বোয়ালখালী সদর',
    is24Hours: true,
    priority: true,
  },
  {
    id: 'fire-2',
    category: 'fire',
    title: 'কালুরঘাট ফায়ার স্টেশন কন্ট্রোল',
    title_en: 'Kalurghat Fire Station Control Room',
    subtitle: 'কালুরঘাট শিল্পাঞ্চল ও বোয়ালখালী সংযোগ উদ্ধার ইউনিট',
    phone: '+8801715002233',
    area: 'কালুরঘাট',
    is24Hours: true,
  },

  // 4. Hospitals & Health (হাসপাতাল ও স্বাস্থ্য)
  {
    id: 'hosp-1',
    category: 'hospital',
    title: 'বোয়ালখালী ৫০ শয্যা বিশিষ্ট উপজেলা স্বাস্থ্য কমপ্লেক্স',
    title_en: 'Boalkhali Upazila Health Complex (50 Bed)',
    subtitle: 'জরুরি বিভাগ (ইমারজেন্সি) ও সার্বক্ষণিক ডাক্তার',
    phone: '+8801730324789',
    area: 'শাকপুরা, বোয়ালখালী',
    is24Hours: true,
    priority: true,
  },
  {
    id: 'hosp-2',
    category: 'hospital',
    title: 'উপজেলা স্বাস্থ্য ও পরিবার পরিকল্পনা কর্মকর্তা (UH&FPO)',
    title_en: 'UH&FPO Boalkhali',
    subtitle: 'স্বাস্থ্য কমপ্লেক্স প্রধান',
    phone: '+8801712334455',
    area: 'বোয়ালখালী স্বাস্থ্য কমপ্লেক্স',
    is24Hours: false,
  },
  {
    id: 'hosp-3',
    category: 'hospital',
    title: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল (চমেক) কন্ট্রোল রুম',
    title_en: 'Chittagong Medical College Hospital (CMCH)',
    subtitle: 'রেফারাল ও ট্রমা কেয়ার সেন্টার',
    phone: '+88031616566',
    altPhone: '031630331',
    area: 'চকবাজার, চট্টগ্রাম',
    is24Hours: true,
  },

  // 5. Electricity & Utilities (বিদ্যুৎ ও ইউটিলিটি)
  {
    id: 'elec-1',
    category: 'electricity',
    title: 'চট্টগ্রাম পল্লী বিদ্যুৎ সমিতি-১ (বোয়ালখালী জোনাল অফিস)',
    title_en: 'Boalkhali Palli Bidyut Zonal Office',
    subtitle: 'বিদ্যুৎ বিপর্যয় ও তার ছেঁড়া সংক্রান্ত জরুরি কমপ্লেইন',
    phone: '+8801769400250',
    altPhone: '01769400251',
    area: 'বোয়ালখালী জোনাল অফিস',
    is24Hours: true,
  },
  {
    id: 'elec-2',
    category: 'electricity',
    title: 'পিডিবি বিদ্যুৎ অভিযোগ কেন্দ্র (কালুরঘাট/বোয়ালখালী সাব-স্টেশন)',
    title_en: 'PDB Electricity Complaint Center',
    subtitle: 'বিদ্যুৎ লাইন মেরামত ও জরুরি কমপ্লেইন',
    phone: '+8801711723456',
    area: 'পূর্ব কালুরঘাট',
    is24Hours: true,
  },

  // 6. Blood Donors & Banks (রক্তদান সেবা)
  {
    id: 'bld-1',
    category: 'blood',
    title: 'বোয়ালখালী ব্লাড ডোনার্স ক্লাব (হটলাইন)',
    title_en: 'Boalkhali Blood Donors Club Hotline',
    subtitle: 'জরুরি রক্তের প্রয়োজনে বিনামূল্যে রক্তদাতা সংগ্রহ',
    phone: '+8801825998877',
    altPhone: '01815223344',
    area: 'সমগ্র বোয়ালখালী উপজেলা',
    is24Hours: true,
  },
  {
    id: 'bld-2',
    category: 'blood',
    title: 'সন্ধানী চট্টগ্রাম মেডিকেল কলেজ ইউনিট',
    title_en: 'Sandhani Blood Bank (CMCH Unit)',
    subtitle: 'রক্ত ও রক্ত উপাদান সরবরাহ কেন্দ্র',
    phone: '+88031619888',
    area: 'চমেক, চট্টগ্রাম',
    is24Hours: true,
  },

  // 7. National Government Hotlines (জাতীয় হেল্পলাইন)
  {
    id: 'gov-1',
    category: 'govt',
    title: 'জাতীয় জরুরি সেবা (পুলিশ, অ্যাম্বুলেন্স, ফায়ার সার্ভিস)',
    title_en: 'National Emergency Service (999)',
    subtitle: 'টোল-ফ্রি ২৪ ঘণ্টা জাতীয় জরুরি কল সেন্টার',
    phone: '999',
    area: 'সমগ্র বাংলাদেশ',
    is24Hours: true,
    priority: true,
  },
  {
    id: 'gov-2',
    category: 'govt',
    title: 'সরকারি তথ্য ও সেবা হেল্পলাইন (333)',
    title_en: 'Govt Information & Service Hotline (333)',
    subtitle: 'সরকারি সেবা ও ত্রাণ বিষয়ক হেল্পলাইন',
    phone: '333',
    area: 'সমগ্র বাংলাদেশ',
    is24Hours: true,
  },
  {
    id: 'gov-3',
    category: 'govt',
    title: 'নারী ও শিশু নির্যাতন প্রতিরোধ হেল্পলাইন (109)',
    title_en: 'Women & Child Abuse Helpline (109)',
    subtitle: 'টোল ফ্রি আইনি ও জরুরি সহায়তা',
    phone: '109',
    area: 'সমগ্র বাংলাদেশ',
    is24Hours: true,
  },
  {
    id: 'gov-4',
    category: 'govt',
    title: 'দুদক হটলাইন (106)',
    title_en: 'Anti-Corruption Commission (106)',
    subtitle: 'দুর্নীতি সংক্রান্ত সরাসরি অভিযোগ',
    phone: '106',
    area: 'সমগ্র বাংলাদেশ',
    is24Hours: false,
  }
];

export const EmergencyNumbersPage: React.FC<EmergencyNumbersPageProps> = ({ navigate }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'সব নাম্বার', icon: PhoneCall },
    { id: 'ambulance', label: '🚑 অ্যাম্বুলেন্স', icon: Ambulance },
    { id: 'police', label: '👮 পুলিশ ও প্রশাসন', icon: ShieldAlert },
    { id: 'fire', label: '🚒 ফায়ার সার্ভিস', icon: Flame },
    { id: 'hospital', label: '🏥 হাসপাতাল', icon: HeartPulse },
    { id: 'electricity', label: '⚡ বিদ্যুৎ অফিস', icon: Zap },
    { id: 'blood', label: '🩸 রক্তদান', icon: Droplet },
    { id: 'govt', label: '🇧🇩 জাতীয় হটলাইন (999)', icon: HelpCircle },
  ];

  const filteredContacts = emergencyContacts.filter(contact => {
    const matchesCategory = activeCategory === 'all' || contact.category === activeCategory;
    const query = search.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch = 
      contact.title.toLowerCase().includes(query) ||
      contact.title_en.toLowerCase().includes(query) ||
      contact.subtitle.toLowerCase().includes(query) ||
      contact.phone.includes(query) ||
      contact.area.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-16">
      {/* Header Banner - Facebook Clean Style */}
      <div className="bg-white border-b border-[#E4E6EB] py-4 px-4 shadow-2xs">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#050505]">
                  জরুরি যোগাযোগ ও হেল্পলাইন
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-[#65676B] mt-0.5">
                বোয়ালখালী উপজেলার অ্যাম্বুলেন্স, পুলিশ, ফায়ার সার্ভিস, হাসপাতাল ও জাতীয় জরুরি নম্বর
              </p>
            </div>

            {/* Direct 999 Hotline button */}
            <a
              id="emergency-999-btn"
              href="tel:999"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-xs transition-all shrink-0"
            >
              <ShieldAlert className="w-4 h-4" />
              জাতীয় জরুরি কল 999
            </a>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#65676B] absolute left-3.5 top-3" />
            <input
              id="emergency-search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="অ্যাম্বুলেন্স, পুলিশ, ফায়ার সার্ভিস বা এলাকা দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#F0F2F5] border border-[#E4E6EB] rounded-xl text-[#050505] placeholder-[#65676B] focus:outline-hidden focus:border-[#1877F2] focus:bg-white transition-all"
            />
          </div>

          {/* Horizontal Category Pill Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1877F2] text-white shadow-2xs'
                    : 'bg-[#F0F2F5] text-[#050505] hover:bg-[#E4E6EB]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Contact List */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-2.5">
        {/* Ambulance Alert Notice Banner */}
        {activeCategory === 'all' || activeCategory === 'ambulance' ? (
          <div className="bg-red-50/80 border border-red-200/80 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Ambulance className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-red-950">
                বোয়ালখালী জরুরি অ্যাম্বুলেন্স সেবা (২৪ ঘণ্টা চালু)
              </h3>
              <p className="text-xs text-red-800 leading-snug mt-0.5">
                জরুরি রোগী স্থানান্তর বা চমেক হাসপাতালে যাওয়ার জন্য নিচের যেকোনো অ্যাম্বুলেন্স নম্বরে সরাসরি ১-ক্লিকে কল করুন।
              </p>
            </div>
          </div>
        ) : null}

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#65676B] px-1 font-medium">
          <span>মোট নাম্বার: <strong className="text-[#050505]">{filteredContacts.length}</strong> টি</span>
          <span>সরাসরি ১-ট্যাপে ডায়াল করুন</span>
        </div>

        {/* List of Contacts */}
        <div className="space-y-2">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              id={`emergency-contact-${contact.id}`}
              className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-xs transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              {/* Left Details */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                  contact.category === 'ambulance' ? 'bg-red-50 text-red-600' :
                  contact.category === 'police' ? 'bg-blue-50 text-[#1877F2]' :
                  contact.category === 'fire' ? 'bg-amber-50 text-amber-600' :
                  contact.category === 'hospital' ? 'bg-emerald-50 text-emerald-600' :
                  contact.category === 'electricity' ? 'bg-purple-50 text-purple-600' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {contact.category === 'ambulance' && <Ambulance className="w-5 h-5" />}
                  {contact.category === 'police' && <ShieldAlert className="w-5 h-5" />}
                  {contact.category === 'fire' && <Flame className="w-5 h-5" />}
                  {contact.category === 'hospital' && <HeartPulse className="w-5 h-5" />}
                  {contact.category === 'electricity' && <Zap className="w-5 h-5" />}
                  {contact.category === 'blood' && <Droplet className="w-5 h-5" />}
                  {contact.category === 'govt' && <HelpCircle className="w-5 h-5" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-[#050505] leading-tight">
                      {contact.title}
                    </h3>
                    {contact.is24Hours && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Clock className="w-2.5 h-2.5" />
                        ২৪ ঘণ্টা
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#65676B] mt-0.5 line-clamp-1">
                    {contact.subtitle}
                  </p>

                  <div className="flex items-center gap-3 mt-1 text-xs text-[#65676B]">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {contact.area}
                    </span>
                    <span className="font-mono font-bold text-[#050505]">
                      {contact.phone}
                    </span>
                    {contact.altPhone && (
                      <span className="font-mono text-[#65676B] hidden sm:inline">
                        / {contact.altPhone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Action: Call & Copy Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  id={`copy-btn-${contact.id}`}
                  onClick={(e) => handleCopy(contact.id, contact.phone, e)}
                  className="p-2.5 text-[#65676B] hover:text-[#1877F2] hover:bg-[#F0F2F5] rounded-xl border border-[#E4E6EB] transition-colors"
                  title="নাম্বার কপি করুন"
                  aria-label="Copy phone number"
                >
                  {copiedId === contact.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <a
                  id={`call-emergency-btn-${contact.id}`}
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-2xs transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>কল করুন</span>
                </a>
              </div>
            </div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#E4E6EB] space-y-2">
              <Search className="w-8 h-8 text-[#65676B] mx-auto opacity-50" />
              <h4 className="text-sm font-bold text-[#050505]">কোনো জরুরি নাম্বার মেলেনি</h4>
              <p className="text-xs text-[#65676B]">অন্য কোনো শব্দ দিয়ে সার্চ করার চেষ্টা করুন।</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
