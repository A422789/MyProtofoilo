import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import myImage from '../assets/AboutSec.png'; 

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });


  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1],delay: 0.8 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.8, ease: "easeOut" } }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section 
      ref={ref}
      className='min-h-screen bg-black flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'
    >
      <div className="max-w-7xl w-full">
  
        <motion.h2 
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-4xl sm:text-5xl font-bold text-center mb-16 logo"
        >
          <span 
            className='text-white' 
            style={{ textShadow: '5px 5px 15px #b49106' }}
          >
            About Me
          </span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          
         
          <motion.div 
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="w-64 h-64  sm:min-w-100 sm:min-h-100 sm:w-80 sm:h-80 lg:order-1 order-2"
          >
          
            <div className="
              w-full h-full rounded-full 
              transition-all duration-300 ease-in-out
              hover:shadow-[0_0_100px_20px_rgba(206,166,5,0.6)]
            ">
              
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src={myImage} 
                  alt="Ahmed Ayyad" 
                  className="w-full h-full object-cover object-center scale-100"
                />
              </div>
            </div>
          </motion.div>

         
          <motion.div 
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:w-1/2 text-lg lg:order-2 order-1"
          >
            <p className="text-[#b3b3b3] leading-relaxed text-center lg:text-left">
              As a passionate Software Engineering student and dedicated React.js Developer, I thrive on transforming complex challenges into elegant, high-performance web applications. My journey isn't just about writing code; it's about architecting solutions. I've built a diverse portfolio of over 10 applications, from enterprise dashboards to full-stack e-commerce platforms, demonstrating a deep commitment to the entire development lifecycle.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;
