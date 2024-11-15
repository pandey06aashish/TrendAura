import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      // Explicitly mark "react-router-dom" and "react-toastify" as external
      external: ['react-router-dom', 'react-toastify'],
    },
  },
});
