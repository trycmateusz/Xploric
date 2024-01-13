// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.BASE_API_URL,
      baseStorageUrl: process.env.BASE_STORAGE_URL,
      apiStorageId: process.env.API_STORAGE_ID,
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
    '/my-profile/latest': {
      ssr: false
    },
    '/my-profile/favourites': {
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
    },
    '/redirect': {
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
