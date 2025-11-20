import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import projectImage from '../assets/AboutSection.png'; 
import ChatGBT from '../assets/ChatGBT.png'
import Ecommers from '../assets/E-commers.png'
import DashBoard from '../assets/DashBoard.png'
import AdminPanal from '../assets/AdminPanal.png'
import Company from '../assets/Company.png'
import MalWare from '../assets/MalWare.png'
import TodoApp from '../assets/TodoApp.png'
import ProjectManager from '../assets/ProjectManager.png'
import LoginPage from '../assets/LoginPage.png'
import Coffee from '../assets/Coffee.png'

const ProjectCard = ({ image, title, overview, liveLink, sourceLink }) => {
  

  const x = useMotionValue(0);
  const y = useMotionValue(0);


  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);


  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

 
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };


  return (
    <motion.div

      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d', 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full bg-white/5 rounded-4xl backdrop-blur-3xl p-6 flex flex-col gap-4 transform-gpu"
    >

      <div className="w-full h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full  rounded-3xl object-cover" />
      </div>

      <div className="flex flex-col items-start text-left gap-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-base text-[#b3b3b3] leading-relaxed">
          {overview}
        </p>
      </div>

      <div className="flex items-center justify-start gap-6 mt-4">
       
        <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="project-button ">
          Source Code
        </a>
         <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-button">
          Live Demo
        </a>
      </div>
    </motion.div>
  );
};


const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

const projects = [
  {
    title: "Chat-Boot: A ChatGPT Clone",
    overview:
      "A pixel-perfect replica of the ChatGPT interface, built with React and Tailwind CSS. Powered by Google's Gemini Pro API, it features real-time streaming, advanced API integration, and seamless error handling.",
    liveLink: "https://a422789.github.io/chat-boot/",
    sourceLink: "https://github.com/A422789/chat-boot",
    image: ChatGBT,
  },

  {
    title: "Enterprise Dashboard",
    overview:
      "An enterprise-grade admin dashboard built with React and MUI featuring advanced charts, data grids, a full calendar, Kanban board, and global state management using React Context API.",
    liveLink: "https://a422789.github.io/Advance_DashBoard/",
    sourceLink: "https://github.com/A422789/Advance_DashBoard",
    image: DashBoard,
  },

  {
    title: "E-Commerce Storefront",
    overview:
      "A modern and responsive e-commerce storefront built with React and Bootstrap, featuring a dynamic product catalog, guest cart persistence with Local Storage, and full authentication linked with an admin panel.",
    liveLink: "https://a422789.github.io/e-commers/",
    sourceLink: "https://github.com/A422789/e-commers/",
    image: Ecommers,
  },

  // -------------------- NEW PROJECTS WITH IMAGES --------------------

  {
    title: "E-Commerce Admin Panel",
    overview:
      "A full-feature admin panel built using React, Tailwind CSS, Firebase, and Cloudinary. Features complete CRUD operations for products, real-time Firestore updates, protected routes, image uploads, and persistent Dark/Light mode.",
    liveLink: "https://a422789.github.io/AdminPanal/",
    sourceLink: "https://github.com/A422789/AdminPanal/",
    image: AdminPanal,
  },

  {
    title: "Malware: A Cybersecurity Guide",
    overview:
      "A futuristic, cyberpunk-style educational guide built with pure HTML and CSS. It explains malware types, threats, and protection methods through immersive UI, animations, 3D visuals, and fully responsive layouts.",
    liveLink: "https://a422789.github.io/Malware-project/",
    sourceLink: "https://github.com/A422789/Malware-project/",
    image: MalWare,
  },

  {
    title: "Corporate Company Website",
    overview:
      "A fully responsive corporate landing page built with Bootstrap 5 and custom CSS. Includes a hero carousel, services, portfolio gallery, team section, and contact form with modern UI components.",
    liveLink: "https://a422789.github.io/Company.website-project/",
    sourceLink: "https://github.com/A422789/Company.website-project/",
    image: Company,
  },

  {
    title: "Products Manager – CRUDS System",
    overview:
      "A complete CRUDS product manager built with pure JavaScript. Supports real-time total calculation, bulk creation, update mode, advanced search, and full data persistence via Local Storage.",
    liveLink: "https://a422789.github.io/ProductsManager/",
    sourceLink: "https://github.com/A422789/ProductsManager/",
    image: ProjectManager,
  },

  {
    title: "The Coffee Corner – Café Website",
    overview:
      "A modern and elegant café website built with HTML, CSS, Bootstrap 5, and JavaScript. Fully responsive, featuring interactive components, menu sections, and a clean user-focused design.",
    liveLink: "https://a422789.github.io/Coffee.shope-project/",
    sourceLink: "https://github.com/A422789/Coffee.shope-project/",
    image: Coffee,
  },

  {
    title: "Modern Responsive Login Page",
    overview:
      "A sleek login page built with HTML, CSS, and JavaScript. Features responsive Flexbox-based layout, password visibility toggle, and clean modern UI suitable for any authentication system.",
    liveLink: "https://a422789.github.io/Advance.Login.page-project/",
    sourceLink: "https://github.com/A422789/Advance.Login.page-project/",
    image: LoginPage,
  },

  {
    title: "React To-Do List App",
    overview:
      "A clean and functional To-Do application built with React. Features task creation, deletion, completion toggling, and full data persistence using Local Storage with Hooks like useState and useEffect.",
    liveLink: "https://a422789.github.io/Todo-list_project/",
    sourceLink: "https://github.com/A422789/Todo-list_project/",
    image: TodoApp,
  },
];

const [showMore, setShowMore] = useState(false);
  return (
    <section ref={ref} className='min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 scale-90' >
   
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-bold text-center mb-16 logo"
      >
        <span className='text-white' style={{ textShadow: '5px 5px 15px #b49106' }}>
          My Top Projects
        </span>
      </motion.h2>

 
      <div className="w-[90%] lg:w-[80%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
       {(showMore ? projects : projects.slice(0, 3)).map((project, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    style={{ perspective: "1000px" }}
  >
    <ProjectCard
      image={project.image}
      title={project.title}
      overview={project.overview}
      liveLink={project.liveLink}
      sourceLink={project.sourceLink}
    />
  </motion.div>
))}
<div className="flex justify-end max-h-20  mt-10">
  <button
    onClick={() => setShowMore(!showMore)}
    className="contact-send-button  "
  >
    {showMore ? " < Show Less " : "Show More >"}
  </button>
</div>


      </div>
    </section>
  );
};

export default Projects;
