import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'large' }) => {
  // Define sizes
  const sizes = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-20 h-20 border-4',
  };

  const selectedSize = sizes[size] || sizes.large;

  return (
    <div className="flex justify-center items-center h-full w-full">
      <motion.div
        className={`${selectedSize} rounded-full border-t-[#cea605] border-r-[#cea605] border-b-[#f2de8c]/30 border-l-[#f2de8c]/30`}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        style={{
          boxShadow: size === 'large' ? '0 0 20px rgba(206,166,5,0.4)' : 'none',
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
