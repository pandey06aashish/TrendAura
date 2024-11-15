import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        // Ensures better chunking for production builds
        manualChunks: undefined,
      },
    },
    commonjsOptions: {
      // Ensures compatibility with some CommonJS modules
      include: /node_modules/,
    },
  },
  resolve: {
    alias: {
      // Example aliases to ensure proper resolution of dependencies
      '@': '/src',
    },
  },
});
