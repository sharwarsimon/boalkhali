import React from 'react';
import { 
  Landmark, 
  MapPin, 
  Building, 
  GraduationCap, 
  Award, 
  Sparkles, 
  Shield, 
  HeartPulse, 
  Mail, 
  School, 
  BookOpen, 
  Library, 
  Moon, 
  UtensilsCrossed,
  ChevronRight
} from 'lucide-react';

interface UpazilaInfoHubGridProps {
  navigate: (path: string) => void;
}

interface HubItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  path: string;
}

export const UpazilaInfoHubGrid: React.FC<UpazilaInfoHubGridProps> = ({ navigate }) => {
  // All 14 items requested by the user:
  // এক নজরে বোয়ালখালী, ইউনিয়ন সমুহ, পৌরসভা তথ্য, কৃতি ব্যক্তিত্ব, দর্শনীয় স্থান, উপজেলা থানা, 
  // উপজেলা হাসপাতাল, উপজেলা ডাকঘর, প্রাথমিক স্কুল, মাধ্যমিক স্কুল, কলেজ, মাদ্রাসা, মাজার, রেস্টুরেন্ট
  const items: HubItem[] = [
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

  return (
    <section className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E4E6EB] shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-[#FA3E3E] flex items-center justify-center font-bold">
            <Landmark className="w-4.5 h-4.5" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#050505]">উপজেলা তথ্য হাব</h2>
            <p className="text-[11px] text-[#65676B]">প্রশাসন, পৌরসভা, ইউনিয়ন, প্রতিষ্ঠান, থানা, হাসপাতাল, স্কুল ও রেস্টুরেন্ট</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/upozila-info')}
          className="text-xs font-bold text-[#FA3E3E] hover:text-red-700 flex items-center gap-1 cursor-pointer shrink-0 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
        >
          <span>সব দেখুন</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Responsive Grid: 4 cols on mobile, 5 cols on small tablet, 7 cols on desktop */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-y-4 sm:gap-y-5 gap-x-1.5 sm:gap-x-3 py-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-start text-center group cursor-pointer p-1 rounded-2xl hover:bg-red-50/40 transition-all active:scale-95"
            >
              {/* Minimal Red Outline Icon */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-red-50/60 group-hover:bg-red-100/70 flex items-center justify-center text-[#FA3E3E] group-hover:scale-108 transition-all duration-200">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.8} />
              </div>

              {/* Bold Dark Label */}
              <span className="text-[11.5px] sm:text-[12.5px] font-bold text-[#1E293B] leading-tight text-center line-clamp-2 min-h-[30px] sm:min-h-[34px] flex items-center justify-center mt-1.5 px-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

