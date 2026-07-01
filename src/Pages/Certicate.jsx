import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import projectImage from '../assets/AboutSection.png'; 
import img1 from '../assets/Certificates/Developing Back-End Apps with Node.js and.pdf'
import img2 from '../assets/Certificates/Node.js&MongoDBDeveloping Back-end.pdf'
import img3 from '../assets/Certificates/Get Started with Cloud Native, DevOps, Agile, and.pdf'
import img4 from '../assets/Certificates/JavaScript Programming Essentials.pdf'
import img5 from '../assets/Certificates/Introduction to HTML, CSS, & JavaScript.pdf'
import img6 from '../assets/Certificates/Getting Started with Git and GitHub.pdf'
import img7 from '../assets/Certificates/Introduction to Software Engineering.pdf'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
  {typeof image === 'string' && image.toLowerCase().endsWith('.pdf') ? (
    <Document file={image}>
      <Page pageNumber={1} width={300} />
    </Document>
  ) : (
    <img src={image} alt={title} className="w-full h-full object-cover" />
  )}
</div>
       <div className="flex flex-col items-start text-left gap-4">
        <h3 className="text-white">{title}</h3>
        <p className="text-base text-[#b3b3b3] leading-relaxed">
            IBM <br />
          {overview}
        </p>
        </div>
     

      <div className="flex items-center justify-start gap-6 mt-4">
       
        
         <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-button" style={{fontSize:'90%',borderRadius:'50px'}}>
          verify
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
    title: "Developing Back-End Apps with Node.js and Express",
    overview: "Completed April 2026",
    liveLink: "https://www.coursera.org/account/accomplishments/verify/75B0QAW53RAK",
    image: img1,
  },
  {
    title: "Node.js & MongoDB: Developing Back-end Database Applications",
    overview: "Completed June 2026",
    liveLink: "https://www.coursera.org/account/accomplishments/verify/3ZOAKBGWEFW6",
    image: img2,
  },
  {
    title: "Get Started with Cloud Native, DevOps, Agile, and NoSQL",
    overview: "Completed April 2026",
    liveLink: "https://www.coursera.org/account/accomplishments/verify/981TLFVYXZ97a",
    image: img3,
  },
  {
    title: "JavaScript Programming Essentials",
    overview: "Completed March 2026",
    liveLink: "https://www.coursera.org/account/accomplishments/verify/W8X29X8G1O0N",
    image: img4,
  },
  {
    title: "Introduction to HTML, CSS, & JavaScript",
    overview: "Completed February 2026",
    liveLink: "https://www.coursera.org/account/accomplishments/verify/REELSH8YRT7Z",
    image: img5,
  },
  {
    title: "Getting Started with Git and GitHub",
    overview: "Completed February 2026",
    liveLink: "https://www.coursera.org/account/accomplishments/verify/SS52VFTTWN32",
    image: img6,
  },
  {
    title: "Introduction to Software Engineering",
    overview: "Completed February 2026",
    liveLink: "https://www.coursera.org/account/accomplishments/verify/PVJ0GAUH1372",
    image: img7,
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
        Certificates Section
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
