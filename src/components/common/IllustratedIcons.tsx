import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. অবস্থান (Location Pin)
export const IconLocation: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="32" cy="56" rx="14" ry="4" fill="#E2E8F0" />
    <path d="M32 6C20.954 6 12 14.954 12 26C12 39 32 58 32 58C32 58 52 39 52 26C52 14.954 43.046 6 32 6Z" fill="#FF7043" stroke="#D84315" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M32 10C23.163 10 16 17.163 16 26C16 36.5 30 50.8 32 53C34 50.8 48 36.5 48 26C48 17.163 40.837 10 32 10Z" fill="#FFA726" />
    <circle cx="32" cy="24" r="7" fill="#FFFFFF" />
  </svg>
);

// 2. তথ্য (Information / Scroll & Quill)
export const IconInfoScroll: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14 14C14 10.686 16.686 8 20 8H44C47.314 8 50 10.686 50 14V46C50 49.314 47.314 52 44 52H20C16.686 52 14 49.314 14 46V14Z" fill="#FFF8E1" stroke="#374151" strokeWidth="2.5" />
    <path d="M18 16H42M18 22H38M18 28H40M18 34H34M18 40H30" stroke="#795548" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 44C12 44 14 54 22 54H46C50 54 52 50 52 46C52 42 48 42 44 42H14" fill="#FFE082" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M48 10L36 34L32 38L34 34L46 6C48 4 50 6 48 10Z" fill="#78909C" stroke="#374151" strokeWidth="2" />
    <path d="M32 38L30 42L34 40L32 38Z" fill="#374151" />
  </svg>
);

// 3. ইউনিয়ন (Unions / 4 Hands joined together)
export const IconUnions: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* 4 square corners background */}
    <rect x="8" y="8" width="22" height="22" rx="4" fill="#EF5350" fillOpacity="0.2" stroke="#EF5350" strokeWidth="2" />
    <rect x="34" y="8" width="22" height="22" rx="4" fill="#42A5F5" fillOpacity="0.2" stroke="#42A5F5" strokeWidth="2" />
    <rect x="8" y="34" width="22" height="22" rx="4" fill="#66BB6A" fillOpacity="0.2" stroke="#66BB6A" strokeWidth="2" />
    <rect x="34" y="34" width="22" height="22" rx="4" fill="#FFA726" fillOpacity="0.2" stroke="#FFA726" strokeWidth="2" />
    {/* Clasping hands center graphic */}
    <path d="M22 26L30 18L36 24L28 32Z" fill="#FFCCBC" stroke="#374151" strokeWidth="2" />
    <path d="M38 22L46 30L40 36L32 28Z" fill="#FFE0B2" stroke="#374151" strokeWidth="2" />
    <path d="M42 38L34 46L28 40L36 32Z" fill="#FFCCBC" stroke="#374151" strokeWidth="2" />
    <path d="M26 42L18 34L24 28L32 36Z" fill="#FFE0B2" stroke="#374151" strokeWidth="2" />
    <circle cx="32" cy="32" r="3" fill="#374151" />
  </svg>
);

// 4. শিক্ষা (Education Building)
export const IconEducation: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Birds in sky */}
    <path d="M12 14Q14 12 16 14Q18 12 20 14" stroke="#78909C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M44 12Q46 10 48 12Q50 10 52 12" stroke="#78909C" strokeWidth="1.5" strokeLinecap="round" />
    {/* Roof and Dome */}
    <path d="M32 8L22 18H42L32 8Z" fill="#29B6F6" stroke="#0288D1" strokeWidth="2" strokeLinejoin="round" />
    <path d="M32 4V8" stroke="#0288D1" strokeWidth="2" strokeLinecap="round" />
    {/* Main Building Facade */}
    <rect x="14" y="24" width="36" height="30" rx="3" fill="#FFF9C4" stroke="#374151" strokeWidth="2.5" />
    <path d="M10 24L32 16L54 24H10Z" fill="#EF5350" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Pillars */}
    <rect x="18" y="28" width="4" height="20" rx="1" fill="#42A5F5" stroke="#374151" strokeWidth="1.5" />
    <rect x="26" y="28" width="4" height="14" rx="1" fill="#42A5F5" stroke="#374151" strokeWidth="1.5" />
    <rect x="34" y="28" width="4" height="14" rx="1" fill="#42A5F5" stroke="#374151" strokeWidth="1.5" />
    <rect x="42" y="28" width="4" height="20" rx="1" fill="#42A5F5" stroke="#374151" strokeWidth="1.5" />
    {/* Door & Steps */}
    <path d="M28 44C28 41.79 29.79 40 32 40C34.21 40 36 41.79 36 44V54H28V44Z" fill="#FF7043" stroke="#374151" strokeWidth="1.5" />
    <rect x="8" y="54" width="48" height="4" rx="2" fill="#90A4AE" stroke="#374151" strokeWidth="2" />
  </svg>
);

