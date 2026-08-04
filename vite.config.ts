import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Nuevoe4elite/', // Debe coincidir exactamente con el nombre de tu repositorio
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
