import { unified, type Preset } from 'unified'
import parse from 'remark-parse'
import gfm from 'remark-gfm'
import stringify from 'remark-stringify'
import { expect, test } from 'vitest'
import mdc from '../../src'

interface MarkdownTest {
  markdown: string
  expected?: string
  extra?: (markdown: string, ast: any, expected: string) => void
  plugins?: any[]
  mdcOptions?: Record<string, any>
}

export function runMarkdownTests(tests: Record<string, MarkdownTest>) {
  for (const key in tests) {
    const { markdown, expected, extra, plugins = [], mdcOptions = {} } = tests[key]
    test(key, async () => {
      const ast = await markdownToAST(markdown, plugins, mdcOptions)

      expect(ast).toMatchSnapshot()

      const regeneratedMarkdown = await astToMarkdown(ast, plugins, mdcOptions)
      expect(regeneratedMarkdown.trim()).toEqual(expected || markdown)
      if (extra) {
        extra(markdown, ast, expected || markdown)
      }
    })
  }
}

async function markdownToAST(markdown: string, plugins = [] as any[], mdcOptions = {}) {
  function compiler(this: any) {
    this.Compiler = function (root: any) {
      return root
    }
  }

  let stream = unified()
    .use(parse)
    .use(gfm)
    .use(mdc, mdcOptions)

  for (const plugin of plugins) {
    stream = stream.use(plugin)
  }
  const file = await stream.use(compiler as Preset).process(markdown)

  return file.result
}

async function astToMarkdown(ast: any, plugins = [] as any[], mdcOptions = {}) {
  function jsonParser(this: any) {
    this.Parser = function (root: any) {
      return JSON.parse(root)
    }
  }
  const stream = await unified()
    .use(jsonParser)
    .use(gfm)
    .use(mdc, mdcOptions)

  for (const plugin of plugins) {
    stream.use(plugin)
  }
  stream.use(stringify, {
    bullet: '-',
    emphasis: '_',
    listItemIndent: 'one',
    fence: '`',
    fences: true,
    rule: '-',
  })
  const result = await stream.process(JSON.stringify(ast))
  return result.value as string
}
