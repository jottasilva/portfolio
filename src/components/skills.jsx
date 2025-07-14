import React from "react";
import "./Skills.css"; 
const Skills = () => {
  return (
    <div className="skills-section">
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="container">
        <div className="skills-header">
          <h1 className="skills-title">Minhas Habilidades</h1>
          <p className="skills-subtitle">
            Desenvolvedor full-stack com expertise em tecnologias modernas e paixão por criar soluções inovadoras que transformam ideias em realidade
          </p>
        </div>

        <div className="skills-content">
          <div className="skills-text">
            <div className="skill-category">
              <h3 className="category-title">Front-end Development</h3>
              <p className="category-description">
                Experiência sólida no desenvolvimento de interfaces modernas, acessíveis e responsivas utilizando 
                <span className="tech-highlight">HTML5</span>, 
                <span className="tech-highlight">CSS3</span>, 
                <span className="tech-highlight">JavaScript</span> e
                frameworks como 
                <span className="tech-highlight">React JS</span>, 
                <span className="tech-highlight">Angular</span>, 
                <span className="tech-highlight">Vue.js</span>, 
                <span className="tech-highlight">Svelte</span>,
                <span className="tech-highlight">Next.js</span>,
                <span className="tech-highlight">Nuxt.js</span> e 
                <span className="tech-highlight">Preact</span>.
              </p>
            </div>

            <div className="skill-category">
              <h3 className="category-title">Back-end Development</h3>
              <p className="category-description">
                Desenvolvimento de sistemas robustos, APIs REST e GraphQL utilizando 
                <span className="tech-highlight">Node.js</span>, 
                <span className="tech-highlight">Express</span>, 
                <span className="tech-highlight">NestJS</span>, 
                <span className="tech-highlight">Python</span>, 
                <span className="tech-highlight">Django</span>, 
                <span className="tech-highlight">Laravel</span> e 
                <span className="tech-highlight">Spring Boot</span>.
              </p>
            </div>

            <div className="skill-category">
              <h3 className="category-title">Design & DevOps</h3>
              <p className="category-description">
                Criação de identidades visuais com 
                <span className="tech-highlight">Figma</span>, 
                <span className="tech-highlight">Photoshop</span>, 
                <span className="tech-highlight">Blender</span> e 
                experiência DevOps com 
                <span className="tech-highlight">Docker</span>, 
                <span className="tech-highlight">Git</span>, 
                <span className="tech-highlight">CI/CD</span>.
              </p>
            </div>
          </div>

          <div className="skills-grid">
            <div className="skills-container">
              <div className="skill-item angular">
                <div className="skill-icon">🅰️</div>
                <div className="skill-name">Angular</div>
              </div>
              <div className="skill-item django">
                <div className="skill-icon">🐍</div>
                <div className="skill-name">Django</div>
              </div>
              <div className="skill-item html5">
                <div className="skill-icon">🌐</div>
                <div className="skill-name">HTML5</div>
              </div>
              <div className="skill-item docker">
                <div className="skill-icon">🐋</div>
                <div className="skill-name">Docker</div>
              </div>
              <div className="skill-item electron">
                <div className="skill-icon">⚡</div>
                <div className="skill-name">Electron</div>
              </div>
              <div className="skill-item nextjs">
                <div className="skill-icon">▲</div>
                <div className="skill-name">Next.js</div>
              </div>
              <div className="skill-item vuejs">
                <div className="skill-icon">💚</div>
                <div className="skill-name">Vue.js</div>
              </div>
              <div className="skill-item css3">
                <div className="skill-icon">🎨</div>
                <div className="skill-name">CSS3</div>
              </div>
              <div className="skill-item python">
                <div className="skill-icon">🐍</div>
                <div className="skill-name">Python</div>
              </div>
              <div className="skill-item mysql">
                <div className="skill-icon">🗃️</div>
                <div className="skill-name">MySQL</div>
              </div>
              <div className="skill-item tailwindcss">
                <div className="skill-icon">🌊</div>
                <div className="skill-name">Tailwind</div>
              </div>
              <div className="skill-item bootstrap">
                <div className="skill-icon">🅱️</div>
                <div className="skill-name">Bootstrap</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Skills;
