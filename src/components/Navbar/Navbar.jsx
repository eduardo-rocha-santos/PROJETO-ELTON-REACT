import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

/**
 * Componente Cabeçalho e Navegação Responsiva (Navbar)
 * Integra os links do React Router e adapta o menu para telas móveis.
 */
function Navbar({ concluidas = 0, total = 0 }) {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  function fecharMenuMobile() {
    setMenuMobileAberto(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandGroup}>
          <span className={styles.logoBadge} aria-hidden="true">
            SF
          </span>
          <div>
            <span className={styles.brandName}>StudyFlow</span>
            <span className={styles.brandTag}>Painel de Estudos</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.mobileToggle}
          aria-label="Alternar menu de navegação"
          aria-expanded={menuMobileAberto}
          onClick={() => setMenuMobileAberto((aberto) => !aberto)}
        >
          {menuMobileAberto ? '✕' : '☰'}
        </button>

        <nav
          aria-label="Navegação principal"
          className={`${styles.nav} ${menuMobileAberto ? styles.navOpen : ''}`}
        >
          <NavLink
            to="/"
            end
            onClick={fecharMenuMobile}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.activeLink : ''}`
            }
          >
            Tarefas
          </NavLink>

          <NavLink
            to="/conteudos"
            onClick={fecharMenuMobile}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.activeLink : ''}`
            }
          >
            Conteúdos
          </NavLink>

          <NavLink
            to="/ajuda"
            onClick={fecharMenuMobile}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.activeLink : ''}`
            }
          >
            Ajuda (FAQ)
          </NavLink>

          <span className={styles.statusPill} aria-label="Resumo de progresso">
            {concluidas}/{total} concluídas
          </span>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
