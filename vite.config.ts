import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const DEFAULT_PORT = 5000

export default defineConfig(({ mode }) => {
  // The '' prefix reads every variable, not only VITE_ ones. PORT is used here
  // and never reaches the client bundle.
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.PORT) || DEFAULT_PORT

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    // strictPort fails loudly if the port is taken, rather than quietly moving on.
    server: { port, strictPort: true },
    preview: { port, strictPort: true },
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      globals: true,
    },
  }
})
