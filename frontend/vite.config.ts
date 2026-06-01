import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/courses': 'http://api:3009',
      '/auth': 'http://api:3009',
    },
    watch: {
      // Docker on Windows doesn't propagate inotify events into containers,
      // so polling is required for hot reload to detect file changes.
      usePolling: true,
      interval: 300,
    },
  },
})
