import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "kBalance",
        short_name: "kBalance",
        description: "A simple PWA app for balance sheets",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/kbalance_pwa/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/kbalance_pwa/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Caching configuration
        runtimeCaching: [
          {
            urlPattern: /\.(?:html|css|js)$/, // Cache HTML, CSS, and JS files
            handler: "NetworkFirst", // Try to fetch from the network first
            options: {
              cacheName: "html-css-js-cache",
              expiration: {
                maxEntries: 50, // Limit the cache size
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/, // Cache image files
            handler: "CacheFirst", // Cache images first
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50, // Limit the cache size
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  base: "/kbalance_pwa/",
});
