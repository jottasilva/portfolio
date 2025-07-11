import React, { useState, useEffect } from "react";
import "../css/portfolio.css";

const Portfolio = () => {
 const [isVisible, setIsVisible] = useState(false);
 const [currentText, setCurrentText] = useState(0);
 
 const rotatingTexts = [
   "Desenvolvedor Full-Stack, Designer Gráfico e apaixonado por tecnologia.",
   "Criando experiências digitais únicas e memoráveis.",
   "Transformando ideias em soluções inovadoras.",
   "Especialista em UX/UI e desenvolvimento moderno.",
  "Modelagem 3D."
 ];



 useEffect(() => {
   setIsVisible(true);
   const interval = setInterval(() => {
     setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
   }, 3000);
   return () => clearInterval(interval);
 }, []);

 useEffect(() => {
   const handleScroll = () => {
     const scrollY = window.scrollY;
     const floatingElements = document.querySelectorAll('.floating-element');
     floatingElements.forEach((element, index) => {
       const speed = 0.5 + (index * 0.1);
       element.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
     });
   };

   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 return (
   <div>
     {/* Box Portfolio */}
     <section className="hero-section">
       <div className="container-portfolio">
         <div className="hero-content">
           <h1 className="hero-name">
             <span>Jefferson Silva</span>
           </h1>
           <h2 className="hero-title">
             {rotatingTexts[currentText]}
           </h2>
           <p className="hero-description">
             Sou especializado em dar vida a ideias por meio de soluções
             digitais envolventes, funcionais e visualmente impactantes.
             Combinando criatividade com tecnologia de ponta para criar 
             experiências únicas.
           </p>
           <div className="hero-hobbies">
             Nas horas vagas? Gamer de coração{" "}
             <span className="hobby-emoji">🎮</span> e um ótimo cozinheiro{" "}
             <span className="hobby-emoji">👨‍🍳</span>
           </div>

           <div className="hero-cta">
             <a href="https://www.linkedin.com/in/jrsndev" className="btn-primary">
               <svg width="800px" height="800px" viewBox="0 0 24 24" version="1.1" id="svg8" inkscape:version="0.92.4 (5da689c313, 2019-01-14)" sodipodi:docname="1881161.svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  xml:space="preserve"><path id="path4" inkscape:connector-curvature="0" d="M16.6,14c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.7-0.3-1.4-0.7-2-1.2c-0.5-0.5-1-1.1-1.4-1.7c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.3-0.8-1.8C9.4,7.3,9.2,7.3,9,7.3c-0.1,0-0.3,0-0.5,0C8.3,7.3,8,7.5,7.9,7.6C7.3,8.2,7,8.9,7,9.7c0.1,0.9,0.4,1.8,1,2.6c1.1,1.6,2.5,2.9,4.2,3.7c0.5,0.2,0.9,0.4,1.4,0.5c0.5,0.2,1,0.2,1.6,0.1c0.7-0.1,1.3-0.6,1.7-1.2c0.2-0.4,0.2-0.8,0.1-1.2C17,14.2,16.8,14.1,16.6,14 M19.1,4.9C15.2,1,8.9,1,5,4.9c-3.2,3.2-3.8,8.1-1.6,12L2,22l5.3-1.4c1.5,0.8,3.1,1.2,4.7,1.2h0c5.5,0,9.9-4.4,9.9-9.9C22,9.3,20.9,6.8,19.1,4.9 M16.4,18.9c-1.3,0.8-2.8,1.3-4.4,1.3h0c-1.5,0-2.9-0.4-4.2-1.1l-0.3-0.2l-3.1,0.8l0.8-3l-0.2-0.3C2.6,12.4,3.8,7.4,7.7,4.9S16.6,3.7,19,7.5C21.4,11.4,20.3,16.5,16.4,18.9"/></svg>
               Mande uma Mensagem
             </a>
             <a href="https://api.whatsapp.com/send?phone=5543991359790" className="btn-secondary">
               <svg
                 width="20"
                 height="20"
                 viewBox="0 0 24 24"
                 fill="currentColor"
               >
                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
               </svg>
               Conectar no LinkedIn
             </a>
             <a href="#jobs" className="btn-secondary">
               <svg
                 width="20"
                 height="20"
                 viewBox="0 0 24 24"
                 fill="currentColor"
               >
                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
               </svg>
               Explorar Portfólio
             </a>
           </div>
         </div>
         <div className="hero-image">
           <div className="profile-avatar"></div>
         </div>
       </div>
       <div className="scroll-indicator" onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}>
         <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
           <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z" />
         </svg>
       </div>
     </section>
   </div>
 );
};

export default Portfolio;
