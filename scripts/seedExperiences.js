const { Client, Databases, Permission, Role, ID } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DB = 'main';
const COL = 'experiences';

const workExperiences = [
  {
    type: 'Trabalho',
    period: '2006 – Presente',
    title: 'JRSN DEV',
    institution: 'Fundador & Software Engineer',
    description: '',
    activities: [
      'Entregou aplicações web/mobile para múltiplos setores ao longo de 8+ anos.',
      'Arquitetou APIs REST escaláveis com integrações e webhooks.',
      'Desenvolveu frontends modernos (React, Next) e backends robustos (Node.js, Go).',
      'Modelou infraestrutura completa com Docker, Linux, Nginx e CI/CD.'
    ].join('\n')
  },
  {
    type: 'Trabalho',
    period: '01/2012 – Atual',
    title: 'Freelancer & Empresas',
    institution: 'Desenvolvedor FullStack',
    description: 'Especialização em desenvolvimento completo de soluções digitais.',
    activities: [
      'Desenvolvimento de websites, sistemas e aplicativos mobile.',
      'Automação de processos e integração de APIs.',
      'Gerenciamento de projetos e liderança de equipes.',
      'Criação de identidade visual e materiais gráficos.'
    ].join('\n')
  },
  {
    type: 'Trabalho',
    period: '11/2015 – 01/2019',
    title: 'Zip Informática',
    institution: 'Técnico em Manutenção',
    description: 'Especialista em hardware e suporte técnico.',
    activities: [
      'Manutenção e reparo de computadores, notebooks e celulares.',
      'Diagnóstico e solução de problemas técnicos.',
      'Atendimento ao cliente e suporte técnico.'
    ].join('\n')
  },
  {
    type: 'Trabalho',
    period: '09/2019 – 05/2020',
    title: 'I9 Ingressos',
    institution: 'Designer Gráfico',
    description: 'Foco na criação visual e desenvolvimento de materiais promocionais.',
    activities: [
      'Criação de artes para impressão e itens personalizados.',
      'Desenvolvimento de identidade visual para marcas.',
      'Produção de materiais gráficas diversas.'
    ].join('\n')
  },
  {
    type: 'Trabalho',
    period: '10/2020 – 02/2021',
    title: 'Delivery Much',
    institution: 'Social Media',
    description: 'Responsável pela gestão completa das redes sociais.',
    activities: [
      'Criação de materiais gráficos para campanhas promocionais.',
      'Gerenciamento de redes sociais e engajamento do público.',
      'Desenvolvimento de estratégias de marketing digital.'
    ].join('\n')
  },
  {
    type: 'Trabalho',
    period: '2024 – Presente',
    title: 'N9 Agência Digital',
    institution: 'Fundador & Senior Full Stack Engineer',
    description: '',
    activities: [
      'Projetou e entregou sistemas de alta performance do backend ao deploy.',
      'Automatizou workflows complexos com n8n e APIs REST/Webhooks.',
      'Desenvolveu agente de IA para atendimento 24/7 via WhatsApp sem intervenção humana.',
      'Reduziu latência de APIs em 94% (800ms para 50ms) com cache Redis.'
    ].join('\n')
  },
  {
    type: 'Trabalho',
    period: '01/06/2025 – 01/03/2026',
    title: 'Seven Brindes',
    institution: 'Designer Gráfico & Programador CNC Laser',
    description: 'Operação de sistemas CNC e corte a laser, design de produtos e brindes corporativos.',
    activities: [
      'Desenvolvimento de layouts vetoriais precisos para displays e brindes corporativos.',
      'Operação, configuração e manutenção de maquinário de corte a laser.',
      'Criação de identidades visuais e artes gráficas para materiais promocionais.',
      'Controle de qualidade e acabamento técnico de peças em acrílico, MDF e metais.'
    ].join('\n')
  }
];

const academicEducation = [
  {
    type: 'Acadêmico',
    period: '01/2024 – 01/2025',
    title: 'CENES',
    institution: 'Especialização em Engenharia de Software',
    description: 'Especialização em Engenharia de Software.',
    activities: [
      'Aprofundamento em metodologias de desenvolvimento de software.',
      'Gestão de projetos de software e liderança técnica.',
      'Arquitetura de sistemas distribuídos e boas práticas de engenharia.'
    ].join('\n')
  },
  {
    type: 'Acadêmico',
    period: '08/2024 – 12/2024',
    title: 'Centro Universitário ETEP',
    institution: 'Graduação - Gestão da Tecnologia da Informação',
    description: 'Título de Tecnólogo. Colação de Grau em 06/09/2024. Diploma registrado.',
    activities: [
      'Gestão estratégica de TI, análise de riscos e segurança da informação.',
      'Otimização de processos operacionais com tecnologias de ponta.',
      'Governança e auditoria de sistemas de software e infraestrutura.'
    ].join('\n')
  }
];

const all = [...workExperiences, ...academicEducation];

async function seed() {
  console.log('--- 🌱 Seedando Trajetória no Appwrite ---');
  for (const exp of all) {
    try {
      await databases.createDocument(DB, COL, ID.unique(), exp, [
        Permission.read(Role.any()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]);
      console.log(`✅ ${exp.title} (${exp.type})`);
    } catch (e) {
      console.log(`❌ Erro em ${exp.title}:`, e.message);
    }
  }
  console.log('\n--- 🎉 Seed concluído! ---');
}

seed();
