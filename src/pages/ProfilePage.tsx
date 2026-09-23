import React, { useState, useEffect } from 'react';
import { User, Bookmark, Phone, LogOut, Edit3, PlusCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useData } from '../context/DataContext.js';
import { api } from '../services/api.js';
import { Listing, Post } from '../types.js';
import { ListingCard } from '../components/common/ListingCard.js';

interface ProfilePageProps {
  navigate: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ navigate }) => {
  const { user, logout, refreshUser } = useAuth();
  const { showToast } = useData();
  const [bookmarks, setBookmarks] = useState<Listing[]>([]);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'posts' | 'edit'>('bookmarks');
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editBio, setEditBio] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEditName(user.name);
    setEditPhone(user.phone || '');
    setEditBio(user.bio || '');

    const fetchMyData = async () => {
      try {
        const res = await api.getMe();
        setBookmarks(res.bookmarks || []);
        setMyPosts(res.myPosts || []);
      } catch (err) {
        console.error('Failed to load user profile data:', err);
      }
    };

    fetchMyData();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateProfile({
        name: editName,
        phone: editPhone,
        bio: editBio,
      });
      await refreshUser();
      showToast('প্রোফাইল সফলভাবে আপডেট করা হয়েছে!', 'success');
      setActiveTab('bookmarks');
    } catch (err: any) {
      showToast(err.message || 'প্রোফাইল আপডেট ব্যর্থ হয়েছে', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      const post = await api.createPost({
        title: newPostTitle.trim() || undefined,
        content: newPostContent.trim(),
      });
      setMyPosts([post, ...myPosts]);
      setNewPostTitle('');
      setNewPostContent('');
      showToast('আপনার পোস্ট সফলভাবে জমা দেওয়া হয়েছে!', 'success');
    } catch (err: any) {
      showToast('পোস্ট ব্যর্থ হয়েছে', 'error');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-8 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name)}`}
              alt={user.name}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-white/80 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black">{user.name}</h1>
              <p className="text-xs text-orange-100 font-mono">{user.phone || user.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="bg-orange-800/60 text-orange-100 text-[11px] font-bold px-2 py-0.5 rounded-md border border-orange-400/30 capitalize">
                  {user.role === 'admin' ? 'অ্যাডমিনিস্ট্রেটর' : user.role === 'moderator' ? 'মডারেটর' : 'সাধারণ সদস্য'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold border border-white/20 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            লগআউট করুন
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
          <button
            id="tab-bookmarks-btn"
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            বুকমার্ক করা সেবা ({bookmarks.length})
          </button>

          <button
            id="tab-posts-btn"
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'posts'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            আমার পোস্ট ও বার্তা ({myPosts.length})
          </button>

          <button
            id="tab-edit-btn"
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'edit'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            প্রোফাইল সম্পাদন
          </button>
        </div>

        {/* Tab 1: Bookmarks */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-4">
            {bookmarks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarks.map((b) => (
                  <ListingCard
                    key={b.id}
                    listing={{ ...b, is_bookmarked: true }}
                    onClick={() => navigate(`/listing/${b.slug}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center border border-gray-200/80 space-y-3">
                <Bookmark className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-base font-bold text-gray-800">কোনো বুকমার্ক করা নেই</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  আপনার প্রয়োজনীয় ডাক্তার, হাসপাতাল বা জরুরি নম্বর সহজে খুঁজে পেতে বুকমার্ক করে রাখুন।
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700"
                >
                  ডিরেক্টরি দেখুন
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Community Post Submission */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-orange-600" />
                কমিউনিটিতে নতুন তথ্য বা নোটিশ শেয়ার করুন
              </h3>
              <form onSubmit={handleCreatePost} className="space-y-3">
                <input
                  type="text"
                  placeholder="শিরোনাম (ঐচ্ছিক)"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
                <textarea
                  rows={3}
                  placeholder="বোয়ালখালী উপজেলার কোনো আপডেট, খবর বা রক্তদান নোটিশ লিখুন..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                >
                  পোস্ট প্রকাশ করুন
                </button>
              </form>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900">আপনার পূর্ববর্তী পোস্টসমূহ</h3>
              {myPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs space-y-2">
                  {post.title && <h4 className="text-sm font-bold text-gray-900">{post.title}</h4>}
                  <p className="text-xs text-gray-700 whitespace-pre-line">{post.content}</p>
                  <div className="text-[10px] text-gray-400">
                    {new Date(post.created_at).toLocaleString('bn-BD')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Edit Profile */}
        {activeTab === 'edit' && (
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs max-w-lg">
            <h3 className="text-base font-bold text-gray-900 mb-4">আপনার তথ্য হালনাগাদ করুন</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">পুরো নাম</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">মোবাইল নম্বর</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">সংক্ষিপ্ত পরিচয় / বায়ো</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm shadow-xs transition-all"
              >
                {loading ? 'সংরক্ষণ হচ্ছে...' : 'তথ্য সংরক্ষণ করুন'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
