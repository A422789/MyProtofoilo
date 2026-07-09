import React, { useContext } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, User, Link as LinkIcon, Briefcase, Code, Award, MessageSquare, LogOut } from 'lucide-react';

const Layout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile Settings', path: '/profile', icon: <User size={20} /> },
    { name: 'Social Links', path: '/social-links', icon: <LinkIcon size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Skills', path: '/skills', icon: <Code size={20} /> },
    { name: 'Certificates', path: '/certificates', icon: <Award size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-[#cea605]/20 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-[#cea605]/20">
          <h1 className="text-2xl font-bold text-[#cea605] tracking-widest text-center" style={{textShadow: '0 0 10px rgba(206,166,5,0.3)'}}>
            ADMIN PANEL
          </h1>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#cea605]/10 text-[#cea605] border border-[#cea605]/30 shadow-[0_0_15px_rgba(206,166,5,0.15)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#cea605]/20">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-black border-b border-[#cea605]/20 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#cea605]">ADMIN</h1>
          <button onClick={logout} className="text-red-400">
            <LogOut size={24} />
          </button>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
