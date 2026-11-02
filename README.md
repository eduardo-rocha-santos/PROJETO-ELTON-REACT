# StudyFlow — Painel de Estudos em React.js

Aplicação web responsiva desenvolvida com **React.js** e **React Router** para a disciplina de **Engenharia de Software (UCSAL — Prof. Elton Figueiredo da Silva)**.

## Funcionalidades e Componentes Implementados

A aplicação implementa **7 componentes visuais modulares** utilizando **CSS Modules**, tags semânticas HTML5 e atributos de acessibilidade **ARIA**:

1. **Acordeão (`src/components/Accordion/Accordion.jsx`)**: Perguntas frequentes expansíveis/colapsáveis com apenas um item aberto por vez e transição suave via CSS Grid.
2. **Paginação (`src/components/Pagination/Pagination.jsx`)**: Navegação entre páginas de tarefas com botões Anterior, Próxima, páginas específicas e desabilitação nos limites.
3. **Barra de Progresso (`src/components/ProgressBar/ProgressBar.jsx`)**: Indicador visual dinâmico (0–100%) usado tanto no progresso geral das tarefas quanto no simulador de upload.
4. **Abas (`src/components/Tabs/Tabs.jsx`)**: Organização dos conteúdos da disciplina e simulador de entrega em painéis alternáveis via state local.
5. **Menu Suspenso (`src/components/DropdownMenu/DropdownMenu.jsx`)**: Filtro de tarefas com callbacks por opção e fechamento automático ao selecionar ou clicar fora (`useRef` + `useEffect`).
6. **Notificação Toast (`src/components/Toast/Toast.jsx`)**: Feedbacks temporários de `sucesso`, `info` e `erro` com fechamento automático (`setTimeout`) ou manual.
7. **Navbar Responsiva (`src/components/Navbar/Navbar.jsx`)**: Cabeçalho com `NavLink` do **React Router** (Desafio Extra) e menu adaptável para smartphones.

## Como Executar Localmente ou no GitHub Codespaces

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

No **GitHub Codespaces**, o arquivo `.devcontainer/devcontainer.json` já instala as dependências automaticamente, configura a extensão de idioma Português (Brasil) e encaminha a porta `5173`.
