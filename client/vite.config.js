import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/card-img': {
        target: 'https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/card-img/, '/one-piece/en'),
      },
    },
  },
});