// 5. অর্থনীতি (Economy & Market Growth)
export const IconEconomy: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Background Pie Circle */}
    <circle cx="32" cy="32" r="22" fill="#E0F7FA" stroke="#374151" strokeWidth="2.5" />
    {/* Segments */}
    <path d="M32 32L32 10C44.15 10 54 19.85 54 32H32Z" fill="#26C6DA" />
    <path d="M32 32L54 32C54 44.15 44.15 54 32 54V32Z" fill="#EC407A" />
    <path d="M32 32V54C19.85 54 10 44.15 10 32C10 19.85 19.85 10 32 10V32Z" fill="#FFA726" />
    {/* Upward Growth Arrow */}
    <path d="M24 38L32 26L38 32L46 18" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 18H46V24" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="8" fill="#FFFFFF" stroke="#374151" strokeWidth="2" />
  </svg>
);

// 6. বিখ্যাত ব্যক্তিরা (Notable Figures / Famous Personalities)
export const IconFamous: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Left Child / Figure */}
    <circle cx="16" cy="32" r="4.5" fill="#81C784" stroke="#374151" strokeWidth="1.5" />
    <path d="M10 48C10 42 12 40 16 40C20 40 22 42 22 48" fill="#A5D6A7" stroke="#374151" strokeWidth="1.5" />
    {/* Center Leader/Hero */}
    <circle cx="32" cy="18" r="6.5" fill="#FFA726" stroke="#374151" strokeWidth="2" />
    <path d="M20 48C20 38 24 30 32 30C40 30 44 38 44 48H20Z" fill="#29B6F6" stroke="#374151" strokeWidth="2.5" />
    {/* Raised Arms */}
    <path d="M22 34L14 22M42 34L50 22" stroke="#29B6F6" strokeWidth="3.5" strokeLinecap="round" />
    {/* Right Child / Figure */}
    <circle cx="48" cy="32" r="4.5" fill="#F48FB1" stroke="#374151" strokeWidth="1.5" />
    <path d="M42 48C42 42 44 40 48 40C52 40 54 42 54 48" fill="#F8BBD0" stroke="#374151" strokeWidth="1.5" />
  </svg>
);

// 7. ভিজিটিং স্পট (Visiting Spots / Camera & Tower)
export const IconVisitingSpots: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Clouds */}
    <path d="M12 18C12 15 15 13 18 14C19 12 22 12 24 14C26 14 28 16 27 18H12Z" fill="#CFD8DC" />
    {/* Tower Structure */}
    <path d="M38 12L28 44H48L38 12Z" fill="#FFE082" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M32 26H44M30 34H46" stroke="#374151" strokeWidth="2" />
    {/* Camera in Foreground */}
    <rect x="8" y="32" width="28" height="22" rx="4" fill="#29B6F6" stroke="#374151" strokeWidth="2.5" />
    <circle cx="22" cy="43" r="6" fill="#FFFFFF" stroke="#374151" strokeWidth="2" />
    <circle cx="22" cy="43" r="3" fill="#0288D1" />
    <rect x="14" y="28" width="8" height="4" rx="1" fill="#FF7043" stroke="#374151" strokeWidth="1.5" />
    {/* Location badge on top right */}
    <circle cx="50" cy="18" r="8" fill="#EC407A" stroke="#374151" strokeWidth="2" />
    <circle cx="50" cy="18" r="3" fill="#FFFFFF" />
  </svg>
);

