import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Send, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Trash2, 
  Sparkles, 
  LogIn, 
  UserPlus, 
  Globe, 
  Smile, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw,
  Clock,
  ChevronDown,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useData } from '../context/DataContext.js';
import { api } from '../services/api.js';
import { Post, Comment } from '../types.js';

interface CommunityPageProps {
  navigate: (path: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'সব পোস্ট' },
  { id: 'সাধারণ আলোচনা', label: 'সাধারণ আলোচনা' },
  { id: 'নাগরিক সমস্যা', label: 'নাগরিক সমস্যা' },
  { id: 'সহায়তা ও তথ্য', label: 'সহায়তা ও তথ্য' },
  { id: 'স্থানীয় উদ্যোগ', label: 'স্থানীয় উদ্যোগ' },
];

export const CommunityPage: React.FC<CommunityPageProps> = ({ navigate }) => {
  const { user } = useAuth();
  const { showToast } = useData();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // New Post Form State
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('সাধারণ আলোচনা');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Comments State (map of postId -> { open: boolean, loading: boolean, comments: Comment[], newText: string, isSending: boolean })
  const [commentStates, setCommentStates] = useState<
    Record<string, { open: boolean; loading: boolean; comments: Comment[]; newText: string; isSending: boolean }>
  >({});

  // Fetch posts on mount
  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getPosts();
      setPosts(data || []);
    } catch (err) {
      console.error('Failed to load community posts:', err);
      showToast('পোস্ট লোড করতে সমস্যা হয়েছে', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Format Bangla relative time
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const diff = Math.floor((Date.now() - date.getTime()) / 1000);
      if (diff < 60) return 'এইমাত্র';
      if (diff < 3600) return `${Math.floor(diff / 60)} মিনিট আগে`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} ঘণ্টা আগে`;
      if (diff < 604800) return `${Math.floor(diff / 86400)} দিন আগে`;
      return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return 'সম্প্রতি';
    }
  };

  // Submit New Post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('পোস্ট করার জন্য প্রথমে লগইন করুন', 'error');
      navigate('/login');
      return;
    }

    const trimmed = postContent.trim();
    if (!trimmed) {
      showToast('অনুগ্রহ করে কিছু লিখুন', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const newPost = await api.createPost({
        content: trimmed,
        category: postCategory,
      });

      setPosts((prev) => [newPost, ...prev]);
      setPostContent('');
      showToast('আপনার পোস্টটি সফলভাবে প্রকাশ হয়েছে!', 'success');
    } catch (err) {
      console.error('Post creation error:', err);
      showToast('পোস্ট প্রকাশ করতে ব্যর্থ হয়েছে', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Like
  const handleLike = async (postId: string) => {
    if (!user) {
      showToast('লাইক দিতে অনুগ্রহ করে লগইন করুন', 'info');
      navigate('/login');
      return;
    }

    // Optimistic toggle
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = p.likes.includes(user.id);
          const newLikes = hasLiked
            ? p.likes.filter((id) => id !== user.id)
            : [...p.likes, user.id];
          return { ...p, likes: newLikes };
        }
        return p;
      })
    );

    try {
      await api.likePost(postId);
    } catch (err) {
      console.error('Failed to toggle like:', err);
      // Revert if needed
      loadPosts();
    }
  };

  // Toggle Comments Section
  const toggleComments = async (postId: string) => {
    const current = commentStates[postId] || {
      open: false,
      loading: false,
      comments: [],
      newText: '',
      isSending: false,
    };

    if (current.open) {
      // close it
      setCommentStates((prev) => ({
        ...prev,
        [postId]: { ...current, open: false },
      }));
      return;
    }

    // Open & fetch comments if not loaded yet
    setCommentStates((prev) => ({
      ...prev,
      [postId]: { ...current, open: true, loading: true },
    }));

    try {
      const comments = await api.getComments(postId);
      setCommentStates((prev) => ({
        ...prev,
        [postId]: { ...prev[postId], comments: comments || [], loading: false },
      }));
    } catch (err) {
      console.error('Failed to load comments:', err);
      setCommentStates((prev) => ({
        ...prev,
        [postId]: { ...prev[postId], loading: false },
      }));
    }
  };

  // Add Comment
  const handleAddComment = async (postId: string) => {
    if (!user) {
      showToast('মন্তব্য করতে অনুগ্রহ করে লগইন করুন', 'info');
      navigate('/login');
      return;
    }

    const state = commentStates[postId];
    const text = state?.newText?.trim();
    if (!text) return;

    setCommentStates((prev) => ({
      ...prev,
      [postId]: { ...state, isSending: true },
    }));

    try {
      const added = await api.addComment(postId, text);
      setCommentStates((prev) => ({
        ...prev,
        [postId]: {
          ...prev[postId],
          comments: [...(prev[postId]?.comments || []), added],
          newText: '',
          isSending: false,
        },
      }));

      // update post comment count
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p))
      );
      showToast('মন্তব্য যুক্ত হয়েছে!', 'success');
    } catch (err) {
      console.error('Failed to add comment:', err);
      showToast('মন্তব্য পাঠাতে ব্যর্থ হয়েছে', 'error');
      setCommentStates((prev) => ({
        ...prev,
        [postId]: { ...prev[postId], isSending: false },
      }));
    }
  };

  // Delete Post
  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('আপনি কি নিশ্চিতভাবে এই পোস্টটি মুছে ফেলতে চান?')) return;

    try {
      await api.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      showToast('পোস্টটি মুছে ফেলা হয়েছে', 'success');
    } catch (err) {
      console.error('Failed to delete post:', err);
      showToast('পোস্ট মুছে ফেলতে সমস্যা হয়েছে', 'error');
    }
  };

  // Share Post
  const handleSharePost = (post: Post) => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `বোয়ালখালী কমিউনিটি পোস্ট - ${post.user_name}`,
        text: post.content.substring(0, 100) + '...',
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      showToast('পোস্টের লিংক কপি করা হয়েছে!', 'success');
    }
  };

  // Filtered posts
  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-16 px-2 sm:px-4">
      {/* Top Banner: Community Identity */}
      <section className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E4E6EB] shadow-2xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1877F2] flex items-center justify-center font-bold shadow-xs">
              <Users className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-[#050505] tracking-tight">
                  বোয়ালখালী কমিউনিটি
                </h1>
                <span className="bg-blue-100 text-[#1877F2] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  লাইভ ফিড
                </span>
              </div>
              <p className="text-xs text-[#65676B] mt-0.5">
                বোয়ালখালীর বাসিন্দাদের মুক্ত চিন্তা, নাগরিক মতামত ও স্থানীয় তথ্যের উন্মুক্ত মঞ্চ
              </p>
            </div>
          </div>

          <button
            onClick={loadPosts}
            disabled={loading}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-all cursor-pointer"
            title="রিফ্রেশ করুন"
            aria-label="Refresh posts"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 mt-3 border-t border-gray-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1877F2] text-white shadow-xs'
                  : 'bg-[#F0F2F5] text-[#65676B] hover:bg-gray-200 hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Facebook-style Post Composer Card */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E4E6EB] shadow-2xs">
        {user ? (
          /* When User is Registered & Logged In */
          <form onSubmit={handleCreatePost} className="space-y-3.5">
            {/* User Profile Header */}
            <div className="flex items-center gap-3">
              <img
                src={
                  user.avatar ||
                  `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name)}`
                }
                alt={user.name}
                className="w-10 h-10 rounded-full border border-gray-200 object-cover bg-gray-100"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-[#050505] truncate">{user.name}</h3>
                  {user.role === 'admin' ? (
                    <span className="bg-red-100 text-red-600 text-[10px] font-black px-1.5 py-0.2 rounded-md">
                      অ্যাডমিন
                    </span>
                  ) : user.role === 'moderator' ? (
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-1.5 py-0.2 rounded-md">
                      মডারেটর
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                      সদস্য
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#65676B]">
                  <Globe className="w-3 h-3" />
                  <span>পাবলিক পোস্ট</span>
                </div>
              </div>
            </div>

            {/* Facebook Textarea Box */}
            <div className="relative">
              <textarea
                id="community-post-content"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder={`কী ভাবছেন, ${user.name}? আপনার মতামত বা খবর বোয়ালখালীবাসীর সাথে শেয়ার করুন...`}
                rows={3}
                className="w-full p-3 sm:p-3.5 bg-[#F0F2F5] hover:bg-[#EBEDF0] focus:bg-white text-[#050505] text-sm rounded-2xl border border-transparent focus:border-[#1877F2] focus:outline-none transition-all placeholder:text-[#65676B] resize-none leading-relaxed"
              />
            </div>

            {/* Category Select & Publish Action */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Tag className="w-3.5 h-3.5 text-[#1877F2]" />
                <span className="text-[11px] font-semibold text-[#65676B]">ক্যাটাগরি:</span>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                  className="bg-[#F0F2F5] text-xs font-bold text-gray-800 rounded-lg px-2.5 py-1.5 border border-gray-200 focus:outline-none cursor-pointer"
                >
                  <option value="সাধারণ আলোচনা">সাধারণ আলোচনা</option>
                  <option value="নাগরিক সমস্যা">নাগরিক সমস্যা</option>
                  <option value="সহায়তা ও তথ্য">সহায়তা ও তথ্য</option>
                  <option value="স্থানীয় উদ্যোগ">স্থানীয় উদ্যোগ</option>
                </select>
              </div>

              <button
                type="submit"
                id="publish-community-post-btn"
                disabled={isSubmitting || !postContent.trim()}
                className="px-5 py-2 bg-[#1877F2] hover:bg-[#166fe5] disabled:bg-gray-300 disabled:text-gray-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>প্রকাশ হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>পোস্ট প্রকাশ করুন</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* When User is NOT Logged In - Facebook Style Teaser with Login Prompt */
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <button
                onClick={() => navigate('/login')}
                className="flex-1 text-left px-4 py-2.5 bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#65676B] text-xs sm:text-sm rounded-full transition-colors cursor-pointer truncate"
              >
                কমিউনিটিতে আপনার মতামত পোস্ট করতে লগইন করুন...
              </button>
            </div>

            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1877F2] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#050505]">
                    শুধুমাত্র নিবন্ধিত ব্যবহারকারীরা পোস্ট করতে পারেন
                  </h4>
                  <p className="text-[11px] text-[#65676B]">
                    আপনার মূল্যবান পোস্ট ও মন্তব্য যুক্ত করতে লগইন করুন বা অ্যাকাউন্ট খুলুন
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  id="community-login-btn"
                  onClick={() => navigate('/login')}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>লগইন করুন</span>
                </button>
                <button
                  id="community-register-btn"
                  onClick={() => navigate('/register')}
                  className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#1877F2]" />
                  <span>রেজিস্ট্রেশন</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Posts Feed - Facebook Card Styles */}
      <div className="space-y-3.5">
        {loading ? (
          /* Loading Skeletons */
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-[#E4E6EB] animate-pulse space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="space-y-1.5 flex-1">
                  <div className="w-28 h-3.5 bg-gray-200 rounded" />
                  <div className="w-20 h-2.5 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-gray-200 rounded" />
                <div className="w-4/5 h-3 bg-gray-200 rounded" />
              </div>
            </div>
          ))
        ) : filteredPosts.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-8 border border-[#E4E6EB] text-center space-y-3 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1877F2] mx-auto flex items-center justify-center">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-[#050505]">এখনো কোনো পোস্ট নেই</h3>
            <p className="text-xs text-[#65676B] max-w-sm mx-auto">
              এই ক্যাটাগরিতে এখনো কোনো পোস্ট নেই। আপনিই প্রথম পোস্ট প্রকাশ করে বোয়ালখালীর কমিউনিটিতে আলোচনা শুরু করুন!
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isLiked = user ? post.likes.includes(user.id) : false;
            const isAuthorOrAdmin = user && (user.id === post.user_id || user.role === 'admin' || user.role === 'moderator');
            const commentState = commentStates[post.id];

            return (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-[#E4E6EB] shadow-2xs overflow-hidden transition-all hover:border-gray-300"
              >
                {/* 1. Post Header: Author info, Role, Time, Options */}
                <div className="p-4 sm:p-5 pb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        post.user_avatar ||
                        `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(post.user_name)}`
                      }
                      alt={post.user_name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100 bg-gray-50"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-[#050505] hover:underline cursor-pointer">
                          {post.user_name}
                        </span>
                        {post.user_role === 'admin' ? (
                          <span className="bg-red-50 text-red-600 border border-red-200 text-[9px] font-black px-1.5 py-0.2 rounded">
                            অ্যাডমিন
                          </span>
                        ) : post.user_role === 'moderator' ? (
                          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-black px-1.5 py-0.2 rounded">
                            মডারেটর
                          </span>
                        ) : null}

                        {post.category && (
                          <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.2 rounded-full">
                            #{post.category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-[#65676B] mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(post.created_at)}</span>
                        <span>•</span>
                        <Globe className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Actions for Author / Admin */}
                  {isAuthorOrAdmin && (
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                      title="পোস্ট মুছে ফেলুন"
                      aria-label="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* 2. Post Content Body */}
                <div className="px-4 sm:px-5 py-2">
                  {post.title && (
                    <h3 className="font-bold text-sm sm:text-base text-[#050505] mb-1.5 leading-snug">
                      {post.title}
                    </h3>
                  )}
                  <p className="text-sm sm:text-[15px] text-[#1E293B] leading-relaxed whitespace-pre-line select-text">
                    {post.content}
                  </p>
                </div>

                {/* Optional Image */}
                {post.image && (
                  <div className="mt-2.5 max-h-96 w-full overflow-hidden bg-gray-100 border-y border-gray-100">
                    <img
                      src={post.image}
                      alt="Post visual"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* 3. Engagement Count Stats Bar */}
                <div className="px-4 sm:px-5 py-2 flex items-center justify-between text-xs text-[#65676B] border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px] shadow-2xs">
                      👍
                    </span>
                    <span className="font-semibold">{post.likes.length} জন পছন্দ করেছেন</span>
                  </div>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="hover:underline cursor-pointer font-medium"
                  >
                    {post.comments_count || 0} টি মন্তব্য
                  </button>
                </div>

                {/* 4. Action Buttons Bar (Facebook 3-Action Style) */}
                <div className="px-2 py-1 flex items-center justify-between text-xs font-bold text-[#65676B]">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-xl hover:bg-[#F0F2F5] transition-colors cursor-pointer ${
                      isLiked ? 'text-[#1877F2]' : 'text-[#65676B] hover:text-[#050505]'
                    }`}
                  >
                    <ThumbsUp
                      className={`w-4.5 h-4.5 ${isLiked ? 'fill-current scale-110' : ''} transition-transform`}
                    />
                    <span>{isLiked ? 'লাইক করা হয়েছে' : 'লাইক'}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex-1 py-2 flex items-center justify-center gap-2 rounded-xl hover:bg-[#F0F2F5] text-[#65676B] hover:text-[#050505] transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4.5 h-4.5" />
                    <span>মন্তব্য</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => handleSharePost(post)}
                    className="flex-1 py-2 flex items-center justify-center gap-2 rounded-xl hover:bg-[#F0F2F5] text-[#65676B] hover:text-[#050505] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4.5 h-4.5" />
                    <span>শেয়ার</span>
                  </button>
                </div>

                {/* 5. Collapsible Comments Section */}
                {commentState?.open && (
                  <div className="p-4 sm:p-5 pt-2 bg-gray-50/60 border-t border-gray-100 space-y-3">
                    {/* Add Comment Input */}
                    {user ? (
                      <div className="flex items-start gap-2.5">
                        <img
                          src={
                            user.avatar ||
                            `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name)}`
                          }
                          alt={user.name}
                          className="w-8 h-8 rounded-full border border-gray-200 shrink-0 bg-white"
                        />
                        <div className="flex-1 flex items-center gap-1.5 bg-white rounded-2xl border border-gray-200 px-3 py-1.5 focus-within:border-[#1877F2] shadow-2xs">
                          <input
                            type="text"
                            value={commentState.newText || ''}
                            onChange={(e) =>
                              setCommentStates((prev) => ({
                                ...prev,
                                [post.id]: { ...commentState, newText: e.target.value },
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleAddComment(post.id);
                              }
                            }}
                            placeholder="একটি সম্মানজনক মন্তব্য লিখুন..."
                            className="w-full text-xs sm:text-sm bg-transparent focus:outline-none placeholder:text-gray-400 py-1"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={commentState.isSending || !commentState.newText?.trim()}
                            className="p-1 text-[#1877F2] hover:bg-blue-50 rounded-full disabled:text-gray-300 transition-colors cursor-pointer shrink-0"
                            title="পাঠান"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-center text-xs text-[#65676B] flex items-center justify-center gap-2">
                        <span>মন্তব্য করতে অনুগ্রহ করে</span>
                        <button
                          onClick={() => navigate('/login')}
                          className="font-bold text-[#1877F2] hover:underline cursor-pointer"
                        >
                          লগইন করুন
                        </button>
                      </div>
                    )}

                    {/* Comments List */}
                    {commentState.loading ? (
                      <div className="text-center py-2 text-xs text-gray-400">মন্তব্য লোড হচ্ছে...</div>
                    ) : commentState.comments?.length > 0 ? (
                      <div className="space-y-2.5 pt-1">
                        {commentState.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2.5">
                            <img
                              src={
                                comment.user_avatar ||
                                `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                                  comment.user_name
                                )}`
                              }
                              alt={comment.user_name}
                              className="w-7 h-7 rounded-full border border-gray-200 shrink-0 bg-white"
                            />
                            <div className="bg-white rounded-2xl p-2.5 sm:px-3.5 sm:py-2 border border-gray-200/80 shadow-2xs max-w-[85%]">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-xs text-[#050505]">
                                  {comment.user_name}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {formatTime(comment.created_at)}
                                </span>
                              </div>
                              <p className="text-xs text-[#1E293B] mt-0.5 whitespace-pre-line leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-2 text-[11px] text-gray-400">
                        এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনি করুন!
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
