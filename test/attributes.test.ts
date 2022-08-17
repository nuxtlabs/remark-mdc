import { describe } from 'vitest'
import { runMarkdownTests } from './utils'

describe('Attributes', () => {
  runMarkdownTests({
    'id-suger': {
      markdown: ':test{#id}'
    },
    'class-suger': {
      markdown: ':test{.class .another-class key="value"}',
      expected: ':test{.class.another-class key="value"}'
    },
    boolean: {
      markdown: ':test{prop}',
      expected: ':test{prop="true"}'
    },
    'html-characters': {
      markdown: ':test{icon="&copy;"}',
      expected: ':test{icon="©"}'
    },
    'html-characters-unquoted': {
      markdown: ':test{icon=&copy;}',
      expected: ':test{icon="©"}'
    },
    'value-with-space': {
      markdown: ':test{attr= value}',
      expected: ':test{attr="value"}'
    },
    'invlid-binding': {
      markdown: ':test{:}',
      expected: ':test{:}'
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
      markdown: '*emphasis*{#id .class}'
    }
  })
})
