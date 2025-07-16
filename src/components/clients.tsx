import React, { useState } from 'react';
import '../css/clients.css';
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
}
interface PortfolioCategories {
  sites: PortfolioItem[];
  aplicativos: PortfolioItem[];
  identidade: PortfolioItem[];
  testes: PortfolioItem[];
}
interface VisibleItems {
  todos: number;
  sites: number;
  aplicativos: number;
  identidade: number;
  testes: number;
}

const PortfolioCategories = () => {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'sites' | 'aplicativos' | 'identidade' | 'testes'>('todos');
  const [visibleItems, setVisibleItems] = useState<VisibleItems>({
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
        description: 'Desenvolvimento de Site Responsivo com Painel Administrativo e SEO otimizado.',
        image: 'https://placehold.co/400', 
      },
      {
        id: 2,
        title: 'E-COMMERCE',
        description: 'Desenvolvimento de Loja Virtual com Integração de Pagamentos e Gestão de Estoque.',
        image: 'https://placehold.co/400',
      },
      {
        id: 3,
        title: 'LANDING PAGE',
        description: 'Desenvolvimento de Página de Conversão para Campanhas de Marketing Digital.',
        image: 'https://placehold.co/400',
      },
      {
        id: 4,
        title: 'BLOG CORPORATIVO',
        description: 'Desenvolvimento de Blog com Sistema de Gerenciamento de Conteúdo e Newsletter.',
        image: 'https://placehold.co/400',
      },
    ],
    aplicativos: [
      {
        id: 5,
        title: 'APP MOBILE',
        description: 'Desenvolvimento de Aplicativo Nativo para iOS e Android com Sincronização em Nuvem.',
        image: 'https://placehold.co/400',
      },
      {
        id: 6,
        title: 'DASHBOARD ANALÍTICO',
        description: 'Desenvolvimento de Painel de Analytics com Visualização de Dados em Tempo Real.',
        image: 'https://placehold.co/400',
      },
      {
        id: 7,
        title: 'APP DELIVERY',
        description: 'Desenvolvimento de Sistema para Gestão de Entregas com Rastreamento.',
        image: 'https://placehold.co/400',
      },
      {
        id: 8,
        title: 'CRM PERSONALIZADO',
        description: 'Desenvolvimento de Sistema de Gestão de Relacionamento com Clientes.',
        image: 'https://placehold.co/400',
      },
    ],
    identidade: [
      {
        id: 9,
        title: 'LOGO MARCA / MEDIAS SOCIAIS',
        description: 'Desenvolvimento de Logo Marca / Mascote, Modelo de Camiseta e Material para Medias sociais.',
        image: 'https://placehold.co/400',
      },
      {
        id: 10,
        title: 'IDENTIDADE VISUAL',
        description: 'Desenvolvimento de Manual de Marca, Papelaria e Templates para Mídias Sociais.',
        image: 'https://placehold.co/400',
      },
      {
        id: 11,
        title: 'MATERIAL PROMOCIONAL',
        description: 'Desenvolvimento de Flyers, Banners e Material Impresso para Campanhas.',
        image: 'https://placehold.co/400',
      },
      {
        id: 12,
        title: 'MASCOTE CORPORATIVO',
        description: 'Desenvolvimento de Personagem e Aplicações para Identidade da Marca.',
        image: 'https://placehold.co/400',
      },
    ],
    testes: [
      {
        id: 13,
        title: 'TESTES DE USABILIDADE',
        description: 'Análise Completa de UX/UI com Relatório de Melhorias e Implementações.',
        image: 'https://placehold.co/400',
      },
      {
        id: 14,
        title: 'TESTES DE PERFORMANCE',
        description: 'Avaliação de Velocidade, Otimização e Experiência do Usuário.',
        image: 'https://placehold.co/400',
      },
      {
        id: 15,
        title: 'TESTES DE SEGURANÇA',
        description: 'Análise de Vulnerabilidades e Implementação de Camadas de Proteção.',
        image: 'https://placehold.co/400',
      },
      {
        id: 16,
        title: 'TESTES A/B',
        description: 'Implementação de Testes Comparativos para Otimização de Conversão.',
        image: 'https://placehold.co/400',
      },
    ],
  };

  const getAllItems = (): PortfolioItem[] => {
    const allItems: PortfolioItem[] = [];
    Object.values(portfolioItems).forEach(categoryItems => {
      allItems.push(...categoryItems);
    });
    return allItems;
  };

  const loadMore = (category: keyof VisibleItems) => {
    setVisibleItems({
      ...visibleItems,
      [category]: visibleItems[category] + 4
    });
  };

  const itemsToDisplay = activeCategory === 'todos' 
    ? getAllItems().slice(0, visibleItems.todos)
    : portfolioItems[activeCategory]?.slice(0, visibleItems[activeCategory]) || [];

  const hasMoreItems = activeCategory === 'todos' 
    ? visibleItems.todos < getAllItems().length
    : visibleItems[activeCategory] < (portfolioItems[activeCategory]?.length || 0);

  return (
    <div className="portfolio-container">
      <div className="category-tabs">
        <button 
          className={`category-tab ${activeCategory === 'todos' ? 'active' : ''}`}
          onClick={() => setActiveCategory('todos')}
        >
          TODOS
        </button>
        <button 
          className={`category-tab ${activeCategory === 'sites' ? 'active' : ''}`}
          onClick={() => setActiveCategory('sites')}
        >
          SITES
        </button>
        <button 
          className={`category-tab ${activeCategory === 'aplicativos' ? 'active' : ''}`}
          onClick={() => setActiveCategory('aplicativos')}
        >
          APLICATIVOS
        </button>
        <button 
          className={`category-tab ${activeCategory === 'identidade' ? 'active' : ''}`}
          onClick={() => setActiveCategory('identidade')}
        >
          IDENTIDADE VISUAL
        </button>
        <button 
          className={`category-tab ${activeCategory === 'testes' ? 'active' : ''}`}
          onClick={() => setActiveCategory('testes')}
        >
          TESTES
        </button>
      </div>

      <div className="portfolio-grid">
        {itemsToDisplay.map(item => (
          <div className="portfolio-item" key={item.id}>
            <div className="portfolio-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="portfolio-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <section className="acessar-btn">Conhecer agora</section>
            </div>
          </div>
        ))}
      </div>

      {hasMoreItems && (
        <div className="load-more-container">
          <div 
            className="carregar-mais-btn"
            onClick={() => loadMore(activeCategory)}
          >
            CARREGAR MAIS
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioCategories;
