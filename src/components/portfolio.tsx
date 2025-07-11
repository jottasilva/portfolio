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
          <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20.16"
  width="20"
  height="20"
  fill="#ffffff"
>
  <path d="M0,20.16l1.72-5.22C-1.54,9.43,1.2,2.23,7.35.41c6.95-2.05,13.62,3.78,12.54,10.93-1.02,6.73-8.52,10.39-14.48,7.11l-5.4,1.7ZM2.54,17.65l3.12-.97c4.34,2.86,10.23.97,12.13-3.84s-1.03-10.03-5.97-11.02C5.5.55.24,6.68,2.5,12.74c.26.69.62,1.29,1.01,1.91l-.97,3.01Z"/>
  <path d="M6.8,5.02c.12-.01.57.02.69.04.27.04.33.21.43.43.28.62.44,1.34.73,1.96.1.29-.11.58-.27.8-.14.18-.6.54-.6.75,0,.13.21.45.29.58.57.95,1.42,1.81,2.38,2.37.16.09.74.4.87.43.17.03.27-.01.39-.12.31-.29.61-.72.89-1.05.19-.16.38-.05.58.03.48.2,1.48.72,1.91,1.01.28.19.19.57.13.86-.21,1.07-1.45,1.72-2.48,1.68-.78-.03-2.62-.86-3.3-1.29-1.73-1.1-4.45-4.26-4.15-6.42.1-.7.74-1.96,1.52-2.03Z"/>
</svg>

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
