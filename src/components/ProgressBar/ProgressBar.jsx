import styles from './ProgressBar.module.css';

/**
 * Componente Barra de Progresso (ProgressBar)
 * Recebe o valor de progresso (0 a 100) via props e atualiza o preenchimento visual.
 */
function ProgressBar({ value = 0, label = 'Progresso' }) {
  // Garante que o valor fique sempre entre 0 e 100
  const valorLimitado = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.percentage}>{valorLimitado}%</span>
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-label={label}
        aria-valuenow={valorLimitado}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={styles.fill}
          style={{ width: `${valorLimitado}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
