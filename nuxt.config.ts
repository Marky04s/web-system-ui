import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxt/icon',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  build: {
    transpile: ['vuetify'],
  },
   vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },

  },
  runtimeConfig:{
    public:{
      strapiBaseURL: "http://localhost:1337/",
    },
  },
})

