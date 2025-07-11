import "../css/skills.css";

const Skills = () => {
  return (
   <div class="skills-section">
        <div class="floating-particles">
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
        </div>
        
        <div class="container">
            <div class="skills-header">
                <h1 class="skills-title">Minhas Habilidades</h1>
                <p class="skills-subtitle">
                    Desenvolvedor full-stack com expertise em tecnologias modernas e paixão por criar soluções inovadoras que transformam ideias em realidade
                </p>
            </div>

            <div class="skills-content">
                <div class="skills-text">
                    <div class="skill-category">
                        <h3 class="category-title">Front-end Development</h3>
                        <p class="category-description">
                            Experiência sólida no desenvolvimento de interfaces modernas, acessíveis e responsivas utilizando 
                            <span class="tech-highlight">HTML5</span>, 
                            <span class="tech-highlight">CSS3</span>, 
                            <span class="tech-highlight">JavaScript</span> e
                            frameworks como 
                            <span class="tech-highlight">React JS</span>, 
                            <span class="tech-highlight">Angular</span>, 
                            <span class="tech-highlight">Vue.js</span>, 
                            <span class="tech-highlight">Svelte</span>,
                            <span class="tech-highlight">Next.js</span>,
                            <span class="tech-highlight">Nuxt.js</span> e 
                            <span class="tech-highlight">Preact</span>.
                        </p>
                    </div>

                    <div class="skill-category">
                        <h3 class="category-title">Back-end Development</h3>
                        <p class="category-description">
                            Desenvolvimento de sistemas robustos, APIs REST e GraphQL utilizando 
                            <span class="tech-highlight">Node.js</span>, 
                            <span class="tech-highlight">Express</span>, 
                            <span class="tech-highlight">NestJS</span>, 
                            <span class="tech-highlight">Python</span>, 
                            <span class="tech-highlight">Django</span>, 
                            <span class="tech-highlight">Laravel</span> e 
                            <span class="tech-highlight">Spring Boot</span>.
                        </p>
                    </div>

                    <div class="skill-category">
                        <h3 class="category-title">Design & DevOps</h3>
                        <p class="category-description">
                            Criação de identidades visuais com 
                            <span class="tech-highlight">Figma</span>, 
                            <span class="tech-highlight">Photoshop</span>, 
                            <span class="tech-highlight">Blender</span> e 
                            experiência DevOps com 
                            <span class="tech-highlight">Docker</span>, 
                            <span class="tech-highlight">Git</span>, 
                            <span class="tech-highlight">CI/CD</span>.
                        </p>
                    </div>
                </div>

                <div class="skills-grid">
                    <div class="skills-container">
                        <div class="skill-item angular">
                            <div class="skill-icon">🅰️</div>
                            <div class="skill-name">Angular</div>
                        </div>
                        <div class="skill-item django">
                            <div class="skill-icon">🐍</div>
                            <div class="skill-name">Django</div>
                        </div>
                        <div class="skill-item html5">
                            <div class="skill-icon">🌐</div>
                            <div class="skill-name">HTML5</div>
                        </div>
                        <div class="skill-item docker">
                            <div class="skill-icon">🐋</div>
                            <div class="skill-name">Docker</div>
                        </div>
                        <div class="skill-item electron">
                            <div class="skill-icon">⚡</div>
                            <div class="skill-name">Electron</div>
                        </div>
                        <div class="skill-item nextjs">
                            <div class="skill-icon">▲</div>
                            <div class="skill-name">Next.js</div>
                        </div>
                        <div class="skill-item vuejs">
                            <div class="skill-icon">💚</div>
                            <div class="skill-name">Vue.js</div>
                        </div>
                        <div class="skill-item css3">
                            <div class="skill-icon">🎨</div>
                            <div class="skill-name">CSS3</div>
                        </div>
                        <div class="skill-item python">
                            <div class="skill-icon">🐍</div>
                            <div class="skill-name">Python</div>
                        </div>
                        <div class="skill-item mysql">
                            <div class="skill-icon">🗃️</div>
                            <div class="skill-name">MySQL</div>
                        </div>
                        <div class="skill-item tailwindcss">
                            <div class="skill-icon">🌊</div>
                            <div class="skill-name">Tailwind</div>
                        </div>
                        <div class="skill-item bootstrap">
                            <div class="skill-icon">🅱️</div>
                            <div class="skill-name">Bootstrap</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Skills;
