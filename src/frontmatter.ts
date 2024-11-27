import { parse, stringify } from 'yaml'
import * as flat from 'flat'

const FRONTMATTER_DELIMITER_DEFAULT = '---'
const FRONTMATTER_DELIMITER_CODEBLOCK_STYLE = '```yaml [props]'

export function stringifyFrontMatter(data: any, content = '') {
  if (!Object.keys(data).length) {
    return ''
  }

  data = flat.unflatten(data || {}, {})

  return [
    FRONTMATTER_DELIMITER_DEFAULT,
    stringify(data).trim(),
    FRONTMATTER_DELIMITER_DEFAULT,
    content,
  ].join('\n')
}

export function stringifyCodeBlockProps(data: any, content = '') {
  if (!Object.keys(data).length) {
    return ''
  }

  data = flat.unflatten(data || {}, {})

  return [
    FRONTMATTER_DELIMITER_CODEBLOCK_STYLE,
    stringify(data).trim(),
    '```',
    content,
  ].join('\n')
}

export function parseFrontMatter(content: string) {
  let data: any = {}
  if (content.startsWith(FRONTMATTER_DELIMITER_DEFAULT)) {
    const idx = content.indexOf('\n' + FRONTMATTER_DELIMITER_DEFAULT)
    if (idx !== -1) {
      const frontmatter = content.slice(4, idx)
      if (frontmatter) {
        data = parse(frontmatter)
        content = content.slice(idx + 4)
      }
    }
  }

  return {
    content,
    // unflatten frontmatter data. convert `parent.child` keys into `parent: { child: ... }`
    data: flat.unflatten(data || {}, {}) as Record<string, any>,
  }
}
