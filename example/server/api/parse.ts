import { unified } from 'unified'
import type { Preset } from 'unified'
import parse from 'remark-parse'
import mdc from '../../../src'

// workaround for kleur
process.env = process.env || {}

const content = `
# Hello World

::test-component
---
data: value
---
Default slot

#secondary-slot
Secondary slot value
::

`
export default () => markdownToAST(content)

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
