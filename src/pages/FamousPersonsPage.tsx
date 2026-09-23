import React, { useState } from 'react';
import { Award, ArrowLeft, Share2, X } from 'lucide-react';
import { STATIC_FAMOUS_PERSONS, FamousPerson } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';

interface FamousPersonsPageProps {
  navigate: (path: string) => void;
}

export const FamousPersonsPage: React.FC<FamousPersonsPageProps> = ({ navigate }) => {
  const { showToast } = useData();
  const [selectedPerson, setSelectedPerson] = useState<FamousPerson | null>(null);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'বোয়ালখালীর কৃতি ব্যক্তিত্ব',
        text: 'বোয়ালখালী উপজেলার ঐতিহাসিক ও প্রখ্যাত মনীষীদের জীবনী ও অবদান।',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('লিংক কপি করা হয়েছে!', 'success');
    }
  };

  return (
    <div className="space-y-5 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] rounded-2xl transition-colors cursor-pointer"
            title="হোমে ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-bold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
              ঐতিহাসিক মনীষী ও গৌরব
            </span>
            <h1 className="text-lg sm:text-2xl font-black text-[#050505] tracking-tight mt-0.5">
              কৃতি ব্যক্তিত্ব
            </h1>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="p-2.5 bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] rounded-2xl transition-colors cursor-pointer"
          title="শেয়ার করুন"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Famous Persons Grid */}
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

      {/* Person Detail Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-12 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedPerson(null)}
          />

          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E4E6EB] animate-in zoom-in-95 duration-150 z-10 p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-4">
                <img
                  src={selectedPerson.image}
                  alt={selectedPerson.name}
                  className="w-20 h-24 rounded-2xl object-cover bg-gray-100 border border-[#E4E6EB] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    {selectedPerson.period}
                  </span>
                  <h3 className="font-bold text-lg sm:text-xl text-[#050505] mt-1">
                    {selectedPerson.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#1877F2]">{selectedPerson.title}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPerson(null)}
                className="w-8 h-8 rounded-full bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#E4E6EB]">
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                <span className="text-[11px] font-bold text-purple-900 block mb-0.5">মূল অবদান:</span>
                <p className="text-xs text-purple-800 leading-relaxed">{selectedPerson.contribution}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#65676B] block mb-1">জীবনী ও পরিচিতি:</span>
                <p className="text-xs sm:text-sm text-[#050505] leading-relaxed bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                  {selectedPerson.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
