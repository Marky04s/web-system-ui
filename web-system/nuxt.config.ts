// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";


export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      strapiBaseUrl: 'http://localhost:1337',
      strapiToken: 'd08e22aea1f4b509996338f78b1034e6763fed96a3ee6f77cc57996018becda3d5398a5eb19d6c61ffa7cfdb2ffba61c0f6b849593edb8adaef41fedbb80189a2d65b5a70b5a32a407016bdef6892541a68dc4ad479ca1d59e69e59c80eba0e5c9117b8690e02c89c1205363043f39fde632ae08ad4ca217f91ed7bd7179d5e5'
    }
  }
})