import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  MapPin, 
  Award, 
  Sparkles, 
  Phone, 
  Users, 
  Compass, 
  Building, 
  ChevronRight, 
  X, 
  Check, 
  Copy, 
  Navigation,
  Calendar,
  Library,
  Map,
  Mail,
  HeartPulse,
  FileText,
  Trees,
  GraduationCap,
  Moon
} from 'lucide-react';
import { STATIC_UNIONS, STATIC_FAMOUS_PERSONS, STATIC_TOURIST_SPOTS, UnionDetail, FamousPerson, TouristSpot } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';
import { MunicipalityTab } from '../components/upozila/MunicipalityTab.js';
import { HistoryTab } from '../components/upozila/HistoryTab.js';
import { MapTab } from '../components/upozila/MapTab.js';
import { NatureTab } from '../components/upozila/NatureTab.js';
import { PostOfficeTab } from '../components/upozila/PostOfficeTab.js';
import { HospitalTab } from '../components/upozila/HospitalTab.js';
import { NoticesTab } from '../components/upozila/NoticesTab.js';
import { MazarTab } from '../components/upozila/MazarTab.js';
import { AtAGlanceTab } from '../components/upozila/AtAGlanceTab.js';

export type UpozilaTab = 
  | 'info' 
  | 'unions' 
  | 'municipality' 
  | 'history' 
  | 'map' 
  | 'famous' 
  | 'tourist' 
  | 'nature' 
  | 'post_office' 
  | 'hospital' 
  | 'notices'
  | 'mazar';

interface UpozilaInfoPageProps {
  navigate: (path: string) => void;
  currentPath?: string;
}

