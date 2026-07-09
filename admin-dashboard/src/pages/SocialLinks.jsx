import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const SocialLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    platform: '', url: '', iconSvg: '', order: 0
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await API.get('/social-links');
      setLinks(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch social links');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (link = null) => {
    if (link) {
      setEditingId(link._id);
      setFormData({
        platform: link.platform,
        url: link.url,
        iconSvg: link.iconSvg || '',
        order: link.order || 0,
      });
    } else {
      setEditingId(null);
      setFormData({ platform: '', url: '', iconSvg: '', order: 0 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(editingId ? 'Updating link...' : 'Creating link...');
    try {
      if (editingId) {
        await API.put(`/admin/social-links/${editingId}`, formData);
        toast.success('Social link updated', { id: toastId });
      } else {
        await API.post('/admin/social-links', formData);
        toast.success('Social link created', { id: toastId });
      }
      fetchLinks();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save social link', { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this social link?')) return;
    try {
      await API.delete(`/admin/social-links/${id}`);
      setLinks(links.filter(s => s._id !== id));
      toast.success('Social link deleted');
    } catch (error) {
      toast.error('Failed to delete social link');
    }
  };

  if (loading) return <div className="text-[#cea605]">Loading social links...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-center border-b border-[#cea605]/20 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Social Links</h1>
          <p className="text-gray-400 mt-1">Manage the social media links displayed on your portfolio.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#cea605] hover:bg-[#b49106] text-black font-bold py-2 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(206,166,5,0.2)]">
          <Plus size={20} /> Add Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <div key={link._id} className="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-6 flex flex-col hover:border-[#cea605]/50 transition-colors group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 text-[#cea605] [&_svg]:w-full [&_svg]:h-full" dangerouslySetInnerHTML={{ __html: link.iconSvg || '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>' }} />
              <div>
                <h3 className="font-bold text-white text-lg">{link.platform}</h3>
                <a href={link.url} target="_blank" rel="noreferrer" className="text-sm text-[#cea605] hover:underline truncate inline-block max-w-[200px]">{link.url}</a>
              </div>
            </div>
            
            <div className="flex gap-2 mt-auto pt-4 border-t border-gray-800">
              <button onClick={() => openModal(link)} className="flex-1 flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg transition-colors border border-gray-700 text-sm">
                <Edit2 size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(link._id)} className="flex-1 flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-2 rounded-lg transition-colors text-sm">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] rounded-2xl border border-[#cea605]/30 w-full max-w-lg flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit Social Link' : 'Add New Link'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <form id="linkForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Platform Name *</label>
                  <input type="text" name="platform" value={formData.platform} onChange={handleChange} placeholder="e.g. LinkedIn" required className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Profile URL *</label>
                  <input type="url" name="url" value={formData.url} onChange={handleChange} required className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Display Order</label>
                  <input type="number" name="order" value={formData.order} onChange={handleChange} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex justify-between">
                    <span>SVG Icon Markup</span>
                    {formData.iconSvg && <span className="text-[#cea605] text-xs">Preview active</span>}
                  </label>
                  <textarea name="iconSvg" value={formData.iconSvg} onChange={handleChange} rows="4" placeholder="<svg>...</svg>" className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none font-mono text-xs" />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
              <button onClick={closeModal} className="px-6 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">Cancel</button>
              <button form="linkForm" type="submit" className="bg-[#cea605] hover:bg-[#b49106] text-black font-bold px-6 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(206,166,5,0.2)]">
                {editingId ? 'Save Changes' : 'Create Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
