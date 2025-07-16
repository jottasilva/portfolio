import React, { useState, useEffect } from 'react';
import '../css/timeline.css';

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const timelineData = [
    {
      period: "01/2012 - Atual",
      title: "Desenvolvedor FullStack",
      company: "Freelancer & Empresas",
      description: "Especialização em desenvolvimento completo de soluções digitais",
      skills: [
        "Desenvolvimento de websites, sistemas e aplicativos mobile",
        "Automação de processos e integração de APIs",
        "Gerenciamento de projetos e liderança de equipes",
        "Criação de identidade visual e materiais gráficos"
      ],
      color: "#00d4ff",
      bgColor: "from-cyan-500/20 to-blue-500/20"
    },
    {
      period: "10/2020 - 02/2021",
      title: "Social Media",
      company: "Delivery Much",
      description: "Responsável pela gestão completa das redes sociais",
      skills: [
        "Criação de materiais gráficos para campanhas promocionais",
        "Gerenciamento de redes sociais e engajamento do público",
        "Desenvolvimento de estratégias de marketing digital"
      ],
      color: "#00ff88",
      bgColor: "from-emerald-500/20 to-green-500/20"
    },
    {
      period: "09/2019 - 05/2020",
      title: "Designer Gráfico",
      company: "I9 Ingressos",
      description: "Foco na criação visual e desenvolvimento de materiais promocionais",
      skills: [
        "Criação de artes para impressão e itens personalizados",
        "Desenvolvimento de identidade visual para marcas",
        "Produção de materiais gráficos diversos"
      ],
      color: "#ff8800",
      bgColor: "from-orange-500/20 to-amber-500/20"
    },
    {
      period: "11/2015 - 01/2019",
      title: "Técnico em Manutenção",
      company: "Zip Informática",
      description: "Especialista em hardware e suporte técnico",
      skills: [
        "Manutenção e reparo de computadores, notebooks e celulares",
        "Diagnóstico e solução de problemas técnicos",
        "Atendimento ao cliente e suporte técnico"
      ],
      color: "#ff0088",
      bgColor: "from-pink-500/20 to-rose-500/20"
    },
    {
      period: "01/2024 - 01/2025",
      title: "Formação Acadêmica",
      company: "CENES",
      description: "Especialização em Engenharia de Software",
      skills: [
        "Aprofundamento em metodologias de desenvolvimento",
        "Gestão de projetos de software",
        "Arquitetura de sistemas e boas práticas"
      ],
      color: "#8800ff",
      bgColor: "from-purple-500/20 to-violet-500/20"
    }
  ];

  const handleTabChange = (index) => {
    if (index === activeIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 200);
  };

  const changeSlide = (direction) => {
    const newIndex = activeIndex + direction;
    if (newIndex >= 0 && newIndex < timelineData.length) {
      handleTabChange(newIndex);
    }
  };
  
  const currentData = timelineData[activeIndex];
  
  return (
    <div className="timeline-container">
      {/* Header */}
      <div className="timeline-header">
        <div className="timeline-header-content">
          <div className="timeline-badge">
            <span className="timeline-badge-text">MINHA TRAJETÓRIA</span>
          </div>
          <p className="timeline-subtitle">
            Explorando os marcos da minha carreira e evolução profissional
          </p>
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="timeline-nav-container">
        <div className="timeline-nav">
          {timelineData.map((item, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`timeline-nav-btn ${activeIndex === index ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
              style={{
                backgroundColor: activeIndex === index ? item.color : 'transparent',
                boxShadow: activeIndex === index ? `0 0 20px ${item.color}40` : 'none'
              }}
              disabled={isTransitioning}
            >
              <span className="timeline-nav-btn-text">{item.period.split(' - ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="timeline-content-area">
        <div className="timeline-card">
          {/* Background Gradient */}
          <div 
            className={`timeline-bg ${isTransitioning ? 'transitioning' : ''}`}
            style={{
              background: `linear-gradient(to bottom right, ${currentData.color}33, ${currentData.color}11)`
            }}
          />
          
          <div className="timeline-card-content">
            {/* Main Content */}
            <div className="timeline-grid">
              {/* Left Side - Info */}
              <div className={`timeline-info ${isLoaded ? 'loaded' : ''} ${isTransitioning ? 'transitioning' : ''}`}>
                {/* Period Badge */}
                <div 
                  className="timeline-period-badge"
                  style={{ 
                    backgroundColor: `${currentData.color}20`,
                    color: currentData.color,
                    border: `1px solid ${currentData.color}40`
                  }}
                >
                  <div 
                    className="timeline-period-dot"
                    style={{ backgroundColor: currentData.color }}
                  />
                  <span className="timeline-period-text">{currentData.period}</span>
                </div>

                {/* Title */}
                <h2 className="timeline-job-title">
                  {currentData.title}
                </h2>

                {/* Company */}
                <div className="timeline-company">
                  <div 
                    className="timeline-company-bar"
                    style={{ backgroundColor: currentData.color }}
                  />
                  <span className="timeline-company-text">{currentData.company}</span>
                </div>

                {/* Description */}
                <p className="timeline-description">
                  {currentData.description}
                </p>

                {/* Progress Bar */}
                <div className="timeline-progress-container">
                  <div 
                    className="timeline-progress-bar"
                    style={{ 
                      backgroundColor: currentData.color,
                      width: `${((activeIndex + 1) / timelineData.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Right Side - Skills */}
              <div className={`timeline-skills ${isLoaded ? 'loaded' : ''} ${isTransitioning ? 'transitioning' : ''}`}>
                <h3 className="timeline-skills-title">
                  Principais atividades
                </h3>
                <div className="timeline-skills-list">
                  {currentData.skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="timeline-skill-item"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="timeline-skill-dot-container">
                        <div 
                          className="timeline-skill-dot"
                          style={{ backgroundColor: currentData.color }}
                        />
                      </div>
                      <div className="timeline-skill-text">
                        <p>{skill}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="timeline-bottom-nav">
              <button
                onClick={() => changeSlide(-1)}
                disabled={activeIndex === 0 || isTransitioning}
                className={`timeline-nav-arrow ${activeIndex === 0 || isTransitioning ? 'disabled' : ''}`}
              >
                <svg className="timeline-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Anterior</span>
              </button>

              <div className="timeline-dots">
                {timelineData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabChange(index)}
                    className={`timeline-dot ${index === activeIndex ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                    style={{
                      backgroundColor: index === activeIndex ? currentData.color : '#374151'
                    }}
                    disabled={isTransitioning}
                  />
                ))}
              </div>

              <button
                onClick={() => changeSlide(1)}
                disabled={activeIndex === timelineData.length - 1 || isTransitioning}
                className={`timeline-nav-arrow ${activeIndex === timelineData.length - 1 || isTransitioning ? 'disabled' : ''}`}
              >
                <span>Próximo</span>
                <svg className="timeline-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
