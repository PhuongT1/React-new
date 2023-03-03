import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [react()],
  define: {
      "process.env.NODE_ENV": `"${mode}"`,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
      styles: resolve(__dirname, './src/styles'),
      elements: resolve(__dirname, './src/elements'),
      routes: resolve(__dirname, './src/routes'),
      layouts: resolve(__dirname, './src/layouts'),
      pages: resolve(__dirname, './src/pages'),
      atoms: resolve(__dirname, './src/atoms'),
      services: resolve(__dirname, './src/services'),
      components: resolve(__dirname, './src/components'),
      assets: resolve(__dirname, './src/assets'),
      utils: resolve(__dirname, './src/utils'),
      hooks: resolve(__dirname, './src/hooks')
    }
  }
});