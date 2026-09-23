import React, { useEffect } from 'react';
import { 
  X, 
  Landmark, 
  MapPin, 
  Building, 
  Award, 
  Sparkles, 
  Shield, 
  HeartPulse, 
  Mail, 
  School, 
  BookOpen, 
  GraduationCap, 
  Library, 
  Moon, 
  UtensilsCrossed,
  PhoneCall,
  Flame,
  Ambulance,
  Droplet,
  Zap,
  Building2,
  ChevronRight,
  Stethoscope,
  Activity,
  Pill,
  Book,
  Laptop,
  Monitor,
  Wrench,
  Printer,
  Code,
  Globe,
  Car,
  Package,
  Truck,
  Bike,
  Plane,
  Utensils,
  Camera,
  PartyPopper,
  Cake
} from 'lucide-react';
import { useData } from '../../context/DataContext.js';
import { BoalkhaliLogo } from './BoalkhaliLogo.js';

interface SideDrawerMenuProps {
  navigate: (path: string) => void;
  currentPath: string;
}

interface HubItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  path: string;
}

interface ServiceCardGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  viewAllPath: string;
  items: {
    id: string;
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }[];
}

export const SideDrawerMenu: React.FC<SideDrawerMenuProps> = ({ navigate }) => {
  const { isMenuOpen, setIsMenuOpen } = useData();

  // Close on Escape key and prevent background scroll when open
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen, setIsMenuOpen]);

  if (!isMenuOpen) return null;

  const handleNav = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // উপজেলা তথ্য হাব এর ১৪টি আইটেম
  const hubItems: HubItem[] = [
    { id: 'at-a-glance', label: 'এক নজরে বোয়ালখালী', icon: Landmark, path: '/at-a-glance' },
    { id: 'unions', label: 'ইউনিয়ন সমুহ', icon: MapPin, path: '/unions' },
    { id: 'municipality', label: 'পৌরসভা তথ্য', icon: Building, path: '/municipality' },
    { id: 'famous', label: 'কৃতি ব্যক্তিত্ব', icon: Award, path: '/famous-persons' },
    { id: 'tourist', label: 'দর্শনীয় স্থান', icon: Sparkles, path: '/tourist-spots' },
    { id: 'thana', label: 'উপজেলা থানা', icon: Shield, path: '/thana' },
    { id: 'hospital', label: 'উপজেলা হাসপাতাল', icon: HeartPulse, path: '/hospital' },
    { id: 'post-office', label: 'উপজেলা ডাকঘর', icon: Mail, path: '/post-office' },
    { id: 'primary-school', label: 'প্রাথমিক স্কুল', icon: School, path: '/primary-schools' },
    { id: 'secondary-school', label: 'মাধ্যমিক স্কুল', icon: BookOpen, path: '/secondary-schools' },
    { id: 'college', label: 'কলেজ', icon: GraduationCap, path: '/colleges' },
    { id: 'madrasa', label: 'মাদ্রাসা', icon: Library, path: '/madrasas' },
    { id: 'mazar', label: 'মাজার', icon: Moon, path: '/mazar' },
    { id: 'restaurant', label: 'রেস্টুরেন্ট', icon: UtensilsCrossed, path: '/restaurants' },
  ];

  // সেবার কার্ডগুলো - হোম পেইজের জরুরী সেবার কার্ড এর একই স্টাইলে
  const serviceGroups: ServiceCardGroup[] = [
    // ১. জরুরী সেবা
    {
      id: 'emergency-services',
      title: 'জরুরী সেবা',
      subtitle: 'প্রয়োজনীয় সকল জরুরি যোগাযোগ ও সহায়তা',
      icon: PhoneCall,
      viewAllPath: '/numbers',
      items: [
        { id: 'national-emergency', label: 'জাতীয় জরুরি সেবা', path: '/numbers/national-emergency', icon: PhoneCall },
        { id: 'upozila-admin', label: 'উপজেলা প্রশাসন', path: '/numbers/upozila-admin', icon: Building2 },
        { id: 'police', label: 'থানা', path: '/numbers/police', icon: Shield },
        { id: 'fire-service', label: 'ফায়ার সার্ভিস', path: '/numbers/fire-service', icon: Flame },
        { id: 'electricity', label: 'বিদ্যুৎ', path: '/numbers/electricity', icon: Zap },
        { id: 'hospital', label: 'হাসপাতাল', path: '/numbers/hospital', icon: HeartPulse },
        { id: 'ambulance', label: 'এম্বুল্যান্স', path: '/numbers/ambulance', icon: Ambulance },
        { id: 'blood-donor', label: 'রক্তদাতা', path: '/numbers/blood-donor', icon: Droplet },
      ],
    },
    // ২. স্বাস্থ্য সেবা
    {
      id: 'health-services',
      title: 'স্বাস্থ্য সেবা',
      subtitle: 'ডাক্তার, হাসপাতাল, ফার্মেসি ও ল্যাব টেস্ট',
      icon: HeartPulse,
      viewAllPath: '/numbers',
      items: [
        { id: 'doctor', label: 'ডাক্তার', path: '/numbers/doctor', icon: Stethoscope },
        { id: 'hospital-h', label: 'হাসপাতাল', path: '/numbers/hospital', icon: Building2 },
        { id: 'ambulance-h', label: 'এম্বুল্যান্স', path: '/numbers/ambulance', icon: Ambulance },
        { id: 'blood-donor-h', label: 'রক্তদাতা', path: '/numbers/blood-donor', icon: Droplet },
        { id: 'pharmacy', label: 'ফার্মেসি', path: '/numbers/pharmacy', icon: Pill },
        { id: 'pathology', label: 'প্যাথলজি / ল্যাব', path: '/numbers/pathology', icon: Activity },
        { id: 'veterinary', label: 'পশু চিকিৎসক', path: '/numbers/veterinary', icon: HeartPulse },
      ],
    },
    // ৩. শিক্ষা সেবা
    {
      id: 'education-services',
      title: 'শিক্ষা সেবা',
      subtitle: 'গৃহশিক্ষক, আরবি শিক্ষক ও একাডেমি কোচিং',
      icon: GraduationCap,
      viewAllPath: '/numbers',
      items: [
        { id: 'private-tutor', label: 'গৃহশিক্ষক / টিউটর', path: '/numbers/private-tutor', icon: BookOpen },
        { id: 'arabic-teacher', label: 'কোরআন ও আরবি শিক্ষক', path: '/numbers/arabic-teacher', icon: Book },
        { id: 'coaching', label: 'কোচিং ও একাডেমি', path: '/numbers/coaching', icon: School },
        { id: 'edu-institutions', label: 'শিক্ষা প্রতিষ্ঠান', path: '/education', icon: GraduationCap },
      ],
    },
    // ৪. আইটি ও অনলাইন সেবা
    {
      id: 'it-services',
      title: 'আইটি ও অনলাইন সেবা',
      subtitle: 'প্রশিক্ষণ, মেরামত, প্রিন্টিং ও ডিজিটাল সেবা',
      icon: Laptop,
      viewAllPath: '/numbers',
      items: [
        { id: 'computer-training', label: 'কম্পিউটার প্রশিক্ষণ', path: '/numbers/computer-training', icon: Monitor },
        { id: 'computer-repair', label: 'সার্ভিসিং ও মেরামত', path: '/numbers/computer-repair', icon: Wrench },
        { id: 'printing-design', label: 'প্রেস ও ডিজাইন', path: '/numbers/printing-design', icon: Printer },
        { id: 'software-web', label: 'সফটওয়্যার ও ওয়েব', path: '/numbers/software-web', icon: Code },
        { id: 'online-services', label: 'অনলাইন উদ্যোক্তা', path: '/numbers/online-services', icon: Globe },
      ],
    },
    // ৫. পরিবহন ও ট্রাভেল সেবা
    {
      id: 'transport-services',
      title: 'পরিবহন ও ট্রাভেল সেবা',
      subtitle: 'কার, পিকআপ, বাইক রেন্ট ও ট্রাভেল সার্ভিস',
      icon: Car,
      viewAllPath: '/numbers',
      items: [
        { id: 'car-rental', label: 'প্রাইভেট কার রেন্ট', path: '/numbers/car-rental', icon: Car },
        { id: 'courier', label: 'কুরিয়ার ও পার্সেল', path: '/numbers/courier', icon: Package },
        { id: 'truck-rental', label: 'ট্রাক ও পিকআপ ভাড়া', path: '/numbers/truck-rental', icon: Truck },
        { id: 'bike-rental', label: 'বাইক রাইড ও রেন্ট', path: '/numbers/bike-rental', icon: Bike },
        { id: 'travel-agency', label: 'এয়ার টিকেট ও ট্রাভেল', path: '/numbers/travel-agency', icon: Plane },
      ],
    },
    // ৬. ইভেন্ট ও ক্যাটারিং সেবা
    {
      id: 'event-services',
      title: 'ইভেন্ট ও ক্যাটারিং সেবা',
      subtitle: 'ডেকোরেটর, বাবুর্চি, ফটোগ্রাফি ও কমিউনিটি সেন্টার',
      icon: Sparkles,
      viewAllPath: '/numbers',
      items: [
        { id: 'decorators', label: 'ডেকোরেটর ও সাউন্ড', path: '/numbers/decorators', icon: Sparkles },
        { id: 'cook-chef', label: 'বাবুর্চি ও ক্যাটারিং', path: '/numbers/cook-chef', icon: Utensils },
        { id: 'photography', label: 'ফটোগ্রাফি ও ভিডিও', path: '/numbers/photography', icon: Camera },
        { id: 'community-center', label: 'কমিউনিটি সেন্টার ও হল', path: '/numbers/community-center', icon: Building2 },
        { id: 'event-management', label: 'ইভেন্ট ম্যানেজমেন্ট', path: '/numbers/event-management', icon: PartyPopper },
      ],
    },
    // ৭. হোমমেড খাবার ও ফুড আইটেম
    {
      id: 'homemade-services',
      title: 'হোমমেড খাবার ও ফুড আইটেম',
      subtitle: 'ঘরোয়া তাজা কেক, পেস্ট্রি ও ফুড আইটেম',
      icon: UtensilsCrossed,
      viewAllPath: '/numbers',
      items: [
        { id: 'homemade-cake', label: 'হোমমেড কেক ও পেস্ট্রি', path: '/numbers/homemade-cake', icon: Cake },
        { id: 'homemade-foods', label: 'ঘরোয়া ফ্রোজেন ফুড', path: '/numbers/homemade-foods', icon: UtensilsCrossed },
        { id: 'popular-restaurants', label: 'জনপ্রিয় রেস্টুরেন্ট', path: '/restaurants', icon: Utensils },
      ],
    },
    // ৮. হ্যান্ডিম্যান ও কারিগর সেবা
    {
      id: 'handyman-services',
      title: 'হ্যান্ডিম্যান ও মিস্ত্রি সেবা',
      subtitle: 'ইলেক্ট্রিশিয়ান, প্লাম্বার, কার্পেন্টার ও টেকনিশিয়ান',
      icon: Wrench,
      viewAllPath: '/handyman',
      items: [
        { id: 'electrician', label: 'ইলেক্ট্রিশিয়ান', path: '/handyman', icon: Zap },
        { id: 'plumber', label: 'প্লাম্বার ও স্যানিটারি', path: '/handyman', icon: Wrench },
        { id: 'carpenter', label: 'কার্পেন্টার ও কাঠমিস্ত্রি', path: '/handyman', icon: Building },
        { id: 'handyman-all', label: 'সকল মিস্ত্রি তালিকা', path: '/handyman', icon: Sparkles },
      ],
    },
  ];

  return (
    <div 
      id="full-screen-slide-menu"
      className="fixed inset-0 z-50 bg-[#F0F2F5] overflow-y-auto flex flex-col animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E4E6EB] px-4 sm:px-6 py-3 shadow-2xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo and Tagline */}
          <div 
            onClick={() => handleNav('/')}
            className="cursor-pointer select-none"
          >
            <BoalkhaliLogo size="md" />
          </div>

          {/* Full Screen Close Button */}
          <button
            id="close-slide-menu-btn"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
            aria-label="বন্ধ করুন"
          >
            <span>বন্ধ করুন</span>
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Main Content Area - Full Open Display */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 space-y-5">
        {/* ১. উপজেলা তথ্য হাব */}
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E4E6EB] shadow-2xs space-y-5">
          {/* Hub Title and Subtitle matching UpazilaInfoHubGrid */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-50 text-[#FA3E3E] flex items-center justify-center font-bold shadow-2xs">
                <Landmark className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#050505]">উপজেলা তথ্য হাব</h2>
                <p className="text-[11px] sm:text-xs text-[#65676B]">প্রশাসন, পৌরসভা, ইউনিয়ন, প্রতিষ্ঠান, থানা, হাসপাতাল, স্কুল ও রেস্টুরেন্ট</p>
              </div>
            </div>
          </div>

          {/* Hub Items Grid matching UpazilaInfoHubGrid design: 4 cols mobile, 5 cols tablet, 7 cols desktop */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-y-5 sm:gap-y-6 gap-x-2 sm:gap-x-4 py-2">
            {hubItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.path)}
                  className="flex flex-col items-center justify-start text-center group cursor-pointer p-1.5 rounded-2xl hover:bg-red-50/50 transition-all active:scale-95"
                >
                  {/* Minimal Red Outline Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-50/70 group-hover:bg-red-100 flex items-center justify-center text-[#FA3E3E] group-hover:scale-108 transition-all duration-200 shadow-2xs">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.8} />
                  </div>

                  {/* Bold Dark Label */}
                  <span className="text-[11.5px] sm:text-[13px] font-bold text-[#1E293B] leading-tight text-center line-clamp-2 min-h-[32px] sm:min-h-[36px] flex items-center justify-center mt-2 px-0.5">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ২. সেবার কার্ডসমূহ - হোম পেইজের জরুরী সেবার কার্ড এর একই হুবহু স্টাইলে */}
        {serviceGroups.map((group) => {
          const HeaderIcon = group.icon;
          return (
            <section 
              key={group.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#FA3E3E] flex items-center justify-center font-bold">
                    <HeaderIcon className="w-4.5 h-4.5" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-[#050505]">{group.title}</h2>
                    <p className="text-[11px] text-[#65676B]">{group.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleNav(group.viewAllPath)}
                  className="text-xs font-bold text-[#FA3E3E] hover:text-red-700 flex items-center gap-1 cursor-pointer shrink-0 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <span>সব দেখুন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4-Column Grid: Exactly 4 items per row (matching EmergencyContactsGrid) */}
              <div className="grid grid-cols-4 gap-y-5 sm:gap-y-6 gap-x-2 sm:gap-x-4 py-2">
                {group.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.path)}
                      className="flex flex-col items-center justify-start text-center group cursor-pointer p-1.5 rounded-2xl hover:bg-red-50/30 transition-all active:scale-95"
                    >
                      {/* Minimal Red Outline Icon */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-[#FA3E3E] group-hover:scale-110 transition-transform duration-200">
                        <ItemIcon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.8} />
                      </div>

                      {/* Bold Dark Label */}
                      <span className="text-[12px] sm:text-[13px] font-bold text-[#1E293B] leading-tight text-center line-clamp-2 min-h-[32px] sm:min-h-[36px] flex items-center justify-center mt-1">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer info in full menu */}
      <footer className="py-6 text-center text-xs text-[#65676B]">
        Boalkhali.com • বোয়ালখালী উপজেলার সমন্বিত ডিজিটাল সেবা ও তথ্য বাতায়ন
      </footer>
    </div>
  );
};


