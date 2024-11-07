import { describe, expect, it } from 'vitest'
import { parse, stringify } from 'yaml'
import { runMarkdownTests } from './utils'

describe('block-component', () => {
  it('should parse frontmatter binding values', () => {
    const fmAttributes = {
      array: ['item', { ':itemKey': 'value' }],
      ':key': 'value',
      key2: { ':subkey': 'value', subkey2: 'value' }
    }
    expect(parse(stringify(fmAttributes).trim())).toEqual(fmAttributes)
  })

  runMarkdownTests({
    empty: {
      markdown: '::component\n::',
      expected: '::component\n::'
    },
    text: {
      markdown: '::component\ntext\n::',
      expected: '::component\ntext\n::'
    },
    'empty-slot': {
      markdown: '::component\n#text\n::',
      expected: '::component\n#text\n::'
    },
    frontmatter: {
      markdown: '::with-frontmatter\n---\nkey: value\narray:\n  - item\n  - itemKey: value\n---\n::',
      expected: '::with-frontmatter\n---\narray:\n  - item\n  - itemKey: value\nkey: value\n---\n::'
    },
    jsonScapeAttr: {
      markdown: '::foo{:test=\'{"foo":"I\\\'d love to"}\'}\n::',
      extra: (_md, ast) => {
        expect(ast.children[0].type).toBe('containerComponent')
      }
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
        'array:',
        '  - item',
        '  - itemKey: value',
        'key: value',
        'key2:',
        '  subkey: value',
        '  subkey2: value',
        '---',
        '::'
      ].join('\n')
    },
    'frontmatter-with-binding-variables': {
      markdown: [
        '::with-frontmatter',
        '---',
        ':key: value',
        'array:',
        '  - item',
        '  - :itemKey: value',
        'object:',
        '  :subkey: value',
        '  subkey2: value',
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
        'Secondary slot value',
        '',
        '  :::hello',
        '  ---',
        '  key: value',
        '  ---',
        '  :::',
        '::'
      ].join('\n'),
      expected: [
        '::with-frontmatter-and-nested-component',
        '---',
        'array:',
        '  - item',
        '  - itemKey: value',
        'key: value',
        '---',
        'Default slot',
        '',
        '#secondary-slot',
        'Secondary slot value',
        '',
        '  :::hello',
        '  ---',
        '  key: value',
        '  ---',
        '  :::',
        '::'
      ].join('\n')
    },
    'section-order': {
      markdown: [
        '::comp',
        '#title',
        'Hello',
        '#another-title',
        'World',
        '#default',
        'P1',
        '',
        'P2',
        '',
        'P',
        '::'
      ].join('\n'),
      expected: [
        '::comp',
        'P1',
        '',
        'P2',
        '',
        'P',
        '',
        '#title',
        'Hello',
        '',
        '#another-title',
        'World',
        '::'
      ].join('\n')
    },
    'section-order-2': {
      markdown: [
        '::comp',
        '#a',
        'A',
        '#c',
        'C',
        '#b',
        'B',
        '#default',
        'P1',
        '::'
      ].join('\n'),
      expected: [
        '::comp',
        'P1',
        '',
        '#a',
        'A',
        '',
        '#c',
        'C',
        '',
        '#b',
        'B',
        '::'
      ].join('\n')
    },
    'ignore-code-fence': {
      markdown: [
        '::component',
        'First line',
        '',
        '```cpp',
        '#include <iostream>',
        '```',
        '',
        'Second line',
        '::',
        '',
        'Third line'
      ].join('\n')
    },
    'dangling-list': {
      markdown: [
        '::component',
        '- list item',
        '- list item',
        '',
        '#slot',
        'slot content',
        '::'
      ].join('\n')
    },
    'trim-slot-name': {
      markdown: [
        '::component',
        '#slot ',
        'slot content',
        '::'
      ].join('\n'),
      expected: [
        '::component',
        '#slot',
        'slot content',
        '::'
      ].join('\n')
    },
    'sugar-syntax': {
      markdown: [
        ':component'
      ].join('\n'),
      extra: (_md, ast) => {
        expect(ast.children[0].type).toBe('textComponent')
        expect(ast.children[0].name).toBe('component')
      }
    },
    'component-attributes-bind-frontmatter': {
      markdown: '::text-component{:key="value"}\n::',
      extra (_, ast) {
        expect(ast.children[0].attributes).toEqual({ ':key': 'value' })
        expect(ast.children[0].data.hProperties).toEqual({ ':key': 'value' })
      }
    },
    'component-attributes-array-of-string': {
      markdown: '::container-component{:items=\'["Nuxt", "Vue"]\'}\n::',
      // expected: '::container-component{:items="[&#x22;Nuxt&#x22;, &#x22;Vue&#x22;]"}\n::',
      extra (_, ast) {
        expect(ast.children[0].attributes).toEqual({ ':items': '["Nuxt", "Vue"]' })
        expect(ast.children[0].data.hProperties).toEqual({ ':items': '["Nuxt", "Vue"]' })
      }
    },
    'component-attributes-bad-array': {
      markdown: '::container-component{:items="[Nuxt,Vue]"}\n::',
      extra (_, ast) {
        expect(ast.children[0].attributes).toEqual({ ':items': '[Nuxt,Vue]' })
        expect(ast.children[0].data.hProperties).toEqual({ ':items': '[Nuxt,Vue]' })
      }
    },
    'component-attributes-array-of-number': {
      markdown: '::container-component{:items=\'[1,2,3.5]\'}\n::',
      extra (_, ast) {
        expect(ast.children[0].attributes).toEqual({ ':items': '[1,2,3.5]' })
        expect(ast.children[0].data.hProperties).toEqual({ ':items': '[1,2,3.5]' })
      }
    },
    'component-attributes-array-convert-double-quote': {
      markdown: '::container-component{:items="[1,2,3.5]"}\n::',
      expected: '::container-component{:items=\'[1,2,3.5]\'}\n::',
      extra (_, ast) {
        expect(ast.children[0].attributes).toEqual({ ':items': '[1,2,3.5]' })
        expect(ast.children[0].data.hProperties).toEqual({ ':items': '[1,2,3.5]' })
      }
    },
    'component-attributes-object': {
      markdown: '::container-component{:items=\'{"key": "value"}\'}\n::',
      extra (_, ast) {
        expect(ast.children[0].attributes).toEqual({ ':items': '{"key": "value"}' })
        expect(ast.children[0].data.hProperties).toEqual({ ':items': '{"key": "value"}' })
      }
    },
    'component-hProperties-be-the-same': {
      markdown: [
        '::container-component{:items=\'{"key":"value"}\'}\n::',
        '',
        '::container-component',
        '---',
        'items:',
        '  key: value',
        '---',
        '::'
      ].join('\n'),
      extra (_, ast) {
        expect(ast.children[0].attributes).toEqual({ ':items': '{"key":"value"}' })
        expect(ast.children[1].attributes).toEqual({})
        expect(ast.children[0].data.hProperties).toEqual(ast.children[1].data.hProperties)
      }
    }
  })
})
