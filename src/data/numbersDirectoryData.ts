export interface ServiceContact {
  label: string;
  phone: string;
  image?: string;
  designation?: string;
  location?: string;
  note?: string;
  available24h?: boolean;
}

export interface ServiceCardItem {
  id: string;
  title: string;
  title_en: string;
  iconType: string;
  colorScheme: {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    accent: string;
  };
  description: string;
  contacts: ServiceContact[];
}

export interface ServiceSection {
  id: string;
  title: string;
  title_en: string;
  items: ServiceCardItem[];
}

export const NUMBERS_SECTIONS: ServiceSection[] = [
  // 1. জরুরী সেবা
  {
    id: 'emergency-services',
    title: 'জরুরী সেবা',
    title_en: 'Emergency Services',
    items: [
      {
        id: 'national-emergency',
        title: 'জাতীয় জরুরি সেবা',
        title_en: 'National Emergency',
        iconType: 'national',
        colorScheme: {
          bg: 'bg-red-50/50',
          border: 'border-red-200',
          iconBg: 'bg-red-600',
          iconColor: 'text-white',
          accent: 'text-red-700',
        },
        description: 'জাতীয় জরুরি ৯৯৯ হেল্পলাইন, ৩৩৩ নাগরিক সেবা ও জরুরি হটলাইনসমূহ',
        contacts: [
          { label: '৯৯৯ জাতীয় জরুরি সেবা', phone: '999', designation: 'পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স', location: 'সারাদেশ', available24h: true },
          { label: '৩৩৩ সরকারি তথ্য ও সেবা', phone: '333', designation: 'নাগরিক সেবা ও ইউপি সহায়তা', location: 'সারাদেশ', available24h: true },
          { label: '১০৯ নারী ও শিশু হেল্পলাইন', phone: '109', designation: 'নারী ও শিশু নির্যাতন প্রতিরোধ সেল', location: 'টোল-ফ্রি হেল্পলাইন', available24h: true },
          { label: '১০৯৮ চাইল্ড হেল্পলাইন', phone: '1098', designation: 'জরুরি শিশু সুরক্ষা ও সহায়তা', location: 'টোল-ফ্রি হেল্পলাইন', available24h: true },
          { label: '১৬২৬৩ স্বাস্থ্য বাতায়ন', phone: '16263', designation: 'সরকারি ডাক্তার পরামর্শ সেবা', location: 'স্বাস্থ্য অধিদপ্তর', available24h: true },
          { label: '১৬১২২ ভূমি সেবা হটলাইন', phone: '16122', designation: 'খতিয়ান ও নামজারি তথ্য', location: 'ভূমি মন্ত্রণালয়', available24h: true },
          { label: '১০৬ দুর্নীতি দমন হটলাইন', phone: '106', designation: 'দুদক হটলাইন অভিযোগ', location: 'দুদক কার্যালয়', available24h: true },
          { label: '১০৯০ দুর্যোগ বার্তা', phone: '1090', designation: 'আবহাওয়া ও দুর্যোগের আগাম সতর্কবার্তা', location: 'দুর্যোগ মন্ত্রণালয়', available24h: true },
        ],
      },
      {
        id: 'upozila-admin',
        title: 'উপজেলা প্রশাসন',
        title_en: 'Upazila Administration',
        iconType: 'admin',
        colorScheme: {
          bg: 'bg-emerald-50/50',
          border: 'border-emerald-200',
          iconBg: 'bg-emerald-700',
          iconColor: 'text-white',
          accent: 'text-emerald-800',
        },
        description: 'উপজেলা নির্বাহী অফিসার (UNO), সহকারী কমিশনার (ভূমি) ও উপজেলা পরিষদ দপ্তর',
        contacts: [
          { label: 'উপজেলা নির্বাহী অফিসার (UNO)', phone: '01713-334455', designation: 'ইউএনও, বোয়ালখালী', location: 'উপজেলা পরিষদ ভবন', available24h: false },
          { label: 'সহকারী কমিশনার (ভূমি) / AC Land', phone: '01713-445566', designation: 'এসি ল্যান্ড বোয়ালখালী', location: 'উপজেলা ভূমি অফিস', available24h: false },
          { label: 'উপজেলা পরিষদ প্রশাসক / চেয়ারম্যান কার্যালয়', phone: '01819-667722', designation: 'উপজেলা চেয়ারম্যান', location: 'উপজেলা পরিষদ চত্বর', available24h: false },
          { label: 'উপজেলা প্রকৌশলী (LGED)', phone: '01712-556633', designation: 'উপজেলা প্রকৌশলী', location: 'এলজিইডি ভবন', available24h: false },
          { label: 'উপজেলা প্রকল্প বাস্তবায়ন কর্মকর্তা (PIO)', phone: '01715-889922', designation: 'পিআইও বোয়ালখালী', location: 'দুর্যোগ ব্যবস্থাপনা ভবন', available24h: false },
          { label: 'উপজেলা শিক্ষা অফিসার (প্রাথমিক ও মাধ্যমিক)', phone: '01718-223311', designation: 'শিক্ষা অফিসার', location: 'উপজেলা শিক্ষা ভবন', available24h: false },
          { label: 'বোয়ালখালী পৌরসভা প্রশাসক / কার্যালয়', phone: '01819-556688', designation: 'পৌর প্রশাসক কার্যালয়', location: 'পৌরসভা চত্বর', available24h: false },
        ],
      },
      {
        id: 'police',
        title: 'থানা',
        title_en: 'Police Station',
        iconType: 'police',
        colorScheme: {
          bg: 'bg-blue-50/50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-600',
          iconColor: 'text-white',
          accent: 'text-blue-700',
        },
        description: 'বোয়ালখালী থানা পুলিশ, ডিউটি অফিসার ও জরুরি নিরাপত্তা সেবা',
        contacts: [
          { label: 'বোয়ালখালী থানা ওয়ান-স্টপ ডিউটি অফিসার', phone: '01320-108255', designation: 'ডিউটি অফিসার (২৪ ঘণ্টা)', location: 'বোয়ালখালী থানা ভবন', available24h: true },
          { label: 'অফিসার ইনচার্জ (OC)', phone: '01320-108250', designation: 'ওসি, বোয়ালখালী থানা', location: 'থানা সদর', available24h: true },
          { label: 'ইন্সপেক্টর (তদন্ত)', phone: '01320-108251', designation: 'ওসি তদন্ত', location: 'বোয়ালখালী থানা', available24h: true },
          { label: 'কালুরঘাট পুলিশ ক্যাম্প ইনচার্জ', phone: '01320-108260', designation: 'ক্যাম্প ইনচার্জ', location: 'কালুরঘাট নতুন সেতু এলাকা', available24h: true },
          { label: 'কানুনগোপাড়া পুলিশ তদন্ত কেন্দ্র', phone: '01320-108265', designation: 'তদন্ত কেন্দ্র ইনচার্জ', location: 'কানুনগোপাড়া', available24h: true },
        ],
      },
      {
        id: 'fire-service',
        title: 'ফায়ার সার্ভিস',
        title_en: 'Fire Service',
        iconType: 'fire-service',
        colorScheme: {
          bg: 'bg-red-50/50',
          border: 'border-red-200',
          iconBg: 'bg-red-600',
          iconColor: 'text-white',
          accent: 'text-red-700',
        },
        description: 'বোয়ালখালী ফায়ার সার্ভিস স্টেশন ও জরুরি অগ্নিনির্বাপণ টিম',
        contacts: [
          { label: 'বোয়ালখালী ফায়ার স্টেশন কন্ট্রোল রুম', phone: '01712-445588', designation: 'কন্ট্রোল রুম (২৪ ঘণ্টা)', location: 'ফায়ার সার্ভিস স্টেশন, বোয়ালখালী', available24h: true },
          { label: 'স্টেশন অফিসার (ভারপ্রাপ্ত)', phone: '01819-445566', designation: 'স্টেশন অফিসার', location: 'বোয়ালখালী ফায়ার স্টেশন', available24h: true },
          { label: 'চট্টগ্রাম বিভাগীয় ফায়ার কন্ট্রোল রুম', phone: '01730-336655', designation: 'বিভাগীয় জরুরি টিম', location: 'আগ্রাবাদ, চট্টগ্রাম', available24h: true },
          { label: 'নৌ ফায়ার ইউনিট (কর্ণফুলী নদী)', phone: '01712-998844', designation: 'নদী উদ্ধার ও অগ্নিনির্বাপণ', location: 'কালুরঘাট রিভারফ্রন্ট', available24h: true },
        ],
      },
      {
        id: 'electricity',
        title: 'বিদ্যুৎ',
        title_en: 'Electricity',
        iconType: 'electricity',
        colorScheme: {
          bg: 'bg-yellow-50/50',
          border: 'border-yellow-200',
          iconBg: 'bg-amber-500',
          iconColor: 'text-white',
          accent: 'text-amber-800',
        },
        description: 'চট্টগ্রাম পল্লী বিদ্যুৎ সমিতি-১ (বোয়ালখালী জোনাল অফিস ও অভিযোগ কেন্দ্র)',
        contacts: [
          { label: 'পল্লী বিদ্যুৎ বোয়ালখালী অভিযোগ কেন্দ্র', phone: '01712-445511', designation: 'জরুরি বিদ্যুৎ অভিযোগ (২৪ ঘণ্টা)', location: 'পৌরসভা সংলগ্ন বিদ্যুৎ অফিস', available24h: true },
          { label: 'ডেপুটি জেনারেল ম্যানেজার (DGM)', phone: '01769-400120', designation: 'ডিজিএম, বোয়ালখালী জোন', location: 'জোনাল অফিস', available24h: false },
          { label: 'অভিযোগ কেন্দ্র (পূর্ব বোয়ালখালী ও কানুনগোপাড়া)', phone: '01769-400122', designation: 'লাইন টেকনিক্যাল টিম', location: 'কানুনগোপাড়া সাব-স্টেশন', available24h: true },
          { label: 'অভিযোগ কেন্দ্র (পশ্চিম বোয়ালখালী ও কালুরঘাট)', phone: '01769-400123', designation: 'লাইন টেকনিক্যাল টিম', location: 'পশ্চিম গোমদণ্ডী সাব-স্টেশন', available24h: true },
          { label: 'বিদ্যুৎ লাইন মেরামত ও জরুরি টেকনিক্যাল টিম', phone: '01819-887766', designation: 'জরুরি মেরামতকারী', location: 'বোয়ালখালী', available24h: true },
        ],
      },
      {
        id: 'lawyer',
        title: 'আইনজীবী',
        title_en: 'Lawyer',
        iconType: 'lawyer',
        colorScheme: {
          bg: 'bg-amber-50/50',
          border: 'border-amber-200',
          iconBg: 'bg-amber-700',
          iconColor: 'text-white',
          accent: 'text-amber-800',
        },
        description: 'বোয়ালখালী আইনজীবী সমিতি, জেলা ও দায়রা জজ আদালত আইন সহায়তা',
        contacts: [
          { label: 'অ্যাডভোকেট নুরুল আলম চৌধুরী', phone: '01819-334411', designation: 'সিনিয়র আইনজীবী, জেলা বার', location: 'পৌর সদর ও আদালত পাড়া', note: 'সিভিল ও ক্রিমিনাল বিশেষজ্ঞ' },
          { label: 'অ্যাডভোকেট তুষার কান্তি দে', phone: '01817-556622', designation: 'এডভোকেট, সুপ্রিম কোর্ট ও জজকোর্ট', location: 'শাকপুরা / চট্টগ্রাম কোর্ট বিল্ডিং', note: 'জমি-জমা ও পারিবারিক আইন' },
          { label: 'অ্যাডভোকেট মোহাম্মদ সাইফুর রহমান', phone: '01814-778833', designation: 'আইন উপদেষ্টা', location: 'বোয়ালখালী থানা রোড', note: 'দলিল রেজিস্ট্রেশন ও নোটারি পাবলিক' },
          { label: 'অ্যাডভোকেট ফরিদা ইয়াসমিন', phone: '01812-990044', designation: 'আইনজীবী ও মানবাধিকার কর্মী', location: 'গোমদণ্ডী', note: 'নারী ও শিশু অধিকার বিষয়ক' },
          { label: 'বোয়ালখালী উপজেলা লিগ্যাল এইড অফিসার', phone: '01820-113355', designation: 'বিনামূল্যে সরকারি আইনি সহায়তা', location: 'উপজেলা পরিষদ কমপ্লেক্স', note: 'সরকারি সহায়তা' },
        ],
      },
      {
        id: 'journalist',
        title: 'সাংবাদিক',
        title_en: 'Journalist',
        iconType: 'journalist',
        colorScheme: {
          bg: 'bg-indigo-50/50',
          border: 'border-indigo-200',
          iconBg: 'bg-indigo-600',
          iconColor: 'text-white',
          accent: 'text-indigo-700',
        },
        description: 'বোয়ালখালী প্রেস ক্লাব, জাতীয় ও স্থানীয় পত্রিকার সাংবাদিক ও প্রতিনিধিগণ',
        contacts: [
          { label: 'বোয়ালখালী প্রেস ক্লাব সভাপতি', phone: '01819-665511', designation: 'প্রেস ক্লাব সভাপতি', location: 'বোয়ালখালী প্রেস ক্লাব ভবন', note: 'দৈনিক প্রথম আলো প্রতিনিধি' },
          { label: 'প্রেস ক্লাব সাধারণ সম্পাদক', phone: '01814-223388', designation: 'সাধারণ সম্পাদক', location: 'বোয়ালখালী', note: 'দৈনিক আজাদী প্রতিনিধি' },
          { label: 'দৈনিক জনকণ্ঠ ও একুশে টিভি প্রতিনিধি', phone: '01817-449900', designation: 'সিনিয়র সাংবাদিক', location: 'শাকপুরা মোড়', note: 'টিভি ও প্রিন্ট মিডিয়া' },
          { label: 'দৈনিক যুগান্তর ও চ্যানেল আই প্রতিনিধি', phone: '01812-337744', designation: 'উপজেলা প্রতিনিধি', location: 'পৌরসভা চত্বর', note: 'তথ্য ও সংবাদ যোগাযোগ' },
          { label: 'দৈনিক সমকাল ও ৭১ টিভি প্রতিনিধি', phone: '01818-552233', designation: 'করেসপন্ডেন্ট', location: 'গোমদণ্ডী', note: 'লাইভ নিউজ ও ফিচার' },
        ],
      },
    ],
  },

  // 2. স্বাস্থ্য সেবা
  {
    id: 'health-services',
    title: 'স্বাস্থ্য সেবা',
    title_en: 'Health Services',
    items: [
      {
        id: 'doctor',
        title: 'ডাক্তার',
        title_en: 'Doctor',
        iconType: 'doctor',
        colorScheme: {
          bg: 'bg-teal-50/50',
          border: 'border-teal-200',
          iconBg: 'bg-teal-600',
          iconColor: 'text-white',
          accent: 'text-teal-700',
        },
        description: 'বোয়ালখালী উপজেলা স্বাস্থ্য কমপ্লেক্স ও প্রাইভেট বিশেষজ্ঞ চিকিৎসকগণ',
        contacts: [
          { label: 'ডা. মোহাম্মদ ইমরান হোসেন', phone: '01819-112233', designation: 'এমবিবিএস, বিসিএস (স্বাস্থ্য), এফসিপিএস', location: 'উপজেলা স্বাস্থ্য কমপ্লেক্স', note: 'মেডিসিন ও কার্ডিওলজি বিশেষজ্ঞ' },
          { label: 'ডা. ফারহানা আক্তার', phone: '01814-334455', designation: 'এমবিবিএস, ডিজিও (গাইনী ও প্রসূতি)', location: 'শাকপুরা চৌমুহনী ডায়াগনস্টিক', note: 'নারী ও প্রসূতি রোগ বিশেষজ্ঞ' },
          { label: 'ডা. সুজন বড়ুয়া', phone: '01817-556677', designation: 'এমবিবিএস, ডিসিএইচ (শিশু রোগ)', location: 'গোমদণ্ডী স্টেশন রোড', note: 'নবজাতক ও শিশু বিশেষজ্ঞ' },
          { label: 'ডা. কামরুল হাসান', phone: '01812-778899', designation: 'এমবিবিএস, এমএস (অর্থোপেডিক্স)', location: 'বোয়ালখালী সেন্ট্রাল হাসপাতাল', note: 'হাড়, জোড়া ও বাত-ব্যথা বিশেষজ্ঞ' },
          { label: 'ডা. রফিকুল ইসলাম চৌধুরী', phone: '01820-990011', designation: 'এমবিবিএস, ডিডিভি (চর্ম ও যৌন)', location: 'কানুনগোপাড়া চেম্বার', note: 'চর্ম ও অ্যালার্জি রোগ' },
        ],
      },
      {
        id: 'veterinary',
        title: 'পশু ডাক্তার',
        title_en: 'Veterinary Doctor',
        iconType: 'veterinary',
        colorScheme: {
          bg: 'bg-emerald-50/50',
          border: 'border-emerald-200',
          iconBg: 'bg-emerald-600',
          iconColor: 'text-white',
          accent: 'text-emerald-700',
        },
        description: 'উপজেলা প্রাণিসম্পদ দপ্তর, পশু চিকিৎসক ও কৃত্রিম প্রজনন সেবা',
        contacts: [
          { label: 'উপজেলা প্রাণিসম্পদ কর্মকর্তা (ULO)', phone: '01712-887722', designation: 'ইউএলও বোয়ালখালী', location: 'উপজেলা প্রাণিসম্পদ দপ্তর', available24h: false },
          { label: 'ভেটেরিনারি সার্জন (পশু চিকিৎসক)', phone: '01819-554422', designation: 'ভেটেরিনারি সার্জন', location: 'প্রাণিসম্পদ হাসপাতাল', available24h: true },
          { label: 'উপ-সহকারী প্রাণিসম্পদ কর্মকর্তা (কৃত্রিম প্রজনন)', phone: '01814-663311', designation: 'ডেইরি ও পোল্ট্রি সাপোর্ট', location: 'সারোয়াতলী ও পোপাদিয়া', available24h: true },
          { label: 'জরুরি পশু চিকিৎসা ও টিকাদান টিম', phone: '01817-221199', designation: 'ভ্রাম্যমাণ ভেট টিম', location: 'বোয়ালখালী', available24h: true },
        ],
      },
      {
        id: 'hospital',
        title: 'হাসপাতাল',
        title_en: 'Hospital',
        iconType: 'hospital',
        colorScheme: {
          bg: 'bg-cyan-50/50',
          border: 'border-cyan-200',
          iconBg: 'bg-cyan-600',
          iconColor: 'text-white',
          accent: 'text-cyan-700',
        },
        description: 'বোয়ালখালী ৫০ শয্যা উপজেলা স্বাস্থ্য কমপ্লেক্স ও আধুনিক প্রাইভেট ক্লিনিক',
        contacts: [
          { label: 'বোয়ালখালী উপজেলা স্বাস্থ্য কমপ্লেক্স (জরুরি বিভাগ)', phone: '01814-223344', designation: 'সরকারি ৫০ শয্যা হাসপাতাল (২৪ ঘণ্টা)', location: 'হাসপাতাল রোড, বোয়ালখালী', available24h: true },
          { label: 'উপজেলা স্বাস্থ্য ও প.প. কর্মকর্তা (UH&FPO)', phone: '01712-334455', designation: 'ইউএইচএফপিও', location: 'স্বাস্থ্য কমপ্লেক্স প্রশাসনিক ভবন', available24h: false },
          { label: 'বোয়ালখালী সেন্ট্রাল ক্লিনিক ও ডায়াগনস্টিক', phone: '01819-889922', designation: 'প্রাইভেট হাসপাতাল (২৪ ঘণ্টা)', location: 'থানা সদর মোড়', available24h: true },
          { label: 'শাকপুরা আধুনিক জেনারেল হাসপাতাল', phone: '01812-446677', designation: 'প্রসূতি ও শিশু কেয়ার', location: 'শাকপুরা চৌমুহনী', available24h: true },
        ],
      },
      {
        id: 'pathology',
        title: 'প্যাথলজী',
        title_en: 'Pathology & Diagnostic',
        iconType: 'pathology',
        colorScheme: {
          bg: 'bg-violet-50/50',
          border: 'border-violet-200',
          iconBg: 'bg-violet-600',
          iconColor: 'text-white',
          accent: 'text-violet-700',
        },
        description: 'রক্ত, প্রস্রাব পরীক্ষা, ডিজিটাল এক্স-রে, আল্ট্রাসনোগ্রাফি ও ল্যাব টেস্ট',
        contacts: [
          { label: 'পপুলার ডিজিটাল ডায়াগনস্টিক অ্যান্ড প্যাথলজি', phone: '01819-445522', designation: 'আধুনিক ল্যাব (২৪ ঘণ্টা রিপোর্ট)', location: 'উপজেলা স্বাস্থ্য কমপ্লেক্স সংলগ্ন', available24h: true },
          { label: 'মেডিপ্লাস ডায়াগনস্টিক সেন্টার', phone: '01814-778811', designation: 'এক্স-রে, ইসিজি ও রক্ত পরীক্ষা', location: 'শাকপুরা চৌমুহনী', available24h: false },
          { label: 'কর্ণফুলী প্যাথলজি ল্যাব', phone: '01817-990033', designation: 'কম্পিউটারাইজড ল্যাব টেস্ট', location: 'গোমদণ্ডী স্টেশন রোড', available24h: false },
          { label: 'আলোক ডায়াগনস্টিক অ্যান্ড কনসালটেশন', phone: '01812-556644', designation: 'হরমোন ও স্পেশাল টেস্ট', location: 'কানুনগোপাড়া', available24h: false },
        ],
      },
      {
        id: 'pharmacy',
        title: 'ফার্মেসী',
        title_en: 'Pharmacy & Medicine',
        iconType: 'pharmacy',
        colorScheme: {
          bg: 'bg-teal-50/50',
          border: 'border-teal-200',
          iconBg: 'bg-teal-600',
          iconColor: 'text-white',
          accent: 'text-teal-700',
        },
        description: '২৪ ঘণ্টা খোলা ওষুধ ফার্মেসী, ইনসুলিন, প্রেসক্রিপশন ও জরুরি মেডিসিন হোম ডেলিভারি',
        contacts: [
          { label: 'শাকপুরা সেন্ট্রাল ফার্মেসী ও ড্রাগ হাউজ', phone: '01819-663322', designation: '২৪ ঘণ্টা খোলা ও লাইফ সেভিং ড্রাগ', location: 'শাকপুরা চৌমুহনী মোড়', available24h: true },
          { label: 'বোয়ালখালী মডেল ফার্মেসী', phone: '01814-771122', designation: 'জরুরি অক্সিজেন সিলিন্ডার ও মেডিসিন', location: 'উপজেলা স্বাস্থ্য কমপ্লেক্স গেট', available24h: true },
          { label: 'গোমদণ্ডী মেডিসিন কর্নার', phone: '01817-339944', designation: 'প্রেসক্রিপশন ও বেবি ফুড', location: 'গোমদণ্ডী রেলস্টেশন রোড', available24h: false },
          { label: 'কানুনগোপাড়া জনসেবা ফার্মেসী', phone: '01812-558833', designation: 'ইনসুলিন ও ভেটেরিনারি ড্রাগ', location: 'কানুনগোপাড়া বাজার', available24h: false },
          { label: 'আল-শেফা ফার্মেসী ও হোম ডেলিভারি', phone: '01818-224411', designation: 'জরুরি মেডিসিন হোম ডেলিভারি', location: 'বোয়ালখালী পৌর সদর', available24h: true },
        ],
      },
      {
        id: 'ambulance',
        title: 'এম্বুল্যান্স',
        title_en: 'Ambulance',
        iconType: 'ambulance',
        colorScheme: {
          bg: 'bg-rose-50/50',
          border: 'border-rose-200',
          iconBg: 'bg-rose-600',
          iconColor: 'text-white',
          accent: 'text-rose-700',
        },
        description: 'বোয়ালখালী ও চট্টগ্রাম মেডিকেল কলেজ দ্রুত রোগী পরিবহনে জরুরি অ্যাম্বুলেন্স',
        contacts: [
          { label: 'উপজেলা স্বাস্থ্য কমপ্লেক্স সরকারি অ্যাম্বুলেন্স', phone: '01814-223344', designation: 'সরকারি অ্যাম্বুলেন্স ড্রাইভার (২৪ ঘণ্টা)', location: 'বোয়ালখালী হাসপাতাল চত্বর', available24h: true },
          { label: 'বোয়ালখালী আল-মানাহিল ফ্রি/জরুরি অ্যাম্বুলেন্স', phone: '01819-334466', designation: 'মানবিক ফ্রি অ্যাম্বুলেন্স সার্ভিস', location: 'শাকপুরা', available24h: true },
          { label: 'রেড ক্রিসেন্ট বোয়ালখালী ইউনিট অ্যাম্বুলেন্স', phone: '01817-445577', designation: 'জরুরি অক্সিজেন ও আইসিইউ অ্যাম্বুলেন্স', location: 'পৌর সদর', available24h: true },
          { label: 'প্রাইভেট এসি অ্যাম্বুলেন্স (চট্টগ্রাম চমেক ও ঢাকা)', phone: '01812-667788', designation: '২৪ ঘণ্টা রোগী পরিবহন', location: 'গোমদণ্ডী', available24h: true },
        ],
      },
      {
        id: 'blood-donor',
        title: 'রক্তদাতা',
        title_en: 'Blood Donors',
        iconType: 'blood',
        colorScheme: {
          bg: 'bg-red-50/50',
          border: 'border-red-200',
          iconBg: 'bg-red-700',
          iconColor: 'text-white',
          accent: 'text-red-800',
        },
        description: 'বোয়ালখালী রক্তদান সংগঠন, জরুরি এ, বি, ও, এবি পজিটিভ/নেগেটিভ ডোনার',
        contacts: [
          { label: 'বোয়ালখালী ব্লাড ডোনার্স ক্লাব (হটলাইন)', phone: '01819-556677', designation: 'জরুরি রক্ত ব্যবস্থাপনা টিম', location: 'সেন্ট্রাল বোয়ালখালী', available24h: true },
          { label: 'সন্ধানী ও বাঁধন রক্ত সমন্বয়ক বোয়ালখালী', phone: '01814-889900', designation: 'রক্তদান সমন্বয়ক', location: 'শাকপুরা ও গোমদণ্ডী', available24h: true },
          { label: 'রেয়ার ব্লাড গ্রুপ হেল্পলাইন (A-, B-, O-, AB-)', phone: '01817-112244', designation: 'নেগেটিভ রক্তের বিশেষ টিম', location: 'বোয়ালখালী', available24h: true },
          { label: 'তরুণ রক্তবন্ধু বোয়ালখালী যুব ফোরাম', phone: '01812-334466', designation: 'স্বেচ্ছাসেবী রক্তদাতা নেটওয়ার্ক', location: 'কানুনগোপাড়া ও কধুরখীল', available24h: true },
        ],
      },
    ],
  },

  // 3. শিক্ষা সেবা
  {
    id: 'education-services',
    title: 'শিক্ষা সেবা',
    title_en: 'Education Services',
    items: [
      {
        id: 'private-tutor',
        title: 'প্রাইভেট শিক্ষক',
        title_en: 'Private Tutor',
        iconType: 'tutor',
        colorScheme: {
          bg: 'bg-indigo-50/50',
          border: 'border-indigo-200',
          iconBg: 'bg-indigo-600',
          iconColor: 'text-white',
          accent: 'text-indigo-700',
        },
        description: '১ম শ্রেণি থেকে দ্বাদশ শ্রেণির গণিত, ইংরেজি, বিজ্ঞান ও কমার্স অভিজ্ঞ গৃহশিক্ষক',
        contacts: [
          { label: 'বোয়ালখালী হোম টিউটরস কেয়ার সার্ভিস', phone: '01819-881122', designation: 'অভিজ্ঞ স্নাতক ও স্নাতকোত্তর শিক্ষক ফোরাম', location: 'শাকপুরা ও পৌর এলাকা', note: 'স্কুল ও কলেজ পর্যায়ের সকল বিষয়' },
          { label: 'সাইন্স অ্যান্ড ম্যাথ স্পেশাল প্রাইভেট কেয়ার', phone: '01814-664433', designation: 'পদার্থ, রসায়ন ও উচ্চতর গণিত বিশেষজ্ঞ', location: 'গোমদণ্ডী স্টেশন রোড', note: 'এসএসসি ও এইচএসসি স্পেশাল ব্যাচ' },
          { label: 'ইংলিশ ল্যাঙ্গুয়েজ ও একাডেমিক টিউটর', phone: '01817-227788', designation: 'গ্রামার, রাইটিং ও স্পোকেন কেয়ার', location: 'কানুনগোপাড়া মোড়', note: 'প্রাথমিক থেকে উচ্চমাধ্যমিক' },
          { label: 'বোয়ালখালী প্রাইভেট টিচার্স অ্যাসোসিয়েশন', phone: '01812-993344', designation: 'অভিভাবক ও গৃহশিক্ষক সহায়তা কেন্দ্র', location: 'উপজেলা পরিষদ চত্বর', note: 'দক্ষ ও বিশ্বস্ত গৃহশিক্ষক প্রাপ্তি' },
        ],
      },
      {
        id: 'arabic-teacher',
        title: 'আরবী শিক্ষক',
        title_en: 'Arabic & Quran Teacher',
        iconType: 'arabic',
        colorScheme: {
          bg: 'bg-emerald-50/50',
          border: 'border-emerald-200',
          iconBg: 'bg-emerald-600',
          iconColor: 'text-white',
          accent: 'text-emerald-700',
        },
        description: 'কুরআন মাজীদ সহীহ তিলাওয়াত, নূরানী কায়দা, তাজবীদ, আমপারা ও দ্বীনি তালিম',
        contacts: [
          { label: 'হাফেজ ক্বারী মাওলানা আব্দুল্লাহ', phone: '01819-447711', designation: 'সহীহ নূরানী ও তাজবীদ শিক্ষক', location: 'গোমদণ্ডী পৌর এলাকা', note: 'বাচ্চাদের ঘরে গিয়ে বিশুদ্ধ কুরআন শিক্ষা' },
          { label: 'আল-কুরআন হোম টিচিং কেয়ার বোয়ালখালী', phone: '01814-558822', designation: 'নাজেরা ও হিফজ পাঠদান সমন্বয়ক', location: 'শাকপুরা চৌমুহনী', note: 'ছেলে ও মেয়েদের পৃথক শিক্ষক ব্যবস্থা' },
          { label: 'মাওলানা মুফতি এনামুল হক', phone: '01817-992255', designation: 'আরবী ব্যাকরণ ও ইসলামিক শিক্ষা', location: 'সারোয়াতলী', note: 'দাখিল ও আলিম স্তরের আরবী ও ফিকহ' },
          { label: 'ক্বারী সাইফুল ইসলাম রেজভী', phone: '01812-336699', designation: 'বয়স্ক ও শিশুদের সহজ কুরআন শিক্ষা', location: 'চরণদ্বীপ দরবার এলাকা', note: 'মাখরাজ ও প্রয়োজনীয় দোয়া-দরূদ' },
        ],
      },
      {
        id: 'coaching',
        title: 'কোচিং',
        title_en: 'Coaching Center',
        iconType: 'coaching',
        colorScheme: {
          bg: 'bg-amber-50/50',
          border: 'border-amber-200',
          iconBg: 'bg-amber-600',
          iconColor: 'text-white',
          accent: 'text-amber-700',
        },
        description: 'এসএসসি, এইচএসসি, ক্যাডেট ভর্তি, বৃত্তি পরীক্ষা ও একাডেমিক কোচিং সেন্টার',
        contacts: [
          { label: 'অগ্রদূত মডেল কোচিং সেন্টার', phone: '01819-225588', designation: '৬ষ্ঠ-১০ম শ্রেণি মডেল টেস্ট ও ক্লাস', location: 'শাকপুরা চৌমুহনী মোড়', note: 'নিয়মিত পরীক্ষা ও সাপ্তাহিক মূল্যায়ন' },
          { label: 'উদ্দীপন একাডেমিক অ্যান্ড অ্যাডমিশন কেয়ার', phone: '01814-773366', designation: 'এসএসসি ও এইচএসসি স্পেশাল কেয়ার', location: 'গোমদণ্ডী পাইলট উচ্চ বিদ্যালয় সংলগ্ন', note: 'অভিজ্ঞ শিক্ষকমণ্ডলী দ্বারা পরিচালিত' },
          { label: 'সাইন্স ভিউ কোচিং হোম', phone: '01817-114477', designation: 'বিজ্ঞান বিভাগ স্পেশাল একাডেমি', location: 'কানুনগোপাড়া কলেজ রোড', note: 'পদার্থ, রসায়ন, গণিত ও জীববিজ্ঞান' },
          { label: 'প্রগ্রেস জুনিয়র ও বৃত্তি প্রস্তুতি কোচিং', phone: '01812-885522', designation: 'প্রাথমিক ও জুনিয়র বৃত্তি স্পেশাল', location: 'বোয়ালখালী পৌর সদর', note: 'মেধাবী ছাত্র-ছাত্রীদের নিবিড় পরিচর্যা' },
        ],
      },
    ],
  },

  // 4. আইটি সেবা
  {
    id: 'it-services',
    title: 'আইটি সেবা',
    title_en: 'IT Services',
    items: [
      {
        id: 'computer-training',
        title: 'কম্পিউটার ট্রেনিং',
        title_en: 'Computer Training',
        iconType: 'computer-training',
        colorScheme: {
          bg: 'bg-blue-50/50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-600',
          iconColor: 'text-white',
          accent: 'text-blue-700',
        },
        description: 'সরকারি অনুমোদিত কম্পিউটার অফিস অ্যাপ্লিকেশন, গ্রাফিক্স ডিজাইন ও ডিজিটাল স্কিল কোর্স',
        contacts: [
          { label: 'বোয়ালখালী আইটি অ্যান্ড কম্পিউটার ট্রেনিং একাডেমি', phone: '01819-338855', designation: 'কারিগরি শিক্ষা বোর্ড অনুমোদিত কেন্দ্র', location: 'শাকপুরা চৌমুহনী', note: 'অফিস অ্যাপ্লিকেশন ও গ্রাফিক্স কোর্স' },
          { label: 'ক্রিয়েটিভ কম্পিউটার ট্রেনিং ইনস্টিটিউট', phone: '01814-662244', designation: 'বেসিক ও অ্যাডভান্সড কম্পিউটার কোর্স', location: 'গোমদণ্ডী রেলস্টেশন রোড', note: 'দ্রুত টাইপিং ও ইন্টারনেট ব্রাউজিং' },
          { label: 'ডিজিটাল স্কিল ল্যাব কানুনগোপাড়া', phone: '01817-559911', designation: 'ফ্রিল্যান্সিং ও ডিজাইন প্রশিক্ষণ', location: 'কানুনগোপাড়া কলেজ গেট মোড়', note: 'ফ্রিল্যান্সিং গাইডলাইন ও প্রজেক্ট' },
          { label: 'যুব উন্নয়ন কম্পিউটার প্রশিক্ষণ সেল', phone: '01812-774488', designation: 'সরকারি কারিগরি যুব প্রশিক্ষণ', location: 'উপজেলা পরিষদ চত্বর', note: 'যুব ও নারীদের জন্য বিশেষ স্কলারশিপ' },
        ],
      },
      {
        id: 'computer-repair',
        title: 'কম্পিউটার মেরামত',
        title_en: 'Computer Repair',
        iconType: 'computer-repair',
        colorScheme: {
          bg: 'bg-slate-50/50',
          border: 'border-slate-200',
          iconBg: 'bg-slate-700',
          iconColor: 'text-white',
          accent: 'text-slate-800',
        },
        description: 'ডেস্কটপ ও ল্যাপটপ হার্ডওয়্যার মেরামত, উইন্ডোজ সেটআপ, প্রিন্টার ও সিসিটিভি সার্ভিস',
        contacts: [
          { label: 'বোয়ালখালী কম্পিউটার সার্ভিসিং পয়েন্ট', phone: '01819-119933', designation: 'মাদারবোর্ড, চিপসেট ও ডিসপ্লে মেরামত', location: 'গোমদণ্ডী বাজার চত্বর', note: 'দ্রুত সময়ে ল্যাপটপ রিপেয়ার' },
          { label: 'টেক সলিউশন শাকপুরা', phone: '01814-884411', designation: 'উইন্ডোজ সেটআপ ও সফটওয়্যার সাপোর্ট', location: 'শাকপুরা বাজার মোড়', note: 'হোম সার্ভিস ও অফিস সাপোর্ট' },
          { label: 'কানুনগোপাড়া আইটি হার্ডওয়্যার কেয়ার', phone: '01817-448822', designation: 'প্রিন্টার সার্ভিস ও টোনার রিফিল', location: 'কানুনগোপাড়া চত্বর', note: 'এপসন ও এইচপি প্রিন্টার বিশেষজ্ঞ' },
          { label: 'সিকিউর সিসিটিভি অ্যান্ড আইটি সাপোর্ট', phone: '01812-226677', designation: 'সিসিটিভি ক্যামেরা ইনস্টলেশন ও মনিটরিং', location: 'বোয়ালখালী পৌর এলাকা', note: 'দোকান, বাসা ও প্রতিষ্ঠানের সিসিটিভি' },
        ],
      },
      {
        id: 'printing-design',
        title: 'প্রিন্টিং/ডিজাইন',
        title_en: 'Printing & Graphic Design',
        iconType: 'printing-design',
        colorScheme: {
          bg: 'bg-fuchsia-50/50',
          border: 'border-fuchsia-200',
          iconBg: 'bg-fuchsia-600',
          iconColor: 'text-white',
          accent: 'text-fuchsia-700',
        },
        description: 'ডিজিটাল ব্যানার প্রিন্ট, ভিজিটিং কার্ড, বিয়ের কার্ড, ক্যাশমেমো ও আধুনিক গ্রাফিক্স ডিজাইন',
        contacts: [
          { label: 'কর্ণফুলী ডিজিটাল সাইন অ্যান্ড প্রিন্টার্স', phone: '01819-551144', designation: 'পিভিসি ব্যানার, ফেস্টুন ও সাইনবোর্ড', location: 'গোমদণ্ডী স্টেশন রোড', note: 'লার্জ ফরম্যাট ডিজিটাল প্রিন্টিং' },
          { label: 'বর্ণালী প্রিন্টিং অ্যান্ড পাবলিকেশন', phone: '01814-337788', designation: 'ক্যাশমেমো, বিয়ের কার্ড ও প্যাড', location: 'শাকপুরা চৌমুহনী', note: 'অফসেট প্রেস ও দ্রুত ডেলিভারি' },
          { label: 'বোয়ালখালী গ্রাফিক্স পয়েন্ট', phone: '01817-662299', designation: 'লোগো, ক্যাটালগ ও সোশ্যাল মিডিয়া পোস্টার', location: 'পৌর সুপার মার্কেট', note: 'পেশাদার ডিজিটাল গ্রাফিক্স ডিজাইন' },
          { label: 'আর্ট অ্যান্ড কালার প্রেস', phone: '01812-995511', designation: 'লিফলেট, পোস্টার ও বুক বাইন্ডিং', location: 'কানুনগোপাড়া বাজার', note: 'স্কুল-কলেজ প্রশ্ন ও ম্যাগাজিন প্রিন্ট' },
        ],
      },
      {
        id: 'software-web',
        title: 'ওয়েবসাইট/সফটওয়্যার তৈরী',
        title_en: 'Website & Software Development',
        iconType: 'software-web',
        colorScheme: {
          bg: 'bg-violet-50/50',
          border: 'border-violet-200',
          iconBg: 'bg-violet-600',
          iconColor: 'text-white',
          accent: 'text-violet-700',
        },
        description: 'কাস্টম ওয়েবসাইট ডেভেলপমেন্ট, ই-কমার্স শপ, পিওএস (POS) বিলিং সফটওয়্যার ও অ্যাপ',
        contacts: [
          { label: 'বোয়ালখালী ওয়েব অ্যান্ড সফটওয়্যার সলিউশন', phone: '01819-772266', designation: 'বিজনেস ওয়েবসাইট ও ই-কমার্স ডেভেলপমেন্ট', location: 'পৌর সদর প্রধান সড়ক', note: 'ডোমেইন, হোস্টিং ও সম্পূর্ণ ওয়েবসাইট' },
          { label: 'নেক্সটজেন কোড স্টুডিও', phone: '01814-229955', designation: 'দোকানের পিওএস ও ইনভেন্টরি সফটওয়্যার', location: 'শাকপুরা চৌমুহনী', note: 'ফার্মেসী, গ্রোসারি ও কাপড়ের শপ সফটওয়্যার' },
          { label: 'ক্লাউডআইটি বাংলাদেশ', phone: '01817-883344', designation: 'স্কুল-মাদ্রাসা ও এনজিও ম্যানেজমেন্ট সফটওয়্যার', location: 'গোমদণ্ডী', note: 'রেজাল্ট ও ফি কালেকশন সফটওয়্যার' },
          { label: 'আইটি কনসালট্যান্ট ও অটোমেশন টিম', phone: '01812-114499', designation: 'সোশ্যাল মিডিয়া ও শপ অটোমেশন', location: 'বোয়ালখালী', note: 'অনলাইন বিজনেস ব্র্যান্ডিং ও সেটআপ' },
        ],
      },
      {
        id: 'online-services',
        title: 'অনলাইন সেবা',
        title_en: 'Online & Digital Civic Services',
        iconType: 'online-services',
        colorScheme: {
          bg: 'bg-sky-50/50',
          border: 'border-sky-200',
          iconBg: 'bg-sky-600',
          iconColor: 'text-white',
          accent: 'text-sky-700',
        },
        description: 'জন্ম নিবন্ধন, পাসপোর্ট আবেদন, চাকরির আবেদন, এনআইডি সংশোধন ও সরকারি ই-সেবা',
        contacts: [
          { label: 'বোয়ালখালী ডিজিটাল ইউনিয়ন সেবা কেন্দ্র (UISC)', phone: '01819-440022', designation: 'নাগরিক জন্ম-মৃত্যু নিবন্ধন ও ই-সেবা', location: 'উপজেলা পরিষদ কমপ্লেক্স', note: 'অনলাইন নাগরিক সেবা কেন্দ্র' },
          { label: 'শাকপুরা ডিজিটাল অনলাইন কর্নার', phone: '01814-995533', designation: 'পাসপোর্ট, ভিসা আবেদন ও এনআইডি সার্ভিস', location: 'শাকপুরা বাজার মোড়', note: 'ই-পাসপোর্ট ফরম পূরণ ও পুলিশ ভেরিফিকেশন' },
          { label: 'ফ্রেন্ডস কম্পিউটার অ্যান্ড অনলাইন পয়েন্ট', phone: '01817-331166', designation: 'সরকারি চাকরির আবেদন ও অ্যাডমিট কার্ড', location: 'গোমদণ্ডী স্টেশন মোড়', note: 'অনলাইন আবেদন ও ফলাফল প্রিন্ট' },
          { label: 'কানুনগোপাড়া ই-সেবা সেন্টার', phone: '01812-668844', designation: 'অনলাইন জমির খাজনা ও নামজারি আবেদন', location: 'কানুনগোপাড়া চত্বর', note: 'ই-পর্চা, ই-নামজারি ও ফি পেমেন্ট' },
        ],
      },
    ],
  },

  // 5. পরিবহন সেবা
  {
    id: 'transport-services',
    title: 'পরিবহন সেবা',
    title_en: 'Transport Services',
    items: [
      {
        id: 'courier',
        title: 'কুরিয়ার সার্ভিস',
        title_en: 'Courier Service',
        iconType: 'courier',
        colorScheme: {
          bg: 'bg-orange-50/50',
          border: 'border-orange-200',
          iconBg: 'bg-orange-600',
          iconColor: 'text-white',
          accent: 'text-orange-700',
        },
        description: 'সুন্দরবন, এসএ পরিবহন, রেডএক্স ও স্টিডফাস্ট কুরিয়ার পার্সেল ডেলিভারি',
        contacts: [
          { label: 'সুন্দরবন কুরিয়ার সার্ভিস বোয়ালখালী ব্রাঞ্চ', phone: '01819-778844', designation: 'শাখা ব্যবস্থাপক', location: 'শাকপুরা চৌমুহনী', available24h: false },
          { label: 'এসএ পরিবহন গোমদণ্ডী এজেন্ট', phone: '01814-556633', designation: 'পার্সেল ও মানি অর্ডার বুকিং', location: 'গোমদণ্ডী রেলস্টেশন রোড', available24h: false },
          { label: 'স্টিডফাস্ট কুরিয়ার হোম ডেলিভারি হাব', phone: '01817-889922', designation: 'ই-কমার্স পার্সেল ডেলিভারি', location: 'বোয়ালখালী পৌর সদর', available24h: false },
          { label: 'রেডএক্স ও পাঠাও লজিস্টিক বোয়ালখালী পয়েন্ট', phone: '01812-113355', designation: 'ডেলিভারি রাইডার সমন্বয়ক', location: 'কানুনগোপাড়া মোড়', available24h: false },
        ],
      },
      {
        id: 'car-rental',
        title: 'হাইচ/কার ভাড়া',
        title_en: 'Hiace & Car Rental',
        iconType: 'car',
        colorScheme: {
          bg: 'bg-blue-50/50',
          border: 'border-blue-200',
          iconBg: 'bg-sky-600',
          iconColor: 'text-white',
          accent: 'text-sky-700',
        },
        description: 'বোয়ালখালী রেন্ট-এ-কার, মাইক্রোবাস, হাইয়েস, নোয়া ও প্রাইভেট কার ভাড়া',
        contacts: [
          { label: 'বোয়ালখালী রেন্ট-এ-কার সমবায় সমিতি', phone: '01819-224488', designation: 'সভাপতি ও বুকিং কন্ট্রোল', location: 'কালুরঘাট ও পৌরসভা স্ট্যান্ড', available24h: true },
          { label: 'আল-মদিনা মাইক্রোবাস ও হাইয়েস সার্ভিস', phone: '01814-667799', designation: 'বিয়ে ও ফ্যামিলি ট্যুর বুকিং', location: 'শাকপুরা মোড়', available24h: true },
          { label: 'কর্ণফুলী প্রাইভেট কার ও এক্স-করোলা ভাড়া', phone: '01817-335588', designation: 'এসি প্রাইভেট কার', location: 'গোমদণ্ডী স্টেশন চত্বর', available24h: true },
          { label: 'চট্টগ্রাম বিমানবন্দর ড্রপ ও পিকআপ কার সার্ভিস', phone: '01812-889911', designation: '২৪ ঘণ্টা এয়ারপোর্ট ড্রপ', location: 'বোয়ালখালী', available24h: true },
        ],
      },
      {
        id: 'truck-rental',
        title: 'ট্রাক ভাড়া',
        title_en: 'Truck & Pickup Rental',
        iconType: 'truck',
        colorScheme: {
          bg: 'bg-stone-50/50',
          border: 'border-stone-200',
          iconBg: 'bg-stone-700',
          iconColor: 'text-white',
          accent: 'text-stone-800',
        },
        description: 'বাসা বদল, কারখানা, মালামাল পরিবহন ও কাভার্ড ভ্যান, মিনি ট্রাক ও পিকআপ ভাড়া',
        contacts: [
          { label: 'বোয়ালখালী ট্রাক ও কাভার্ড ভ্যান সমিতি', phone: '01819-664488', designation: '১-৫ টন ট্রাক ও মালামাল পরিবহন বুকিং', location: 'কালুরঘাট নতুন ব্রিজ স্ট্যান্ড', available24h: true },
          { label: 'বিসমিল্লাহ পিকআপ ও মিনি ট্রাক সার্ভিস', phone: '01814-118833', designation: 'বাসা ও দোকান বদল মালামাল পরিবহন', location: 'গোমদণ্ডী বাজার', available24h: true },
          { label: 'কর্ণফুলী মালামাল পরিবহন ও কাভার্ড ভ্যান', phone: '01817-552277', designation: 'চট্টগ্রাম শহর ও সারাদেশে পণ্য পরিবহন', location: 'শাকপুরা চৌমুহনী', available24h: true },
          { label: 'লোকাল খোলা ট্রাক ও ট্রলি সমবায়', phone: '01812-773311', designation: 'বালি, ইট ও রড-সিমেন্ট পরিবহন', location: 'কানুনগোপাড়া বাজার', available24h: true },
        ],
      },
      {
        id: 'bike-rental',
        title: 'হোন্ডা ভাড়া',
        title_en: 'Bike Rental & Ride',
        iconType: 'bike',
        colorScheme: {
          bg: 'bg-slate-50/50',
          border: 'border-slate-200',
          iconBg: 'bg-slate-700',
          iconColor: 'text-white',
          accent: 'text-slate-800',
        },
        description: 'জরুরি যাতায়াতে বাইক রাইড শেয়ারিং, হোন্ডা ড্রাইভার ও পার্সেল রাইডার',
        contacts: [
          { label: 'বোয়ালখালী বাইক রাইডার্স সার্ভিস', phone: '01819-992211', designation: 'জরুরি বাইক রাইড কন্ট্রোলার', location: 'কালুরঘাট নতুন সেতু প্রান্ত', available24h: true },
          { label: 'দ্রুত রাইড শাকপুরা হোন্ডা পয়েন্ট', phone: '01814-445522', designation: 'লোকাল ও চট্টগ্রাম শহর রাইডার্স', location: 'শাকপুরা বাজার', available24h: true },
          { label: 'কানুনগোপাড়া বাইকার্স হাব', phone: '01817-778833', designation: 'পাহাড় ও গ্রামীণ রুট সার্ভিস', location: 'কানুনগোপাড়া কলেজ গেট', available24h: true },
        ],
      },
      {
        id: 'travel-agency',
        title: 'ট্রাভেল এজেন্সি',
        title_en: 'Travel & Umrah Agency',
        iconType: 'travel',
        colorScheme: {
          bg: 'bg-emerald-50/50',
          border: 'border-emerald-200',
          iconBg: 'bg-emerald-600',
          iconColor: 'text-white',
          accent: 'text-emerald-700',
        },
        description: 'ওমরাহ ও হজ কাফেলা, এয়ার টিকিট, বিদেশ ভিসা প্রসেসিং, ম্যানপাওয়ার ও ট্যুর প্যাকেজ',
        contacts: [
          { label: 'বোয়ালখালী ট্রাভেলস অ্যান্ড ওমরাহ কাফেলা', phone: '01819-335599', designation: 'এয়ার টিকিট ও ওমরাহ স্পেশাল প্যাকেজ', location: 'শাকপুরা চৌমুহনী মোড়', note: 'হজ ও ওমরাহ নির্ভরযোগ্য কাফেলা' },
          { label: 'আল-মদিনা ইন্টারন্যাশনাল ট্রাভেল এজেন্সি', phone: '01814-772244', designation: 'মধ্যপ্রাচ্য ও ইউরোপ আন্তর্জাতিক বিমান টিকিট', location: 'গোমদণ্ডী বাজার', note: 'দ্রুত টিকিট বুকিং ও রিইস্যু' },
          { label: 'কর্ণফুলী হজ ও ট্যুরিজম সার্ভিস', phone: '01817-994466', designation: 'ট্যুরিস্ট ভিসা ও ম্যানপাওয়ার সার্ভিস', location: 'পৌর সুপার মার্কেট', note: 'দুবাই, কাতার ও সৌদি আরব ভিসা প্রসেসিং' },
          { label: 'আল-বারাকা এয়ার ইন্টারন্যাশনাল', phone: '01812-441188', designation: 'ফ্যামিলি ভ্রমণ প্যাকেজ ও এয়ার টিকিট', location: 'কানুনগোপাড়া মোড়', note: 'কক্সবাজার ও সিলেট ট্যুর গাইড' },
        ],
      },
    ],
  },

  // 6. ইভেন্ট ম্যানেজমেন্ট সেবা
  {
    id: 'event-services',
    title: 'ইভেন্ট ম্যানেজমেন্ট সেবা',
    title_en: 'Event Management Services',
    items: [
      {
        id: 'decorators',
        title: 'ডেকোরেটার্স',
        title_en: 'Decorators',
        iconType: 'decorators',
        colorScheme: {
          bg: 'bg-amber-50/50',
          border: 'border-amber-200',
          iconBg: 'bg-amber-600',
          iconColor: 'text-white',
          accent: 'text-amber-700',
        },
        description: 'সামিয়ানা, আধুনিক গেট ডেকোরেশন, স্টেজ লাইটিং, সাউন্ড সিস্টেম ও ভিআইপি আসন',
        contacts: [
          { label: 'বোয়ালখালী ডেকোরেটার্স অ্যান্ড সাউন্ড', phone: '01819-883311', designation: 'বিয়ে, মেজবান ও সুন্নতে খতনা ডেকোরেশন', location: 'গোমদণ্ডী পৌর সদর', note: 'প্যান্ডেল, তোরণ ও আধুনিক লাইটিং' },
          { label: 'নিউ রূপালী ডেকোরেটার্স', phone: '01814-551177', designation: 'ভিআইপি ডেকোরেশন ও সাউন্ড সিস্টেম', location: 'শাকপুরা চৌমুহনী', note: 'জেনারেটর ব্যাকআপ ও ভিআইপি সোফা' },
          { label: 'সুরমা ডেকোরেশন অ্যান্ড সাউন্ড', phone: '01817-228833', designation: 'গ্রাম্য ও সামাজিক মেজবানি প্যান্ডেল', location: 'কানুনগোপাড়া বাজার', note: 'সামিয়ানা, হাঁড়ি-পাতিল ও বয়ক চেয়ার' },
          { label: 'বিসমিল্লাহ ডেকোরেটার্স সার্ভিস', phone: '01812-669944', designation: 'ধর্মীয় মাহফিল ও সাংস্কৃতিক মঞ্চ ডেকর', location: 'সারোয়াতলী মোড়', note: 'সাউন্ড বক্স ও আধুনিক মেকআপ গেট' },
        ],
      },
      {
        id: 'event-management',
        title: 'ইভেন্ট ম্যানেজমেন্ট',
        title_en: 'Event Management',
        iconType: 'event',
        colorScheme: {
          bg: 'bg-purple-50/50',
          border: 'border-purple-200',
          iconBg: 'bg-purple-600',
          iconColor: 'text-white',
          accent: 'text-purple-700',
        },
        description: 'গায়ে হলুদ, বিবাহ, জন্মদিন, বিবাহবার্ষিকী, সেমিনার ও পূর্ণাঙ্গ ইভেন্ট প্ল্যানার',
        contacts: [
          { label: 'বোয়ালখালী ইভেন্ট প্ল্যানার্স অ্যান্ড অর্গানাইজার', phone: '01819-227744', designation: 'বিবাহ ও হলুদের পূর্ণাঙ্গ দায়িত্ব পালন', location: 'শাকপুরা বাজার', note: 'থিম ডেকোরেশন, এন্ট্রি ও ফ্লাওয়ার সেটআপ' },
          { label: 'ড্রিম ইভেন্টস বোয়ালখালী', phone: '01814-886622', designation: 'স্টেজ, ফ্লোরাল ডেকর ও সেলফি বুথ', location: 'গোমদণ্ডী স্টেশন রোড', note: 'জন্মদিন ও পারিবারিক পার্টি প্ল্যানিং' },
          { label: 'রয়্যাল টাচ ইভেন্ট সলিউশন', phone: '01817-334499', designation: 'কর্পোরেট প্রোগ্রাম ও মেলা অর্গানাইজেশন', location: 'পৌর চত্বর', note: 'সাউন্ড, স্টেজ ও গেস্ট ম্যানেজমেন্ট' },
          { label: 'গালা মোমেন্টস ইভেন্ট কেয়ার', phone: '01812-117755', designation: 'বাজেট ফ্রেন্ডলি পারফেক্ট ইভেন্ট সলিউশন', location: 'বোয়ালখালী', note: 'শুরু থেকে শেষ পর্যন্ত পরিপূর্ণ তত্ত্বাবধান' },
        ],
      },
      {
        id: 'photography',
        title: 'ফটোগ্রাফি',
        title_en: 'Photography & Cinematography',
        iconType: 'photography',
        colorScheme: {
          bg: 'bg-cyan-50/50',
          border: 'border-cyan-200',
          iconBg: 'bg-cyan-600',
          iconColor: 'text-white',
          accent: 'text-cyan-700',
        },
        description: 'ওয়েডিং ফটোশুট, সিনেমাটোগ্রাফি, প্রি/পোস্ট ওয়েডিং, ড্রোন শুট ও ফটো অ্যালবাম',
        contacts: [
          { label: 'বোয়ালখালী ড্রিম ওয়েডিং ফটোগ্রাফি', phone: '01819-441188', designation: 'সিনেমাটিক ওয়েডিং ও ক্যান্ডিড মোমেন্টস', location: 'পৌর এলাকা', note: 'এইচডি ভিডিও, ড্রোন শুট ও ফটোবুক' },
          { label: 'মেমোরিজ স্টুডিও অ্যান্ড সিনেমাটোগ্রাফি', phone: '01814-992266', designation: 'ওয়েডিং অ্যালবাম ও সিনেমাটোগ্রাফি', location: 'শাকপুরা চৌমুহনী', note: 'প্রফেশনাল ক্যামেরা ও লাইটিং সেটআপ' },
          { label: 'লেন্সক্রাফট ফটোগ্রাফি বোয়ালখালী', phone: '01817-775511', designation: 'হলুদ, জন্মদিন ও পারিবারিক অনুষ্ঠান', location: 'গোমদণ্ডী বাজার', note: 'শর্ট রিল ও প্রফেশনাল এডিটিং' },
          { label: 'শাইন মিডিয়া অ্যান্ড ফটো ল্যাব', phone: '01812-553388', designation: 'পোট্রেট ও ইভেন্ট কাভারেজ টিম', location: 'কানুনগোপাড়া', note: 'তাত্ক্ষণিক ছবি প্রিন্ট ও অ্যালবাম তৈরি' },
        ],
      },
      {
        id: 'cook-chef',
        title: 'বাবুর্চি',
        title_en: 'Catering & Chef',
        iconType: 'cook',
        colorScheme: {
          bg: 'bg-red-50/50',
          border: 'border-red-200',
          iconBg: 'bg-orange-600',
          iconColor: 'text-white',
          accent: 'text-orange-700',
        },
        description: 'ঐতিহ্যবাহী চট্টগ্রামের মেজবানি মাংস, বিরিয়ানি, রোস্ট, কাচ্চি ও স্পেশাল বিয়ের প্রধান বাবুর্চি',
        contacts: [
          { label: 'ওস্তাদ মোহাম্মদ রফিক বাবুর্চি (প্রধান মেজবানি)', phone: '01819-668822', designation: 'খাঁটি চট্টগ্রামের মেজবানি মাংস ও চানার ডাল', location: 'গোমদণ্ডী সদর', note: 'ঐতিহ্যবাহী স্বাদের প্রধান মেজবানি বাবুর্চি' },
          { label: 'মাস্টার শেফ লোকমান বাবুর্চি (বিয়ে স্পেশাল)', phone: '01814-335511', designation: 'কাচ্চি বিরিয়ানি, মোরগ পোলাও ও রোস্ট', location: 'শাকপুরা চৌমুহনী', note: 'বিয়ে-শাদির আধুনিক সুস্বাদু খাবার' },
          { label: 'হাজী আবুল বশর বাবুর্চি টিম', phone: '01817-119944', designation: 'বড় মেজবান ও সামাজিক ভোজ স্পেশাল', location: 'সারোয়াতলী মোড়', note: 'দক্ষ সহকারীদের সাথে সমন্বিত সার্ভিস' },
          { label: 'বাবুর্চি জসিম উদ্দিন ও সহকারী দল', phone: '01812-882266', designation: 'ঘরোয়া অনুষ্ঠান ও মিলাদ মাহফিলের তবারক', location: 'চরণদ্বীপ', note: 'খাসি, মুরগি ও ঐতিহ্যবাহী ফিরনি রান্না' },
        ],
      },
      {
        id: 'community-center',
        title: 'কমিউনিটি সেন্টার',
        title_en: 'Community Center & Hall',
        iconType: 'community',
        colorScheme: {
          bg: 'bg-blue-50/50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-700',
          iconColor: 'text-white',
          accent: 'text-blue-800',
        },
        description: 'বোয়ালখালী উপজেলার শীতাতপ নিয়ন্ত্রিত আধুনিক কমিউনিটি সেন্টার, কনভেনশন হল ও বুকিং',
        contacts: [
          { label: 'বোয়ালখালী সিটি কনভেনশন হল', phone: '01819-114477', designation: '১০০০+ আসন, সম্পূর্ণ শীতাতপ নিয়ন্ত্রিত ভেন্যু', location: 'পৌর সদর প্রধান সড়ক', note: 'বিয়ে, মেজবান ও কনফারেন্স হল বুকিং' },
          { label: 'কর্ণফুলী কমিউনিটি সেন্টার অ্যান্ড ব্যাংকুয়েট', phone: '01814-778855', designation: 'সুবিশাল ডাইনিং হল ও কার পার্কিং সুবিধা', location: 'শাকপুরা চৌমুহনী মোড়', note: 'পার্টি বুকিং ও আধুনিক ডেকোরেশন' },
          { label: 'আল-আমিন কমিউনিটি হল', phone: '01817-442299', designation: 'পারিবারিক অনুষ্ঠান ও সামাজিক উৎসব ভেন্যু', location: 'গোমদণ্ডী বাজার চত্বর', note: 'সুলভ মূল্যে কমিউনিটি হল বুকিং' },
          { label: 'কানুনগোপাড়া উৎসব ভবন ও কমিউনিটি সেন্টার', phone: '01812-996633', designation: 'বিবাহ, মেজবান ও সংবর্ধনা ভেন্যু', location: 'কানুনগোপাড়া রোড', note: 'খোলামেলা পরিবেশ ও পরিচ্ছন্ন রান্নাঘর' },
        ],
      },
    ],
  },

  // 7. হোমমেড
  {
    id: 'homemade-services',
    title: 'হোমমেড',
    title_en: 'Homemade Foods & Bakery',
    items: [
      {
        id: 'homemade-cake',
        title: 'হোমমেড কেক',
        title_en: 'Homemade Cake',
        iconType: 'cake',
        colorScheme: {
          bg: 'bg-pink-50/50',
          border: 'border-pink-200',
          iconBg: 'bg-pink-600',
          iconColor: 'text-white',
          accent: 'text-pink-700',
        },
        description: 'খাঁটি উপাদানে স্বাস্থ্যসম্মত কাস্টমাইজড জন্মদিনের কেক, ফন্ডেন্ট কেক, পেস্ট্রি ও কাপকেক',
        contacts: [
          { label: 'বোয়ালখালী সুইট ক্রাফট হোমমেড কেক', phone: '01819-557733', designation: 'জন্মদিনের থিম কেক ও চকোলেট ট্রাফেল', location: 'শাকপুরা চৌমুহনী', note: '১০০% হাইজিন ও ফ্রেশ ক্রিম কেক' },
          { label: 'বেক উইথ লাভ (Bake with Love) বোয়ালখালী', phone: '01814-221188', designation: 'ভ্যানিলা, রেড ভেলভেট ও কাপকেক', location: 'গোমদণ্ডী স্টেশন রোড', note: 'অর্ডার অনুযায়ী প্রি-অর্ডার ও হোম ডেলিভারি' },
          { label: 'কেক স্টোরি বোয়ালখালী', phone: '01817-886633', designation: 'বিবাহবার্ষিকী ও বেবি শাওয়ার স্পেশাল কেক', location: 'পৌর এলাকা', note: 'কাস্টম টেক্সট ও ফটো কেক তৈরি' },
          { label: 'ইয়াম্মি বেকস কানুনগোপাড়া', phone: '01812-330055', designation: 'জার কেক, ব্রাউনি ও পেস্ট্রি বক্স', location: 'কানুনগোপাড়া চত্বর', note: 'যেকোনো পার্টি ও অনুষ্ঠানের প্রি-অর্ডার' },
        ],
      },
      {
        id: 'homemade-foods',
        title: 'হোমমেড ফুডস',
        title_en: 'Homemade Foods',
        iconType: 'homemade-food',
        colorScheme: {
          bg: 'bg-amber-50/50',
          border: 'border-amber-200',
          iconBg: 'bg-amber-600',
          iconColor: 'text-white',
          accent: 'text-amber-800',
        },
        description: 'ঘরোয়া স্বাদে স্বাস্থ্যকর লাঞ্চ বক্স, ফ্রোজেন নাস্তা, আচার, শুঁটকি ও ট্র্যাডিশনাল খাবার',
        contacts: [
          { label: 'মায়ের হাতের স্বাদ হোমমেড কিচেন', phone: '01819-774411', designation: 'ফ্রেশ ঘরোয়া লাঞ্চ ও ডিনার পার্সেল', location: 'গোমদণ্ডী পৌর এলাকা', note: 'অফিস ও ব্যাংকারদের নিয়মিত টিফিন সার্ভিস' },
          { label: 'বোয়ালখালী ফ্রোজেন ফুডস অ্যান্ড স্ন্যাক্স', phone: '01814-449922', designation: 'ফ্রোজেন সমুচা, রোল, শিঙাড়া ও চিকেন নাগেটস', location: 'শাকপুরা বাজার', note: 'ঘরে বসে প্যাকেটজাত ফ্রোজেন খাবার' },
          { label: 'খাঁটি স্বাদ হোমমেড আচার ও মসলা', phone: '01817-663377', designation: 'আমের কাশ্মীরি আচার, রসুনের আচার ও খাঁটি ঘি', location: 'পৌর সদর চত্বর', note: 'কেমিক্যালমুক্ত খাঁটি ঘরোয়া খাদ্যপণ্য' },
          { label: 'টেস্ট অব বোয়ালখালী ঘরোয়া ফুডস', phone: '01812-118844', designation: 'ঐতিহ্যবাহী পিঠা ও বৈকালিক নাস্তা', location: 'কানুনগোপাড়া মোড়', note: 'নকশী পিঠা, পাটিসাপটা ও পুলি পিঠা' },
        ],
      },
    ],
  },
];
