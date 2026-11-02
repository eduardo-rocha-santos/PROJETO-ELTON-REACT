import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Toast from './components/Toast/Toast';
import TarefasPage from './pages/TarefasPage/TarefasPage';
import ConteudosPage from './pages/ConteudosPage/ConteudosPage';
import AjudaPage from './pages/AjudaPage/AjudaPage';
import { TAREFAS_INICIAIS } from './data/dadosIniciais';

/**
 * Componente Principal (App)
 * Orquestra o estado compartilhado de tarefas, as notificações Toast e as rotas da aplicação.
 */
function App() {
  const [tarefas, setTarefas] = useState(TAREFAS_INICIAIS);
  const [toast, setToast] = useState({
    id: 0,
    message: '',
    type: 'info',
  });

  const mostrarNotificacao = useCallback((message, type = 'info') => {
    setToast({
      id: Date.now(),
      message,
      type,
    });
  }, []);

  const fecharNotificacao = useCallback(() => {
    setToast((atual) => ({ ...atual, message: '' }));
  }, []);

  function adicionarTarefa(titulo, disciplina = 'Estudo Geral') {
    const novaTarefa = {
      id: Date.now(),
      titulo,
      disciplina,
      concluida: false,
    };

    setTarefas((listaAtual) => [novaTarefa, ...listaAtual]);
    mostrarNotificacao(`Tarefa adicionada em "${disciplina}"!`, 'sucesso');
  }

  function alternarTarefa(id) {
    const tarefaAlvo = tarefas.find((tarefa) => tarefa.id === id);
    if (!tarefaAlvo) return;

    const novoStatus = !tarefaAlvo.concluida;

    setTarefas((listaAtual) =>
      listaAtual.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: novoStatus } : tarefa
      )
    );

    mostrarNotificacao(
      novoStatus
        ? 'Tarefa marcada como concluída!'
        : 'Tarefa marcada como pendente.',
      novoStatus ? 'sucesso' : 'info'
    );
  }

  function removerTarefa(id) {
    setTarefas((listaAtual) => listaAtual.filter((tarefa) => tarefa.id !== id));
    mostrarNotificacao('Tarefa removida da lista.', 'info');
  }

  const totalConcluidas = tarefas.filter((t) => t.concluida).length;

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar concluidas={totalConcluidas} total={tarefas.length} />

        <main className="main-container">
          <Routes>
            <Route
              path="/"
              element={
                <TarefasPage
                  tarefas={tarefas}
                  onAdicionarTarefa={adicionarTarefa}
                  onAlternarTarefa={alternarTarefa}
                  onRemoverTarefa={removerTarefa}
                  onNotificar={mostrarNotificacao}
                />
              }
            />
            <Route
              path="/conteudos"
              element={<ConteudosPage onNotificar={mostrarNotificacao} />}
            />
            <Route
              path="/ajuda"
              element={<AjudaPage onNotificar={mostrarNotificacao} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>
            StudyFlow — Aplicação React.js Responsiva • Engenharia de Software (UCSAL)
          </p>
        </footer>

        {/* Componente Obrigatório 6: Notificação Toast */}
        <Toast
          message={toast.message}
          type={toast.type}
          toastId={toast.id}
          onClose={fecharNotificacao}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
