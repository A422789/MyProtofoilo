import React, { useState, useEffect } from 'react';
import API from '../api/axios.js';

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('/profile')
      .then(res => setProfile(res.data.data))
      .catch(err => console.error('Failed to fetch profile for footer:', err));
  }, []);

  return (
    <footer className='h-20 w-full overflow-x-hidden text-white flex items-center justify-center hover:text-amber-300 shadow-amber-300 shadow-2xl'>
      <p>{profile?.footerText || '© 2025 Ahmed Ayyad | All Right Reserved'}</p>
    </footer>
  );
};

export default Footer;