// 8. পুলিশ (Police Car with Siren)
export const IconPolice: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Flashing Lights Siren */}
    <path d="M22 10L20 6M32 8V4M42 10L44 6" stroke="#E53935" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="25" y="10" width="14" height="6" rx="2" fill="#E53935" stroke="#374151" strokeWidth="2" />
    <rect x="32" y="10" width="7" height="6" fill="#1E88E5" stroke="#374151" strokeWidth="2" />
    {/* Police Car Roof & Windows */}
    <path d="M16 28L20 16H44L48 28H16Z" fill="#B0BEC5" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Car Body */}
    <rect x="8" y="28" width="48" height="18" rx="5" fill="#37474F" stroke="#374151" strokeWidth="2.5" />
    {/* White Door panel */}
    <rect x="20" y="28" width="24" height="18" fill="#ECEFF1" stroke="#374151" strokeWidth="2" />
    {/* Headlights */}
    <rect x="10" y="32" width="6" height="5" rx="1.5" fill="#FFF176" stroke="#374151" strokeWidth="1.5" />
    <rect x="48" y="32" width="6" height="5" rx="1.5" fill="#FFF176" stroke="#374151" strokeWidth="1.5" />
    {/* Wheels */}
    <rect x="12" y="44" width="10" height="8" rx="2" fill="#212121" stroke="#374151" strokeWidth="2" />
    <rect x="42" y="44" width="10" height="8" rx="2" fill="#212121" stroke="#374151" strokeWidth="2" />
    {/* Front Grille */}
    <rect x="24" y="38" width="16" height="4" rx="1" fill="#90A4AE" stroke="#374151" strokeWidth="1.5" />
  </svg>
);

// 9. আইনজীবী (Lawyer with Scale of Justice)
export const IconLawyer: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Lawyer Avatar Head & Body */}
    <circle cx="28" cy="18" r="8" fill="#FFCCBC" stroke="#374151" strokeWidth="2" />
    {/* Hair */}
    <path d="M20 18C20 13 23 10 28 10C33 10 36 13 36 18H20Z" fill="#263238" />
    {/* Coat & White Tie */}
    <path d="M12 48C12 36 18 30 28 30C38 30 44 36 44 48H12Z" fill="#1E88E5" stroke="#374151" strokeWidth="2.5" />
    <path d="M28 30L25 40L28 44L31 40L28 30Z" fill="#FFFFFF" stroke="#374151" strokeWidth="1.5" />
    <path d="M25 34H31" stroke="#E53935" strokeWidth="2" />
    {/* Scale of Justice Graphic in Front */}
    <g transform="translate(18, 12)">
      <path d="M24 16V36M16 20H32" stroke="#FFA000" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 20L12 28H20L16 20Z" fill="#FFD54F" stroke="#FFA000" strokeWidth="1.5" />
      <path d="M32 20L28 28H36L32 20Z" fill="#FFD54F" stroke="#FFA000" strokeWidth="1.5" />
      <circle cx="24" cy="38" r="3" fill="#FFA000" />
    </g>
  </svg>
);

// 10. সাংবাদিক (Journalist with Camera & Mic)
export const IconJournalist: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head */}
    <circle cx="26" cy="20" r="8" fill="#FFE0B2" stroke="#374151" strokeWidth="2" />
    <path d="M18 18C18 13 21 10 26 10C31 10 34 13 34 18H18Z" fill="#5D4037" />
    {/* Body */}
    <path d="M14 48C14 38 18 32 26 32C34 32 38 38 38 48H14Z" fill="#FFA726" stroke="#374151" strokeWidth="2" />
    {/* Microphone in Hand */}
    <rect x="22" y="34" width="4" height="10" rx="2" fill="#212121" stroke="#374151" strokeWidth="1.5" />
    <rect x="20" y="32" width="8" height="6" rx="2" fill="#E53935" stroke="#374151" strokeWidth="1.5" />
    {/* TV Video Camera on Right */}
    <rect x="40" y="18" width="18" height="14" rx="2" fill="#78909C" stroke="#374151" strokeWidth="2" />
    <polygon points="58,22 62,19 62,31 58,28" fill="#374151" />
    {/* Camera Reels / Display */}
    <circle cx="45" cy="25" r="3" fill="#FFFFFF" stroke="#374151" strokeWidth="1.5" />
    <circle cx="53" cy="25" r="3" fill="#FFFFFF" stroke="#374151" strokeWidth="1.5" />
    {/* Play Button Indicator */}
    <circle cx="48" cy="42" r="6" fill="#FFFFFF" stroke="#374151" strokeWidth="2" />
    <polygon points="46,39 52,42 46,45" fill="#E53935" />
  </svg>
);

