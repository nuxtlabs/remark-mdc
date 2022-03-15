import { describe, expect } from 'vitest'
import { runMarkdownTests } from './utils'

describe('span', () => {
  runMarkdownTests({
    simple: {
      markdown: '[span]'
    },
    'inside-link': {
      markdown: '[[span]](#href)'
    },
    'with-attributes': {
      markdown: '[span]{#theid.aclass foo="bar" class="anotherclass" class="andother"}',
      expected: '[span]{#theid .aclass.anotherclass.andother foo="bar"}',
      extra (_markdown, ast, _expected) {
        expect(ast.children[0].children[0].attributes).toEqual({
          id: 'theid',
          class: 'aclass anotherclass andother',
          foo: 'bar'
        })
      }
    },
    'respect-gfm-check-list': {
      markdown: '- [ ] task 1\n- [X] task 2',
      expected: '-   [ ] task 1\n-   [x] task 2'
    }
  })
})
