import React from "react";
import "../css/portfolio.css";
const Portfolio = () => {
  return (
    <div>
      {/* Box Portfolio */}
      <section className="hero-section">
        <div className="floating-elements">
          <div className="floating-element">💻</div>
          <div className="floating-element">🎨</div>
          <div className="floating-element">🚀</div>
          <div className="floating-element">⚡</div>
        </div>

        <div className="container-portfolio">
          <div className="hero-content">
            <h1 className="hero-name">
              <span>Jefferson Silva</span>
            </h1>
            <h2 className="hero-title">
              Desenvolvedor Full-Stack, Designer Gráfico e apaixonado por
              tecnologia.
            </h2>
            <p className="hero-description">
              Sou especializado em dar vida a ideias por meio de soluções
              digitais envolventes, funcionais e visualmente impactantes.
            </p>
            <div className="hero-hobbies">
              Nas horas vagas? Gamer de coração{" "}
              <span className="hobby-emoji">🎮</span> e um ótimo cozinheiro{" "}
              <span className="hobby-emoji">👨‍🍳</span>
            </div>
            <div className="hero-cta">
              <a href="#" className="btn-primary">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Visite meu LinkedIn
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
                Ver Portfólio
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="profile-avatar"></div>
          </div>
          
        </div>

        <div className="scroll-indicator">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z" />
          </svg>
        </div>
      </section>
    </div>
  );
};
export default Portfolio;
