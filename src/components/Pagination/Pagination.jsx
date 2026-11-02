import styles from './Pagination.module.css';

/**
 * Componente Paginação (Pagination)
 * Recebe página atual, total de páginas e callback de mudança de página via props.
 */
function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const totalSeguro = Math.max(1, totalPages);

  // Gera a lista de números das páginas [1, 2, 3, ...]
  const paginas = [];
  for (let i = 1; i <= totalSeguro; i++) {
    paginas.push(i);
  }

  return (
    <nav className={styles.pagination} aria-label="Navegação entre páginas">
      <button
        type="button"
        className={styles.navButton}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Anterior
      </button>

      <div className={styles.pageNumbers}>
        {paginas.map((numero) => {
          const ativa = numero === currentPage;

          return (
            <button
              key={numero}
              type="button"
              aria-current={ativa ? 'page' : undefined}
              aria-label={`Ir para página ${numero}`}
              className={`${styles.pageButton} ${ativa ? styles.active : ''}`}
              onClick={() => onPageChange(numero)}
            >
              {numero}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.navButton}
        disabled={currentPage >= totalSeguro}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima →
      </button>
    </nav>
  );
}

export default Pagination;
