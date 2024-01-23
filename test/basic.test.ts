import { describe } from 'vitest'
import { runMarkdownTests } from './utils'

describe('basic', () => {
  runMarkdownTests({
    simple: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true
        }
      },
      markdown: [
        'paragraph 1',
        '',
        '---',
        '',
        'paragraph 2'
      ].join('\n')
    },
    link: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true
        }
      },
      markdown: [
        '[link](https://nuxtjs.org){target="_blank"}'
      ].join('\n')
    },
    li: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true
        }
      },
      markdown: [
        '- inline :component',
        '- inline :component[text]'
      ].join('\n')
    }
  })
})
