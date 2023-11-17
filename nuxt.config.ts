// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.BASE_API_URL,
      deezerBaseUrl: process.env.DEEZER_BASE_URL
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
  css: ['~/assets/css/main.css']
})
