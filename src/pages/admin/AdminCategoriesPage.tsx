import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Layers, 
  Check, 
  X, 
  Eye, 
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useData } from '../../context/DataContext.js';
import { Category } from '../../types.js';
import { DynamicIcon, AVAILABLE_LUCIDE_ICONS } from '../../components/common/DynamicIcon.js';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, refreshData, showToast } = useData();
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenAdd = () => {
    setEditingCategory({
      name: '',
      name_en: '',
      slug: '',
      icon: 'ShieldAlert',
      description: '',
      show_on_home: true,
      status: 'active',
      sort_order: categories.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory({ ...category });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name?.trim()) {
      showToast('ক্যাটাগরির বাংলা নাম আবশ্যক', 'error');
      return;
    }

    setLoading(true);
    try {
      if (editingCategory.id) {
        await api.updateCategory(editingCategory.id, editingCategory);
        showToast('ক্যাটাগরি সফলভাবে আপডেট হয়েছে', 'success');
      } else {
        await api.createCategory(editingCategory);
        showToast('নতুন ক্যাটাগরি তৈরি হয়েছে', 'success');
      }
      setModalOpen(false);
      setEditingCategory(null);
      await refreshData();
    } catch (err: any) {
      showToast(err.message || 'সংরক্ষণ ব্যর্থ হয়েছে', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await api.deleteCategory(id);
      showToast('ক্যাটাগরি মুছে ফেলা হয়েছে', 'success');
      setDeleteConfirmId(null);
      await refreshData();
    } catch (err: any) {
      showToast(err.message || 'মুছে ফেলা ব্যর্থ হয়েছে', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCategories.length) return;

    const temp = newCategories[index];
    newCategories[index] = newCategories[targetIndex];
    newCategories[targetIndex] = temp;

    const orderedIds = newCategories.map((c) => c.id);
    try {
      await api.reorderCategories(orderedIds);
      await refreshData();
      showToast('ক্রম পরিবর্তন সফল হয়েছে', 'success');
    } catch (err) {
      showToast('ক্রম পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleToggleStatus = async (cat: Category) => {
    try {
      const newStatus = cat.status === 'active' ? 'inactive' : 'active';
      await api.updateCategory(cat.id, { status: newStatus });
      await refreshData();
      showToast(`ক্যাটাগরি ${newStatus === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে`, 'success');
    } catch (err) {
      showToast('স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  const handleToggleShowOnHome = async (cat: Category) => {
    try {
      await api.updateCategory(cat.id, { show_on_home: !cat.show_on_home });
      await refreshData();
      showToast('হোমপেজ প্রদর্শন পরিবর্তন করা হয়েছে', 'success');
    } catch (err) {
      showToast('পরিবর্তন ব্যর্থ হয়েছে', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-orange-600" />
            ক্যাটাগরি ব্যবস্থাপনা ({categories.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            হোমপেজের প্রধান বিভাগ ও আইকন সমূহ নিয়ন্ত্রণ ও ক্রমানুসার নির্ধারণ করুন
          </p>
        </div>

        <button
          id="add-category-btn"
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          নতুন ক্যাটাগরি তৈরি
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4 w-16 text-center">ক্রম</th>
                <th className="p-4">আইকন</th>
                <th className="p-4">ক্যাটাগরি নাম (বাংলা)</th>
                <th className="p-4">ইংরেজি নাম & স্ল্যাগ</th>
                <th className="p-4 text-center">হোমপেজে প্রদর্শন</th>
                <th className="p-4 text-center">স্ট্যাটাস</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat, idx) => (
                <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Order & Reorder arrows */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold text-gray-700">{idx + 1}</span>
                      <div className="flex flex-col">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMove(idx, 'up')}
                          className="text-gray-400 hover:text-orange-600 disabled:opacity-20 p-0.5"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          disabled={idx === categories.length - 1}
                          onClick={() => handleMove(idx, 'down')}
                          className="text-gray-400 hover:text-orange-600 disabled:opacity-20 p-0.5"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Icon */}
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                      <DynamicIcon name={cat.icon} className="w-5 h-5" />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="p-4">
                    <div className="font-bold text-gray-900 text-sm">{cat.name}</div>
                    {cat.description && (
                      <div className="text-[11px] text-gray-500 truncate max-w-xs">{cat.description}</div>
                    )}
                  </td>

                  {/* English & Slug */}
                  <td className="p-4">
                    <div className="font-medium text-gray-700">{cat.name_en || '-'}</div>
                    <div className="text-[11px] font-mono text-gray-400">/{cat.slug}</div>
                  </td>

                  {/* Show on Home */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggleShowOnHome(cat)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                        cat.show_on_home
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-500 border border-gray-200'
                      }`}
                    >
                      {cat.show_on_home ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {cat.show_on_home ? 'প্রদর্শিত' : 'লুকানো'}
                    </button>
                  </td>

                  {/* Status */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(cat)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        cat.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {cat.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="সম্পাদনা"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(cat.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                {editingCategory.id ? 'ক্যাটাগরি সম্পাদনা' : 'নতুন ক্যাটাগরি যুক্ত করুন'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">ক্যাটাগরি নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: জরুরি সেবা"
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">ইংরেজি নাম</label>
                <input
                  type="text"
                  placeholder="যেমন: Emergency Services"
                  value={editingCategory.name_en || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name_en: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">স্ল্যাগ (URL Identifier)</label>
                <input
                  type="text"
                  placeholder="যেমন: emergency"
                  value={editingCategory.slug || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
              </div>

              {/* Icon Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">আইকন নির্বাচন করুন বা নাম লিখুন</label>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <DynamicIcon name={editingCategory.icon || 'Folder'} className="w-6 h-6" />
                  </div>
                  <input
                    type="text"
                    value={editingCategory.icon || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                    placeholder="Lucide Icon নাম বা ইমেজ URL"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-hidden focus:border-orange-500 focus:bg-white"
                  />
                </div>

                {/* Popular Icon Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1.5 max-h-24 overflow-y-auto">
                  {AVAILABLE_LUCIDE_ICONS.slice(0, 20).map((iconName) => (
                    <button
                      type="button"
                      key={iconName}
                      onClick={() => setEditingCategory({ ...editingCategory, icon: iconName })}
                      className={`p-1.5 rounded-lg border flex items-center gap-1 text-[11px] transition-colors ${
                        editingCategory.icon === iconName
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-orange-50'
                      }`}
                    >
                      <DynamicIcon name={iconName} className="w-3.5 h-3.5" />
                      <span>{iconName}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="এই বিভাগের আওতাধীন সেবা সম্পর্কে ছোট বিবরণ"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-orange-500 focus:bg-white"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCategory.show_on_home ?? true}
                    onChange={(e) => setEditingCategory({ ...editingCategory, show_on_home: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded"
                  />
                  <span className="text-xs font-bold text-gray-700">হোমপেজে প্রদর্শন করুন</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCategory.status === 'active'}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        status: e.target.checked ? 'active' : 'inactive',
                      })
                    }
                    className="w-4 h-4 text-orange-600 rounded"
                  />
                  <span className="text-xs font-bold text-gray-700">ক্যাটাগরি সক্রিয় রাখুন</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs"
                >
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">আপনি কি নিশ্চিত?</h3>
            <p className="text-xs text-gray-500">
              এই ক্যাটাগরি মুছে ফেললে এর অধীনে থাকা সাবক্যাটাগরি ও লিস্টিং ক্ষতিগ্রস্ত হতে পারে।
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 rounded-xl hover:bg-red-700"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
