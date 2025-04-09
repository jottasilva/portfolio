import React from "react";
const Jobs = () => {
    return (
        <div className="jobs">

            {/*O Que eu faço */}
            <div className="card-design">
              {/* Card Designer Grafico */}
              <div className="card-design-icon" />
              <h1>DESIGNER GRÁFICO</h1>
              <p>
                DESENVOLVIMENTO DE MATERIAL DIGITAL COMO FLYER, BANNER, CARTÃO
                DE VISITA, CONVITES, MIDIA SOCIAL E MUITO MAIS.
              </p>
              
              {/* Card Front End */}
            </div>

            <div className="card-front-end">
              {/* Card Front End */}
              <div className="card-front-end-icon" />
              <h1>DEV. FULLSTACK</h1>
              <p>
              DESENVOLVIMENTO WEB E MOBILE COM FOCO EM TECNOLOGIAS MODERNAS COMO TYPESCRIPT, TAILWIND CSS, NEXT.JS, FLUTTER, REACT/REACT NATIVE, DJANGO, GOLANG ENTRE OUTRO...
              </p>
             
              {/* Card Front End */}
            </div>

            <div className="card-ti">
              {/* Card Front End */}
              <div className="card-ti-icon" />
              <h1>INFORMÁTICA</h1>
              <p>
              ESPECIALISTA EM MONTAGEM E MANUTENÇÃO DE COMPUTADORES, OFERECENDO SUPORTE ONLINE COMPLETO PARA COMPRA, CONFIGURAÇÃO E INSTALAÇÃO DE SOFTWARES E GAMES.
              </p>
              
              {/* Card Front End */}
            </div>
            {/*O Que eu faço */}
        </div>
    );
};
export default Jobs;