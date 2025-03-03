import { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  base: '/spirit-island-randomizer/',
  plugins: [react()],
} satisfies UserConfig
