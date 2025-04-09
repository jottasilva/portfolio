
import React from 'react';
import '../css/timeline.css';
const Timeline = () => {
  return (
    <div className="timeline-container">
      <h2 className="title">TIMELINE</h2>
      <p className="subtitle">alguns pontos da minha trajetória...</p>

      <div className="timeline-item left">
        <div className="content">
          <h3>Desenvolvedor FullStack</h3>
          <small>Desenvolvedor | 01/2012 - Atual</small>
          <ul>
            <li>Desenvolvimento de websites, sistemas e aplicativos mobile</li>
            <li>Automação de processos e integração de APIs</li>
            <li>Gerenciamento de projetos e liderança de equipes</li>
            <li>Criação de identidade visual e materiais gráficos</li>
          </ul>
        </div>
      </div>

      <div className="timeline-item right">
        <div className="content">
          <h3>Social Media</h3>
          <small>Delivery Much | 10/2020 - 02/2021</small>
          <ul>
            <li>Criação de materiais gráficos para campanhas promocionais</li>
            <li>Gerenciamento de redes sociais e engajamento do público</li>
          </ul>
        </div>
      </div>

      <div className="timeline-item left">
        <div className="content">
          <h3>Designer Gráfico</h3>
          <small>i9 Ingressos | 09/2019 - 05/2020</small>
          <ul>
            <li>Criação de artes para impressão e itens personalizados</li>
          </ul>
        </div>
      </div>

      <div className="timeline-item right">
        <div className="content">
          <h3>Técnico em Manutenção</h3>
          <small>Zip Informática | 11/2015 - 03/2019</small>
          <ul>
            <li>Manutenção e reparo de computadores, notebooks e celulares</li>
          </ul>
        </div>
      </div>

      <div className="timeline-item left">
        <div className="content">
          <h3>Formação Acadêmica</h3>
          <p>
            Engenharia de Software (Pós-Graduação)<br />
            CENES | 01/2024 - 01/2025
          </p>
          <p>
            Gestão da Tecnologia da Informação (Tecnólogo)<br />
            Centro Universitário ETEP | 01/2023 - 01/2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
