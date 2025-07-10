import React from 'react';
import { Briefcase, Star, TrendingUp, Users } from 'lucide-react';
import './statistics.css';

const Statistics = () => {
  const stats = [
    {
      icon: <Briefcase className="stat-icon-svg" />,
      value: '30+',
      label: 'Projetos Realizados'
    },
    {
      icon: <Star className="stat-icon-svg" />,
      value: '100%',
      label: 'Satisfação dos Clientes'
    },
    {
      icon: <TrendingUp className="stat-icon-svg" />,
      value: '4+',
      label: 'Anos de Experiência'
    },
    {
      icon: <Users className="stat-icon-svg" />,
      value: '25+',
      label: 'Clientes Satisfeitos'
    }
  ];

  return (
    <section className="statistics-section">
      <div className="statistics-container">
        <h2 className="statistics-title">
          O que eu <span className="highlight">já realizei?</span>
        </h2>
        
        <div className="statistics-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
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
