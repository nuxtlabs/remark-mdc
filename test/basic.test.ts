import { expect, describe } from 'vitest'
import { runMarkdownTests } from './utils'

describe('basic', () => {
  let attachers
  runMarkdownTests({
    remarkPluginName: {
      markdown: '',
      plugins: [
        function test() {
          attachers = this.attachers
        },
      ],
      extra() {
        expect(attachers.map(a => a[0].name)).toContain('remarkMDC')
      },
    },
    simple: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true,
        },
      },
      markdown: [
        'paragraph 1',
        '',
        '---',
        '',
        'paragraph 2',
      ].join('\n'),
    },
    link: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true,
        },
      },
      markdown: [
        '[link](https://nuxtjs.org){target="_blank"}',
      ].join('\n'),
    },
    li: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true,
        },
      },
      markdown: [
        '- inline :component',
        '- inline :component[text]',
      ].join('\n'),
    },
  })
})
