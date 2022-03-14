import type { Ref } from 'vue'

// workaround for kleur
process.env = process.env || {}

// Buffer workaround
if (typeof window !== 'undefined' && typeof Buffer === 'undefined') {
  // @ts-ignore
  window.Buffer = { from: a => a }
}

function jsonParser (this: any) {
  this.Parser = function (root: any) {
    return JSON.parse(root)
  }
}
export function useMarkdownGenerator (input: Ref<object>) {
  let _stream
  const markdown = ref('')
  const generate = async (ast: object) => {
    if (!_stream) {
      const unified = await import('unified').then(r => r.unified)
      const stringify = await import('remark-stringify').then(r => r.default)
      const mdc = await import('../../src').then(r => r.default)

      _stream = await unified()
        .use(jsonParser)
        .use(mdc)
        .use(stringify, {
          bullet: '-'
        })
    }
    const res = await _stream.process(JSON.stringify(ast)).then(file => file.value)
    markdown.value = res
  }

  watch(() => input.value, v => generate(v))
  if (input.value) {
    generate(input.value)
  }

  return markdown
}
