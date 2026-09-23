import React from 'react';
import { 
  PhoneCall, 
  Shield, 
  Flame, 
  Ambulance, 
  Zap, 
  Droplet, 
  HeartPulse, 
  Building2, 
  ChevronRight
} from 'lucide-react';

interface EmergencyContactsGridProps {
  navigate: (path: string) => void;
}

interface EmergencyItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export const EmergencyContactsGrid: React.FC<EmergencyContactsGridProps> = ({ navigate }) => {
  // Exactly 8 items: 4 per row
  const items: EmergencyItem[] = [
    { id: 'national-emergency', label: 'জাতীয় জরুরি সেবা', path: '/numbers/national-emergency', icon: PhoneCall },
    { id: 'upozila-admin', label: 'উপজেলা প্রশাসন', path: '/numbers/upozila-admin', icon: Building2 },
    { id: 'police', label: 'থানা', path: '/numbers/police', icon: Shield },
    { id: 'fire-service', label: 'ফায়ার সার্ভিস', path: '/numbers/fire-service', icon: Flame },
    { id: 'electricity', label: 'বিদ্যুৎ', path: '/numbers/electricity', icon: Zap },
    { id: 'hospital', label: 'হাসপাতাল', path: '/numbers/hospital', icon: HeartPulse },
    { id: 'ambulance', label: 'এম্বুল্যান্স', path: '/numbers/ambulance', icon: Ambulance },
    { id: 'blood-donor', label: 'রক্তদাতা', path: '/numbers/blood-donor', icon: Droplet },
  ];

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-[#FA3E3E] flex items-center justify-center font-bold">
            <PhoneCall className="w-4.5 h-4.5" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#050505]">জরুরী সেবা</h2>
            <p className="text-[11px] text-[#65676B]">প্রয়োজনীয় সকল জরুরি যোগাযোগ ও সহায়তা</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/numbers')}
          className="text-xs font-bold text-[#FA3E3E] hover:text-red-700 flex items-center gap-1 cursor-pointer shrink-0 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
        >
          <span>সব দেখুন</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4-Column Grid: Exactly 4 items per row (2 rows = 8 items) */}
      <div className="grid grid-cols-4 gap-y-5 sm:gap-y-6 gap-x-2 sm:gap-x-4 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-center justify-start text-center group cursor-pointer p-1.5 rounded-2xl hover:bg-red-50/30 transition-all active:scale-95"
            >
              {/* Minimal Red Outline Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-[#FA3E3E] group-hover:scale-110 transition-transform duration-200">
                <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.8} />
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
};

