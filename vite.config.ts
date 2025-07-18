import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { type UserConfig, defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import { qrcode } from 'vite-plugin-qrcode'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  envDir: './env/',
  plugins: [
    react(),
    qrcode(),
    tailwindcss(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ],
  build: {
    sourcemap: true,
    target: 'esnext',
    minify: true,
    cssTarget: 'esnext',
    cssMinify: true,
    cssCodeSplit: true,
    modulePreload: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react/jsx-runtime', 'react-dom'],
        },
      },
    },
  },
}) satisfies UserConfig
