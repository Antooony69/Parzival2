import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Nuevoe4elite/', // Tiene que ser exactamente así, respetando la N mayúscula
})