// 11. ফায়ার সার্ভিস (Fire Service Station)
export const IconFireService: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Roof and Tower */}
    <path d="M10 20L32 10L54 20H10Z" fill="#37474F" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="26" y="6" width="12" height="6" fill="#EF5350" stroke="#374151" strokeWidth="2" />
    {/* Main Station Building */}
    <rect x="12" y="20" width="40" height="34" rx="2" fill="#FF5252" stroke="#374151" strokeWidth="2.5" />
    {/* Windows */}
    <rect x="18" y="26" width="10" height="8" rx="1" fill="#E0F7FA" stroke="#374151" strokeWidth="2" />
    <rect x="36" y="26" width="10" height="8" rx="1" fill="#E0F7FA" stroke="#374151" strokeWidth="2" />
    {/* Garage Doors for Fire Trucks */}
    <rect x="16" y="38" width="14" height="16" fill="#ECEFF1" stroke="#374151" strokeWidth="2" />
    <rect x="34" y="38" width="14" height="16" fill="#ECEFF1" stroke="#374151" strokeWidth="2" />
    {/* Shutter lines */}
    <line x1="16" y1="42" x2="30" y2="42" stroke="#90A4AE" strokeWidth="1.5" />
    <line x1="16" y1="46" x2="30" y2="46" stroke="#90A4AE" strokeWidth="1.5" />
    <line x1="16" y1="50" x2="30" y2="50" stroke="#90A4AE" strokeWidth="1.5" />
    <line x1="34" y1="42" x2="48" y2="42" stroke="#90A4AE" strokeWidth="1.5" />
    <line x1="34" y1="46" x2="48" y2="46" stroke="#90A4AE" strokeWidth="1.5" />
    <line x1="34" y1="50" x2="48" y2="50" stroke="#90A4AE" strokeWidth="1.5" />
  </svg>
);

// 12. বিদ্যুৎ অফিস (Electricity Power Pole & Worker)
export const IconElectricity: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Power Pole in Background */}
    <rect x="46" y="14" width="5" height="42" fill="#8D6E63" stroke="#374151" strokeWidth="2" />
    <rect x="38" y="20" width="20" height="4" fill="#8D6E63" stroke="#374151" strokeWidth="2" />
    <circle cx="40" cy="18" r="2" fill="#78909C" />
    <circle cx="56" cy="18" r="2" fill="#78909C" />
    {/* Electric Transformer Box */}
    <rect x="42" y="28" width="12" height="14" rx="2" fill="#78909C" stroke="#374151" strokeWidth="2" />
    {/* Electrician Worker */}
    <circle cx="24" cy="20" r="7" fill="#FFE082" stroke="#374151" strokeWidth="2" />
    {/* Safety Helmet */}
    <path d="M17 18C17 12 20 10 24 10C28 10 31 12 31 18H17Z" fill="#FFA000" stroke="#374151" strokeWidth="2" />
    {/* Safety Goggles */}
    <rect x="19" y="17" width="10" height="3" rx="1.5" fill="#4FC3F7" stroke="#374151" strokeWidth="1" />
    {/* Blue Uniform & Tool Belt */}
    <path d="M12 50C12 38 16 32 24 32C32 32 36 38 36 50H12Z" fill="#1E88E5" stroke="#374151" strokeWidth="2.5" />
    <path d="M18 32L12 46" stroke="#FFA726" strokeWidth="3" />
  </svg>
);

// 13. ডাক্তার (Doctor with Stethoscope)
export const IconDoctor: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Doctor Head */}
    <circle cx="32" cy="18" r="8" fill="#FFCCBC" stroke="#374151" strokeWidth="2" />
    <path d="M24 16C24 11 27 8 32 8C37 8 40 11 40 16H24Z" fill="#455A64" />
    {/* White Medical Coat */}
    <path d="M16 48C16 36 22 30 32 30C42 30 48 36 48 48H16Z" fill="#ECEFF1" stroke="#374151" strokeWidth="2.5" />
    <path d="M28 30L32 40L36 30" fill="#81D4FA" />
    {/* Stethoscope */}
    <path d="M25 32C25 40 39 40 39 32" stroke="#37474F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="32" cy="42" r="3" fill="#78909C" stroke="#374151" strokeWidth="1.5" />
  </svg>
);

