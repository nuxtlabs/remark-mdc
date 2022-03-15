import type { Preset } from 'unified'
import type { Ref } from 'vue'

// workaround for kleur
process.env = process.env || {}

// Buffer workaround
if (typeof window !== 'undefined' && typeof Buffer === 'undefined') {
  // @ts-ignore
  window.Buffer = { from: a => a }
}

function compiler (this: any) {
  this.Compiler = function (root: any) {
    return root
  }
}

export function useMarkdownParser (input: Ref<string>) {
  let _stream
  const ast = ref(null)
  const parse = async (str: string) => {
    if (!_stream) {
      const unified = await import('unified').then(r => r.unified)
      const parse = await import('remark-parse').then(r => r.default)
      const gfm = await import('remark-gfm').then(r => r.default)
      const mdc = await import('../../src').then(r => r.default)

      _stream = unified()
        .use(parse)
        .use(gfm)
        .use(mdc)
        .use(compiler as Preset)
    }
    const res = await _stream.process(str).then(file => file.result)
    ast.value = res
  }

  watch(() => input.value, v => parse(v))
  parse(input.value)

  return ast
}
