import React from 'react';
import { FaDesktop, FaStar, FaChartLine, FaUsers } from 'react-icons/fa';
import '../css/statistics.css';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const Statistics = () => {
  const stats: StatItem[] = [
    {
      icon: <FaDesktop className="stat-icon-svg" />,
      value: '30+',
      label: 'Projetos Realizados'
    },
    {
      icon: <FaStar className="stat-icon-svg" />,
      value: '100%',
      label: 'Satisfação dos Clientes'
    },
    {
      icon: <FaChartLine className="stat-icon-svg" />,
      value: '4+',
      label: 'Anos de Experiência'
    },
    {
      icon: <FaUsers className="stat-icon-svg" />,
      value: '25+',
      label: 'Clientes Satisfeitos'
    }
  ];

  return (
    <section className="statistics-section">
      <div className="floating-elements">
        {[...Array(9)].map((_, index) => (
          <div 
            key={index} 
            className="floating-element"
            style={{ animationDelay: `${index * 0.5}s` }}
          />
        ))}
      </div>
      
      <div className="statistics-container">
        <div className="statistics-title">
          <h2>Projetos e <span className="highlight">Conquistas</span></h2>
          <p className="subtitle">
            Cada número representa uma conquista, cada projeto uma história de sucesso construída com dedicação e expertise.
          </p>
        </div>
        
        <div className="statistics-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-icon">
                {stat.icon}
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
