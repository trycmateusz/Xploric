// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.BASE_API_URL,
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
      spotifyBaseUrl: process.env.SPOTIFY_BASE_URL
    }
  },
  modules: [
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs']
    }]
  ],
  pages: true,
  routeRules: {
    '/my-profile': {
      ssr: false
    },
    '/my-profile/edit': {
      ssr: false
    },
    '/xplore': {
      ssr: false
    },
    '/playlist/**': {
      ssr: false
    },
    '/player/**': {
      ssr: false
    }
  },
  imports: {
    dirs: ['stores']
  },
  typescript: {
    strict: true
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  css: ['@/assets/css/main.css']
})
