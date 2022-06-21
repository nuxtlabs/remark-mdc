import { describe } from 'vitest'
import { runMarkdownTests } from './utils'

describe('label', () => {
  runMarkdownTests({
    simple: {
      markdown: ':test[label]'
    },
    empty: {
      markdown: ':test[]',
      expected: ':test'
    },
    'scaped-characters': {
      markdown: ':test[scape \\[ character]'
    },
    'invalid-label-eol': {
      markdown: ':test[\n',
      expected: ':test\\['
    },
    'invalid-label-eof': {
      markdown: ':test[',
      expected: ':test\\['
    }
  })
})
