import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, FileText } from 'lucide-react';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', issuer: 'IBM', completionDate: '', verifyLink: '', order: 0
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await API.get('/certificates');
      setCertificates(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (cert = null) => {
    if (cert) {
      setEditingId(cert._id);
      setFormData({
        title: cert.title,
        issuer: cert.issuer || 'IBM',
        completionDate: cert.completionDate || '',
        verifyLink: cert.verifyLink || '',
        order: cert.order || 0,
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', issuer: 'IBM', completionDate: '', verifyLink: '', order: 0 });
    }
    setSelectedFile(null);
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
    const submitData = new FormData();
    Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
    if (selectedFile) submitData.append('file', selectedFile);

    const toastId = toast.loading(editingId ? 'Updating certificate...' : 'Creating certificate...');

    try {
      if (editingId) {
        await API.put(`/admin/certificates/${editingId}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Certificate updated', { id: toastId });
      } else {
        await API.post('/admin/certificates', submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Certificate created', { id: toastId });
      }
      fetchCertificates();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save certificate', { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await API.delete(`/admin/certificates/${id}`);
      setCertificates(certificates.filter(c => c._id !== id));
      toast.success('Certificate deleted');
    } catch (error) {
      toast.error('Failed to delete certificate');
    }
  };

  if (loading) return <div className="text-[#cea605]">Loading certificates...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-center border-b border-[#cea605]/20 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-gray-400 mt-1">Manage your professional certifications and PDFs.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#cea605] hover:bg-[#b49106] text-black font-bold py-2 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(206,166,5,0.2)]">
          <Plus size={20} /> Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert._id} className="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-6 flex flex-col hover:border-[#cea605]/50 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-[#cea605]/10 p-3 rounded-xl">
                <FileText className="text-[#cea605]" size={32} />
              </div>
              <div>
                <h3 className="font-bold text-white line-clamp-2">{cert.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
                <p className="text-xs text-gray-500">{cert.completionDate}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-auto pt-4 border-t border-gray-800">
              <button onClick={() => openModal(cert)} className="flex-1 flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg transition-colors border border-gray-700 text-sm">
                <Edit2 size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(cert._id)} className="flex-1 flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-2 rounded-lg transition-colors text-sm">
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
              <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit Certificate' : 'Add New Certificate'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="certForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Certificate Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Issuer</label>
                    <input type="text" name="issuer" value={formData.issuer} onChange={handleChange} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Completion Date</label>
                    <input type="text" name="completionDate" value={formData.completionDate} onChange={handleChange} placeholder="e.g. March 2026" className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Verification Link</label>
                  <input type="url" name="verifyLink" value={formData.verifyLink} onChange={handleChange} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Display Order</label>
                  <input type="number" name="order" value={formData.order} onChange={handleChange} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm text-gray-400">Certificate PDF {editingId ? '(Optional to replace)' : '*'}</label>
                  <input type="file" accept=".pdf" onChange={(e) => setSelectedFile(e.target.files[0])} required={!editingId} className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#cea605] file:text-black hover:file:bg-[#b49106]" />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
              <button onClick={closeModal} className="px-6 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">Cancel</button>
              <button form="certForm" type="submit" className="bg-[#cea605] hover:bg-[#b49106] text-black font-bold px-6 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(206,166,5,0.2)]">
                {editingId ? 'Save Changes' : 'Create Certificate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
