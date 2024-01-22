import { describe } from 'vitest'
import { runMarkdownTests } from './utils'

describe('Attributes', () => {
  runMarkdownTests({
    'id-suger': {
      markdown: ':test{#id} text'
    },
    'class-suger': {
      markdown: ':test{.class .another-class key="value"} text',
      expected: ':test{.class.another-class key="value"} text'
    },
    boolean: {
      markdown: ':test{prop} text',
      expected: ':test{prop="true"} text'
    },
    'html-characters': {
      markdown: ':test{icon="&copy;"} text',
      expected: ':test{icon="©"} text'
    },
    'html-characters-unquoted': {
      markdown: ':test{icon=&copy;} text',
      expected: ':test{icon="©"} text'
    },
    'value-with-space': {
      markdown: ':test{attr= value} text',
      expected: ':test{attr="value"} text'
    },
    'invalid-binding': {
      markdown: ':test{:} text',
      expected: ':test{:} text'
    },
    'fragment-attribute': {
      markdown: '[![Nuxt](https://nuxtjs.org/design-kit/colored-logo.svg){.nest}](https:test){.cls}',
      expected: '[![Nuxt](https://nuxtjs.org/design-kit/colored-logo.svg){.nest}](https\\:test){.cls}'
    },
    image: {
      markdown: '![Nuxt](https://nuxtjs.org/design-kit/colored-logo.svg){#id .class}'
    },
    code: {
      markdown: '`code`{#id .class}'
    },
    strong: {
      markdown: '**strong**{#id .class}'
    },
    link: {
      markdown: '[Nuxt](https://nuxtjs.org){#id .class}'
    },
    emphasis: {
      markdown: '_emphasis_{#id .class}'
    }
  })
})
