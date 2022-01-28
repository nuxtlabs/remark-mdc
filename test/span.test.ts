import { describe, expect, test } from 'vitest'
import { markdownToAST } from './utils/toAST'

describe('Span Syntax', () => {
  test('Simple Span', async () => {
    const markdown = '[span]'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('paragraph')

    expect(children[0].children[0].type).toEqual('textComponent')
    expect(children[0].children[0].name).toEqual('span')

    expect(children[0].children[0].children[0].type).toEqual('text')
    expect(children[0].children[0].children[0].value).toEqual('span')
  })

  test('Span inside link', async () => {
    const markdown = '[[span]](#href)'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('paragraph')
    expect(children[0].children[0].type).toEqual('link')

    expect(children[0].children[0].children[0].type).toEqual('textComponent')
    expect(children[0].children[0].children[0].name).toEqual('span')

    expect(children[0].children[0].children[0].children[0].type).toEqual('text')
    expect(children[0].children[0].children[0].children[0].value).toEqual('span')
  })

  test('Span with Attributes', async () => {
    const markdown = '[span]{#theid.aclass foo="bar" class="anotherclass" class="andother"}'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('paragraph')

    expect(children[0].children[0].type).toEqual('textComponent')
    expect(children[0].children[0].name).toEqual('span')

    expect(children[0].children[0].children[0].type).toEqual('text')
    expect(children[0].children[0].children[0].value).toEqual('span')

    expect(children[0].children[0].attributes).toEqual({
      id: 'theid',
      class: 'aclass anotherclass andother',
      foo: 'bar'
    })
  })
})
