import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import HireMeBtn from '../Components/HireMeBtn.jsx'
import Icone from '../Components/Icon.jsx'
import API from '../api/axios.js'
import LoadingSpinner from '../Components/LoadingSpinner';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    API.get('/profile')
      .then(res => setProfile(res.data.data))
      .catch(err => console.error('Failed to fetch profile:', err));
  }, []);

  if (!profile) return (
    <section className='min-h-[90vh] bg-black flex items-center justify-center mt-20'>
      <LoadingSpinner size="large" />
    </section>
  );

  return (
    <motion.section 
    ref={ref}
    className='min-h-[90vh] py-12 bg-black flex flex-col sm:flex-col  lg:flex-row items-center gap-5 mt-20' >

     <div className='text-white w-full lg:w-1/2 px-5 lg:pl-20 flex flex-col '>
     <div className='text-2xl sm:text-4xl mb-[10%] sm:w-170 w-[90%] tracking-wider  text-[#b3b3b3] min-h-50 '>
      
{profile.heroText}
       <TypeAnimation 
        sequence={[
         1500,
     profile.typeAnimationText,
     1000, 
   ]}
        className='text-[#cea605] tracking-wider '
          wrapper="span"
           speed={5}
            repeat={0}
            ></TypeAnimation>
      </div>
     <div className='w-[90%] sm:w-fit  flex flex-col sm:flex-row  justify-between gap-5 sm:gap-20'>
        <HireMeBtn/>
        <a href={profile.cvFile?.url ? profile.cvFile.url.replace('/upload/', '/upload/fl_attachment/') : '#'} download="Ahmed-Ayyad-CV.pdf"
   className="
     bg-transparent
     hover:bg-[#f2de8c]
     text-[#cea605]
     hover:text-black
     font-semibold
     text-xl
     tracking-wider
     py-3 px-6
     border-2
     border-[#cea605]
     rounded-2xl
     overflow-hidden
     cursor-pointer
     transition-all
     duration-300
     shadow-[0_0_15px_7px_rgba(206,166,5,0.3)]
     hover:shadow-[0_0_25px_10px_rgba(206,166,5,0.5)]
     
   "
>
   Download CV
</a>

     </div>
     <div className='icons flex justify-center w-fit items-center h-50 w'>
      <Icone/>

     </div>
     </div>

     <motion.img src={profile.heroImage?.url} alt="image"  
      className=''
       initial={{ opacity: 0, scale: 0.5, x: 100 }}
       animate={{ opacity: 1, scale: 1, x: 0 }}
         transition={{ duration: 1.5, delay: 0.3 }}
     />
    </motion.section>
  )
}

export default Home
