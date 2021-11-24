import { markdownToAST } from './utils/toAST'

describe('Attributes', () => {
  test('id shortcut', async () => {
    const markdown = ':test{#id}'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('textComponent')
    expect(children[0].name).toEqual('test')

    expect(children[0].data.hProperties).toMatchObject({
      id: 'id'
    })
  })

  test('class shortcut', async () => {
    const markdown = ':test{.class .another-class prop}'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('textComponent')
    expect(children[0].name).toEqual('test')

    expect(children[0].data.hProperties).toMatchObject({
      class: 'class another-class'
    })
  })

  test('boolean shortcut', async () => {
    const markdown = ':test{prop}'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('textComponent')
    expect(children[0].name).toEqual('test')

    expect(children[0].data.hProperties).toMatchObject({
      ':prop': 'true'
    })
  })

  test('Parse HTML character references', async () => {
    const markdown = ':test{icon="&copy;"}'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('textComponent')
    expect(children[0].name).toEqual('test')

    expect(children[0].data.hProperties).toMatchObject({
      icon: '©'
    })
  })

  test('Handle unquoted value', async () => {
    const markdown = ':test{icon=&copy;}'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('textComponent')
    expect(children[0].name).toEqual('test')

    expect(children[0].data.hProperties).toMatchObject({
      icon: '©'
    })
  })

  test('Values with space', async () => {
    const markdown = ':test{attr= value}'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children[0].type).toEqual('textComponent')
    expect(children[0].name).toEqual('test')

    expect(children[0].data.hProperties).toMatchObject({
      attr: 'value'
    })
  })

  test('Invalid bindings', async () => {
    /**
     * Invalid attributes will fail parsing and the result
     * will be a paragram and text Node with the original text
     */
    const markdown = ':test{:}'
    const { children } = (await markdownToAST(markdown)) as any

    expect(children).toMatchObject([
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: ':test{:}'
          }
        ]
      }
    ])
  })
})