// 14. ভেটেরিনারি (Veterinary / Person with Puppy Pet Dog)
export const IconVeterinary: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Vet Person */}
    <circle cx="34" cy="18" r="7" fill="#FFE0B2" stroke="#374151" strokeWidth="2" />
    <path d="M26 16C26 11 29 8 34 8C39 8 42 11 42 16H26Z" fill="#5D4037" />
    <path d="M24 48C24 36 28 30 36 30C44 30 48 36 48 48H24Z" fill="#4FC3F7" stroke="#374151" strokeWidth="2" />
    {/* Puppy Dog */}
    <circle cx="20" cy="38" r="7" fill="#D7CCC8" stroke="#374151" strokeWidth="2" />
    <ellipse cx="14" cy="34" rx="2" ry="4" fill="#8D6E63" />
    <ellipse cx="26" cy="34" rx="2" ry="4" fill="#8D6E63" />
    <path d="M12 48C12 42 15 40 20 40C25 40 28 42 28 48H12Z" fill="#BCAAA4" stroke="#374151" strokeWidth="2" />
    <circle cx="18" cy="37" r="1.5" fill="#212121" />
    <circle cx="22" cy="37" r="1.5" fill="#212121" />
    <ellipse cx="20" cy="40" rx="1.5" ry="1" fill="#5D4037" />
  </svg>
);

// 15. হাসপাতাল (Hospital Building with Red Cross)
export const IconHospital: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Hospital Main Facade */}
    <rect x="12" y="16" width="40" height="38" rx="3" fill="#E1F5FE" stroke="#374151" strokeWidth="2.5" />
    <path d="M8 16H56V20H8V16Z" fill="#EF5350" stroke="#374151" strokeWidth="2" />
    {/* Red Cross Symbol at Top */}
    <rect x="29" y="8" width="6" height="14" rx="1" fill="#E53935" stroke="#374151" strokeWidth="1.5" />
    <rect x="25" y="12" width="14" height="6" rx="1" fill="#E53935" stroke="#374151" strokeWidth="1.5" />
    {/* Hospital Windows */}
    <rect x="16" y="24" width="8" height="6" rx="1" fill="#81D4FA" stroke="#374151" strokeWidth="1.5" />
    <rect x="40" y="24" width="8" height="6" rx="1" fill="#81D4FA" stroke="#374151" strokeWidth="1.5" />
    <rect x="16" y="34" width="8" height="6" rx="1" fill="#81D4FA" stroke="#374151" strokeWidth="1.5" />
    <rect x="40" y="34" width="8" height="6" rx="1" fill="#81D4FA" stroke="#374151" strokeWidth="1.5" />
    {/* Hospital Main Entrance */}
    <rect x="26" y="36" width="12" height="18" fill="#42A5F5" stroke="#374151" strokeWidth="2" />
    <line x1="32" y1="36" x2="32" y2="54" stroke="#FFFFFF" strokeWidth="2" />
  </svg>
);

// 16. প্যাথলজি (Pathology Test Tubes & Chemicals)
export const IconPathology: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Test Tube Stand */}
    <rect x="10" y="44" width="44" height="6" rx="2" fill="#B0BEC5" stroke="#374151" strokeWidth="2" />
    {/* Left Tube */}
    <rect x="16" y="18" width="8" height="26" rx="4" fill="#E1F5FE" stroke="#374151" strokeWidth="2" />
    <path d="M16 30C16 30 18 32 20 32C22 32 24 30 24 30V40C24 42.2 22.2 44 20 44C17.8 44 16 42.2 16 40V30Z" fill="#FFA726" />
    {/* Right Flask / Tube */}
    <rect x="30" y="14" width="8" height="30" rx="4" fill="#E1F5FE" stroke="#374151" strokeWidth="2" />
    <path d="M30 24C30 24 32 26 34 26C36 26 38 24 38 24V40C38 42.2 36.2 44 34 44C31.8 44 30 42.2 30 40V24Z" fill="#29B6F6" />
    {/* Bubbles */}
    <circle cx="34" cy="18" r="1.5" fill="#4FC3F7" />
    <circle cx="20" cy="24" r="1.5" fill="#FFB74D" />
    {/* Molecules / Chemical Reaction */}
    <circle cx="48" cy="22" r="5" fill="#EF5350" stroke="#374151" strokeWidth="1.5" />
    <circle cx="42" cy="14" r="3" fill="#FFA726" stroke="#374151" strokeWidth="1.5" />
    <circle cx="54" cy="14" r="3" fill="#FFA726" stroke="#374151" strokeWidth="1.5" />
  </svg>
);

