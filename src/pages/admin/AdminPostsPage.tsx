import React, { useState, useEffect } from 'react';
import { MessageSquare, Trash2, CheckCircle2, XCircle, Star, AlertCircle } from 'lucide-react';
import { api } from '../../services/api.js';
import { useData } from '../../context/DataContext.js';
import { Post } from '../../types.js';

export const AdminPostsPage: React.FC = () => {
  const { showToast } = useData();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminPosts();
      setPosts(data);
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
      await api.updateAdminPost(id, { status });
      setPosts(posts.map((p) => (p.id === id ? { ...p, status } : p)));
      showToast(`পোস্ট ${status === 'approved' ? 'অনুমোদিত' : 'বাতিল'} করা হয়েছে`, 'success');
    } catch (err) {
      showToast('হালনাগাদ ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই পোস্ট মুছে ফেলতে চান?')) return;
    try {
      await api.deletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
      showToast('পোস্ট মুছে ফেলা হয়েছে', 'success');
    } catch (err) {
      showToast('মুছে ফেলা ব্যর্থ হয়েছে', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-orange-600" />
            কমিউনিটি পোস্ট মডারেশন ({posts.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            ইউজারদের দেওয়া বিজ্ঞপ্তি ও নোটিশ পর্যালোচনা করুন
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={p.user_avatar}
                  alt={p.user_name}
                  className="w-10 h-10 rounded-full object-cover border"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-gray-900 text-sm">{p.user_name}</div>
                  <div className="text-[11px] text-gray-400">
                    {new Date(p.created_at).toLocaleString('bn-BD')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    p.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : p.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {p.status === 'approved' ? 'অনুমোদিত' : p.status === 'rejected' ? 'বাতিল' : 'অপেক্ষমান'}
                </span>
              </div>
            </div>

            {p.title && <h3 className="font-bold text-gray-900 text-base">{p.title}</h3>}
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">{p.content}</p>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <div className="text-xs text-gray-400">লাইক: {p.likes_count} টি</div>

              <div className="flex items-center gap-2">
                {p.status !== 'approved' && (
                  <button
                    onClick={() => handleUpdateStatus(p.id, 'approved')}
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    অনুমোদন দিন
                  </button>
                )}
                {p.status !== 'rejected' && (
                  <button
                    onClick={() => handleUpdateStatus(p.id, 'rejected')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    বাতিল করুন
                  </button>
                )}
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-xl"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
