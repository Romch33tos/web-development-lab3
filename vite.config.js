import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePages } from '@kingironman2011/vite-pages';

export default defineConfig({
  plugins: [
    react(),
    vitePages({
      additionalRoutes: ['/lists/:listId', '/lists/:listId/tasks/:taskId'],
      verbose: true,
    }),
  ],
  base: '/web-development-lab3/',
});
