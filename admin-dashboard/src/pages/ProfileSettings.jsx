import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Save, UploadCloud } from 'lucide-react';

const ProfileSettings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/profile');
      setProfile(res.data.data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToUpdate = {
        name: profile.name,
        title: profile.title,
        heroText: profile.heroText,
        typeAnimationText: profile.typeAnimationText,
        aboutText: profile.aboutText,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        footerText: profile.footerText,
      };
      await API.put('/admin/profile', dataToUpdate);
      toast.success('Profile text updated successfully');
    } catch (error) {
      toast.error('Failed to update profile text');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (endpoint, file, fieldName) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append(fieldName, file);

    const toastId = toast.loading('Uploading file...');
    try {
      const res = await API.put(`/admin/profile/${endpoint}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile(res.data.data);
      toast.success('File uploaded successfully', { id: toastId });
    } catch (error) {
      toast.error('Failed to upload file', { id: toastId });
    }
  };

  if (loading) return <div className="text-[#cea605]">Loading profile data...</div>;
  if (!profile) return <div className="text-red-500">Profile not found. Please run the seed script.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      {/* Text Information Form */}
      <div className="bg-black/50 p-6 rounded-2xl border border-[#cea605]/20">
        <h2 className="text-xl text-[#cea605] mb-6 border-b border-[#cea605]/20 pb-2">Personal Information</h2>
        
        <form onSubmit={handleTextSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Full Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleTextChange} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Job Title</label>
              <input type="text" name="title" value={profile.title} onChange={handleTextChange} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email Address</label>
              <input type="email" name="email" value={profile.email} onChange={handleTextChange} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Phone Number</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleTextChange} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400">Location</label>
              <input type="text" name="location" value={profile.location} onChange={handleTextChange} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400">Hero Section Text</label>
              <textarea name="heroText" value={profile.heroText} onChange={handleTextChange} rows="2" className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400">Type Animation Text (Hero)</label>
              <input type="text" name="typeAnimationText" value={profile.typeAnimationText} onChange={handleTextChange} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400">About Section Text</label>
              <textarea name="aboutText" value={profile.aboutText} onChange={handleTextChange} rows="5" className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400">Footer Text</label>
              <input type="text" name="footerText" value={profile.footerText} onChange={handleTextChange} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-2 text-white focus:border-[#cea605] focus:outline-none" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-800">
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-[#cea605] hover:bg-[#b49106] text-black font-bold py-2 px-6 rounded-xl transition-all disabled:opacity-70">
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Media Uploads */}
      <div className="bg-black/50 p-6 rounded-2xl border border-[#cea605]/20">
        <h2 className="text-xl text-[#cea605] mb-6 border-b border-[#cea605]/20 pb-2">Media & Documents</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* File Upload Helper Component */}
          {[
            { title: 'Hero Image', key: 'heroImage', endpoint: 'hero-image', fieldName: 'image', accept: 'image/*' },
            { title: 'About Image', key: 'aboutImage', endpoint: 'about-image', fieldName: 'image', accept: 'image/*' },
            { title: 'Contact Image', key: 'contactImage', endpoint: 'contact-image', fieldName: 'image', accept: 'image/*' },
            { title: 'CV Document (PDF)', key: 'cvFile', endpoint: 'cv', fieldName: 'file', accept: '.pdf' },
          ].map((item) => (
            <div key={item.key} className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-800 flex flex-col items-center text-center gap-4">
              <h3 className="font-medium text-gray-300">{item.title}</h3>
              
              <div className="w-full h-32 bg-black rounded-lg border border-dashed border-gray-700 flex items-center justify-center overflow-hidden">
                {profile[item.key]?.url ? (
                  item.accept.includes('pdf') 
                    ? <div className="text-[#cea605] font-bold">PDF Uploaded</div>
                    : <img src={profile[item.key].url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-600 text-sm">No file uploaded</span>
                )}
              </div>

              <div className="relative w-full">
                <input 
                  type="file" 
                  accept={item.accept}
                  onChange={(e) => handleFileUpload(item.endpoint, e.target.files[0], item.fieldName)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 text-white py-2 px-4 rounded-lg transition-colors border border-gray-700">
                  <UploadCloud size={16} className="text-[#cea605]" />
                  Upload New File
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
