import React from 'react';
import { Building, ArrowLeft, Share2 } from 'lucide-react';
import { MunicipalityTab } from '../components/upozila/MunicipalityTab.js';
import { useData } from '../context/DataContext.js';

interface MunicipalityPageProps {
  navigate: (path: string) => void;
}

export const MunicipalityPage: React.FC<MunicipalityPageProps> = ({ navigate }) => {
  const { showToast } = useData();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} (${text}) কপি করা হয়েছে!`, 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'বোয়ালখালী পৌরসভা তথ্য ও নাগরিক সেবা',
        text: 'বোয়ালখালী পৌরসভার ১-৯ নং ওয়ার্ড, কাউন্সিলর ও নাগরিক সেবাসমূহের তালিকা।',
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
            <span className="text-[11px] font-bold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
              পৌর প্রশাসন ও নাগরিক পরিষদ
            </span>
            <h1 className="text-lg sm:text-2xl font-black text-[#050505] tracking-tight mt-0.5">
              পৌরসভা তথ্য
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

      {/* Municipality Tab */}
      <MunicipalityTab onCopy={handleCopy} />
    </div>
  );
};
