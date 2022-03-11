import { describe } from 'vitest'
import { runMarkdownTests } from './utils'

describe('block-component', () => {
  runMarkdownTests({
    empty: {
      markdown: '::component\n::',
      expected: '::component\n\n::'
    },
    text: {
      markdown: '::component\ntext\n::',
      expected: '::component\n\ntext\n::'
    },
    'empty-slot': {
      markdown: '::component\n#text\n::',
      expected: '::component\n\n#text\n\n\n::'
    },
    frontmatter: {
      markdown: '::with-frontmatter\n---\nkey: value\narray:\n  - item\n  - itemKey: value\n---\n::'
    },
    frontmatter1: {
      markdown: [
        '::with-frontmatter',
        '---',
        'key: value',
        'key2:',
        '  subkey: value',
        '  subkey2: value',
        'array:',
        '  - item',
        '  - itemKey: value',
        '---',
        '::'
      ].join('\n'),
      expected: [
        '::with-frontmatter',
        '---',
        'key: value',
        'key2.subkey: value',
        'key2.subkey2: value',
        'array:',
        '  - item',
        '  - itemKey: value',
        '---',
        '::'
      ].join('\n')
    },
    'nested-component': {
      markdown: [
        '::with-frontmatter-and-nested-component',
        '---',
        'key: value',
        'array:',
        '  - item',
        '  - itemKey: value',
        '---',
        'Default slot',
        '',
        '#secondary-slot',
        '',
        'Secondary slot value',
        '',
        '  :::hello',
        '  ---',
        '  key: value',
        '  ---',
        '  :::',
        '::'
      ].join('\n')
    }
  })
})
