
import React from 'react';
import '../css/timeline.css';
import '../css/fonts.css';
const Timeline = () => {
  return (
    <div class="box">
        <div class="header">
            <h1>Timeline</h1>
            <p>alguns pontos da minha trajetória...</p>
        </div>

        <div class="timeline">
            <div class="timeline-item">
                <div class="timeline-content">
                     <div class="timeline-arrow"></div>
                    <div class="timeline-date">Desenvolvedor | 01/2012 - Atual</div>
                    <h3 class="timeline-title">Desenvolvedor FullStack</h3>
                    <div class="timeline-company">Freelancer & Empresas</div>
                    <div class="timeline-description">
                        Especialização em desenvolvimento completo de soluções digitais:
                        <ul>
                            <li>Desenvolvimento de websites, sistemas e aplicativos mobile</li>
                            <li>Automação de processos e integração de APIs</li>
                            <li>Gerenciamento de projetos e liderança de equipes</li>
                            <li>Criação de identidade visual e materiais gráficos</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-dot"></div>
            </div>

            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-arrow"></div>
                    <div class="timeline-date">Delivery Much | 10/2020 - 02/2021</div>
                    <h3 class="timeline-title">Social Media</h3>
                    <div class="timeline-company">Marketing Digital</div>
                    <div class="timeline-description">
                        Responsável pela gestão completa das redes sociais:
                        <ul>
                            <li>Criação de materiais gráficos para campanhas promocionais</li>
                            <li>Gerenciamento de redes sociais e engajamento do público</li>
                            <li>Desenvolvimento de estratégias de marketing digital</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-dot"></div>
            </div>

            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-arrow"></div>
                    <div class="timeline-date">19 Interesses | 09/2019 - 05/2020</div>
                    <h3 class="timeline-title">Designer Gráfico</h3>
                    <div class="timeline-company">Agência de Publicidade</div>
                    <div class="timeline-description">
                        Foco na criação visual e desenvolvimento de materiais promocionais:
                        <ul>
                            <li>Criação de artes para impressão e itens personalizados</li>
                            <li>Desenvolvimento de identidade visual para marcas</li>
                            <li>Produção de materiais gráficos diversos</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-dot"></div>
            </div>

            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-arrow"></div>
                    <div class="timeline-date">Zip Informática | 11/2015 - 01/2019</div>
                    <h3 class="timeline-title">Técnico em Manutenção</h3>
                    <div class="timeline-company">Assistência Técnica</div>
                    <div class="timeline-description">
                        Especialista em hardware e suporte técnico:
                        <ul>
                            <li>Manutenção e reparo de computadores, notebooks e celulares</li>
                            <li>Diagnóstico e solução de problemas técnicos</li>
                            <li>Atendimento ao cliente e suporte técnico</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-dot"></div>
            </div>

            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-arrow"></div>
                    <div class="timeline-date">CENES | 01/2024 - 01/2025</div>
                    <h3 class="timeline-title">Formação Acadêmica</h3>
                    <div class="timeline-company">Pós-Graduação</div>
                    <div class="timeline-description">
                        Especialização em Engenharia de Software:
                        <ul>
                            <li>Aprofundamento em metodologias de desenvolvimento</li>
                            <li>Gestão de projetos de software</li>
                            <li>Arquitetura de sistemas e boas práticas</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-dot"></div>
            </div>
        </div>
    </div>
  );
};

export default Timeline;
