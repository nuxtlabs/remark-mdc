import { expect, describe } from 'vitest'
import { runMarkdownTests } from './utils'

describe('basic', () => {
  runMarkdownTests({
    YamlProps: {
      mdcOptions: {
        experimental: {
          componentCodeBlockYamlProps: true
        }
      },
      markdown: '::with-frontmatter-yaml\n```yaml [props]\narray:\n  - item\n  - itemKey: value\nkey: value\n```\n::',
      extra (_markdown, ast, _expected) {
        expect(ast.children[0].type).toEqual('containerComponent')
        expect(ast.children[0].fmAttributes).toEqual({ array: ['item', { itemKey: 'value' }], key: 'value' })
      }
    },
    notYamlProps: {
      mdcOptions: {
        experimental: {
          componentCodeBlockYamlProps: true
        }
      },
      markdown: '::with-frontmatter-yaml\n```yaml\nkey: value\narray:\n  - item\n  - itemKey: value\n```\n::',
      extra (_markdown, ast, _expected) {
        expect(ast.children[0].type).toEqual('containerComponent')
        expect(ast.children[0].fmAttributes).toEqual({})
      }
    },
    notYamlProps2: {
      mdcOptions: {
        experimental: {
          componentCodeBlockYamlProps: true
        }
      },
      markdown: '::with-frontmatter-yaml\n```yaml[props]\nkey: value\narray:\n  - item\n  - itemKey: value\n```\n::'
    },
    notYamlProps3: {
      mdcOptions: {
        experimental: {
          componentCodeBlockYamlProps: true
        }
      },
      markdown: '::with-frontmatter-yaml\n```yaml [yaml]\nkey: value\narray:\n  - item\n  - itemKey: value\n```\n::'
    },
    shouldConvertYamlProps: {
      mdcOptions: {
        experimental: {
          componentCodeBlockYamlProps: true
        }
      },
      markdown: '::with-frontmatter-yaml\n---\narray:\n  - item\n  - itemKey: value\nkey: value\n---\n::',
      expected: '::with-frontmatter-yaml\n```yaml [props]\narray:\n  - item\n  - itemKey: value\nkey: value\n```\n::'
    },
    yamlProps1: {
      mdcOptions: {
        experimental: {
          componentCodeBlockYamlProps: true
        }
      },
      markdown: [
        '::with-frontmatter-yaml1',
        '```yaml [props]',
        'key: value',
        'key2:',
        '  subkey: value',
        '  subkey2: value',
        'array:',
        '  - item',
        '  - itemKey: value',
        '```',
        '::'
      ].join('\n'),
      expected: [
        '::with-frontmatter-yaml1',
        '```yaml [props]',
        'array:',
        '  - item',
        '  - itemKey: value',
        'key: value',
        'key2:',
        '  subkey: value',
        '  subkey2: value',
        '```',
        '::'
      ].join('\n')
    },
    'nested-component-yamlProps': {
      mdcOptions: {
        experimental: {
          componentCodeBlockYamlProps: true
        }
      },
      markdown: [
        '::with-frontmatter-and-nested-component-yaml',
        '```yaml [props]',
        'array:',
        '  - item',
        '  - itemKey: value',
        'key: value',
        '```',
        'Default slot',
        '',
        '#secondary-slot',
        'Secondary slot value',
        '',
        '  :::hello',
        '  ```yaml [props]',
        '  key: value',
        '  ```',
        '  :::',
        '::'
      ].join('\n'),
      extra (_markdown, ast, _expected) {
        expect(ast.children[0].type).toEqual('containerComponent')
        expect(ast.children[0].fmAttributes).toEqual({ array: ['item', { itemKey: 'value' }], key: 'value' })
        expect(ast.children[0].children[1].children[1].fmAttributes).toEqual({ key: 'value' })
      }
    }
  })
})
