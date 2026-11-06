import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          id: 'com.sahebworld.pwa',
          name: 'Saheb World - साहेब वर्ल्ड',
          short_name: 'SahebWorld',
          description: 'श्री सद्गुरु कबीर साहेब स्वाध्याय पीठ — साहेब वर्ल्ड PWA - सत्यनाम',
          theme_color: '#701A07',
          background_color: '#FDFBF7',
          display: 'standalone',
          start_url: '/?v=4', // Cache break version update to v4
          scope: '/',
          icons: [
            {
              src: '/icons/kabir-swaroop.png?v=4',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: '/icons/icon-192.png?v=4',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: '/icons/icon-512.png?v=4',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        manifestFilename: 'manifest.json',
        devOptions: {
          enabled: false,
        },
        workbox: {
          cacheId: 'saheb-world-satyanaam-v4', // Updated cache ID
          globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,mp3,json,webp,woff2}'],
          maximumFileSizeToCacheInBytes: 104857600, // 100MB max file cache limit
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'core-app-assets-v4',
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|webp|ico|mp3|wav|ogg)$/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'media-audio-assets-v4',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 24 * 60 * 60, // 60 Days
                },
                plugins: [
                  {
                    cacheWillUpdate: async ({ response }) => {
                      return response && response.status === 200 ? response : null;
                    },
                  },
                ],
              },
            },
            {
              urlPattern: /\.(?:json)$/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'scriptures-data-cache-v4',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                },
              },
            },
          ],
        },
      }),
    ],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('recharts')) {
                return 'vendor-recharts';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('canvas-confetti')) {
                return 'vendor-confetti';
              }
              return 'vendor-misc';
            }
          },
        },
      },
      sourcemap: false,
    },
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
