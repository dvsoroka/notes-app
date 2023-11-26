import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

// My following lines from the advice   https://stackoverflow.com/questions/75460851/reactjs-18-and-vite-4-import-analysis-error-in-npm-run-dev
/*
  loader: { '.js': 'jsx' },

  esbuild: {
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
*/
})
