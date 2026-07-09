import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Removed base: "/MyProtofoilo/" for Vercel deployment compatibility
  plugins: [react(), tailwindcss()],
})
