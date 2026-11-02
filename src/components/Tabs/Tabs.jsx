import { useState } from 'react';
import styles from './Tabs.module.css';

/**
 * Componente Abas (Tabs)
 * Gerencia no state local qual aba está ativa e recebe títulos e conteúdos via props.
 */
function Tabs({ tabs = [] }) {
  const [abaAtiva, setAbaAtiva] = useState(0);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Lista de botões das abas */}
      <div className={styles.tabList} role="tablist" aria-label="Seções de conteúdo">
        {tabs.map((aba, index) => {
          const selecionada = abaAtiva === index;

          return (
            <button
              key={aba.title}
              type="button"
              role="tab"
              id={`tab-${index}`}
              aria-selected={selecionada}
              aria-controls={`tabpanel-${index}`}
              className={`${styles.tabButton} ${selecionada ? styles.active : ''}`}
              onClick={() => setAbaAtiva(index)}
            >
              {aba.title}
            </button>
          );
        })}
      </div>

      {/* Painel com o conteúdo correspondente à aba selecionada */}
      <div
        role="tabpanel"
        id={`tabpanel-${abaAtiva}`}
        aria-labelledby={`tab-${abaAtiva}`}
        className={styles.tabPanel}
      >
        {tabs[abaAtiva]?.content}
      </div>
    </div>
  );
}

export default Tabs;
