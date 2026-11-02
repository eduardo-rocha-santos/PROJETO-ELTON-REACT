import { useState, useEffect } from 'react';
import styles from './Toast.module.css';

const ICONES_POR_TIPO = {
  sucesso: '✓',
  erro: '!',
  info: 'i',
};

/**
 * Componente Notificação Toast (Toast)
 * Gerencia sua visibilidade via state local, fecha sozinho após alguns segundos
 * ou manualmente pelo usuário, e recebe mensagem e tipo via props.
 */
function Toast({ message, type = 'info', toastId, duration = 3500, onClose }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (!message) {
      setVisivel(false);
      return;
    }

    setVisivel(true);

    const temporizador = setTimeout(() => {
      setVisivel(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(temporizador);
  }, [message, type, toastId, duration, onClose]);

  function fecharAgora() {
    setVisivel(false);
    if (onClose) {
      onClose();
    }
  }

  if (!visivel || !message) {
    return null;
  }

  const classeTipo = styles[type] || styles.info;

  return (
    <div
      className={`${styles.toast} ${classeTipo}`}
      role={type === 'erro' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <span className={styles.icon} aria-hidden="true">
        {ICONES_POR_TIPO[type] || 'i'}
      </span>

      <p className={styles.message}>{message}</p>

      <button
        type="button"
        className={styles.closeButton}
        aria-label="Fechar notificação"
        onClick={fecharAgora}
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;
