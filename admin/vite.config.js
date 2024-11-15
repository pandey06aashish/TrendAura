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
        'axios', // Ensure axios is explicitly marked external
      ],
    },
  },
})
