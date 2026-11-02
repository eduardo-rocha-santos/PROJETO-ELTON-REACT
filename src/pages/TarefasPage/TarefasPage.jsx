import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import Pagination from '../../components/Pagination/Pagination';
import styles from './TarefasPage.module.css';

const ITENS_POR_PAGINA = 4;

const TIPOS_ESTUDO = [
  'Front-end',
  'Back-end',
  'Banco de Dados',
  'Arquitetura',
  'UI / CSS',
  'Acessibilidade',
  'Testes / QA',
  'Entrega',
  'Estudo Geral',
  'Outro...',
];

const ROTULOS_FILTRO = {
  todas: 'Filtro: Todas',
  pendentes: 'Filtro: Pendentes',
  concluidas: 'Filtro: Concluídas',
};

/**
 * Página Principal de Tarefas
 * Integra Barra de Progresso, Menu Suspenso, Paginação e dispara Notificações Toast.
 */
function TarefasPage({
  tarefas,
  onAdicionarTarefa,
  onAlternarTarefa,
  onRemoverTarefa,
  onNotificar,
}) {
  const [novoTitulo, setNovoTitulo] = useState('');
  const [tipoEstudo, setTipoEstudo] = useState('Front-end');
  const [tipoPersonalizado, setTipoPersonalizado] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Cálculos de resumo e porcentagem da Barra de Progresso
  const totalTarefas = tarefas.length;
  const totalConcluidas = tarefas.filter((t) => t.concluida).length;
  const totalPendentes = totalTarefas - totalConcluidas;
  const percentualConcluido =
    totalTarefas > 0 ? Math.round((totalConcluidas / totalTarefas) * 100) : 0;

  // Aplica o filtro selecionado no Menu Suspenso
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === 'concluidas') return tarefa.concluida;
    if (filtro === 'pendentes') return !tarefa.concluida;
    return true;
  });

  // Cálculos de paginação
  const totalPaginas = Math.max(
    1,
    Math.ceil(tarefasFiltradas.length / ITENS_POR_PAGINA)
  );
  const paginaSegura = Math.min(paginaAtual, totalPaginas);
  const indiceInicial = (paginaSegura - 1) * ITENS_POR_PAGINA;
  const tarefasPaginadas = tarefasFiltradas.slice(
    indiceInicial,
    indiceInicial + ITENS_POR_PAGINA
  );

  function aplicarFiltro(novoFiltro, descricao) {
    setFiltro(novoFiltro);
    setPaginaAtual(1);
    onNotificar(`Exibindo: ${descricao}`, 'info');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const tituloLimpo = novoTitulo.trim();

    if (!tituloLimpo) {
      onNotificar('Digite o título da tarefa antes de adicionar.', 'erro');
      return;
    }

    if (tipoEstudo === 'Outro...' && !tipoPersonalizado.trim()) {
      onNotificar('Digite o nome do tipo de estudo personalizado.', 'erro');
      return;
    }

    const disciplinaEscolhida =
      tipoEstudo === 'Outro...' ? tipoPersonalizado.trim() : tipoEstudo;

    onAdicionarTarefa(tituloLimpo, disciplinaEscolhida);
    setNovoTitulo('');
    setTipoPersonalizado('');
    setPaginaAtual(1);
  }

  // Opções enviadas via props para o componente DropdownMenu
  const opcoesFiltro = [
    {
      label: 'Todas as tarefas',
      active: filtro === 'todas',
      onClick: () => aplicarFiltro('todas', 'Todas as tarefas'),
    },
    {
      label: 'Apenas pendentes',
      active: filtro === 'pendentes',
      onClick: () => aplicarFiltro('pendentes', 'Apenas tarefas pendentes'),
    },
    {
      label: 'Apenas concluídas',
      active: filtro === 'concluidas',
      onClick: () => aplicarFiltro('concluidas', 'Apenas tarefas concluídas'),
    },
  ];

  return (
    <section aria-labelledby="titulo-tarefas" className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 id="titulo-tarefas" className={styles.title}>
            Minhas Tarefas de Estudo
          </h1>
          <p className={styles.subtitle}>
            Organize suas atividades acadêmicas, filtre por status e acompanhe seu progresso.
          </p>
        </div>
      </div>

      {/* Cartões responsivos de resumo */}
      <div className={styles.statsGrid}>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Total Cadastrado</span>
          <strong className={styles.statValue}>{totalTarefas}</strong>
        </article>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Concluídas</span>
          <strong className={`${styles.statValue} ${styles.textSuccess}`}>
            {totalConcluidas}
          </strong>
        </article>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Pendentes</span>
          <strong className={`${styles.statValue} ${styles.textPrimary}`}>
            {totalPendentes}
          </strong>
        </article>
      </div>

      {/* Componente Obrigatório 3: Barra de Progresso */}
      <div className={styles.progressCard}>
        <ProgressBar
          value={percentualConcluido}
          label="Progresso geral das tarefas concluídas"
        />
      </div>

      {/* Formulário para adicionar nova tarefa com escolha do tipo de estudo */}
      <form className={styles.addForm} onSubmit={handleSubmit} noValidate>
        <label htmlFor="nova-tarefa" className={styles.srOnly}>
          Nova tarefa de estudo
        </label>
        <input
          id="nova-tarefa"
          type="text"
          className={styles.input}
          placeholder="Adicionar nova meta ou atividade de estudo..."
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
        />

        <label htmlFor="tipo-estudo" className={styles.srOnly}>
          Tipo de estudo
        </label>
        <select
          id="tipo-estudo"
          className={styles.select}
          value={tipoEstudo}
          onChange={(e) => setTipoEstudo(e.target.value)}
          aria-label="Tipo de estudo"
        >
          {TIPOS_ESTUDO.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        {tipoEstudo === 'Outro...' && (
          <>
            <label htmlFor="tipo-personalizado" className={styles.srOnly}>
              Digite o tipo de estudo
            </label>
            <input
              id="tipo-personalizado"
              type="text"
              className={styles.customTypeInput}
              placeholder="Qual tipo? (ex: Java)"
              value={tipoPersonalizado}
              onChange={(e) => setTipoPersonalizado(e.target.value)}
            />
          </>
        )}

        <button type="submit" className={styles.addButton}>
          + Adicionar
        </button>
      </form>

      {/* Barra de ferramentas com Menu Suspenso */}
      <div className={styles.toolbar}>
        <p className={styles.resultCount}>
          Mostrando <strong>{tarefasPaginadas.length}</strong> de{' '}
          <strong>{tarefasFiltradas.length}</strong> tarefa(s)
        </p>

        {/* Componente Obrigatório 5: Menu Suspenso */}
        <DropdownMenu
          label={ROTULOS_FILTRO[filtro]}
          options={opcoesFiltro}
        />
      </div>

      {/* Lista paginada de tarefas */}
      {tarefasPaginadas.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhuma tarefa encontrada para este filtro.</p>
        </div>
      ) : (
        <ul className={styles.taskList}>
          {tarefasPaginadas.map((tarefa) => (
            <li
              key={tarefa.id}
              className={`${styles.taskItem} ${
                tarefa.concluida ? styles.taskDone : ''
              }`}
            >
              <label className={styles.taskLabel}>
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => onAlternarTarefa(tarefa.id)}
                  className={styles.checkbox}
                />
                <span className={styles.taskTitle}>{tarefa.titulo}</span>
              </label>

              <div className={styles.taskActions}>
                <span className={styles.tag}>{tarefa.disciplina}</span>
                <button
                  type="button"
                  className={styles.deleteButton}
                  aria-label={`Remover tarefa: ${tarefa.titulo}`}
                  onClick={() => onRemoverTarefa(tarefa.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Componente Obrigatório 2: Paginação */}
      <Pagination
        currentPage={paginaSegura}
        totalPages={totalPaginas}
        onPageChange={(novaPagina) => setPaginaAtual(novaPagina)}
      />
    </section>
  );
}

export default TarefasPage;
