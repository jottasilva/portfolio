import React, { useState, useMemo, useCallback } from 'react';
import '../css/clients.css';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface PortfolioCategories {
  sites: PortfolioItem[];
  aplicativos: PortfolioItem[];
  identidade: PortfolioItem[];
  testes: PortfolioItem[];
}

type CategoryKey = 'todos' | 'sites' | 'aplicativos' | 'identidade' | 'testes';

const PortfolioCategories = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('todos');
  const [visibleItems, setVisibleItems] = useState<Record<CategoryKey, number>>({
    todos: 8,
    sites: 4,
    aplicativos: 4,
    identidade: 4,
    testes: 4
  });

  const portfolioItems: PortfolioCategories = {
    sites: [
      {
        id: 1,
        title: 'WEBSITE E-COMMERCE MAÇONARIA',
        description: 'Site responsivo moderno com painel admin, SEO otimizado e performance superior. sistema de venda de artigos relacionados',
        image: 'https://i.imgur.com/PSdflS7.png',
        tags: ['React', 'TypeScript', 'Stripe','Django', 'PrimeVue', 'Vite','UX/IU','Integração Com sistemas de pagamento'],
        link: 'https://ecomerce-rho-lyart.vercel.app/'
      },
      {
        id: 2,
        title: 'MICRO-SAAS',
        description: 'Sitema de informações via Whatsapp Relacionados a Minha cidade, onde usuários se cadastram e obtem informações relevantes como horarios de atendimentos de estabelecimentos, plantões, serviços e muito mais',
        image: 'https://i.imgur.com/Nda9Gyk.png',
        tags: ['Vue.js', 'ReactJS', 'Django','PrimeVue'],
        link: 'https://infozap.vercel.app/'
      },
      {
        id: 3,
        title: 'EASY CONTRATO',
        description: 'Sistema de Geração de contratos Prédefinidos, com opção de ediçoes de cláusulas e geração de PDF',
        image: 'https://i.imgur.com/i2piaWe.png',
        tags: ['React', 'Supabase', 'ViteJS','LocalStorage'],
        link: 'https://easycontrato.vercel.app/'
      },
      {
        id: 4,
        title: 'SISTEMA DE PERSONALIZAÇÃO E VENDA DE CAPINHAS DE CELULAR',
        description: 'Sistema de personalização de capinhas de celular, integrado com E-Comerce para finalização de pedidos',
        image: 'https://i.imgur.com/T6ShnuY.png',
        tags: ['ViteJs','Django','LocalStorage','Supabase','PrimeVue','UX/UI','Python'],
        link: '#'
      },
    ],
    aplicativos: [
      {
        id: 5,
        title: 'SISTEMA WEB DE GERENCIAMENTO DE CHURRASCARIA',
        description: 'Sistema desenvolvido excluisivamente e direcionado para Churrascaria, com todas as opções de gerenciamento necessários para atendimento ao cliente.',
        image: 'https://i.imgur.com/sX6T2xx.png',
        tags: ['ViteJS', 'Firebase','Supabase','Django','Stripe','UX/UI'],
        link: 'https://churras-manager-69.lovable.app/'
      }
    ],
  };

  const getAllItems = useCallback((): PortfolioItem[] => {
    return Object.values(portfolioItems).flat();
  }, []);

  const itemsToDisplay = useMemo(() => {
    const items = activeCategory === 'todos' 
      ? getAllItems()
      : portfolioItems[activeCategory] || [];
    return items.slice(0, visibleItems[activeCategory]);
  }, [activeCategory, visibleItems, getAllItems]);

  const hasMoreItems = useMemo(() => {
    const totalItems = activeCategory === 'todos' 
      ? getAllItems().length
      : portfolioItems[activeCategory]?.length || 0;
    return visibleItems[activeCategory] < totalItems;
  }, [activeCategory, visibleItems, getAllItems]);

  const loadMore = useCallback(() => {
    setVisibleItems(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory] + 4
    }));
  }, [activeCategory]);

  const handleCategoryChange = useCallback((category: CategoryKey) => {
    setActiveCategory(category);
  }, []);

  const categoryLabels: Record<CategoryKey, string> = {
    todos: 'TODOS',
    sites: 'SITES',
    aplicativos: 'APLICATIVOS',
    identidade: 'IDENTIDADE VISUAL',
    testes: 'TESTES'
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-wrapper">
        {/* Header */}
        <div className="portfolio-header">
          <h1 className="portfolio-title">
           Algumas soluções...
          </h1>
          <p className="portfolio-subtitle">Soluções inovadoras para o mundo digital</p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {(Object.keys(categoryLabels) as CategoryKey[]).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          {itemsToDisplay.map((item, index) => (
            <div
              key={item.id}
              className="portfolio-card"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image */}
              <div className="card-image">
                <img
                  src={item.image}
                  alt={item.title}
                  className="image"
                />
                <div className="image-overlay" />
                
                {/* Overlay Button */}
                <div className="overlay-button-container">
                  <button className="overlay-button">
                    Ver Projeto
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="card-content">
                <h3 className="card-title">
                  {item.title}
                </h3>
                <p className="card-description">
                  {item.description}
                </p>
                
                {/* Tags */}
                <div className="tags-container">
                  {item.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className="action-button">
                  Conhecer Projeto
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreItems && (
          <div className="load-more-container">
            <button onClick={loadMore} className="load-more-button">
              CARREGAR MAIS PROJETOS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioCategories;
