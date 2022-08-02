import { describe, expect } from 'vitest'
import { runMarkdownTests } from './utils'

describe('inline-component', () => {
  runMarkdownTests({
    empty: {
      markdown: ':component'
    },
    text: {
      markdown: ':component[text]'
    },
    'with-attribute': {
      markdown: ':component[text]{.class}'
    },
    strong: {
      markdown: '**:component[text]{.class}**',
      extra (_markdown, ast, _expected) {
        expect(ast.children[0].children[0].type).toEqual('strong')
        expect(ast.children[0].children[0].children[0].type).toEqual('textComponent')
      }
    },
    underlined: {
      markdown: '**:component[text]{.class}**'
    }
  })
})
