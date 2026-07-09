import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Eye, EyeOff } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: 'General', iconSvg: '', order: 0
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await API.get('/skills');
      setSkills(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (skill = null) => {
    if (skill) {
      setEditingId(skill._id);
      setFormData({
        name: skill.name,
        category: skill.category || 'General',
        iconSvg: skill.iconSvg || '',
        order: skill.order || 0,
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', category: 'General', iconSvg: '', order: 0 });
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
    const toastId = toast.loading(editingId ? 'Updating skill...' : 'Creating skill...');
    try {
      if (editingId) {
        await API.put(`/admin/skills/${editingId}`, formData);
        toast.success('Skill updated', { id: toastId });
      } else {
        await API.post('/admin/skills', formData);
        toast.success('Skill created', { id: toastId });
      }
      fetchSkills();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save skill', { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await API.delete(`/admin/skills/${id}`);
      setSkills(skills.filter(s => s._id !== id));
      toast.success('Skill deleted');
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const handleToggleVisibility = async (skill) => {
    try {
      await API.put(`/admin/skills/${skill._id}`, { ...skill, isHidden: !skill.isHidden });
      setSkills(skills.map(s => s._id === skill._id ? { ...s, isHidden: !skill.isHidden } : s));
      toast.success(skill.isHidden ? 'Skill is now visible' : 'Skill hidden from portfolio');
    } catch (error) {
      toast.error('Failed to toggle visibility');
    }
  };

  if (loading) return <div className="text-[#cea605]">Loading skills...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-center border-b border-[#cea605]/20 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-gray-400 mt-1">Manage your technical skills and their SVG icons.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#cea605] hover:bg-[#b49106] text-black font-bold py-2 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(206,166,5,0.2)]">
          <Plus size={20} />
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((skill) => (
          <div key={skill._id} className={`bg-[#0a0a0a] rounded-2xl border ${skill.isHidden ? 'border-gray-800/50 opacity-50' : 'border-gray-800'} p-4 flex flex-col items-center hover:border-[#cea605]/50 hover:opacity-100 transition-all group relative`}>
            {skill.isHidden && (
              <div className="absolute top-2 right-2 text-gray-500">
                <EyeOff size={14} />
              </div>
            )}
            <div className={`w-12 h-12 mb-3 [&_svg]:w-full [&_svg]:h-full ${skill.isHidden ? 'text-gray-600' : 'text-[#cea605]'}`} dangerouslySetInnerHTML={{ __html: skill.iconSvg || '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>' }} />
            <h3 className={`font-bold text-center text-sm ${skill.isHidden ? 'text-gray-500' : 'text-white'}`}>{skill.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{skill.category}</p>
            
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
              <button onClick={() => handleToggleVisibility(skill)} className="p-2 bg-white/10 hover:bg-gray-400 hover:text-black text-white rounded-lg transition-colors" title={skill.isHidden ? 'Show' : 'Hide'}>
                {skill.isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => openModal(skill)} className="p-2 bg-white/10 hover:bg-[#cea605] hover:text-black text-white rounded-lg transition-colors">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(skill._id)} className="p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] rounded-2xl border border-[#cea605]/30 w-full max-w-lg flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit Skill' : 'Add New Skill'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <form id="skillForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Skill Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Category</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Display Order</label>
                    <input type="number" name="order" value={formData.order} onChange={handleChange} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                  </div>
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
              <button form="skillForm" type="submit" className="bg-[#cea605] hover:bg-[#b49106] text-black font-bold px-6 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(206,166,5,0.2)]">
                {editingId ? 'Save Changes' : 'Create Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
