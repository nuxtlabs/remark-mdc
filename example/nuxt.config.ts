import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  target: 'static',
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
