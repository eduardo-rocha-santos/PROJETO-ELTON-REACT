import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite pronta para ambiente local e GitHub Codespaces
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
