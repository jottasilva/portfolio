import React from 'react';
import '../css/jobs.css';

interface ServiceFeature {
  text: string;
}

interface ServiceData {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  features: ServiceFeature[];
  color: string;
}

interface StatData {
  number: string;
  label: string;
}

const ServicesSection: React.FC = () => {
  const services: ServiceData[] = [
    {
      id: 'design',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
          <line x1="7" y1="2" x2="7" y2="22"></line>
          <line x1="17" y1="2" x2="17" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="2" y1="7" x2="7" y2="7"></line>
          <line x1="2" y1="17" x2="7" y2="17"></line>
          <line x1="17" y1="17" x2="22" y2="17"></line>
          <line x1="17" y1="7" x2="22" y2="7"></line>
        </svg>
      ),
      title: 'Designer Gráfico',
      description: 'Criação de identidades visuais marcantes que conectam marcas ao seu público-alvo através de design estratégico e impactante.',
      features: [
        { text: 'Identidade visual e branding completo' },
        { text: 'Material gráfico para redes sociais' },
        { text: 'Cartões de visita e papelaria' },
        { text: 'Banners e material promocional' },
        { text: 'Embalagens e rótulos' }
      ],
      color: '#00d4ff'
    },
    {
      id: 'development',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16,18 22,12 16,6"></polyline>
          <polyline points="8,6 2,12 8,18"></polyline>
        </svg>
      ),
      title: 'Desenvolvimento FullStack',
      description: 'Desenvolvimento completo de aplicações web e mobile com tecnologias modernas, focando em performance, usabilidade e escalabilidade.',
      features: [
        { text: 'Websites e aplicações web responsivas' },
        { text: 'Aplicativos mobile multiplataforma' },
        { text: 'APIs e integrações de sistemas' },
        { text: 'E-commerce e plataformas digitais' },
        { text: 'Automação de processos' }
      ],
      color: '#00ff88'
    },
    {
      id: 'support',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      title: 'Suporte Técnico',
      description: 'Especialista em manutenção e configuração de sistemas, oferecendo suporte técnico completo para empresas e usuários individuais.',
      features: [
        { text: 'Manutenção de computadores e notebooks' },
        { text: 'Configuração e instalação de softwares' },
        { text: 'Suporte remoto e presencial' },
        { text: 'Backup e recuperação de dados' },
        { text: 'Consultoria em tecnologia' }
      ],
      color: '#ff6b6b'
    }
  ];

  const stats: StatData[] = [
    { number: '13+', label: 'Anos de Experiência' },
    { number: '200+', label: 'Projetos Concluídos' },
    { number: '50+', label: 'Clientes Satisfeitos' },
    { number: '24/7', label: 'Suporte Disponível' }
  ];

  const handleServiceClick = (serviceId: string): void => {
    console.log(`Navegando para serviço: ${serviceId}`);
    // Implementar navegação ou modal aqui
  };

  return (
    <section className="services-section">
      <div className="background-pattern"></div>
      
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title">O que eu faço?</h2>
          <p className="section-subtitle">
            Transformo ideias em soluções digitais completas, combinando design, tecnologia e estratégia para criar experiências únicas e impactantes.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="service-card"
              style={{ '--card-color': service.color } as React.CSSProperties}
            >
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature.text}</li>
                ))}
              </ul>
              <button 
                className="service-button"
                onClick={() => handleServiceClick(service.id)}
              >
                Saiba mais
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="stats-bar">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
