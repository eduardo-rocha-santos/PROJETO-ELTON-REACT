import { useState, useRef, useEffect } from 'react';
import styles from './DropdownMenu.module.css';

/**
 * Componente Menu Suspenso (DropdownMenu)
 * Gerencia sua visibilidade via state, recebe opções com callbacks via props
 * e fecha automaticamente ao selecionar um item ou clicar fora.
 */
function DropdownMenu({ label = 'Opções', options = [] }) {
  const [aberto, setAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function tratarCliqueFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAberto(false);
      }
    }

    function tratarTeclaEsc(event) {
      if (event.key === 'Escape') {
        setAberto(false);
      }
    }

    document.addEventListener('mousedown', tratarCliqueFora);
    document.addEventListener('keydown', tratarTeclaEsc);

    return () => {
      document.removeEventListener('mousedown', tratarCliqueFora);
      document.removeEventListener('keydown', tratarTeclaEsc);
    };
  }, []);

  function selecionarOpcao(opcao) {
    if (opcao.onClick) {
      opcao.onClick();
    }
    setAberto(false);
  }

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={aberto}
        onClick={() => setAberto((estadoAtual) => !estadoAtual)}
      >
        <span>{label}</span>
        <span className={`${styles.arrow} ${aberto ? styles.arrowOpen : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {aberto && (
        <ul className={styles.menu} role="menu">
          {options.map((opcao) => (
            <li key={opcao.label} role="none">
              <button
                type="button"
                role="menuitem"
                className={`${styles.option} ${opcao.active ? styles.optionActive : ''}`}
                onClick={() => selecionarOpcao(opcao)}
              >
                <span>{opcao.label}</span>
                {opcao.active && <span aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
