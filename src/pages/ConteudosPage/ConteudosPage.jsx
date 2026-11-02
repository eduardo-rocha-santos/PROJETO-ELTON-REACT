import { useState, useEffect } from 'react';
import Tabs from '../../components/Tabs/Tabs';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import styles from './ConteudosPage.module.css';

/**
 * Página de Conteúdos da Disciplina
 * Demonstra o componente Abas (Tabs) e o uso dinâmico da Barra de Progresso em um envio simulado.
 */
function ConteudosPage({ onNotificar }) {
  const [progressoEnvio, setProgressoEnvio] = useState(0);
  const [enviando, setEnviando] = useState(false);

  // Simula o upload de arquivo usando useEffect + setInterval
  useEffect(() => {
    if (!enviando) return;

    const intervalo = setInterval(() => {
      setProgressoEnvio((valorAtual) => {
        const proximoValor = Math.min(100, valorAtual + 20);
        if (proximoValor >= 100) {
          setEnviando(false);
        }
        return proximoValor;
      });
    }, 400);

    return () => clearInterval(intervalo);
  }, [enviando]);

  // Dispara notificação Toast quando o envio simulado atinge 100%
  useEffect(() => {
    if (progressoEnvio === 100 && !enviando) {
      onNotificar('Arquivo da atividade enviado com sucesso!', 'sucesso');
    }
  }, [progressoEnvio, enviando, onNotificar]);

  function iniciarSimulacao() {
    setProgressoEnvio(0);
    setEnviando(true);
    onNotificar('Iniciando envio do pacote da atividade...', 'info');
  }

  function avancarManual() {
    setEnviando(false);
    setProgressoEnvio((atual) => Math.min(100, atual + 25));
  }

  function reiniciarEnvio() {
    setEnviando(false);
    setProgressoEnvio(0);
    onNotificar('Progresso de envio reiniciado.', 'info');
  }

  // Conteúdos enviados via props para o componente Tabs
  const abasDisciplina = [
    {
      title: '1. Resumo da Unidade',
      content: (
        <div className={styles.tabContent}>
          <h2 className={styles.sectionTitle}>Desenvolvimento Front-end com React.js</h2>
          <p className={styles.paragraph}>
            Nesta unidade aplicamos a arquitetura baseada em componentes reutilizáveis,
            separando responsabilidades de interface, estado local e fluxo de dados unidirecional.
          </p>
          <div className={styles.cardsGrid}>
            <article className={styles.infoCard}>
              <h3>Componentes e Props</h3>
              <p>
                Divisão da interface em peças independentes que recebem dados e callbacks de
                forma declarativa.
              </p>
            </article>
            <article className={styles.infoCard}>
              <h3>State e Hooks</h3>
              <p>
                Controle reativo da interface utilizando <code>useState</code>,{' '}
                <code>useEffect</code> e <code>useRef</code>.
              </p>
            </article>
            <article className={styles.infoCard}>
              <h3>Acessibilidade Web</h3>
              <p>
                Tags HTML5 semânticas combinadas com atributos ARIA e suporte à navegação por
                teclado.
              </p>
            </article>
          </div>
        </div>
      ),
    },
    {
      title: '2. Materiais de Revisão',
      content: (
        <div className={styles.tabContent}>
          <h2 className={styles.sectionTitle}>Tópicos Essenciais para Revisão</h2>
          <ul className={styles.studyList}>
            <li>
              <strong>Acordeão e Abas:</strong> Controle de índice ativo no state local para
              alternar painéis visíveis.
            </li>
            <li>
              <strong>Paginação:</strong> Fatiamento de listas com <code>Array.slice()</code> e
              bloqueio de botões nos limites inicial e final.
            </li>
            <li>
              <strong>Menu Suspenso:</strong> Abertura por clique e fechamento automático ao
              detectar clique externo com <code>useRef</code> e <code>useEffect</code>.
            </li>
            <li>
              <strong>React Router:</strong> Navegação SPA entre rotas utilizando{' '}
              <code>BrowserRouter</code>, <code>Routes</code>, <code>Route</code> e{' '}
              <code>NavLink</code>.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '3. Simulador de Entrega',
      content: (
        <div className={styles.tabContent}>
          <h2 className={styles.sectionTitle}>Simulador de Upload de Atividade</h2>
          <p className={styles.paragraph}>
            Teste abaixo a atualização dinâmica do componente <strong>Barra de Progresso</strong>{' '}
            integrado com a <strong>Notificação Toast</strong> ao concluir 100%.
          </p>

          <div className={styles.uploadBox}>
            <ProgressBar
              value={progressoEnvio}
              label={
                progressoEnvio === 100
                  ? 'Upload finalizado!'
                  : enviando
                    ? 'Enviando projeto-react-ucsal.zip...'
                    : 'Aguardando envio do arquivo'
              }
            />

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.primaryButton}
                disabled={enviando}
                onClick={iniciarSimulacao}
              >
                {enviando ? 'Enviando...' : 'Simular Upload Automático'}
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                disabled={enviando || progressoEnvio >= 100}
                onClick={avancarManual}
              >
                +25% Manual
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={reiniciarEnvio}
              >
                Zerar Barra
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section aria-labelledby="titulo-conteudos" className={styles.page}>
      <div>
        <h1 id="titulo-conteudos" className={styles.title}>
          Conteúdos e Entrega
        </h1>
        <p className={styles.subtitle}>
          Navegue pelas abas abaixo para consultar o resumo teórico e testar o envio de tarefas.
        </p>
      </div>

      {/* Componente Obrigatório 4: Abas (Tabs) */}
      <Tabs tabs={abasDisciplina} />
    </section>
  );
}

export default ConteudosPage;
