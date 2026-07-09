import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, User } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated, loading } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    await login(username, password);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#cea605]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md bg-[#0a0a0a] rounded-2xl border border-[#cea605]/20 p-8 shadow-[0_0_50px_rgba(206,166,5,0.1)] relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-widest mb-2 logo">
            <span className="text-[#cea605]" style={{textShadow: '0 0 15px rgba(206,166,5,0.4)'}}>PORTFOLIO</span> ADMIN
          </h1>
          <p className="text-gray-400">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-[#cea605]" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-[#cea605]/30 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#cea605] focus:ring-1 focus:ring-[#cea605] transition-all"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-[#cea605]" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-[#cea605]/30 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#cea605] focus:ring-1 focus:ring-[#cea605] transition-all"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#cea605] hover:bg-[#b49106] text-black font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-[0_0_20px_rgba(206,166,5,0.3)] mt-4"
          >
            {loading ? 'Authenticating...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
