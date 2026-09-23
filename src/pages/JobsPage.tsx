import React, { useState, useMemo, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  GraduationCap, 
  Calendar, 
  Phone, 
  Mail, 
  MessageCircle, 
  Share2, 
  PlusCircle, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  ChevronRight, 
  Sparkles, 
  Send,
  Eye,
  FileText,
  Users
} from 'lucide-react';
import { 
  STATIC_JOBS, 
  JOB_CATEGORIES, 
  JOB_TYPES, 
  BOALHKALI_LOCATIONS, 
  JobItem 
} from '../data/jobsData.js';
import { useData } from '../context/DataContext.js';

interface JobsPageProps {
  navigate: (path: string) => void;
  jobId?: string;
}

export const JobsPage: React.FC<JobsPageProps> = ({ navigate, jobId }) => {
  const { showToast } = useData();

  // Load custom user posted jobs from localStorage
  const [jobs, setJobs] = useState<JobItem[]>(() => {
    try {
      const saved = localStorage.getItem('boalkhali_user_jobs');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...STATIC_JOBS];
      }
    } catch {
      // fallback
    }
    return STATIC_JOBS;
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সকল চাকরি');
  const [selectedType, setSelectedType] = useState('সকল ধরন');
  const [selectedLocation, setSelectedLocation] = useState('সকল এলাকা');

  // Modal States
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // New Job Form State
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    category: 'অফিস ও প্রশাসন',
    location: 'পৌরসভা (গোমদণ্ডী বাজার)',
    jobType: 'ফুল-টাইম' as 'ফুল-টাইম' | 'পার্ট-টাইম' | 'চুক্তিভিত্তিক' | 'ইন্টার্নশিপ',
    salary: '',
    experience: '',
    education: '',
    deadline: '',
    vacancies: 1,
    phone: '',
    email: '',
    whatsapp: '',
    applyInstructions: '',
    description: '',
    requirements: '',
    benefits: ''
  });

  // Open modal if jobId is passed via props or URL
  useEffect(() => {
    if (jobId) {
      const found = jobs.find(j => j.id === jobId);
      if (found) {
        setSelectedJob(found);
      }
    }
  }, [jobId, jobs]);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesLoc = job.location.toLowerCase().includes(q);
        const matchesTag = job.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesLoc && !matchesTag) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'সকল চাকরি' && job.category !== selectedCategory) {
        return false;
      }

      // Job Type
      if (selectedType !== 'সকল ধরন' && job.jobType !== selectedType) {
        return false;
      }

      // Location / Union
      if (selectedLocation !== 'সকল এলাকা') {
        const matchesUnion = job.union?.includes(selectedLocation) || job.location.includes(selectedLocation);
        if (!matchesUnion) return false;
      }

      return true;
    });
  }, [jobs, searchQuery, selectedCategory, selectedType, selectedLocation]);

  // Handle Share Job
  const handleShare = (job: JobItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `📌 নিয়োগ বিজ্ঞপ্তি: ${job.title} | প্রতিষ্ঠান: ${job.company} | বেতন: ${job.salary} | যোগাযোগের ফোন: ${job.phone} (Boalkhali.com)`;
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      showToast('চাকরির বিবরণ কপি করা হয়েছে!', 'success');
    }
  };

  // Handle Submit Job Form
  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company || !newJob.phone) {
      showToast('অনুগ্রহ করে শিরোনাম, প্রতিষ্ঠান ও ফোন নম্বর পূরণ করুন', 'error');
      return;
    }

    const createdJob: JobItem = {
      id: `job-user-${Date.now()}`,
      title: newJob.title,
      company: newJob.company,
      location: newJob.location,
      union: newJob.location.includes('পৌরসভা') ? 'পৌরসভা' : 'শাকপুরা',
      jobType: newJob.jobType,
      category: newJob.category,
      salary: newJob.salary || 'আলোচনা সাপেক্ষে',
      experience: newJob.experience || 'প্রযোজ্য নয়',
      education: newJob.education || 'সংশ্লিষ্ট ক্ষেত্রে উপযুক্ত যোগ্যতা',
      deadline: newJob.deadline || 'শীঘ্রই সমাপ্ত',
      postedDate: 'আজকে',
      vacancies: Number(newJob.vacancies) || 1,
      isUrgent: true,
      phone: newJob.phone,
      email: newJob.email,
      whatsapp: newJob.whatsapp || newJob.phone,
      applyInstructions: newJob.applyInstructions || 'প্রদত্ত ফোন নম্বরে যোগাযোগ করে সিভি জমা দিন।',
      description: newJob.description || 'প্রতিষ্ঠানে অবিলম্বে নিয়োগের জন্য বিজ্ঞপ্তি প্রকাশিত হলো।',
      requirements: newJob.requirements ? newJob.requirements.split('\n').filter(Boolean) : ['দায়িত্বশীল ও সময়নিষ্ঠ মনোভাব'],
      responsibilities: ['প্রদত্ত দায়িত্ব সঠিকভাবে সম্পন্ন করা'],
      benefits: newJob.benefits ? newJob.benefits.split('\n').filter(Boolean) : ['উৎসব বোনাস', 'আকর্ষণীয় সুযোগ-সুবিধা'],
      tags: [newJob.category, 'স্থানীয় চাকরি']
    };

    // Save to state and localStorage
    const updatedUserJobs = [createdJob];
    try {
      const existing = localStorage.getItem('boalkhali_user_jobs');
      const parsed = existing ? JSON.parse(existing) : [];
      localStorage.setItem('boalkhali_user_jobs', JSON.stringify([createdJob, ...parsed]));
    } catch {
      // ignore storage error
    }

    setJobs([createdJob, ...jobs]);
    setIsPostModalOpen(false);
    showToast('চাকরির বিজ্ঞপ্তিটি সফলভাবে পোস্ট করা হয়েছে!', 'success');

    // Reset Form
    setNewJob({
      title: '',
      company: '',
      category: 'অফিস ও প্রশাসন',
      location: 'পৌরসভা (গোমদণ্ডী বাজার)',
      jobType: 'ফুল-টাইম',
      salary: '',
      experience: '',
      education: '',
      deadline: '',
      vacancies: 1,
      phone: '',
      email: '',
      whatsapp: '',
      applyInstructions: '',
      description: '',
      requirements: '',
      benefits: ''
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('সকল চাকরি');
    setSelectedType('সকল ধরন');
    setSelectedLocation('সকল এলাকা');
  };

  const isFiltered = searchQuery || selectedCategory !== 'সকল চাকরি' || selectedType !== 'সকল ধরন' || selectedLocation !== 'সকল এলাকা';

  return (
    <div className="space-y-4">
      {/* 1. HERO & ACTION BANNER */}
      <div className="bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E4E6EB] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-xs">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#050505] tracking-tight">
                  বোয়ালখালী চাকরি ও ক্যারিয়ার পোর্টাল
                </h1>
                <p className="text-xs sm:text-sm text-[#65676B]">
                  বোয়ালখালী ও আশপাশের স্থানীয় প্রতিষ্ঠানসমূহের বর্তমান চাকরির বিজ্ঞপ্তি
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#1877F2] hover:bg-blue-700 active:scale-98 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>চাকরির বিজ্ঞপ্তি দিন</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Counter Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 mt-3 border-t border-[#E4E6EB]/80">
          <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4E6EB] text-center">
            <span className="text-[11px] text-[#65676B] block">মোট সক্রিয় চাকরি</span>
            <span className="text-base sm:text-lg font-black text-[#1877F2]">{jobs.length}+</span>
          </div>
          <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4E6EB] text-center">
            <span className="text-[11px] text-[#65676B] block">জরুরি নিয়োগ</span>
            <span className="text-base sm:text-lg font-black text-red-600">
              {jobs.filter(j => j.isUrgent).length}টি
            </span>
          </div>
          <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4E6EB] text-center">
            <span className="text-[11px] text-[#65676B] block">ফুল-টাইম পদ</span>
            <span className="text-base sm:text-lg font-black text-emerald-600">
              {jobs.filter(j => j.jobType === 'ফুল-টাইম').length}টি
            </span>
          </div>
          <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4E6EB] text-center">
            <span className="text-[11px] text-[#65676B] block">আজকের নতুন</span>
            <span className="text-base sm:text-lg font-black text-amber-600">
              {jobs.filter(j => j.postedDate === 'আজকে').length}টি
            </span>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="bg-white rounded-2xl p-4 border border-[#E4E6EB] shadow-2xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#65676B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পদবী, প্রতিষ্ঠানের নাম, স্কিল বা এলাকা দিয়ে সার্চ করুন..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#F0F2F5] hover:bg-[#E4E6EB]/60 focus:bg-white text-xs sm:text-sm text-[#050505] rounded-xl border border-transparent focus:border-[#1877F2] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-400 text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {JOB_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1877F2] text-white shadow-2xs'
                  : 'bg-[#F0F2F5] text-[#65676B] hover:bg-[#E4E6EB] hover:text-[#050505]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Job Type & Location Dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E4E6EB]">
          <div className="flex flex-wrap items-center gap-2">
            {/* Job Type Selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] font-semibold py-1.5 px-3 rounded-lg border border-[#CED0D4] focus:outline-none focus:border-[#1877F2] cursor-pointer"
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Location Selector */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="text-xs bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#050505] font-semibold py-1.5 px-3 rounded-lg border border-[#CED0D4] focus:outline-none focus:border-[#1877F2] cursor-pointer"
            >
              {BOALHKALI_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Results Count & Reset Button */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#65676B] font-medium">
              পাওয়া গেছে: <strong>{filteredJobs.length}</strong> টি চাকরি
            </span>
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#1877F2] hover:underline font-semibold cursor-pointer"
              >
                রিসেট
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. JOBS LISTING */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-[#E4E6EB] shadow-2xs space-y-3">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1877F2] flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#050505]">
            কোনো চাকরির বিজ্ঞপ্তি পাওয়া যায়নি
          </h3>
          <p className="text-xs sm:text-sm text-[#65676B] max-w-md mx-auto">
            আপনার দেওয়া সার্চ কীওয়ার্ড বা ফিল্টারের সাথে মিলে এমন কোনো চাকরি এই মুহূর্তে নেই। অন্য ক্যাটাগরি বা এলাকা নির্বাচন করে পুনরায় চেষ্টা করুন।
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#1877F2] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>ফিল্টার রিসেট করুন</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative"
            >
              <div className="space-y-3">
                {/* Header: Logo, Title, Badges */}
                <div className="flex items-start gap-3">
                  {/* Company Logo or Initial Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-[#F0F2F5] border border-[#CED0D4]/60 overflow-hidden shrink-0 flex items-center justify-center">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Building className="w-6 h-6 text-gray-500" />
                    )}
                  </div>

                  {/* Title & Company */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-[#050505] group-hover:text-[#1877F2] transition-colors leading-tight line-clamp-1">
                        {job.title}
                      </h3>
                      {job.isUrgent && (
                        <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-black px-1.5 py-0.2 rounded shrink-0">
                          জরুরি নিয়োগ
                        </span>
                      )}
                      {job.isFeatured && (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0">
                          ফিচার্ড
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#65676B] font-semibold truncate mt-0.5">
                      {job.company}
                    </p>
                  </div>
                </div>

                {/* Key Meta Badges: Location, Salary, Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#65676B] pt-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-bold text-[#1877F2] truncate">
                    <DollarSign className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-1.5 truncate">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{job.experience}</span>
                  </div>

                  <div className="flex items-center gap-1.5 truncate">
                    <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span className="truncate">শেষ সময়: {job.deadline}</span>
                  </div>
                </div>

                {/* Tags */}
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">
                      {job.jobType}
                    </span>
                    {job.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-[#E4E6EB]">
                <span className="text-[11px] text-[#65676B] font-medium flex items-center gap-1">
                  <span>পোস্ট: {job.postedDate}</span>
                  {job.vacancies > 1 && (
                    <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-bold text-[10px]">
                      {job.vacancies} জন
                    </span>
                  )}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleShare(job, e)}
                    className="w-8 h-8 rounded-lg bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#65676B] flex items-center justify-center transition-colors cursor-pointer"
                    title="শেয়ার করুন"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${job.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">কল</span>
                  </a>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-3 py-1.5 rounded-lg bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>বিস্তারিত</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. JOB DETAIL MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E4E6EB] flex items-start justify-between bg-slate-50 gap-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#CED0D4] overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                  {selectedJob.companyLogo ? (
                    <img
                      src={selectedJob.companyLogo}
                      alt={selectedJob.company}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Building className="w-6 h-6 text-[#1877F2]" />
                  )}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#050505] leading-tight">
                    {selectedJob.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-[#1877F2] mt-0.5">
                    {selectedJob.company}
                  </p>
                  <p className="text-xs text-[#65676B] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{selectedJob.location}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#050505]">
              {/* Highlights Bento */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
                  <span className="text-[10px] text-blue-700 font-semibold block uppercase">বেতন</span>
                  <strong className="text-xs sm:text-sm font-black text-[#1877F2]">{selectedJob.salary}</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <span className="text-[10px] text-emerald-700 font-semibold block uppercase">চাকরির ধরন</span>
                  <strong className="text-xs sm:text-sm font-black text-emerald-800">{selectedJob.jobType}</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
                  <span className="text-[10px] text-purple-700 font-semibold block uppercase">অভিজ্ঞতা</span>
                  <strong className="text-xs sm:text-sm font-black text-purple-800 truncate block">{selectedJob.experience}</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100">
                  <span className="text-[10px] text-amber-700 font-semibold block uppercase">আবেদনের শেষ তারিখ</span>
                  <strong className="text-xs sm:text-sm font-black text-amber-800">{selectedJob.deadline}</strong>
                </div>
              </div>

              {/* Education & Vacancies */}
              <div className="p-3 bg-[#F0F2F5] rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#1877F2]" />
                  <span><strong>শিক্ষাগত যোগ্যতা:</strong> {selectedJob.education}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span><strong>পদসংখ্যা:</strong> {selectedJob.vacancies} জন</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-[#050505]">কাজের বিবরণ</h4>
                <p className="text-[#65676B] leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Requirements */}
              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-[#050505]">প্রয়োজনীয় যোগ্যতা ও শর্তাবলী</h4>
                  <ul className="space-y-1.5 text-[#475569]">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-[#050505]">কাজের দায়িত্বসমূহ</h4>
                  <ul className="space-y-1.5 text-[#475569]">
                    {selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shrink-0 mt-1.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-[#050505]">সুযোগ-সুবিধা</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.benefits.map((b, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold">
                        🎁 {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* How to Apply */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <h4 className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>আবেদনের নিয়মাবলী</span>
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {selectedJob.applyInstructions}
                </p>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 border-t border-[#E4E6EB] bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShare(selectedJob, e)}
                  className="px-3 py-2 rounded-xl bg-white border border-[#CED0D4] hover:bg-gray-100 text-[#050505] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>শেয়ার</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {selectedJob.whatsapp && (
                  <a
                    href={`https://wa.me/88${selectedJob.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>হোয়াটসঅ্যাপ</span>
                  </a>
                )}

                <a
                  href={`tel:${selectedJob.phone}`}
                  className="px-4 py-2 rounded-xl bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>সরাসরি কল ({selectedJob.phone})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. POST A JOB MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E4E6EB] flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#050505]">নতুন চাকরির বিজ্ঞপ্তি পোস্ট করুন</h3>
                  <p className="text-xs text-[#65676B]">বোয়ালখালীর স্থানীয় প্রার্থীদের নিকট বিজ্ঞপ্তি পৌঁছান</p>
                </div>
              </div>

              <button
                onClick={() => setIsPostModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 text-gray-700 flex items-center justify-center cursor-pointer shadow-2xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmitJob} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#050505]">পদের নাম / শিরোনাম *</label>
                  <input
                    type="text"
                    required
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="যেমন: অফিস সহকারী / শিক্ষক"
                    className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#050505]">প্রতিষ্ঠান বা ব্যবসার নাম *</label>
                  <input
                    type="text"
                    required
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    placeholder="যেমন: আল-মদিনা ফার্মেসি"
                    className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#050505]">ক্যাটাগরি</label>
                  <select
                    value={newJob.category}
                    onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                  >
                    {JOB_CATEGORIES.filter(c => c !== 'সকল চাকরি').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#050505]">চাকরির ধরন</label>
                  <select
                    value={newJob.jobType}
                    onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                  >
                    {JOB_TYPES.filter(t => t !== 'সকল ধরন').map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#050505]">কর্মস্থল / ঠিকানা</label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    placeholder="যেমন: গোমদণ্ডী বাজার, শাকপুরা"
                    className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#050505]">বেতন বা সুযোগ</label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    placeholder="যেমন: ৳১৫,০০০ - ৳১৮,০০০ বা আলোচনা সাপেক্ষে"
                    className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#050505]">যোগাযোগের ফোন নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={newJob.phone}
                    onChange={(e) => setNewJob({ ...newJob, phone: e.target.value })}
                    placeholder="যেমন: 018XXXXXXXX"
                    className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#050505]">হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)</label>
                  <input
                    type="tel"
                    value={newJob.whatsapp}
                    onChange={(e) => setNewJob({ ...newJob, whatsapp: e.target.value })}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#050505]">আবেদনের শেষ তারিখ</label>
                  <input
                    type="text"
                    value={newJob.deadline}
                    onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                    placeholder="যেমন: ১৫ অক্টোবর ২০২৬"
                    className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-xs text-[#050505]">কাজের সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={2}
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="পদের দায়িত্ব ও কাজের পরিবেশ সম্পর্কে লিখুন..."
                  className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-xs text-[#050505]">প্রয়োজনীয় যোগ্যতা ও নিয়ম (প্রতি লাইনে একটি)</label>
                <textarea
                  rows={2}
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                  placeholder="যেমন:&#10;কম্পিউটার টাইপিং জানা থাকতে হবে&#10;বোয়ালখালীর স্থানীয় হতে হবে"
                  className="w-full px-3 py-2 bg-[#F0F2F5] border border-[#CED0D4] rounded-xl text-xs focus:bg-white focus:border-[#1877F2] focus:outline-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E4E6EB]">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs"
                >
                  বিজ্ঞপ্তি প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
