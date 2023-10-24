import { describe, expect } from 'vitest'
import { runMarkdownTests } from './utils'

describe('auto-unwrap', () => {
  runMarkdownTests({
    simple: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true
        }
      },
      markdown: '::test\nHello World\n::',
      extra (_markdown, ast, _expected) {
        expect(ast.children[0].children.length).toBe(1)
        expect(ast.children[0].children[0]).property('type', 'text')
        expect(ast.children[0].children[0]).property('value', 'Hello World')
      }
    },
    slot: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true
        }
      },
      markdown: '::test\n#title\nHello World\n::',
      extra (_markdown, ast, _expected) {
        const slot = ast.children[0].children[0]
        expect(slot.children.length).toBe(1)
        expect(slot.children[0]).property('type', 'text')
        expect(slot.children[0]).property('value', 'Hello World')
      }
    },
    twoSlots: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true
        }
      },
      markdown: '::test\nFoo bar\n\n#title\nHello World\n::',
      extra (_markdown, ast, _expected) {
        const nonSlotChild = ast.children[0].children[0]
        expect(nonSlotChild).property('type', 'text')
        expect(nonSlotChild).property('value', 'Foo bar')

        const slot = ast.children[0].children[1]
        expect(slot.children.length).toBe(1)
        expect(slot.children[0]).property('type', 'text')
        expect(slot.children[0]).property('value', 'Hello World')
      }
    },
    twoChildren: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true
        }
      },
      markdown: '::test\nFoo bar\n\nHello World\n::',
      extra (_markdown, ast, _expected) {
        for (const child of ast.children[0].children) {
          expect(child).property('type', 'paragraph')
        }
      }
    },
    componentChildren: {
      mdcOptions: {
        experimental: {
          autoUnwrap: true
        }
      },
      markdown: '::test\n  :::another-component\n  :::\n::',
      extra (_markdown, ast, _expected) {
        expect(ast.children[0].children.length).toBe(1)
        expect(ast.children[0].children[0]).property('type', 'containerComponent')
      }
    }
  })
})
