import { describe } from 'vitest'
import { runMarkdownTests } from './utils'

describe('label', () => {
  runMarkdownTests({
    'simple': {
      markdown: ':test[label] text',
    },
    'empty': {
      markdown: ':test[] text',
      expected: ':test text',
    },
    'scaped-characters': {
      markdown: ':test[scape \\[ character] text',
    },
    'invalid-label-eol': {
      markdown: ':test[\n',
      expected: ':test\\[',
    },
    'invalid-label-eof': {
      markdown: ':test[ text',
      expected: ':test\\[ text',
    },
  })
})
