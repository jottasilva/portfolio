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
  
<svg id="Camada_1" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.38 82.02">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }
    </style>
  </defs>
  <path class="cls-1" d="M0,82.02l7-21.22C-6.28,38.38,4.86,9.06,29.89,1.69c28.26-8.33,55.42,15.4,51.02,44.48-4.14,27.37-34.66,42.29-58.93,28.92L0,82.02ZM10.35,71.82l12.7-3.95c17.64,11.62,41.63,3.93,49.34-15.63s-4.21-40.81-24.3-44.85C22.37,2.22.99,27.18,10.19,51.82c1.05,2.8,2.52,5.26,4.11,7.77l-3.95,12.23Z"/>
  <path class="cls-1" d="M27.66,20.43c.48-.05,2.32.07,2.81.16,1.09.18,1.35.86,1.75,1.75,1.14,2.51,1.78,5.46,2.97,7.98.42,1.17-.43,2.35-1.12,3.24-.57.73-2.44,2.18-2.44,3.05,0,.52.85,1.83,1.16,2.35,2.32,3.88,5.77,7.37,9.7,9.62.63.36,3,1.65,3.56,1.77.67.14,1.09-.04,1.57-.49,1.28-1.19,2.48-2.94,3.64-4.28.79-.65,1.53-.22,2.35.11,1.95.79,6.02,2.93,7.76,4.11,1.13.77.75,2.3.51,3.5-.87,4.34-5.92,6.99-10.08,6.82-3.18-.12-10.66-3.5-13.45-5.27-7.04-4.46-18.1-17.34-16.88-26.14.39-2.86,3-7.97,6.19-8.28Z"/>
</svg> Mande uma Mensagem
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
