import React from 'react';
import { Briefcase, Star, TrendingUp, Users } from 'lucide-react';

const StatisticsComponent = () => {
  const stats = [
    {
      icon: <Briefcase className="w-5 h-5 text-cyan-400" />,
      value: '30+',
      label: 'Projetos Realizados'
    },
    {
      icon: <Star className="w-5 h-5 text-cyan-400" />,
      value: '100%',
      label: 'Satisfação dos Clientes'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
      value: '4+',
      label: 'Anos de Experiência'
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      value: '25+',
      label: 'Clientes Satisfeitos'
    }
  ];

  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          O que eu <span className="text-cyan-400">já realizei?</span>
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 text-center group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors">
                {stat.icon}
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsComponent;
