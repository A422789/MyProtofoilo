import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Briefcase, Code, Award, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    certificates: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data in parallel
        const [projectsRes, skillsRes, certsRes, contactsRes] = await Promise.all([
          API.get('/projects'),
          API.get('/skills'),
          API.get('/certificates'),
          API.get('/admin/contacts')
        ]);

        const contacts = contactsRes.data.data;
        const unreadCount = contacts.filter(msg => !msg.isRead).length;

        setStats({
          projects: projectsRes.data.data.length,
          skills: skillsRes.data.data.length,
          certificates: certsRes.data.data.length,
          messages: contacts.length,
          unreadMessages: unreadCount
        });
      } catch (error) {
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: <Briefcase size={32} className="text-[#cea605]" />,
      color: 'from-[#cea605]/20 to-transparent',
      borderColor: 'border-[#cea605]/30'
    },
    {
      title: 'Skills Added',
      value: stats.skills,
      icon: <Code size={32} className="text-[#cea605]" />,
      color: 'from-[#cea605]/20 to-transparent',
      borderColor: 'border-[#cea605]/30'
    },
    {
      title: 'Certificates',
      value: stats.certificates,
      icon: <Award size={32} className="text-[#cea605]" />,
      color: 'from-[#cea605]/20 to-transparent',
      borderColor: 'border-[#cea605]/30'
    },
    {
      title: 'Contact Messages',
      value: stats.messages,
      subValue: `${stats.unreadMessages} Unread`,
      icon: <MessageSquare size={32} className={stats.unreadMessages > 0 ? "text-red-400" : "text-[#cea605]"} />,
      color: stats.unreadMessages > 0 ? 'from-red-500/20 to-transparent' : 'from-[#cea605]/20 to-transparent',
      borderColor: stats.unreadMessages > 0 ? 'border-red-500/30' : 'border-[#cea605]/30'
    }
  ];

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        <div className="text-[#cea605] animate-pulse">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-end border-b border-[#cea605]/20 pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here is a quick summary of your portfolio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={index} 
            className={`bg-gradient-to-br ${card.color} bg-[#0a0a0a] p-6 rounded-2xl border ${card.borderColor} flex items-center justify-between shadow-[0_0_15px_rgba(206,166,5,0.05)] hover:shadow-[0_0_20px_rgba(206,166,5,0.15)] transition-all`}
          >
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-4xl font-bold text-white mb-1">{card.value}</h3>
              {card.subValue && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stats.unreadMessages > 0 ? 'bg-red-500/20 text-red-400' : 'bg-[#cea605]/10 text-[#cea605]'}`}>
                  {card.subValue}
                </span>
              )}
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-white/5">
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