export const UpozilaInfoPage: React.FC<UpozilaInfoPageProps> = ({ navigate, currentPath }) => {
  const { showToast } = useData();
  const [activeTab, setActiveTab] = useState<UpozilaTab>('info');
  const [selectedUnion, setSelectedUnion] = useState<UnionDetail | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<FamousPerson | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Check URL params for tab or union
  useEffect(() => {
    const queryStr = currentPath?.includes('?')
      ? currentPath.split('?')[1]
      : (window.location.search ? window.location.search.replace('?', '') : '');
    const urlParams = new URLSearchParams(queryStr);
    const tab = urlParams.get('tab');
    const unionId = urlParams.get('union');

    const validTabs: UpozilaTab[] = [
      'info', 'unions', 'municipality', 'history', 'map', 'famous', 
      'tourist', 'nature', 'post_office', 'hospital', 'notices', 'mazar'
    ];

    if (tab && validTabs.includes(tab as UpozilaTab)) {
      setActiveTab(tab as UpozilaTab);
    }

    if (unionId) {
      const u = STATIC_UNIONS.find(un => un.id === unionId);
      if (u) {
        setSelectedUnion(u);
        setActiveTab('unions');
      }
    }
  }, [currentPath]);

  const handleTabChange = (tab: UpozilaTab) => {
    setActiveTab(tab);
    setSelectedUnion(null);
    setSelectedPerson(null);
    setSelectedSpot(null);
    const newUrl = tab === 'info' ? '/upozila-info' : `/upozila-info?tab=${tab}`;
    window.history.replaceState({}, '', newUrl);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(text);
    showToast(`${label} (${text}) কপি করা হয়েছে!`, 'success');
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const tabList: { id: UpozilaTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'info', label: 'একনজরে বোয়ালখালী', icon: Landmark },
    { id: 'unions', label: 'ইউনিয়ন সমুহ', icon: MapPin },
    { id: 'municipality', label: 'পৌরসভা তথ্য', icon: Building },
    { id: 'history', label: 'ইতিহাস ও ঐতিহ্য', icon: Library },
    { id: 'map', label: 'উপজেলা মানচিত্র', icon: Map },
    { id: 'famous', label: 'কৃতি ব্যক্তিত্ব', icon: Award },
    { id: 'tourist', label: 'দর্শনীয় স্থান', icon: Sparkles },
    { id: 'mazar', label: 'মাজার', icon: Moon },
    { id: 'nature', label: 'নদী ও প্রকৃতি', icon: Trees },
    { id: 'post_office', label: 'ডাকঘর ও কোড', icon: Mail },
    { id: 'hospital', label: 'উপজেলা হাসপাতাল', icon: HeartPulse },
    { id: 'notices', label: 'নোটিশ ও গেজেট', icon: FileText },
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Tab Navigation Header */}
      <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#E4E6EB] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#050505]">বোয়ালখালী তথ্য হাব ও গাইড</h1>
              <p className="text-xs text-[#65676B]">উপজেলা পরিচিতি, পৌরসভা, ইউনিয়নসমূহ, ইতিহাস, নদী-প্রকৃতি ও জরুরি তথ্য</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/education')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#1877F2] font-bold rounded-xl text-xs hover:bg-blue-100 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            <span>শিক্ষা প্রতিষ্ঠান হাব</span>
          </button>
        </div>

        {/* Tab Buttons Scrollable Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#E4E6EB] pb-1">
          {tabList.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1877F2] text-white shadow-2xs scale-[1.02]'
                    : 'bg-[#F0F2F5] text-[#65676B] hover:bg-[#E4E6EB] hover:text-[#050505]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: একনজরে বোয়ালখালী */}
      {activeTab === 'info' && (
        <AtAGlanceTab 
          navigate={navigate} 
          onSelectTab={handleTabChange} 
          onCopy={handleCopy} 
        />
      )}

      {/* TAB 2: ইউনিয়ন সমুহ (List of all 9 Unions + Pourashava) */}
      {activeTab === 'unions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STATIC_UNIONS.map((union) => (
              <div
                key={union.id}
                onClick={() => setSelectedUnion(union)}
                className="bg-white rounded-2xl overflow-hidden border border-[#E4E6EB] shadow-2xs hover:border-[#1877F2] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Union Image Banner */}
                  <div className="relative w-full h-36 overflow-hidden bg-gray-100">
                    <img
                      src={union.image}
                      alt={union.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-between p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold bg-[#1877F2] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                          {union.number}
                        </span>
                        <span className="text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                          {union.villages_count}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-blue-200 font-semibold tracking-wide uppercase">
                          আয়তন: {union.area_sqkm}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#050505] group-hover:text-[#1877F2] transition-colors leading-snug">
                        {union.name}
                      </h3>
                      <p className="text-[11px] text-[#65676B]">{union.name_en}</p>
                    </div>

                    <p className="text-xs text-[#65676B] line-clamp-2 leading-relaxed">
                      {union.description}
                    </p>

                    <div className="pt-2 border-t border-gray-100 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#65676B]">চেয়ারম্যান:</span>
                        <strong className="text-[#050505]">{union.chairman_name}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#65676B]">জনসংখ্যা:</span>
                        <strong className="text-[#050505]">{union.population}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2.5 bg-slate-50 border-t border-[#E4E6EB] flex items-center justify-between text-xs font-bold text-[#1877F2]">
                  <span>সম্পূর্ণ তথ্য দেখুন</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: কৃতি ব্যাক্তি */}
      {activeTab === 'famous' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STATIC_FAMOUS_PERSONS.map((person) => (
            <div
              key={person.id}
              onClick={() => setSelectedPerson(person)}
              className="bg-white rounded-2xl overflow-hidden border border-[#E4E6EB] shadow-2xs hover:shadow-md transition-all p-4 flex gap-3.5 cursor-pointer group"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-20 h-24 rounded-xl object-cover bg-gray-100 shrink-0 border border-[#E4E6EB]"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                  {person.period}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-[#050505] group-hover:text-[#1877F2] transition-colors truncate">
                  {person.name}
                </h3>
                <p className="text-xs font-semibold text-[#1877F2] line-clamp-1">{person.title}</p>
                <p className="text-xs text-[#65676B] line-clamp-2 leading-relaxed">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: দর্শনীয় স্থান */}
      {activeTab === 'tourist' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STATIC_TOURIST_SPOTS.map((spot) => (
            <div
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              className="bg-white rounded-2xl overflow-hidden border border-[#E4E6EB] shadow-2xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {spot.type}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-1 text-[11px] text-red-600 font-semibold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{spot.union}</span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#050505] group-hover:text-[#1877F2] transition-colors">
                  {spot.name}
                </h3>

                <p className="text-xs text-[#65676B] line-clamp-2 leading-relaxed">
                  {spot.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: মাজার */}
      {activeTab === 'mazar' && (
        <MazarTab onCopy={handleCopy} />
      )}

      {/* TAB 5: পৌরসভা তথ্য */}
      {activeTab === 'municipality' && (
        <MunicipalityTab onCopy={handleCopy} />
      )}

      {/* TAB 6: ইতিহাস ও ঐতিহ্য */}
      {activeTab === 'history' && (
        <HistoryTab />
      )}

      {/* TAB 7: উপজেলা মানচিত্র */}
      {activeTab === 'map' && (
        <MapTab />
      )}

      {/* TAB 8: নদী ও প্রকৃতি */}
      {activeTab === 'nature' && (
        <NatureTab />
      )}

      {/* TAB 9: ডাকঘর ও কোড */}
      {activeTab === 'post_office' && (
        <PostOfficeTab onCopy={handleCopy} />
      )}

      {/* TAB 10: হাসপাতাল তথ্য */}
      {activeTab === 'hospital' && (
        <HospitalTab onCopy={handleCopy} />
      )}

      {/* TAB 11: নোটিশ ও গেজেট */}
      {activeTab === 'notices' && (
        <NoticesTab />
      )}

      {/* Union Full Details Modal */}
      {selectedUnion && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-12">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedUnion(null)}
          />

          <div className="relative mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150">
            <div className="relative w-full h-48 sm:h-56 bg-gray-200">
              <img
                src={selectedUnion.image}
                alt={selectedUnion.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#1877F2] text-white px-3 py-1 rounded-full shadow-xs">
                    {selectedUnion.number} • {selectedUnion.name_en}
                  </span>
                  <button
                    onClick={() => setSelectedUnion(null)}
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                    {selectedUnion.name}
                  </h2>
                  <p className="text-xs text-blue-200">বোয়ালখালী উপজেলা, চট্টগ্রাম</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">

              <p className="text-xs sm:text-sm text-[#65676B] leading-relaxed bg-[#F0F2F5] p-3.5 rounded-xl border border-[#E4E6EB]">
                {selectedUnion.description}
              </p>

              {/* Stats Box */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center text-xs">
                <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-[#65676B] text-[10px] block">আয়তন</span>
                  <strong className="text-sm font-bold text-[#1877F2]">{selectedUnion.area_sqkm}</strong>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-[#65676B] text-[10px] block">জনসংখ্যা</span>
                  <strong className="text-sm font-bold text-emerald-700">{selectedUnion.population}</strong>
                </div>
                <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100 col-span-2 sm:col-span-1">
                  <span className="text-[#65676B] text-[10px] block">গ্রাম / মহল্লা</span>
                  <strong className="text-sm font-bold text-purple-700">{selectedUnion.villages_count}</strong>
                </div>
              </div>

              {/* Chairman & Secretary Contacts */}
              <div className="bg-white p-3.5 rounded-xl border border-[#E4E6EB] space-y-2.5 text-xs">
                <h4 className="font-bold text-[#050505] text-xs">জনপ্রতিনিধি ও কার্যালয় যোগাযোগ:</h4>
                
                <div className="flex items-center justify-between gap-2 p-2 bg-[#F0F2F5] rounded-lg">
                  <div>
                    <span className="text-[10px] text-[#65676B] block">চেয়ারম্যান</span>
                    <strong className="text-xs text-[#050505]">{selectedUnion.chairman_name}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${selectedUnion.chairman_phone}`}
                      className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{selectedUnion.chairman_phone}</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 p-2 bg-[#F0F2F5] rounded-lg">
                  <div>
                    <span className="text-[10px] text-[#65676B] block">ইউপি সচিব</span>
                    <strong className="text-xs text-[#050505]">{selectedUnion.secretary_name}</strong>
                  </div>
                  <a
                    href={`tel:${selectedUnion.secretary_phone}`}
                    className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{selectedUnion.secretary_phone}</span>
                  </a>
                </div>

                <div className="pt-1 text-[11px] text-[#65676B] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>কার্যালয় অবস্থান: {selectedUnion.office_location}</span>
                </div>
              </div>

              {/* Wards List */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-xs text-[#050505]">ওয়ার্ড ও প্রধান এলাকাসমূহ:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUnion.wards.map((w, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-[#CED0D4] text-[#050505] text-[11px] px-2.5 py-1 rounded-lg"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Landmarks */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-xs text-[#050505]">দর্শনীয় ও গুরুত্বপূর্ণ স্থাপনা:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUnion.landmarks.map((lm, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                    >
                      ★ {lm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Famous Person Detail Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-12">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedPerson(null)}
          />

          <div className="relative mx-auto max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#E4E6EB] flex items-center justify-between bg-slate-50">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                কৃতি ব্যক্তিত্ব
              </span>
              <button
                onClick={() => setSelectedPerson(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-200 text-[#65676B] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex items-center gap-4">
                <img
                  src={selectedPerson.image}
                  alt={selectedPerson.name}
                  className="w-20 h-24 rounded-xl object-cover bg-gray-100 border border-[#E4E6EB]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#050505]">{selectedPerson.name}</h3>
                  <p className="text-xs font-semibold text-[#1877F2]">{selectedPerson.title}</p>
                  <p className="text-[11px] text-[#65676B] mt-0.5">জীবনকাল: {selectedPerson.period} • {selectedPerson.village}</p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-[#65676B] leading-relaxed space-y-2">
                <strong className="text-[#050505] block">জীবনী:</strong>
                <p>{selectedPerson.bio}</p>
              </div>

              <div className="space-y-2">
                <strong className="text-xs text-[#050505] block">ঐতিহাসিক অবদান ও অর্জন:</strong>
                <ul className="space-y-1 text-xs text-[#65676B]">
                  {selectedPerson.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#1877F2] font-bold">✓</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tourist Spot Detail Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-12">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedSpot(null)}
          />

          <div className="relative mx-auto max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#E4E6EB] flex items-center justify-between bg-slate-50">
              <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                {selectedSpot.type}
              </span>
              <button
                onClick={() => setSelectedSpot(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-200 text-[#65676B] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="h-56 w-full rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={selectedSpot.image}
                  alt={selectedSpot.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#050505]">{selectedSpot.name}</h3>
                <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedSpot.union}</span>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#65676B] leading-relaxed">
                {selectedSpot.description}
              </p>

              <div className="bg-[#F0F2F5] p-3.5 rounded-xl border border-[#E4E6EB] space-y-2 text-xs">
                <div className="space-y-0.5">
                  <strong className="text-[#050505] flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#1877F2]" />
                    যাওয়ার উপায়:
                  </strong>
                  <p className="text-[#65676B]">{selectedSpot.howToGo}</p>
                </div>

                <div className="space-y-0.5 pt-1 border-t border-gray-200">
                  <strong className="text-[#050505] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    ভ্রমণের সেরা সময়:
                  </strong>
                  <p className="text-[#65676B]">{selectedSpot.bestTimeToVisit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
