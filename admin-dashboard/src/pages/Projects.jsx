import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', repoLink: '', liveLink: '', order: 0, featured: false
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingId(project._id);
      setFormData({
        title: project.title,
        description: project.description,
        techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack,
        repoLink: project.repoLink || '',
        liveLink: project.liveLink || '',
        order: project.order || 0,
        featured: project.featured || false,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '', description: '', techStack: '', repoLink: '', liveLink: '', order: 0, featured: false
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    
    if (selectedFile) {
      submitData.append('image', selectedFile);
    }

    const toastId = toast.loading(editingId ? 'Updating project...' : 'Creating project...');

    try {
      if (editingId) {
        await API.put(`/admin/projects/${editingId}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Project updated', { id: toastId });
      } else {
        await API.post('/admin/projects', submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Project created', { id: toastId });
      }
      fetchProjects();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project', { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await API.delete(`/admin/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
      toast.success('Project deleted');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) return <div className="text-[#cea605]">Loading projects...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-center border-b border-[#cea605]/20 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects showcase.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#cea605] hover:bg-[#b49106] text-black font-bold py-2 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(206,166,5,0.2)]">
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-[#0a0a0a] rounded-2xl border border-gray-800 overflow-hidden flex flex-col group hover:border-[#cea605]/50 transition-colors">
            <div className="h-48 relative overflow-hidden bg-black/50">
              {project.image?.url ? (
                <img src={project.image.url} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <ImageIcon size={40} />
                </div>
              )}
              {project.featured && (
                <span className="absolute top-2 right-2 bg-[#cea605] text-black text-xs font-bold px-2 py-1 rounded">Featured</span>
              )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{project.description}</p>
              
              <div className="flex gap-2 mt-auto pt-4 border-t border-gray-800">
                <button onClick={() => openModal(project)} className="flex-1 flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg transition-colors border border-gray-700 text-sm">
                  <Edit2 size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(project._id)} className="flex-1 flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-2 rounded-lg transition-colors text-sm">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] rounded-2xl border border-[#cea605]/30 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="projectForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Project Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Tech Stack (comma separated)</label>
                  <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Repository Link</label>
                    <input type="url" name="repoLink" value={formData.repoLink} onChange={handleChange} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Live Demo Link</label>
                    <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Display Order</label>
                    <input type="number" name="order" value={formData.order} onChange={handleChange} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                  </div>
                  
                  <div className="flex items-center gap-3 pt-8">
                    <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 accent-[#cea605]" />
                    <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">Featured Project</label>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm text-gray-400">Project Image {editingId ? '(Optional to replace)' : '*'}</label>
                  <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} required={!editingId} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#cea605] file:text-black hover:file:bg-[#b49106]" />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
              <button onClick={closeModal} className="px-6 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">Cancel</button>
              <button form="projectForm" type="submit" className="bg-[#cea605] hover:bg-[#b49106] text-black font-bold px-6 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(206,166,5,0.2)]">
                {editingId ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
