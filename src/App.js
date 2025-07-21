/* eslint-disable no-unused-vars */
import "./css/style.css";
import "./css/modal.css";
import "./js/script";
import { useEffect, useState } from "react";
import Timeline from "./components/timeline";
import Skills from "./components/skills";
import Portfolio from "./components/portfolio.tsx";
import ServicesSection from "./components/ServSection.tsx";
import PortfolioCategories from "./components/clients.tsx";
import Statistics from "./components/stats.tsx";
import Footer from "./components/footer.tsx";
import Modal from "./components/contactmodal.tsx";
export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const menum = () => {
    /* Menu Mobile */
    document.querySelector(".navMenu").classList.toggle("show");
    document.querySelector(".hamburguer").classList.toggle("active"); 
  };
  const toggleOrc = () => {
    setIsContactModalOpen(true);
  };
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsContactModalOpen(false);
      }
    };
  }, []);
  const closeContactModal = () => {
    setIsContactModalOpen(false);
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
            {isContactModalOpen && (
              <Modal isOpen={isContactModalOpen} onClose={closeContactModal} />
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
                      <div
                        className="demo-button"
                        onClick={toggleOrc}
                        href="#orcamento"
                      >
                        ORÇAMENTO
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            {/* Estatisticas*/}
            
            <div id="portfolio">
              {/* Portfolio Component */}
              <Portfolio />
            </div>
          </div>
          <div id="jobs">
            {/* Jobs Component */}
            <ServicesSection />
          </div>
          <div /* Alguns dos Meus Clientes */ className="clientes">
            <h3>Alguns Sonhos realizados.</h3>
          </div>
          <div id="clientes">
            {/* Portfolio Categories Component */}
            <PortfolioCategories/>
          </div>
          <div id="skills">
            {/* Skills */}
            <Skills />
          </div>

          <div id="timeLine">
            {/* Skills */}
            <Timeline />
          </div>

          <Footer />
        </body>
      </html>
    </div>
  );
}