// 17. অ্যাম্বুলেন্স (Ambulance Vehicle)
export const IconAmbulance: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Siren Flashing */}
    <path d="M24 10L22 6M32 8V4M40 10L42 6" stroke="#E53935" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="26" y="10" width="12" height="5" rx="2" fill="#E53935" stroke="#374151" strokeWidth="2" />
    {/* Ambulance Body */}
    <path d="M10 24H38L48 30L52 38V44H10V24Z" fill="#FFFFFF" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Front Cabin Windshield */}
    <path d="M40 26L48 31V38H40V26Z" fill="#81D4FA" stroke="#374151" strokeWidth="1.5" />
    {/* Red Medical Cross on Body */}
    <rect x="22" y="28" width="4" height="12" fill="#E53935" />
    <rect x="18" y="32" width="12" height="4" fill="#E53935" />
    {/* Red Side Stripe */}
    <rect x="10" y="40" width="42" height="4" fill="#E53935" />
    {/* Wheels */}
    <circle cx="18" cy="46" r="6" fill="#212121" stroke="#374151" strokeWidth="2" />
    <circle cx="18" cy="46" r="2.5" fill="#B0BEC5" />
    <circle cx="44" cy="46" r="6" fill="#212121" stroke="#374151" strokeWidth="2" />
    <circle cx="44" cy="46" r="2.5" fill="#B0BEC5" />
  </svg>
);

// 18. রক্তদাতা (Blood Donor Drop with Cross)
export const IconBloodDonor: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Small drops at top/side */}
    <path d="M16 22C16 18 19 14 19 14C19 14 22 18 22 22C22 24.2 20.2 26 19 26C17.8 26 16 24.2 16 22Z" fill="#EF5350" />
    <path d="M45 22C45 18 48 14 48 14C48 14 51 18 51 22C51 24.2 49.2 26 48 26C46.8 26 45 24.2 45 22Z" fill="#EF5350" />
    {/* Main Heart Blood Droplet */}
    <path d="M32 8C32 8 14 26 14 40C14 50 22 58 32 58C42 58 50 50 50 40C50 26 32 8 32 8Z" fill="#E53935" stroke="#B71C1C" strokeWidth="2.5" strokeLinejoin="round" />
    {/* White Cross in Center */}
    <rect x="29" y="30" width="6" height="18" rx="1.5" fill="#FFFFFF" />
    <rect x="23" y="36" width="18" height="6" rx="1.5" fill="#FFFFFF" />
  </svg>
);

// 19. কুরিয়ার সার্ভিস (Courier Delivery Guy with Packages)
export const IconCourier: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Delivery Person */}
    <circle cx="28" cy="18" r="7" fill="#FFE0B2" stroke="#374151" strokeWidth="2" />
    {/* Red Cap */}
    <path d="M20 16C20 11 23 8 28 8C33 8 36 11 36 16H20Z" fill="#E53935" stroke="#374151" strokeWidth="2" />
    <path d="M28 12H38V15H28V12Z" fill="#E53935" />
    {/* Yellow/Orange Uniform */}
    <path d="M16 48C16 36 20 30 28 30C36 30 40 36 40 48H16Z" fill="#FFA726" stroke="#374151" strokeWidth="2" />
    {/* Parcel Boxes in Arms */}
    <rect x="28" y="32" width="22" height="14" rx="2" fill="#FFE082" stroke="#374151" strokeWidth="2" />
    <line x1="39" y1="32" x2="39" y2="46" stroke="#FFB300" strokeWidth="2" />
    <rect x="34" y="24" width="18" height="10" rx="2" fill="#FFCC80" stroke="#374151" strokeWidth="2" />
    <line x1="43" y1="24" x2="43" y2="34" stroke="#FFA726" strokeWidth="2" />
  </svg>
);

// 20. গাড়ী ভাড়া (Car Rental with "RENT" Signboard)
export const IconCarRental: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* "RENT" Roof Signboard */}
    <rect x="20" y="8" width="24" height="10" rx="2" fill="#E8EAF6" stroke="#374151" strokeWidth="2" />
    <text x="32" y="16" fontSize="7" fontWeight="bold" fill="#1A237E" textAnchor="middle" fontFamily="sans-serif">RENT</text>
    {/* Car Roof & Windshield */}
    <path d="M18 28L22 18H42L46 28H18Z" fill="#81D4FA" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
    {/* Car Body */}
    <rect x="10" y="28" width="44" height="18" rx="5" fill="#29B6F6" stroke="#374151" strokeWidth="2.5" />
    {/* Headlights */}
    <rect x="12" y="32" width="6" height="5" rx="1.5" fill="#FFF59D" stroke="#374151" strokeWidth="1.5" />
    <rect x="46" y="32" width="6" height="5" rx="1.5" fill="#FFF59D" stroke="#374151" strokeWidth="1.5" />
    {/* Radiator Grille */}
    <rect x="22" y="34" width="20" height="8" rx="2" fill="#0288D1" stroke="#374151" strokeWidth="1.5" />
    {/* Wheels */}
    <rect x="12" y="44" width="10" height="8" rx="2" fill="#212121" stroke="#374151" strokeWidth="2" />
    <rect x="42" y="44" width="10" height="8" rx="2" fill="#212121" stroke="#374151" strokeWidth="2" />
  </svg>
);

