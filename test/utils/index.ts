import { unified } from 'unified'
import type { Preset } from 'unified'
import parse from 'remark-parse'
import gfm from 'remark-gfm'
import strigify from 'remark-stringify'
import { expect, test } from 'vitest'
import mdc from '../../src'

interface MarkdownTest {
  markdown: string
  expected?: string
  extra?: (markdown, ast, expected) => void
}

export function runMarkdownTests (tests: Record<string, MarkdownTest>) {
  for (const key in tests) {
    const { markdown, expected, extra } = tests[key]
    test(key, async () => {
      const ast = await markdownToAST(markdown)

      expect(ast).toMatchSnapshot()

      const regenertedMarkdown = await astToMarkdown(ast)
      expect(regenertedMarkdown.trim()).toEqual(expected || markdown)
      if (extra) {
        extra(markdown, ast, expected || markdown)
      }
    })
  }
}

async function markdownToAST (markdown: string) {
  function compiler (this: any) {
    this.Compiler = function (root: any) {
      return root
    }
  }

  const stream = unified()
    .use(parse)
    .use(gfm)
    .use(mdc)

  const file = await stream.use(compiler as Preset).process(markdown)

  return file.result
}

async function astToMarkdown (ast: any) {
  function jsonParser (this: any) {
    this.Parser = function (root: any) {
      return JSON.parse(root)
    }
  }
  const stream = await unified()
    .use(jsonParser)
    .use(mdc)
    .use(gfm)
    .use(strigify, {
      bullet: '-'
    })
    .process(JSON.stringify(ast))
  return stream.value as string
}
