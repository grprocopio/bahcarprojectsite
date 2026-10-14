import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

const heroVideoUploadPlugin = () => ({
  name: 'hero-video-upload',
  configureServer(server: any) {
    server.middlewares.use('/api/upload-hero-video', (req: any, res: any) => {
      if (req.method === 'POST') {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            if (buffer.length === 0) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: 'Arquivo vazio' }));
            }

            const targetDir = path.resolve(__dirname, 'public/videos');
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }

            // Save to standard paths
            const heroPath = path.resolve(targetDir, 'hero.mp4');
            fs.writeFileSync(heroPath, buffer);
            fs.writeFileSync(path.resolve(__dirname, 'public/hero.mp4'), buffer);
            fs.writeFileSync(path.resolve(targetDir, 'carro.mp4'), buffer);
            fs.writeFileSync(path.resolve(__dirname, 'public/carro.mp4'), buffer);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, size: buffer.length }));
          } catch (err: any) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
      }
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), heroVideoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