// 21. হোন্ডা ভাড়া (Motorcycle / Bike Rental)
export const IconMotorcycle: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wheels */}
    <circle cx="16" cy="42" r="10" fill="#ECEFF1" stroke="#374151" strokeWidth="3" />
    <circle cx="16" cy="42" r="4" fill="#78909C" />
    <circle cx="48" cy="42" r="10" fill="#ECEFF1" stroke="#374151" strokeWidth="3" />
    <circle cx="48" cy="42" r="4" fill="#78909C" />
    {/* Bike Chassis and Body */}
    <path d="M16 42L28 32L38 32L48 42" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 32L34 22L42 22" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Fuel Tank */}
    <path d="M26 28C26 24 30 22 36 22H40L38 28H26Z" fill="#E53935" stroke="#374151" strokeWidth="2" />
    {/* Seat */}
    <rect x="20" y="24" width="10" height="4" rx="2" fill="#212121" />
    {/* Handlebar & Headlight */}
    <path d="M42 22L44 16H40" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="46" cy="18" r="2.5" fill="#FFF59D" stroke="#374151" strokeWidth="1" />
  </svg>
);

// 22. নৌযান / ফেরি (Boat & Ferry)
export const IconBoat: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Water Waves */}
    <path d="M6 50Q14 46 22 50Q30 54 38 50Q46 46 54 50Q58 52 62 50" stroke="#0288D1" strokeWidth="3" strokeLinecap="round" />
    {/* Wooden Boat Hull */}
    <path d="M10 40L16 48H48L54 40H10Z" fill="#8D6E63" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Canopy Roof */}
    <path d="M18 30C18 24 24 22 32 22C40 22 46 24 46 30V40H18V30Z" fill="#FFE082" stroke="#374151" strokeWidth="2" />
    {/* Windows */}
    <rect x="24" y="28" width="6" height="6" rx="1" fill="#81D4FA" stroke="#374151" strokeWidth="1.5" />
    <rect x="34" y="28" width="6" height="6" rx="1" fill="#81D4FA" stroke="#374151" strokeWidth="1.5" />
  </svg>
);

// 23. ট্রেন (Train)
export const IconTrain: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Train Front Body */}
    <rect x="14" y="10" width="36" height="42" rx="6" fill="#00897B" stroke="#374151" strokeWidth="2.5" />
    {/* Windshield */}
    <rect x="18" y="16" width="28" height="14" rx="3" fill="#E0F2F1" stroke="#374151" strokeWidth="2" />
    {/* Headlights */}
    <circle cx="22" cy="42" r="4" fill="#FFF59D" stroke="#374151" strokeWidth="2" />
    <circle cx="42" cy="42" r="4" fill="#FFF59D" stroke="#374151" strokeWidth="2" />
    {/* Rails */}
    <line x1="8" y1="56" x2="56" y2="56" stroke="#78909C" strokeWidth="3" strokeLinecap="round" />
    <line x1="18" y1="52" x2="14" y2="60" stroke="#374151" strokeWidth="2" />
    <line x1="46" y1="52" x2="50" y2="60" stroke="#374151" strokeWidth="2" />
  </svg>
);

// 24. বাস (Bus)
export const IconBus: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bus Body */}
    <rect x="12" y="12" width="40" height="40" rx="6" fill="#FFA000" stroke="#374151" strokeWidth="2.5" />
    {/* Top Route Banner */}
    <rect x="20" y="16" width="24" height="6" rx="1.5" fill="#212121" />
    {/* Windshield */}
    <rect x="16" y="24" width="32" height="14" rx="2" fill="#E0F7FA" stroke="#374151" strokeWidth="2" />
    {/* Headlights */}
    <circle cx="18" cy="44" r="3" fill="#FFF9C4" stroke="#374151" strokeWidth="1.5" />
    <circle cx="46" cy="44" r="3" fill="#FFF9C4" stroke="#374151" strokeWidth="1.5" />
    {/* Wheels */}
    <rect x="14" y="50" width="8" height="6" rx="2" fill="#212121" />
    <rect x="42" y="50" width="8" height="6" rx="2" fill="#212121" />
  </svg>
);

