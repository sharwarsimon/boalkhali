import React from 'react';
import { PhoneCall, ShieldAlert, HeartPulse, Bus, MapPin, Mail, Landmark, Store, Briefcase } from 'lucide-react';
import { useData } from '../../context/DataContext.js';
import { BoalkhaliLogo } from './BoalkhaliLogo.js';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings } = useData();

  return (
    <footer className="hidden md:block bg-white text-[#65676B] border-t border-[#E4E6EB] mt-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1: About */}
          <div className="space-y-2.5">
            <div className="cursor-pointer inline-block" onClick={() => navigate('/')}>
              <BoalkhaliLogo size="md" />
            </div>
            <p className="text-xs text-[#65676B] leading-relaxed">
              {settings?.about_text ||
                'Boalkhali.com হলো চট্টগ্রামের বোয়ালখালী উপজেলার স্থানীয় নাগরিক তথ্য, জরুরি সেবা, স্বাস্থ্য, অ্যাম্বুলেন্স, পরিবহন ও শপ ডিরেক্টরির সম্পূর্ণ ডিজিটাল প্ল্যাটফর্ম।'}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#050505] mb-2.5">
              গুরুত্বপূর্ণ বিভাগ
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('/upozila-info')}
                  className="hover:text-[#1877F2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Landmark className="w-3.5 h-3.5 text-[#1877F2]" />
                  উপজেলা পরিচিতি ও ইউনিয়ন
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/emergency-numbers')}
                  className="hover:text-[#1877F2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#1877F2]" />
                  জরুরি অ্যাম্বুলেন্স ও পুলিশ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/jobs')}
                  className="hover:text-[#1877F2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#1877F2]" />
                  চাকরি ও ক্যারিয়ার
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop')}
                  className="hover:text-[#1877F2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5 text-[#1877F2]" />
                  বোয়ালখালী শপ ও মার্কেট
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/chat')}
                  className="hover:text-[#1877F2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  লাইভ চ্যাট ও সহায়তা
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#050505] mb-2.5">
              যোগাযোগ ও ঠিকানা
            </h4>
            <div className="text-xs text-[#65676B] flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
                {settings?.address || 'বোয়ালখালী উপজেলা পরিষদ সংলগ্ন, চট্টগ্রাম'}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
                {settings?.contact_email || 'info@boalkhali.com'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 mt-6 border-t border-[#E4E6EB] flex flex-col sm:flex-row items-center justify-between text-xs text-[#65676B] gap-2">
          <div>
            © {new Date().getFullYear()} Boalkhali.com • সর্বস্বত্ব সংরক্ষিত
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button onClick={() => navigate('/adm/login')} className="hover:text-[#1877F2] transition-colors cursor-pointer">
              অ্যাডমিন পোর্টাল
            </button>
            <span>•</span>
            <button onClick={() => navigate('/account')} className="hover:text-[#1877F2] transition-colors cursor-pointer">
              অ্যাকাউন্ট
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
