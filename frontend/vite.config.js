import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    port: 5173,
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom', 'react-toastify'], // Externalize libraries
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group other dependencies into a vendor chunk
            return 'vendor';
          }
        },
      },
    },
    commonjsOptions: {
      include: /node_modules/, // Ensure compatibility with CommonJS modules
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for src directory
    },
  },
});
