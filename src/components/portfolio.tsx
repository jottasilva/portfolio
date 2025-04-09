import React from "react";
import "../css/style.css";
const Portfolio = () => {
  return (
    <div className="box-portfolio">
      {/* Box Portfolio */}
      <div /*Portfolio*/ className="portfolio">
        <div /*Porfolio Nome */ className="nome">
          <h1>
            <h6 style={{ fontWeight: "100" }}>HELLO WORLD!</h6>{" "}
            sou Jefferson Silva,
          </h1>
          <span>
            Desenvolvedor Full-Stack, Designer Gráfico e apaixonado por
            tecnologia. <br/>sou especializado em dar vida a ideias por meio de soluções digitais envolventes, funcionais e visualmente impactantes.<br/>
            Nas horas vagas? Gamer de coração 🎮 e um ótimo cozinheiro 🍳
          </span>
        </div>
        <div className="linkedin-btn">
          <span>
            Sinta-se a vontade para visitar meu <b><a rel="noreferrer" href="https://www.linkedin.com/in/jrsndev/" target="_blank">Linkedin</a></b>!
          </span>
        </div>
      </div>
      {/* Box Portfolio */}
      <div /*Avatar*/ className="avatar" />
    </div>
  );
};
export default Portfolio;
