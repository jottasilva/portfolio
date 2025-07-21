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
        title: 'WEBSITE CORPORATIVO',
        description: 'Site responsivo moderno com painel admin, SEO otimizado e performance superior.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
        tags: ['React', 'TypeScript', 'SEO'],
        link: '#'
      },
      {
        id: 2,
        title: 'E-COMMERCE AVANÇADO',
        description: 'Loja virtual completa com pagamentos integrados, gestão de estoque e analytics.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
        tags: ['Next.js', 'Stripe', 'MongoDB'],
        link: '#'
      },
      {
        id: 3,
        title: 'LANDING PAGE CONVERSÃO',
        description: 'Página otimizada para campanhas com A/B testing e métricas de conversão.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop',
        tags: ['React', 'Analytics', 'A/B Test'],
        link: '#'
      },
      {
        id: 4,
        title: 'PORTAL DE NOTÍCIAS',
        description: 'Blog corporativo com CMS headless, newsletter e sistema de comentários.',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop',
        tags: ['Gatsby', 'CMS', 'GraphQL'],
        link: '#'
      },
    ],
    aplicativos: [
      {
        id: 5,
        title: 'APP MULTIPLATAFORMA',
        description: 'Aplicativo nativo para iOS/Android com sincronização em tempo real.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
        tags: ['React Native', 'Firebase', 'Redux'],
        link: '#'
      },
      {
        id: 6,
        title: 'DASHBOARD ANALYTICS',
        description: 'Painel interativo com visualizações D3.js e dados em tempo real.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
        tags: ['D3.js', 'WebSocket', 'Charts'],
        link: '#'
      },
      {
        id: 7,
        title: 'SISTEMA DELIVERY',
        description: 'Plataforma completa para entregas com rastreamento GPS e notificações.',
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=250&fit=crop',
        tags: ['Node.js', 'Socket.io', 'Maps API'],
        link: '#'
      },
      {
        id: 8,
        title: 'CRM INTELIGENTE',
        description: 'Sistema de gestão com IA para automação e análise preditiva.',
        image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=250&fit=crop',
        tags: ['AI/ML', 'Python', 'API Rest'],
        link: '#'
      },
    ],
    identidade: [
      {
        id: 9,
        title: 'BRANDING COMPLETO',
        description: 'Identidade visual moderna com logomark, guidelines e assets digitais.',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
        tags: ['Illustrator', 'Branding', 'Guidelines'],
        link: '#'
      },
      {
        id: 10,
        title: 'DESIGN SYSTEM',
        description: 'Sistema de design escalável com componentes reutilizáveis e tokens.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
        tags: ['Figma', 'Tokens', 'Components'],
        link: '#'
      },
      {
        id: 11,
        title: 'MATERIAL DIGITAL',
        description: 'Templates para redes sociais, apresentações e campanhas digitais.',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
        tags: ['After Effects', 'Social Media', 'Templates'],
        link: '#'
      },
      {
        id: 12,
        title: 'MASCOTE 3D',
        description: 'Personagem corporativo em 3D com animações para marketing digital.',
        image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=250&fit=crop',
        tags: ['Blender', '3D', 'Animation'],
        link: '#'
      },
    ],
    testes: [
      {
        id: 13,
        title: 'UX/UI RESEARCH',
        description: 'Análise completa de experiência com heatmaps, testes de usuário e métricas.',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop',
        tags: ['UX Research', 'Heatmaps', 'User Testing'],
        link: '#'
      },
      {
        id: 14,
        title: 'PERFORMANCE AUDIT',
        description: 'Otimização completa com Lighthouse, Core Web Vitals e monitoramento.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
        tags: ['Lighthouse', 'Core Web Vitals', 'Performance'],
        link: '#'
      },
      {
        id: 15,
        title: 'SECURITY TESTING',
        description: 'Auditoria de segurança com penetration testing e implementação de proteções.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
        tags: ['Security', 'Penetration Test', 'OWASP'],
        link: '#'
      },
      {
        id: 16,
        title: 'A/B OPTIMIZATION',
        description: 'Testes comparativos avançados com statistical significance e ROI tracking.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
        tags: ['A/B Testing', 'Statistics', 'Conversion'],
        link: '#'
      },
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
            Portfolio Digital
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
