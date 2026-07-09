import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Trash2, Mail, CheckCircle, Clock } from 'lucide-react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await API.get('/admin/contacts');
      setMessages(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/admin/contacts/${id}/read`);
      setMessages(messages.map(msg => msg._id === id ? { ...msg, isRead: true } : msg));
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await API.delete(`/admin/contacts/${id}`);
      setMessages(messages.filter(msg => msg._id !== id));
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  if (loading) return <div className="text-[#cea605]">Loading messages...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-end border-b border-[#cea605]/20 pb-4">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-gray-400 mt-2">Manage submissions from your portfolio contact form.</p>
        </div>
        <div className="bg-black/50 border border-gray-800 rounded-lg px-4 py-2">
          <span className="text-[#cea605] font-bold">{messages.filter(m => !m.isRead).length}</span> Unread
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-black/30 rounded-2xl border border-gray-800">
          <Mail size={48} className="mx-auto mb-4 opacity-50" />
          <p>No messages found. Inbox is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <div 
              key={msg._id} 
              className={`p-6 rounded-2xl border transition-all ${
                msg.isRead 
                  ? 'bg-[#0a0a0a] border-gray-800' 
                  : 'bg-black/80 border-[#cea605]/40 shadow-[0_0_15px_rgba(206,166,5,0.1)]'
              }`}
            >
              <div className="flex justify-between items-start gap-4 flex-col md:flex-row">
                
                {/* Header info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {msg.name}
                      {!msg.isRead && <span className="bg-[#cea605] text-black text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>}
                    </h3>
                    <a href={`mailto:${msg.email}`} className="text-[#cea605] hover:underline flex items-center gap-1 text-sm">
                      <Mail size={14} /> {msg.email}
                    </a>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={12} />
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:flex-col md:w-32">
                  {!msg.isRead && (
                    <button 
                      onClick={() => markAsRead(msg._id)}
                      className="flex-1 flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 border border-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm w-full"
                    >
                      <CheckCircle size={16} className="text-green-500" />
                      Mark Read
                    </button>
                  )}
                  <button 
                    onClick={() => deleteMessage(msg._id)}
                    className="flex-1 flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg transition-colors text-sm w-full"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
