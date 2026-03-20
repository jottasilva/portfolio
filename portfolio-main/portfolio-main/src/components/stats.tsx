import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Star, TrendingUp, Users, Target, Rocket } from 'lucide-react';
import '../css/statistics.css';
const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, satisfaction: 0, experience: 0, clients: 0 });
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: <Monitor className="w-6 h-6" />,
      value: 30,
      suffix: '+',
      label: 'Projetos Realizados',
      key: 'projects'
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: 100,
      suffix: '%',
      label: 'Satisfação dos Clientes',
      key: 'satisfaction'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: 4,
      suffix: '+',
      label: 'Anos de Experiência',
      key: 'experience'
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: 25,
      suffix: '+',
      label: 'Clientes Satisfeitos',
      key: 'clients'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateCounters = () => {
        stats.forEach((stat, index) => {
          setTimeout(() => {
            let current = 0;
            const target = stat.value;
            const increment = target / 50;
            
            const counter = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(counter);
              }
              
              setCounters(prev => ({
                ...prev,
                [stat.key]: Math.floor(current)
              }));
            }, 30);
          }, index * 100);
        });
      };
      
      animateCounters();
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="statistics-section"
    >
      <div className="statistics-container">
        {/* Header */}
        <div className={`statistics-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="statistics-title">
            Projetos e <span className="highlight">Conquistas</span>
          </h2>
          
          <p className="statistics-subtitle">
            Cada número representa uma conquista, cada projeto uma história de sucesso construída com dedicação e expertise.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="statistics-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-item ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="stat-icon">
                {stat.icon}
              </div>
              <div className="stat-value">
                {counters[stat.key]}{stat.suffix}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`statistics-cta ${isVisible ? 'visible' : ''}`}>
          <button className="cta-button">
            <Target className="cta-icon-left" />
            <span>Vamos criar sua próxima conquista?</span>
            <Rocket className="cta-icon-right" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
