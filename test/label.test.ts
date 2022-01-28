import { describe, expect, test } from 'vitest'
import { markdownToAST } from './utils/toAST'

describe('Label', () => {
  test('Simple label', async () => {
    const markdown = ':test[label]'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('textComponent')
    expect(children[0].name).toEqual('test')

    expect(children[0].children[0]).toMatchObject({
      type: 'text',
      value: 'label'
    })
  })

  test('Empty syntax', async () => {
    const markdown = ':test[]'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('textComponent')
    expect(children[0].name).toEqual('test')

    expect(children[0].children).toHaveLength(0)
  })

  test('Handle scaped characters', async () => {
    const markdown = ':test[scape \\[ character]'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0]).toMatchObject({
      type: 'textComponent',
      name: 'test',
      children: [
        {
          type: 'text',
          value: 'scape [ character'
        }
      ]
    })
  })

  test('Invalid syntax at end of line', async () => {
    const markdown = ':test[\n'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0]).toMatchObject({
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: ':test['
        }
      ]
    })
  })

  test('Invalid syntax at end of file', async () => {
    const markdown = ':test['
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0]).toMatchObject({
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: ':test['
        }
      ]
    })
  })
})
