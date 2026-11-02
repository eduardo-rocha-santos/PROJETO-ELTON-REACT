import { useState } from 'react';
import styles from './Accordion.module.css';

/**
 * Componente Acordeão (Accordion)
 * Mantém apenas um item aberto por vez via state e recebe os itens ({ title, content }) via props.
 */
function Accordion({ items = [] }) {
  const [indiceAberto, setIndiceAberto] = useState(0);

  function alternarItem(index) {
    // Se clicar no item já aberto, colapsa (null); caso contrário, abre o item clicado
    setIndiceAberto((atual) => (atual === index ? null : index));
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const estaAberto = indiceAberto === index;

        return (
          <div
            key={item.title}
            className={`${styles.item} ${estaAberto ? styles.itemOpen : ''}`}
          >
            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={estaAberto}
                aria-controls={`accordion-panel-${index}`}
                id={`accordion-header-${index}`}
                onClick={() => alternarItem(index)}
              >
                <span>{item.title}</span>
                <span className={styles.icon} aria-hidden="true">
                  ▾
                </span>
              </button>
            </h3>

            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-header-${index}`}
              className={`${styles.contentWrapper} ${estaAberto ? styles.open : ''}`}
            >
              <div className={styles.contentInner}>
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
