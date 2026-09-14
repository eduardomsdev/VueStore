// Catálogo de produtos fictício, usado como fonte de dados local da aplicação.
//
// As imagens ficam em /public/image — para trocar a foto de um produto,
// basta substituir o arquivo .webp correspondente mantendo o mesmo nome.
export const products = [
  {
    id: 1,
    name: 'Notebook UltraSlim X1',
    category: 'Computadores',
    price: 4899.9,
    image: '/image/notebook-ultraslim.webp',
    description:
      'Notebook fino e leve, ideal para estudo e trabalho, com tela Full HD de 14" e até 10 horas de bateria.'
  },
  {
    id: 2,
    name: 'PC Gamer Vortex',
    category: 'Computadores',
    price: 6299.0,
    image: '/image/pc-gamer-vortex.webp',
    description:
      'Desktop gamer com placa de vídeo dedicada e iluminação RGB, preparado para jogos em alta resolução.'
  },
  {
    id: 3,
    name: 'Monitor UltraWide 29"',
    category: 'Computadores',
    price: 1899.5,
    image: '/image/monitor-ultrawide.webp',
    description:
      'Monitor ultrawide de 29 polegadas com painel IPS, ótimo para produtividade e multitarefa.'
  },
  {
    id: 4,
    name: 'Fone de Ouvido Bluetooth',
    category: 'Eletrônicos',
    price: 349.9,
    image: '/image/fone-bluetooth.webp',
    description:
      'Fone sem fio com cancelamento de ruído ativo e até 30 horas de autonomia com o case de carregamento.'
  },
  {
    id: 5,
    name: 'Caixa de Som Portátil',
    category: 'Eletrônicos',
    price: 279.0,
    image: '/image/caixa-som-portatil.webp',
    description:
      'Caixa de som à prova d\u2019água com graves potentes, perfeita para levar para qualquer lugar.'
  },
  {
    id: 6,
    name: 'Smart TV 50" 4K',
    category: 'Eletrônicos',
    price: 2599.0,
    image: '/image/smart-tv.webp',
    description:
      'TV 4K com sistema operacional inteligente integrado e acesso direto aos principais aplicativos de streaming.'
  },
  {
    id: 7,
    name: 'Mouse sem Fio Aero',
    category: 'Acessórios',
    price: 129.9,
    image: '/image/mouse-sem-fio.webp',
    description:
      'Mouse ergonômico sem fio com sensor de alta precisão, ideal para uso prolongado no dia a dia.'
  },
  {
    id: 8,
    name: 'Teclado Mecânico Compact',
    category: 'Acessórios',
    price: 349.0,
    image: '/image/teclado-mecanico.webp',
    description:
      'Teclado mecânico compacto com switches táteis e iluminação de fundo ajustável.'
  },
  {
    id: 9,
    name: 'Mochila para Notebook',
    category: 'Acessórios',
    price: 219.9,
    image: '/image/mochila-notebook.webp',
    description:
      'Mochila resistente à água com compartimento acolchoado para notebooks de até 15,6 polegadas.'
  },
  {
    id: 10,
    name: 'Smartphone Nova 12',
    category: 'Smartphones',
    price: 3199.0,
    image: '/image/celular-nova-12.webp',
    description:
      'Smartphone com câmera tripla, tela AMOLED de 6,5" e carregamento rápido de 65W.'
  },
  {
    id: 11,
    name: 'Smartphone Lite S3',
    category: 'Smartphones',
    price: 1499.0,
    image: '/image/celular-lite-s3.webp',
    description:
      'Opção custo-benefício com bateria de longa duração e desempenho estável para o uso diário.'
  },
  {
    id: 12,
    name: 'Smartwatch',
    category: 'Smartphones',
    price: 899.0,
    image: '/image/smartwatch-pulse.webp',
    description:
      'Relógio inteligente com monitoramento de atividades físicas, sono e notificações do celular.'
  }
]
