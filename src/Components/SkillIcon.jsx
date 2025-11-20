import React from 'react';

// هذا المكون يمثل أيقونة مهارة واحدة
const SkillIcon = ({ icon, name, delay }) => {
  return (
    <a 
      className="flex flex-col items-center gap-3 text-center"
      style={{ transitionDelay: `${delay * 50}ms` }} // تأخير متسلسل للظهور
    >
      {/* الدائرة التي تحتوي على الأيقونة */}
      <div className="
      
        p-5 w-fit rounded-full 
        backdrop-blur-lg 
        border border-[#cea605]/30 
        bg-black/50
        shadow-lg shadow-[#cea605]/20 
        hover:shadow-2xl hover:shadow-[#f2de8c]/40 
        hover:scale-110 
        hover:-translate-y-2
        active:scale-95
        transition-all duration-300 ease-out 
      
        hover:border-[#f2de8c]/70 
        group relative overflow-hidden
      ">
        {/* شريط الإضاءة المتحرك عند الهوفر */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f2de8c]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        
        <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
          {/* 
            الأيقونة نفسها (SVG)
            تأخذ اللون الذهبي وتتغير عند الهوفر بفضل كلاسات group-hover
          */}
          <div className="w-full h-full text-[#cea605] group-hover:text-[#f2de8c] transition-colors duration-300">
            {icon}
          </div>
        </div>
      </div>
      
      {/* اسم المهارة */}
      <p className="text-[#b3b3b3] text-lg font-medium tracking-wide">
        {name}
      </p>
    </a>
  );
};

export default SkillIcon;
