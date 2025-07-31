import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tanstackRouter from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['78a96c52e0f9.ngrok-free.app'],
    host: true,
  },
  plugins: [
    tanstackRouter({
      routesDirectory: './src/pages',
      target: 'react',
      routeToken: 'layout',
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
