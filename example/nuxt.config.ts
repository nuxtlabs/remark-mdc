import { resolve } from 'path'
import { defineNuxtConfig } from '@nuxt/kit'

export default defineNuxtConfig({
  target: 'static',
  components: [
    {
      path: resolve(__dirname, 'components'),
      prefix: '',
      isAsync: false,
      level: 2
    }
  ],
  buildModules: ['@nuxt/typescript-build', '@nuxt/nitro/compat'],
  content: {}
})
