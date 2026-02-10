import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import { blogPosts } from './src/data/posts'

const dynamicRoutes = [
  ...Object.keys(blogPosts).map(slug => `/blog/${slug}`),
  // Static Routes
  '/services',
  '/web-design',
  '/local-seo',
  '/local-marketing',
  '/maintenance',
  '/about',
  '/contact',
  '/work',
  '/privacy',
  '/terms',
  '/sms',
  '/app-development',
  '/ai-automation',
  '/seo-audit',
  '/sitemap'
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://boostifyusa.com',
      dynamicRoutes,
      exclude: ['/404'],
      readable: true,
      generateRobotsTxt: true,
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'ui-vendor': ['lucide-react']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
