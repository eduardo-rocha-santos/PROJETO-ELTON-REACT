// Lista inicial de tarefas de estudo (usada na paginação, filtro e barra de progresso)
export const TAREFAS_INICIAIS = [
  {
    id: 1,
    titulo: 'Revisar criação de componentes funcionais em React',
    disciplina: 'Front-end',
    concluida: true,
  },
  {
    id: 2,
    titulo: 'Praticar passagem de dados e callbacks via Props',
    disciplina: 'Front-end',
    concluida: true,
  },
  {
    id: 3,
    titulo: 'Implementar gerenciamento de estado local com useState',
    disciplina: 'Front-end',
    concluida: true,
  },
  {
    id: 4,
    titulo: 'Estudar efeitos colaterais e timers com useEffect',
    disciplina: 'Front-end',
    concluida: false,
  },
  {
    id: 5,
    titulo: 'Configurar rotas da aplicação com React Router',
    disciplina: 'Arquitetura',
    concluida: false,
  },
  {
    id: 6,
    titulo: 'Aplicar tags semânticas HTML5 e atributos ARIA',
    disciplina: 'Acessibilidade',
    concluida: true,
  },
  {
    id: 7,
    titulo: 'Testar layout responsivo em celular, tablet e desktop',
    disciplina: 'UI / CSS',
    concluida: false,
  },
  {
    id: 8,
    titulo: 'Validar fechamento do Menu Suspenso ao clicar fora',
    disciplina: 'Interação',
    concluida: false,
  },
  {
    id: 9,
    titulo: 'Preparar apresentação em vídeo no GitHub Codespaces',
    disciplina: 'Entrega',
    concluida: false,
  },
];

// Perguntas frequentes exibidas no componente Acordeão (FAQ)
export const PERGUNTAS_FAQ = [
  {
    title: 'Como funciona o cálculo da Barra de Progresso de estudos?',
    content:
      'A barra calcula automaticamente a porcentagem de tarefas marcadas como concluídas em relação ao total de tarefas cadastradas no painel, atualizando sua largura em tempo real via props.',
  },
  {
    title: 'Como os dados são compartilhados entre os componentes?',
    content:
      'O componente principal (App.jsx) gerencia os estados compartilhados — como a lista de tarefas e a notificação Toast — e envia dados e funções de callback para as páginas e componentes filhos através de props.',
  },
  {
    title: 'Por que utilizamos React Router nesta aplicação?',
    content:
      'O React Router permite dividir o sistema em páginas independentes (Tarefas, Conteúdos e Ajuda) com navegação instantânea sem recarregar o navegador (Single Page Application).',
  },
  {
    title: 'Quais cuidados de acessibilidade foram aplicados?',
    content:
      'Foram utilizadas tags semânticas HTML5 (header, nav, main, section, footer), navegação por teclado com foco visível e atributos ARIA como aria-expanded, role="tablist", role="progressbar" e aria-live.',
  },
  {
    title: 'Como a aplicação se adapta a diferentes tamanhos de tela?',
    content:
      'Utilizamos CSS Modules com Flexbox, CSS Grid fluido e Media Queries para adaptar o cabeçalho, os cartões de resumo e os controles em smartphones, tablets e desktops.',
  },
];
