/* eslint-disable no-unused-vars */
import "./css/style.css";
import { SocialIcon } from "react-social-icons";
/* importação de imagem */
import "./js/script";
import logo from "./imgs/logo.svg";
import jrsn from "./imgs/avatar.png";
import bgWebp from "./imgs/bgTop.svg";
import wpp from "./imgs/wpp.svg";
import btwpp from "./imgs/btwpp.svg";
import iconGraphics from "./imgs/iconeDesigner.svg";
import iconFrontEnd from "./imgs/iconFrontEnd.svg";
import iconTi from "./imgs/iconTi.svg";
import bgBottom from "./imgs/bgBottom.svg";
import clienteBankai from "./imgs/bankai.jpg";
import avatarComent from "./imgs/avatarComent.jpg";
import iconLinkedin from "./imgs/iconLinkedin.svg";
import iconInsta from "./imgs/iconInsta.svg";
import iconCv from "./imgs/iconCv.svg";
import gotop from "./imgs/rocket.svg";
import iconeCertificado from "./imgs/iconeCertificado.svg";
import iconLN from "./imgs/iconLN.svg";
import iconGITHUB from "./imgs/iconGITHUB.svg";
import { useEffect, useState } from "react";
import Timeline from "./components/timeline";
import Skills from "./components/skills";
import Portfolio from "./components/portfolio.tsx";
import Jobs from "./components/jobs.tsx";
export default function App() {
  const [visible, setVisible] = useState(false);

  const menum = () => {
    /* Menu Mobile */
    document.querySelector(".navMenu").classList.toggle("show");
  };

  const btCloseOrc = () => {
    setVisible(false);
  };
  const toggleOrc = () => {
    setVisible((current) => !current);
  };
  document.title = "JRSN DESIGNER";
  return (
    <div className="App">
      <html lang="pt-br">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body>
          <div /* Topo */ id="top">
            {visible && (
              <div id="bx_orcamento">
                <div id="btCloseOrc" onClick={btCloseOrc}>
                  X
                </div>
                <h1>Vamos Lá!</h1>
                {/* Box Orçamento */}
                <div>
                  <span>Nome Completo :</span>
                  <input type="text" id="nome" />
                </div>
                <div>
                  <span>Me Diga seu E-mail :</span>
                  <input type="email" id="email" />
                </div>
                <div>
                  <span>Agora, seu Contato :</span>
                  <input type="text" id="contato" />
                </div>
                <div>
                  <span>Descreva sua ideia,com o maximo de Detalhes.</span>
                  <textarea id="descricao"></textarea>
                </div>
                <div>
                  <input
                    type="submit"
                    className="enviaorc"
                    value={"Pedir Orçamento"}
                  />
                </div>
              </div>
            )}
            <div /* Menu */ id="menu">
              <div className="menu">
                <a href="#top">
                  <div /*Logo SVG*/ className="logo"></div>
                </a>
                <div /*Menu Mobile*/ onClick={menum} id="menu-mobile">
                  <span class="hamburguer"></span>
                </div>

                <nav className="navMenu">
                  <ul>
                    <li>
                      <a href="#jobs">PORTFOLIO</a>
                    </li>
                    <li>
                      <a href="#skills">SKILLS</a>
                    </li>
                    <li>
                      <a href="#clientes">CLIENTES</a>
                    </li>
                    <li>
                      <a onClick={toggleOrc} href="#orcamento">
                        ORÇAMENTO
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div id="portfolio">
              {/* Portfolio Component */}
              <Portfolio />
            </div>
          </div>

          <div id="jobs">
            <div /* O que eu Faço ?*/ className="oquefaco">
              <h3>O que eu faço?</h3>
            </div>
            {/* Jobs Component */}
            <Jobs />
          </div>
          <div /* Alguns dos Meus Clientes */ className="clientes">
            <h3>Alguns clientes.</h3>
          </div>
          <div id="clientes">
            {/* Alguns dos Meus Clientes */}
            <div id="box-cliente">
              <div /* Imagem Clientes */ className="img-cliente" />
              <div /* descrição Clientes */ className="desc-cliente">
                <div /* Titulo */ className="t-cliente">
                  <h1>LOGO MARCA / MEDIAS SOCIAIS</h1>
                  <p>
                    Desenvolvimento de Logo Marca / Mascote, Modelo de Camiseta
                    e Material para Medias sociais.
                  </p>
                </div>
                <div /*Botão cliente*/ className="bt-cliente">
                  <a href="#cliente">ACESSAR</a>
                </div>
              </div>
            </div>

            <div id="box-cliente">
              <div /* Imagem Clientes */ className="img-cliente" />
              <div /* descrição Clientes */ className="desc-cliente">
                <div /* Titulo */ className="t-cliente">
                  <h1>LOGO MARCA / MEDIAS SOCIAIS</h1>
                  <p>
                    Desenvolvimento de Logo Marca / Mascote, Modelo de Camiseta
                    e Material para Medias sociais.
                  </p>
                </div>
                <div /*Botão cliente*/ className="bt-cliente">
                  <a href="#cliente">ACESSAR</a>
                </div>
              </div>
            </div>

            <div id="box-cliente">
              <div /* Imagem Clientes */ className="img-cliente" />
              <div /* descrição Clientes */ className="desc-cliente">
                <div /* Titulo */ className="t-cliente">
                  <h1>LOGO MARCA / MEDIAS SOCIAIS</h1>
                  <p>
                    Desenvolvimento de Logo Marca / Mascote, Modelo de Camiseta
                    e Material para Medias sociais.
                  </p>
                </div>
                <div /*Botão cliente*/ className="bt-cliente">
                  <a href="#cliente">ACESSAR</a>
                </div>
              </div>
            </div>

            <div id="box-cliente">
              <div /* Imagem Clientes */ className="img-cliente" />
              <div /* descrição Clientes */ className="desc-cliente">
                <div /* Titulo */ className="t-cliente">
                  <h1>LOGO MARCA / MEDIAS SOCIAIS</h1>
                  <p>
                    Desenvolvimento de Logo Marca / Mascote, Modelo de Camiseta
                    e Material para Medias sociais.
                  </p>
                </div>
                <div /*Botão cliente*/ className="bt-cliente">
                  <a href="#cliente">ACESSAR</a>
                </div>
              </div>
            </div>
            <div className="carregarClientes">Carregar Mais</div>
            {/* Alguns dos Meus Clientes */}
          </div>

          <div id="skills">
            {/* Skills */}
            <Skills />
          </div>

          <div id="timeLine">
            {/* Skills */}
            <Timeline />
          </div>

          <div /* Fique Ligado. ?*/ className="fiqueligado"></div>
          <section id="subfooter">
            <footer id="rodape">
              {/*Rodape, Redes*/}
              <div /*Redes sociais */ id="social">
                <div>
                  <SocialIcon
                    className="iconr"
                    bgColor="#444444"
                    network="linkedin"
                    style={{ height: 40, width: 40 }}
                  />
                  <span>Visite meu Linkedin</span>
                </div>
                <div>
                  <SocialIcon
                    className="iconr"
                    bgColor="#444444"
                    network="instagram"
                    style={{ height: 40, width: 40 }}
                  />
                  <span>Me Siga no Instagram</span>
                </div>
                <div>
                  <SocialIcon
                    className="iconr"
                    bgColor="#444444"
                    network="dropbox"
                    style={{ height: 40, width: 40 }}
                  />
                  <span>Baixe meu Curriculo</span>
                </div>
                <div>
                  <SocialIcon
                    className="iconr"
                    bgColor="#444444"
                    url="http://localhost:3000/#jobs"
                    style={{ height: 40, width: 40 }}
                  />
                  <span>Cursos e Certificados</span>
                </div>
              </div>
            </footer>
          </section>
          <div className="copyright">
            <b>JRSN.DEV</b>© 2025 all rights reserved.
          </div>
          <a href="#top">
            <div /* botão voltar ao topo #gotop */ id="gotop">
              
            </div>
          </a>
        </body>
      </html>
    </div>
  );
}
