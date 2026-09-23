import React from 'react';
import * as LucideIcons from 'lucide-react';
import {
  IconLocation,
  IconInfoScroll,
  IconUnions,
  IconEducation,
  IconEconomy,
  IconFamous,
  IconVisitingSpots,
  IconPolice,
  IconLawyer,
  IconJournalist,
  IconFireService,
  IconElectricity,
  IconDoctor,
  IconVeterinary,
  IconHospital,
  IconPathology,
  IconAmbulance,
  IconBloodDonor,
  IconCourier,
  IconCarRental,
  IconMotorcycle,
  IconBoat,
  IconTrain,
  IconBus,
  IconPharmacy,
  IconMarket,
  IconGovtOffice,
  IconAgriculture,
  IconAutoRickshaw,
} from './IllustratedIcons.js';

interface DynamicIconProps {
  name: string;
  slug?: string;
  title?: string;
  className?: string;
  size?: number;
  color?: string;
  useLucideOnly?: boolean;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ 
  name, 
  slug = '', 
  title = '', 
  className = 'w-6 h-6', 
  size, 
  color,
  useLucideOnly = false
}) => {
  if (!name && !slug && !title) {
    return <LucideIcons.Folder className={className} size={size} color={color} />;
  }

  // Check if name is an image URL or base64 data
  if (name && (name.startsWith('http://') || name.startsWith('https://') || name.startsWith('data:image/'))) {
    return (
      <img
        src={name}
        alt="icon"
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
      />
    );
  }

  const key = `${name} ${slug} ${title}`.toLowerCase().trim();

  // If rich illustrations are enabled (default for app cards)
  if (!useLucideOnly) {
    // 1. Location / অবস্থান
    if (key.includes('location') || key.includes('অবস্থান') || key.includes('mappin') || key.includes('map')) {
      return <IconLocation className={className} size={size} />;
    }
    // 2. Info / তথ্য
    if (key.includes('sub_info') || key.includes('scroll') || key.includes('filetext') || (key.includes('তথ্য') && !key.includes('সাধারণ তথ্য'))) {
      return <IconInfoScroll className={className} size={size} />;
    }
    // 3. Union / ইউনিয়ন
    if (key.includes('union') || key.includes('ইউনিয়ন') || key.includes('layers') || key.includes('unions')) {
      return <IconUnions className={className} size={size} />;
    }
    // 4. Education / শিক্ষা
    if (key.includes('education') || key.includes('শিক্ষা') || key.includes('graduationcap') || key.includes('school') || key.includes('college')) {
      return <IconEducation className={className} size={size} />;
    }
    // 5. Economy / অর্থনীতি
    if (key.includes('economy') || key.includes('অর্থনীতি') || key.includes('trendingup')) {
      return <IconEconomy className={className} size={size} />;
    }
    // 6. Famous People / বিখ্যাত ব্যক্তিরা
    if (key.includes('famous') || key.includes('বিখ্যাত') || key.includes('notable') || key.includes('usercheck')) {
      return <IconFamous className={className} size={size} />;
    }
    // 7. Visiting Spot / দর্শনীয় স্থান
    if (key.includes('visiting') || key.includes('দর্শনীয়') || key.includes('camera') || key.includes('spot')) {
      return <IconVisitingSpots className={className} size={size} />;
    }
    // 8. Police / পুলিশ
    if (key.includes('police') || key.includes('পুলিশ') || key.includes('thana')) {
      return <IconPolice className={className} size={size} />;
    }
    // 9. Lawyer / আইনজীবী
    if (key.includes('lawyer') || key.includes('আইনজীবী') || key.includes('scale')) {
      return <IconLawyer className={className} size={size} />;
    }
    // 10. Journalist / সাংবাদিক
    if (key.includes('journalist') || key.includes('সাংবাদিক') || key.includes('newspaper') || key.includes('press')) {
      return <IconJournalist className={className} size={size} />;
    }
    // 11. Fire Service / ফায়ার সার্ভিস
    if (key.includes('fire') || key.includes('ফায়ার') || key.includes('flame')) {
      return <IconFireService className={className} size={size} />;
    }
    // 12. Electricity / বিদ্যুৎ
    if (key.includes('electr') || key.includes('বিদ্যুৎ') || key.includes('zap') || key.includes('pdb') || key.includes('reb')) {
      return <IconElectricity className={className} size={size} />;
    }
    // 13. Doctor / ডাক্তার
    if (key.includes('doctor') || key.includes('ডাক্তার') || key.includes('stethoscope')) {
      return <IconDoctor className={className} size={size} />;
    }
    // 14. Veterinary / ভেটেরিনারি
    if (key.includes('veterinary') || key.includes('ভেটেরিনারি') || key.includes('animal') || key.includes('pet')) {
      return <IconVeterinary className={className} size={size} />;
    }
    // 15. Hospital / হাসপাতাল
    if (key.includes('hospital') || key.includes('হাসপাতাল') || key.includes('building2') || key.includes('clinic')) {
      return <IconHospital className={className} size={size} />;
    }
    // 16. Pathology / প্যাথলজি
    if (key.includes('pathology') || key.includes('প্যাথলজি') || key.includes('activity') || key.includes('lab') || key.includes('diagnostic')) {
      return <IconPathology className={className} size={size} />;
    }
    // 17. Ambulance / অ্যাম্বুলেন্স
    if (key.includes('ambulance') || key.includes('অ্যাম্বুলেন্স')) {
      return <IconAmbulance className={className} size={size} />;
    }
    // 18. Blood Donor / রক্তদাতা
    if (key.includes('blood') || key.includes('রক্ত') || key.includes('droplet')) {
      return <IconBloodDonor className={className} size={size} />;
    }
    // 19. Courier / কুরিয়ার
    if (key.includes('courier') || key.includes('কুরিয়ার') || key.includes('parcel') || key.includes('package')) {
      return <IconCourier className={className} size={size} />;
    }
    // 20. Car Rental / গাড়ি ভাড়া
    if (key.includes('car-rental') || key.includes('গাড়ী') || key.includes('গাড়ি') || key.includes('cartaxifront') || key.includes('rent')) {
      return <IconCarRental className={className} size={size} />;
    }
    // 21. Honda / Motorcycle / হোন্ডা ভাড়া
    if (key.includes('bike') || key.includes('মোটরসাইকেল') || key.includes('হোন্ডা') || key.includes('motorcycle')) {
      return <IconMotorcycle className={className} size={size} />;
    }
    // 22. Bus / বাস
    if (key.includes('bus') || key.includes('বাস')) {
      return <IconBus className={className} size={size} />;
    }
    // 23. Train / ট্রেন
    if (key.includes('train') || key.includes('ট্রেন')) {
      return <IconTrain className={className} size={size} />;
    }
    // 24. Boat / নৌযান / ফেরি
    if (key.includes('boat') || key.includes('নৌযান') || key.includes('ship') || key.includes('ferry')) {
      return <IconBoat className={className} size={size} />;
    }
    // 25. Auto / CNG / রিকশা
    if (key.includes('rickshaw') || key.includes('রিকশা') || key.includes('auto') || key.includes('cng')) {
      return <IconAutoRickshaw className={className} size={size} />;
    }
    // 26. Pharmacy / ফার্মেসি
    if (key.includes('pharmacy') || key.includes('ফার্মেসি') || key.includes('pill')) {
      return <IconPharmacy className={className} size={size} />;
    }
    // 27. Market / বাজার
    if (key.includes('market') || key.includes('বাজার') || key.includes('shoppingbag') || key.includes('shop')) {
      return <IconMarket className={className} size={size} />;
    }
    // 28. Govt / সরকারি অফিস
    if (key.includes('govt') || key.includes('সরকারি') || key.includes('office') || key.includes('landmark')) {
      return <IconGovtOffice className={className} size={size} />;
    }
    // 29. Agriculture / কৃষি
    if (key.includes('agriculture') || key.includes('কৃষি') || key.includes('sprout') || key.includes('farm')) {
      return <IconAgriculture className={className} size={size} />;
    }
  }

  // Find icon in Lucide
  const IconComponent = (LucideIcons as any)[name] || 
                        (LucideIcons as any)[name?.charAt(0).toUpperCase() + name?.slice(1)] ||
                        LucideIcons.Folder;

  return <IconComponent className={className} size={size} color={color} />;
};

export const AVAILABLE_LUCIDE_ICONS = [
  'ShieldAlert', 'Shield', 'HeartPulse', 'Stethoscope', 'Building2', 'Ambulance',
  'Pill', 'Droplet', 'Activity', 'Syringe', 'Bus', 'Train', 'Ship', 'Car',
  'CarTaxiFront', 'Bike', 'Package', 'Landmark', 'MapPin', 'Info', 'Layers',
  'GraduationCap', 'TrendingUp', 'Award', 'Camera', 'Building', 'ShoppingBag',
  'Mail', 'Store', 'Utensils', 'Smartphone', 'Sprout', 'Leaf', 'Zap', 'Flame',
  'Scale', 'Newspaper', 'UserCheck', 'Users', 'Briefcase', 'BookOpen', 'Radio',
  'FileText', 'Calendar', 'Clock', 'Compass', 'Globe', 'HelpCircle'
];

