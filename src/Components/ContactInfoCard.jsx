import React from 'react';

const ContactInfoCard = ({ icon, title, value }) => {
  return (
    <div className="
      w-full bg-black 
      border border-[#cea605] 
      rounded-lg 
      p-3
      flex flex-col sm:flex-row items-center justify-start text-center sm:text-left gap-4
      transition-all duration-300 ease-in-out
      hover:shadow-[0_0_35px_5px_rgba(206,166,5,0.6)]
      hover:-translate-y-2
      scale-90
      hover:scale-100
    ">
      {/* الأيقونة */}
      <div className="w-10 h-10 text-[#cea605]">
        {icon}
      </div>
      {/* المحتوى */}
      <div className="flex flex-col">
        <h4 className="font-semibold text-white text-lg">{title}</h4>
        <p className="text-[#b3b3b3] text-base break-all">{value}</p>
      </div>
    </div>
  );
};

export default ContactInfoCard;