// 25. ফার্মেসি (Pharmacy)
export const IconPharmacy: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Medicine Pill Capsule */}
    <path d="M16 28L28 16C33 11 41 11 46 16C51 21 51 29 46 34L34 46C29 51 21 51 16 46C11 41 11 33 16 28Z" fill="#EF5350" stroke="#374151" strokeWidth="2.5" />
    <path d="M22 34L34 22L46 34L34 46C29 51 21 51 16 46C11 41 11 33 16 28L22 34Z" fill="#FFFFFF" />
    {/* Green Cross Emblem */}
    <circle cx="44" cy="44" r="10" fill="#43A047" stroke="#374151" strokeWidth="2" />
    <rect x="42" y="38" width="4" height="12" fill="#FFFFFF" />
    <rect x="38" y="42" width="12" height="4" fill="#FFFFFF" />
  </svg>
);

// 26. বাজার ও দোকান (Market & Shop)
export const IconMarket: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Store Awning */}
    <path d="M10 24L14 12H50L54 24H10Z" fill="#EF5350" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M18 12V24M26 12V24M34 12V24M42 12V24" stroke="#FFFFFF" strokeWidth="3" />
    {/* Store Building */}
    <rect x="14" y="24" width="36" height="30" fill="#FFF9C4" stroke="#374151" strokeWidth="2.5" />
    {/* Shop Window & Display */}
    <rect x="18" y="30" width="12" height="16" rx="1" fill="#81D4FA" stroke="#374151" strokeWidth="1.5" />
    {/* Door */}
    <rect x="34" y="32" width="12" height="22" fill="#8D6E63" stroke="#374151" strokeWidth="1.5" />
  </svg>
);

// 27. সরকারি অফিস (Govt Office / Courthouse)
export const IconGovtOffice: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* National Flag on top */}
    <line x1="32" y1="4" x2="32" y2="14" stroke="#374151" strokeWidth="2" />
    <path d="M32 4H44L40 8L44 12H32V4Z" fill="#43A047" />
    <circle cx="37" cy="8" r="2" fill="#E53935" />
    {/* Pediment Roof */}
    <path d="M8 22L32 12L56 22H8Z" fill="#78909C" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Columns */}
    <rect x="12" y="22" width="40" height="32" fill="#ECEFF1" stroke="#374151" strokeWidth="2" />
    <rect x="16" y="26" width="4" height="24" fill="#B0BEC5" />
    <rect x="26" y="26" width="4" height="24" fill="#B0BEC5" />
    <rect x="34" y="26" width="4" height="24" fill="#B0BEC5" />
    <rect x="44" y="26" width="4" height="24" fill="#B0BEC5" />
    {/* Steps */}
    <rect x="6" y="52" width="52" height="6" rx="2" fill="#78909C" stroke="#374151" strokeWidth="2" />
  </svg>
);

// 28. কৃষি ও খামার (Agriculture & Plants)
export const IconAgriculture: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Soil / Ground */}
    <ellipse cx="32" cy="52" rx="22" ry="6" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" />
    {/* Sprouting Plant */}
    <path d="M32 50V22" stroke="#43A047" strokeWidth="4" strokeLinecap="round" />
    {/* Left Leaf */}
    <path d="M32 36C22 36 14 26 14 18C22 18 32 26 32 36Z" fill="#66BB6A" stroke="#2E7D32" strokeWidth="2" />
    {/* Right Leaf */}
    <path d="M32 28C42 28 50 18 50 10C42 10 32 18 32 28Z" fill="#81C784" stroke="#2E7D32" strokeWidth="2" />
  </svg>
);

// 29. অটো / রিকশা (Auto / CNG)
export const IconAutoRickshaw: React.FC<IconProps> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Green CNG Hood */}
    <path d="M12 28C12 20 18 16 26 16H42L52 28V44H12V28Z" fill="#43A047" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M26 18H40L48 28H26V18Z" fill="#E0F2F1" stroke="#374151" strokeWidth="2" />
    {/* Wheels */}
    <circle cx="20" cy="46" r="6" fill="#212121" stroke="#374151" strokeWidth="2" />
    <circle cx="44" cy="46" r="6" fill="#212121" stroke="#374151" strokeWidth="2" />
  </svg>
);
