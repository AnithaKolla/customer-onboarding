import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ], 
      manifest: {
        name: "Customer Onboarding App",
        short_name: "OnboardApp",
        description:
          "A PWA app for Provider/Consumer registration",
        theme_color: "#4CAF50",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "image.jpg",
            sizes: "192x192",
            type: "image/jpg",
          },
          {
            src: "image1.jpg",
            sizes: "512x512",
            type: "image/jpg",
          },
        ],
      },
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg}",
        ],
        navigateFallback: "/index.html", 
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
            },
          },
          {
            urlPattern: ({ request }) =>
              [
                "style",
                "script",
                "worker",
              ].includes(request.destination),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache",
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin ===
              "http://localhost:5000",
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
            },
          },
        ],
      },
    }),
  ],
});
