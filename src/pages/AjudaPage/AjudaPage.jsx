import Accordion from '../../components/Accordion/Accordion';
import { PERGUNTAS_FAQ } from '../../data/dadosIniciais';
import styles from './AjudaPage.module.css';

/**
 * Página de Ajuda e Perguntas Frequentes (FAQ)
 * Demonstra o componente Acordeão (Accordion) e permite testar os 3 tipos de Notificação Toast.
 */
function AjudaPage({ onNotificar }) {
  return (
    <section aria-labelledby="titulo-ajuda" className={styles.page}>
      <div>
        <h1 id="titulo-ajuda" className={styles.title}>
          Perguntas Frequentes (FAQ)
        </h1>
        <p className={styles.subtitle}>
          Tire dúvidas sobre o funcionamento da aplicação e os conceitos de React aplicados.
        </p>
      </div>

      {/* Componente Obrigatório 1: Acordeão (Accordion) */}
      <Accordion items={PERGUNTAS_FAQ} />

      {/* Seção prática para demonstrar os três tipos de Notificação Toast */}
      <div className={styles.toastTester}>
        <div>
          <h2 className={styles.testerTitle}>Demonstração de Feedbacks (Toast)</h2>
          <p className={styles.testerText}>
            Clique em um dos botões para disparar cada variação visual da Notificação Toast:
          </p>
        </div>

        <div className={styles.testerButtons}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSuccess}`}
            onClick={() =>
              onNotificar('Operação concluída com sucesso!', 'sucesso')
            }
          >
            Notificação de Sucesso
          </button>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnInfo}`}
            onClick={() =>
              onNotificar('Lembrete: revise os conteúdos antes da entrega.', 'info')
            }
          >
            Notificação Informativa
          </button>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnError}`}
            onClick={() =>
              onNotificar('Erro ao salvar: verifique os campos obrigatórios.', 'erro')
            }
          >
            Notificação de Erro
          </button>
        </div>
      </div>
    </section>
  );
}

export default AjudaPage;
