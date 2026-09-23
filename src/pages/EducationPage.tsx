import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  School, 
  Building2, 
  Search, 
  MapPin, 
  Phone, 
  Hash, 
  Copy, 
  Check, 
  Filter, 
  ChevronRight, 
  UserCheck, 
  Calendar,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { STATIC_EDUCATION_INSTITUTES, EducationInstitute } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';

interface EducationPageProps {
  navigate: (path: string) => void;
  currentPath?: string;
  initialType?: string;
}

export const EducationPage: React.FC<EducationPageProps> = ({ navigate, currentPath, initialType }) => {
  const { showToast } = useData();
  const [selectedType, setSelectedType] = useState<string>(initialType || 'all');
  const [selectedUnion, setSelectedUnion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedEiin, setCopiedEiin] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Sync with URL query parameter or initialType on load or path change
  useEffect(() => {
    if (initialType && ['all', 'primary', 'secondary', 'college', 'madrasa'].includes(initialType)) {
      setSelectedType(initialType);
      return;
    }

    const queryStr = currentPath?.includes('?')
      ? currentPath.split('?')[1]
      : (window.location.search ? window.location.search.replace('?', '') : '');
    const urlParams = new URLSearchParams(queryStr);
    const typeParam = urlParams.get('type');
    const unionParam = urlParams.get('union');

    if (typeParam && ['all', 'primary', 'secondary', 'college', 'madrasa'].includes(typeParam)) {
      setSelectedType(typeParam);
    } else if (!typeParam) {
      setSelectedType('all');
    }
    if (unionParam) {
      setSelectedUnion(unionParam);
    }
  }, [currentPath, initialType]);

  const handleCopyEiin = (eiin: string, name: string) => {
    navigator.clipboard.writeText(eiin);
    setCopiedEiin(eiin);
    showToast(`${name}-এর EIIN কোড (${eiin}) কপি হয়েছে!`, 'success');
    setTimeout(() => setCopiedEiin(null), 2500);
  };

  const handleCopyPhone = (phone: string, name: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    showToast(`${name}-এর যোগাযোগ নম্বর (${phone}) কপি হয়েছে!`, 'success');
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const categories = [
    { id: 'all', label: 'সকল শিক্ষা প্রতিষ্ঠান', count: '১৩০+', icon: GraduationCap, color: 'bg-blue-600' },
    { id: 'primary', label: 'প্রাথমিক বিদ্যালয়', count: '৮২টি', icon: School, color: 'bg-emerald-600' },
    { id: 'secondary', label: 'মাধ্যমিক বিদ্যালয়', count: '২৮টি', icon: BookOpen, color: 'bg-indigo-600' },
    { id: 'college', label: 'কলেজ', count: '৬টি', icon: Building2, color: 'bg-purple-600' },
    { id: 'madrasa', label: 'মাদ্রাসা', count: '১৪টি', icon: Layers, color: 'bg-teal-600' },
  ];

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

  // Filter logic
  const filteredInstitutes = STATIC_EDUCATION_INSTITUTES.filter((item) => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesUnion = selectedUnion === 'all' || selectedUnion === 'সব' || item.union.includes(selectedUnion) || selectedUnion.includes(item.union);
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) ||
      item.eiin.includes(query) ||
      item.village.toLowerCase().includes(query) ||
      item.union.toLowerCase().includes(query) ||
      (item.headName && item.headName.toLowerCase().includes(query));

    return matchesType && matchesUnion && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#E4E6EB] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center cursor-pointer transition-colors"
              title="হোমে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#050505] flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-600 inline" />
                <span>বোয়ালখালী শিক্ষা প্রতিষ্ঠান ডিরেক্টরি</span>
              </h1>
              <p className="text-xs text-[#65676B]">প্রাথমিক, মাধ্যমিক, কলেজ ও মাদ্রাসার EIIN কোড, ইউনিয়ন ও গ্রাম ভিত্তিক তালিকা</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl">
              মোট প্রতিষ্ঠান: ১৩০+ টি
            </span>
          </div>
        </div>

        {/* Horizontal Category Type Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#E4E6EB] pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedType === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedType(cat.id);
                  const newUrl = cat.id === 'all' ? '/education' : `/education?type=${cat.id}`;
                  window.history.replaceState({}, '', newUrl);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? `${cat.color} text-white border-transparent shadow-xs`
                    : 'bg-[#F0F2F5] text-[#050505] border-transparent hover:bg-[#E4E6EB]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-white text-gray-700'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Union Filter & Search Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {/* Union Selector */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#65676B] shrink-0">ইউনিয়ন:</span>
              <select
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value)}
                className="w-full py-2 px-3 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs font-semibold text-[#050505] focus:bg-white focus:outline-[#1877F2] cursor-pointer"
              >
                <option value="all">সকল ইউনিয়ন ও পৌরসভা (সব)</option>
                {unionsList.filter(u => u !== 'সব').map((un) => (
                  <option key={un} value={un}>
                    {un}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="নাম, EIIN কোড বা গ্রাম দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:outline-[#1877F2]"
            />
          </div>
        </div>
      </div>

      {/* Institutes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredInstitutes.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl p-6 border border-[#E4E6EB] text-[#65676B] space-y-2">
            <GraduationCap className="w-10 h-10 mx-auto text-gray-300" />
            <p className="font-bold text-sm text-[#050505]">কোনো শিক্ষা প্রতিষ্ঠান পাওয়া যায়নি</p>
            <p className="text-xs">ফিল্টার বা অনুসন্ধানের শব্দ পরিবর্তন করে চেষ্টা করুন।</p>
          </div>
        ) : (
          filteredInstitutes.map((inst) => {
            const isPrimary = inst.type === 'primary';
            const isSecondary = inst.type === 'secondary';
            const isCollege = inst.type === 'college';
            const isMadrasa = inst.type === 'madrasa';

            const badgeBg = isPrimary 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : isSecondary 
              ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
              : isCollege 
              ? 'bg-purple-50 text-purple-700 border-purple-200' 
              : 'bg-teal-50 text-teal-700 border-teal-200';

            return (
              <div
                key={inst.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E4E6EB] hover:border-indigo-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Institute Image Header */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={inst.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80'}
                    alt={inst.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Top Type Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs shadow-xs border ${badgeBg}`}>
                      {inst.typeLabel}
                    </span>
                    {inst.management && (
                      <span className="text-[10px] bg-white/90 backdrop-blur-xs text-gray-800 font-bold px-2 py-0.5 rounded-lg shadow-xs">
                        {inst.management}
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Overlay: Name & Year */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                    <p className="text-xs sm:text-sm font-bold truncate drop-shadow-sm">
                      {inst.name}
                    </p>
                    {inst.estdYear && (
                      <p className="text-[10px] text-white/90">
                        স্থাপিত: {inst.estdYear} খ্রি.
                      </p>
                    )}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-3.5 sm:p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isPrimary ? 'bg-emerald-100 text-emerald-700' :
                        isSecondary ? 'bg-indigo-100 text-indigo-700' :
                        isCollege ? 'bg-purple-100 text-purple-700' :
                        'bg-teal-100 text-teal-700'
                      }`}>
                        {isPrimary && <School className="w-4 h-4" />}
                        {isSecondary && <BookOpen className="w-4 h-4" />}
                        {isCollege && <Building2 className="w-4 h-4" />}
                        {isMadrasa && <Layers className="w-4 h-4" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-sm text-[#050505] leading-snug line-clamp-1">
                          {inst.name}
                        </h3>
                        <p className="text-[11px] text-[#65676B] truncate">
                          {inst.village}, {inst.union}
                        </p>
                      </div>
                    </div>

                    {/* Information Grid: EIIN, Union, Village */}
                    <div className="bg-[#F8F9FA] rounded-xl p-2.5 space-y-1.5 text-xs border border-gray-100">
                    {/* EIIN Code */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#65676B] flex items-center gap-1 font-medium">
                        <Hash className="w-3.5 h-3.5 text-indigo-500" />
                        <span>EIIN কোড:</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          {inst.eiin}
                        </span>
                        <button
                          onClick={() => handleCopyEiin(inst.eiin, inst.name)}
                          className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
                          title="EIIN কপি করুন"
                        >
                          {copiedEiin === inst.eiin ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Union */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#65676B] flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span>ইউনিয়ন:</span>
                      </span>
                      <span className="font-semibold text-[#050505]">
                        {inst.union}
                      </span>
                    </div>

                    {/* Village */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#65676B] flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>গ্রাম / এলাকা:</span>
                      </span>
                      <span className="font-semibold text-[#050505]">
                        {inst.village}
                      </span>
                    </div>

                    {/* Head teacher / Principal */}
                    {inst.headName && (
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-200/60">
                        <span className="text-[#65676B] flex items-center gap-1 font-medium">
                          <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                          <span>প্রধান:</span>
                        </span>
                        <span className="text-[11px] font-medium text-gray-700 text-right truncate max-w-[200px]">
                          {inst.headName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                {inst.phone && (
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${inst.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex-1 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 fill-current" />
                      <span>কল করুন ({inst.phone})</span>
                    </a>
                    <button
                      onClick={() => handleCopyPhone(inst.phone!, inst.name)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 cursor-pointer"
                      title="নম্বর কপি করুন"
                    >
                      {copiedPhone === inst.phone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
