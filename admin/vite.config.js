import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
  build: {
    rollupOptions: {
      external: [
        'react-router-dom',
        'react-toastify',
        'axios', // Add axios here explicitly
      ],
    },
  },
  optimizeDeps: {
    include: ['axios'], // Include axios here to optimize dependency pre-bundling
  },
})
