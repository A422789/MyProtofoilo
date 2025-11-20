import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm, ValidationError } from '@formspree/react';  // ← إضافة Formspree
import myImage from '../assets/AboutSection.png';
import ContactInfoCard from '../Components/ContactInfoCard';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
const formRef = useRef();
  // ← هوك Formspree
  const [state, handleSubmit] = useForm("mwpywbpo");
  const[showMessage,setshowMessage]=useState(false);
  const icons = {
    email: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
    phone: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
    location: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
  };
    
   useEffect(()=>{
    if(state.succeeded){
    setshowMessage(true);
      formRef.current.reset();
    setTimeout(() => {
   setshowMessage(false);
    }, 2000);
   }
   },[state.succeeded])
   
  return (
    <section ref={ref} className='min-h-screen  flex flex-col items-center justify-center py-20 px-4' id='contact'>
      
      {/* العنوان */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-bold text-center mb-16 logo"
      >
        <span className='text-white' style={{ textShadow: '5px 5px 15px #b49106' }}>
          Contact Me
        </span>
      </motion.h2>

      {/* الحاوية الرئيسية */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">

        {/* الفورم + الصورة */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          
          {/* الفورم */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-4/5 order-1"
          >
            <form  ref={formRef}
              onSubmit={handleSubmit}   // ← دمج Formspree
              className="w-full bg-black/30 backdrop-blur-lg rounded-2xl p-8 flex flex-col gap-6"
            >
              <input 
                type="text" 
                name="name"
                placeholder="Your Name"
                className="contact-input"
                required
              
              />

              <input 
                type="email" 
                name="email"
                placeholder="Your Email"
                className="contact-input"
                required
                
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />

              <textarea 
                name="message"
                placeholder="Message"
                rows="5"
                className="contact-input"
                required
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />

              <button 
                type="submit" 
                disabled={state.submitting}
                className="contact-send-button mt-2"
              >
                {state.submitting ? "Sending..." : "Send"}
              </button>
              {(showMessage&&(<p className='text-green-500'>Message sent successfully! 🚀</p>))}
            </form>
          </motion.div>

          {/* الصورة */}
          <motion.div 
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-90  order-2 lg:order-2 relative group"
          >
            <img 
              src={myImage} 
              alt="Ahmed Ayyad" 
              className="w-full h-full object-cover object-center rounded-full"
            />
            <div className="
              absolute inset-0 rounded-full 
              opacity-0 group-hover:opacity-100 
              shadow-[0_0_40px_8px_rgba(206,166,5,0.6)] 
              transition-opacity duration-300 ease-in-out
            "></div>
          </motion.div>

        </div>

        {/* كاردات المعلومات */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full lg:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-center gap-8 order-3"
        >
          <ContactInfoCard icon={icons.email} title="Email" value="a422789255@gmail.com" />
          <ContactInfoCard icon={icons.phone} title="Phone" value="+923159186062" />
          <ContactInfoCard icon={icons.location} title="Location" value="Islamabad, Pakistan" />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
