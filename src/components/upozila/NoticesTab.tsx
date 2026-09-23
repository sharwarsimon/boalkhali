import React from 'react';
import { FileText, Bell, Calendar, Download, AlertCircle, CheckCircle2 } from 'lucide-react';

export const NoticesTab: React.FC = () => {
  const notices = [
    {
      title: 'বোয়ালখালী উপজেলায় জাতীয় স্মার্ট জাতীয় পরিচয়পত্র বিতরণ কার্যক্রম সংক্রান্ত বিজ্ঞপ্তি',
      date: '০১ সেপ্টেম্বর ২০২৬',
      dept: 'উপজেলা নির্বাচন অফিস, বোয়ালখালী',
      category: 'নির্বাচন ও পরিচয়পত্র',
      summary: 'বোয়ালখালী উপজেলার বিভিন্ন ইউনিয়নের ভোটারদের জন্য নতুন স্মার্ট এনআইডি কার্ড বিতরণ ক্যাম্পেইন নির্ধারিত সূচি অনুযায়ী সংশ্লিষ্ট ইউনিয়ন পরিষদ কার্যালয়ে অনুষ্ঠিত হবে।',
      important: true,
    },
    {
      title: 'উপজেলা পর্যায়ে বিনামূল্যে এইচপিভি ও নিয়মিত টিকাদান কর্মসূচি ২০২৬',
      date: '২৮ আগস্ট ২০২৬',
      dept: 'উপজেলা স্বাস্থ্য কমপ্লেক্স, বোয়ালখালী',
      category: 'স্বাস্থ্য অধিদপ্তর',
      summary: 'সকল শিক্ষা প্রতিষ্ঠানের ১০ থেকে ১৪ বছর বয়সী কিশোরী শিক্ষার্থীদের জন্য বিনামূল্যে এইচপিভি টিকাদান কার্যক্রম পুরোদমে শুরু হয়েছে। অভিভাবকদের টিকা কার্ড নিয়ে আসার অনুরোধ করা হচ্ছে।',
      important: false,
    },
    {
      title: 'খাস জমি ইজারা ও জলমহাল নবায়ন সংক্রান্ত সরকারি বিজ্ঞপ্তি',
      date: '২৫ আগস্ট ২০২৬',
      dept: 'সহকারী কমিশনার (ভূমি) কার্যালয়',
      category: 'ভূমি প্রশাসন',
      summary: 'বোয়ালখালী উপজেলার অভ্যন্তরে অবস্থিত সরকারি খাস জমি ও জলমহালসমূহের উন্মুক্ত নিলাম ও ইজারা প্রদানের আবেদনপত্র আহবান করা হয়েছে।',
      important: false,
    },
    {
      title: 'টিসিবি ফ্যামিলি কার্ডে ভর্তুকিমূল্যে খাদ্যপণ্য বিতরণ শিডিউল',
      date: '২২ আগস্ট ২০২৬',
      dept: 'উপজেলা নির্বাহী কর্মকর্তার কার্যালয়',
      category: 'জনকল্যাণ ও খাদ্য',
      summary: 'বোয়ালখালী পৌরসভা ও ৯টি ইউনিয়নের কার্ডধারী পরিবারের মাঝে চাল, ডাল ও ভোজ্যতেল নির্দিষ্ট ওয়ার্ডভিত্তিক পয়েন্টে বিতরণ করা হচ্ছে।',
      important: true,
    },
    {
      title: 'বোয়ালখালী পৌর এলাকায় পরিবেশ পরিচ্ছন্নতা ও নালা-নর্দমা উন্মুক্ত রাখার নির্দেশ',
      date: '১৮ আগস্ট ২০২৬',
      dept: 'বোয়ালখালী পৌরসভা সচিবালয়',
      category: 'পৌর নোটিশ',
      summary: 'বর্ষা মৌসুমে জলাবদ্ধতা নিরসন এবং মশার বংশবৃদ্ধি রোধে সড়ক ও ড্রেনে বর্জ্য না ফেলতে এবং বাড়ির চারপাশ পরিচ্ছন্ন রাখতে পৌরবাসীর প্রতি বিশেষ অনুরোধ জানানো হলো।',
      important: false,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Notice Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#050505]">উপজেলা নোটিশ বোর্ড ও গেজেট</h2>
            <p className="text-xs text-[#65676B]">বোয়ালখালী উপজেলা প্রশাসন ও সংশ্লিষ্ট সরকারি দপ্তরসমূহের অফিসিয়াল সার্কুলার</p>
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {notices.map((notice, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all space-y-2.5 shadow-2xs ${
              notice.important ? 'border-amber-300 bg-amber-50/20' : 'border-[#E4E6EB]'
            }`}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                  {notice.category}
                </span>
                {notice.important && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>জরুরি নোটিশ</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-[11px] text-[#65676B]">
                <Calendar className="w-3 h-3" />
                <span>{notice.date}</span>
              </div>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-[#050505] leading-snug">
              {notice.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              {notice.summary}
            </p>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#65676B]">
              <span className="font-semibold text-gray-700">{notice.dept}</span>
              <span className="text-[11px] text-[#1877F2] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>বিজ্ঞপ্তি প্রকাশিত</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
