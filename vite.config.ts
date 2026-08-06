import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Nuevoe4elite/', // 👈 Debe ser exactamente el nombre de tu repositorio
})
