import { resolve } from 'path'
import { defineNuxtConfig } from '@nuxt/bridge'

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
  build: {
    transpile: [
      'unified',
      'bail',
      'trough',
      'vfile',
      'micromark',
      'zwitch',
      'longest-streak',
      /(unist|remark|mdast|parse|character|stringify|is)-*/
    ]
  }
})
