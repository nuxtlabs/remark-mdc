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
    }
  })
})
