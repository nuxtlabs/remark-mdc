import { unified } from 'unified'
import type { Preset } from 'unified'
import parse from 'remark-parse'
import mdc from '../../src'

function compiler (this: any) {
  this.Compiler = function (root: any) {
    return root
  }
}

export async function markdownToAST (markdown: string) {
  const stream = unified().use(parse).use(mdc)

  const file = await stream.use(compiler as Preset).process(markdown)
  return file.result
}
