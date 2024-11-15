import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  build: {
    rollupOptions: {
      external: [], // Leave this empty if you don't need to externalize specific modules
    },
  },
  resolve: {
    alias: {
      // Ensure Vite can correctly resolve react-router-dom
      'react-router-dom': require.resolve('react-router-dom'),
    },
  },
});
