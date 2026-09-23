import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  Share2, 
  ArrowRight, 
  Search, 
  ArrowLeft, 
  User, 
  Tag, 
  Bookmark, 
  Check,
  ChevronRight
} from 'lucide-react';
import { STATIC_NEWS, NewsArticle } from '../data/staticData.js';
import { useData } from '../context/DataContext.js';

interface NewsPageProps {
  navigate: (path: string) => void;
  newsId?: string;
}

export const NewsPage: React.FC<NewsPageProps> = ({ navigate, newsId }) => {
  const { showToast } = useData();
  const [selectedCategory, setSelectedCategory] = useState('সকল');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // If a specific newsId is requested, render the dedicated Single News Page
  const singleArticle = newsId ? STATIC_NEWS.find((item) => item.id === newsId) : null;

  const categories = ['সকল', 'স্থানীয় সংবাদ', 'স্বাস্থ্য ও চিকিৎসা', 'উন্নয়ন', 'ধর্ম ও সংস্কৃতি', 'পৌরসভা'];

  const filteredNews = STATIC_NEWS.filter((item) => {
    const matchesCategory = selectedCategory === 'সকল' || item.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleShare = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
      setCopiedLink(true);
      showToast('সংবাদের লিংক কপি হয়েছে!', 'success');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // ==========================================
  // SINGLE ARTICLE DEDICATED PAGE VIEW
  // ==========================================
  if (singleArticle) {
    const relatedNews = STATIC_NEWS.filter((item) => item.id !== singleArticle.id).slice(0, 3);

    return (
      <div className="space-y-4 pb-12">
        {/* Navigation & Breadcrumb Header */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xs border border-[#E4E6EB] flex items-center justify-between gap-3">
          <button
            onClick={() => navigate('/news')}
            className="flex items-center gap-2 text-xs font-bold text-[#1877F2] hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল সংবাদে ফিরে যান</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span 
              onClick={() => navigate('/')} 
              className="hover:text-[#1877F2] cursor-pointer hidden sm:inline"
            >
              হোম
            </span>
            <span className="hidden sm:inline">/</span>
            <span 
              onClick={() => navigate('/news')} 
              className="hover:text-[#1877F2] cursor-pointer"
            >
              সংবাদ
            </span>
            <span>/</span>
            <span className="text-[#050505] font-semibold truncate max-w-[140px] sm:max-w-[200px]">
              {singleArticle.title}
            </span>
          </div>
        </div>

        {/* Main Article Content Container */}
        <article className="bg-white rounded-2xl shadow-2xs border border-[#E4E6EB] overflow-hidden">
          {/* Article Header Info */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#1877F2] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                {singleArticle.category}
              </span>
              <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                {singleArticle.source || 'বোয়ালখালী ডটকম'}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#050505] leading-tight">
              {singleArticle.title}
            </h1>

            {/* Author, Date and Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-[#E4E6EB] text-xs text-[#65676B]">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-[#050505] font-semibold">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>প্রতিবেদক: {singleArticle.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#1877F2]" />
                  <span>{singleArticle.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{singleArticle.time}</span>
                </span>
              </div>

              {/* Share Action Button */}
              <button
                onClick={() => handleShare(singleArticle)}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#1877F2] bg-[#F0F2F5] hover:bg-[#E4E6EB] px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#1877F2]" />}
                <span>{copiedLink ? 'লিংক কপি হয়েছে' : 'শেয়ার করুন'}</span>
              </button>
            </div>

            {/* Main Featured Photo */}
            <div className="rounded-2xl overflow-hidden bg-gray-100 max-h-[460px] w-full border border-gray-100 shadow-xs">
              <img
                src={singleArticle.image}
                alt={singleArticle.title}
                className="w-full h-full object-cover max-h-[460px]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Lead Excerpt */}
            <div className="bg-blue-50/70 border-l-4 border-[#1877F2] p-4 sm:p-5 rounded-r-2xl">
              <p className="text-sm sm:text-base font-semibold text-[#050505] leading-relaxed">
                {singleArticle.excerpt}
              </p>
            </div>

            {/* Article Body Content */}
            <div className="text-sm sm:text-base text-gray-800 leading-relaxed space-y-4 pt-2 whitespace-pre-line">
              <p>{singleArticle.content}</p>
              <p className="text-gray-700">
                বোয়ালখালী উপজেলার স্থানীয় সংবাদ, উন্নয়নমূলক কর্মকাণ্ড, অবকাঠামোগত অগ্রগতি ও প্রশাসনিক তথ্য সবার কাছে দ্রুত ও নির্ভুলভাবে পৌঁছে দিতে আমরা অঙ্গীকারবদ্ধ। উপজেলার যে কোনো গুরুত্বপূর্ণ সংবাদ বা খবরের তথ্যের জন্য আমাদের বোয়ালখালী বার্তা বিভাগে যোগাযোগ করতে পারেন।
              </p>
            </div>

            {/* Bottom Footer Share */}
            <div className="pt-6 border-t border-[#E4E6EB] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#65676B]">
                সংবাদটি ভালো লাগলে ফেসবুক ও সোশ্যাল মিডিয়ায় শেয়ার করুন
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleShare(singleArticle)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <Share2 className="w-4 h-4" />
                  <span>সংবাদ শেয়ার করুন</span>
                </button>
                <button
                  onClick={() => navigate('/news')}
                  className="bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  সকল সংবাদ
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related News Section at Bottom */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#E4E6EB] space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[#050505] flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#1877F2]" />
              <span>সম্পর্কিত আরও সংবাদ</span>
            </h2>
            <button
              onClick={() => navigate('/news')}
              className="text-xs font-bold text-[#1877F2] hover:underline"
            >
              সবগুলো দেখুন →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            {relatedNews.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/news/${rel.id}`)}
                className="bg-[#F8F9FA] hover:bg-white rounded-xl overflow-hidden border border-[#E4E6EB] hover:border-[#1877F2] shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-28 w-full overflow-hidden bg-gray-200 relative">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      {rel.category}
                    </div>
                  </div>

                  <div className="p-2.5 space-y-1">
                    <h3 className="font-bold text-xs text-[#050505] line-clamp-2 leading-snug group-hover:text-[#1877F2] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-[10px] text-[#65676B]">
                      {rel.date}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 pt-0 text-[11px] font-bold text-[#1877F2] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>পড়ুন</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ==========================================
  // ALL NEWS LISTING GRID VIEW
  // ==========================================
  return (
    <div className="space-y-4 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#E4E6EB]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#050505]">বোয়ালখালী সংবাদ ও আপডেট</h1>
              <p className="text-xs text-[#65676B]">উপজেলার দৈনন্দিন খবর, উন্নয়ন ও প্রশাসনিক খবরাখবর</p>
            </div>
          </div>

          {/* News Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সংবাদ খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:outline-[#1877F2]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-4 border-t border-[#E4E6EB] mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1877F2] text-white shadow-2xs'
                  : 'bg-[#F0F2F5] text-[#65676B] hover:bg-[#E4E6EB] hover:text-[#050505]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNews.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl p-6 border border-[#E4E6EB] text-[#65676B] space-y-2">
            <Newspaper className="w-10 h-10 mx-auto text-gray-300" />
            <p className="font-bold text-sm text-[#050505]">কোনো সংবাদ পাওয়া যায়নি</p>
            <p className="text-xs">অন্য ক্যাটাগরি বা শব্দ দিয়ে অনুসন্ধান করুন।</p>
          </div>
        ) : (
          filteredNews.map((article) => (
            <article
              key={article.id}
              onClick={() => navigate(`/news/${article.id}`)}
              className="bg-white rounded-2xl overflow-hidden border border-[#E4E6EB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#1877F2] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-[#65676B]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {article.time}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#050505] text-sm sm:text-base leading-snug group-hover:text-[#1877F2] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#65676B] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4 py-3 bg-slate-50 border-t border-[#E4E6EB] flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(article);
                  }}
                  className="text-xs text-[#65676B] hover:text-[#1877F2] flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>শেয়ার</span>
                </button>

                <div className="text-xs font-bold text-[#1877F2] group-hover:text-blue-700 flex items-center gap-1">
                  <span>সম্পূর্ণ সংবাদ পড়ুন</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
