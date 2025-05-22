import React, { useState, useEffect } from "react";
import "../css/jobs.css";

const Jobs = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const element = document.getElementById("services-section");
      if (element) {
        const position = element.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const services = [
    {
      id: "design",
      title: "DESIGNER GRÁFICO",
      iconClass: "design-icon",
      description:
        "DESENVOLVIMENTO DE MATERIAL DIGITAL COMO FLYER, BANNER, CARTÃO DE VISITA, CONVITES, MÍDIA SOCIAL E MUITO MAIS.",
      color: "#3498db",
    },
    {
      id: "dev",
      title: "DEV. FULLSTACK",
      iconClass: "dev-icon",
      description:
        "DESENVOLVIMENTO WEB E MOBILE COM FOCO EM TECNOLOGIAS MODERNAS COMO TYPESCRIPT, TAILWIND CSS, NEXT.JS, FLUTTER, REACT/REACT NATIVE, DJANGO, GOLANG ENTRE OUTRO...",
      color: "#2ecc71",
    },
    {
      id: "info",
      title: "INFORMÁTICA",
      iconClass: "info-icon",
      description:
        "ESPECIALISTA EM MONTAGEM E MANUTENÇÃO DE COMPUTADORES, OFERECENDO SUPORTE ONLINE COMPLETO PARA COMPRA, CONFIGURAÇÃO E INSTALAÇÃO DE SOFTWARES E GAMES.",
      color: "##fbff05",
    },
  ];

  return (
    <section
      id="services-section"
      className={`services-section ${isVisible ? "visible" : ""}`}
    >
      <div className="services-background">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-dots"></div>
      </div>

      <div className="services-content">
        <h2 className="services-title">
          O que eu faço?
          <span className="services-title-underline"></span>
        </h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${
                activeCard === service.id ? "active" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              data-color={service.color}
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="service-icon-container">
                <div className={`service-icon ${service.iconClass}`}></div>
              </div>

              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <button className="service-button">
                  SAIBA MAIS
                  <span className="service-button-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
