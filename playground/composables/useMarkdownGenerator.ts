import type { Ref } from 'vue'

// workaround for kleur
process.env = process.env || {}

function jsonParser (this: any) {
  this.Parser = function (root: any) {
    return JSON.parse(root)
  }
}
export function useMarkdownGenerator (input: Ref<object>, mdcOptions = ref({})) {
  let _stream
  const markdown = ref('')
  const generate = async (ast: object) => {
    if (!_stream) {
      const unified = await import('unified').then(r => r.unified)
      const stringify = await import('remark-stringify').then(r => r.default)
      const gfm = await import('remark-gfm').then(r => r.default)
      const mdc = await import('../../src').then(r => r.default)

      _stream = await unified()
        .use(jsonParser)
        .use(gfm)
        .use(mdc, mdcOptions.value)
        .use(stringify, {
          bullet: '-'
        })
    }
    const res = await _stream.process(JSON.stringify(ast)).then(file => file.value)
    markdown.value = res
  }

  watch(() => input.value, v => generate(v))
  watch(() => mdcOptions.value, () => {
    _stream = null
    generate(input.value)
  }, { deep: true })

  if (input.value) {
    generate(input.value)
  }

  return markdown
}
