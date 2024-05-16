import yaml from 'js-yaml'
import * as flat from 'flat'

const FRONTMATTER_DELIMITER_DEFAULT = '---'
const FRONTMATTER_DELIMITER_CODEBLOCK_STYLE = '```yaml [props]'

export function stringifyFrontMatter (data: any, content = '') {
  if (!Object.keys(data).length) {
    return ''
  }

  data = flat.unflatten(data || {}, {})

  return [
    FRONTMATTER_DELIMITER_DEFAULT,
    yaml.dump(data, { lineWidth: -1 }).trim(),
    FRONTMATTER_DELIMITER_DEFAULT,
    content
  ].join('\n')
}

export function stringifyCodeBlockProps (data: any, content = '') {
  // flatten frontmatter data
  // convert `parent: { child: ... }` into flat keys `parent.child`
  data = flat.flatten(data, {
    // preserve arrays and their contents as is and do not walk through arrays
    // flatten array will be like `parent.0.child` and `parent.1.child` with is not readable
    safe: true
  })

  if (!Object.keys(data).length) {
    return ''
  }

  return [
    FRONTMATTER_DELIMITER_CODEBLOCK_STYLE,
    yaml.dump(data, { lineWidth: -1 }).trim(),
    '```',
    content
  ].join('\n')
}

export function parseFrontMatter (content: string) {
  let data: any = {}
  if (content.startsWith(FRONTMATTER_DELIMITER_DEFAULT)) {
    const idx = content.indexOf('\n' + FRONTMATTER_DELIMITER_DEFAULT)
    if (idx !== -1) {
      const frontmatter = content.slice(4, idx)
      if (frontmatter) {
        data = yaml.load(frontmatter)
        content = content.slice(idx + 4)
      }
    }
  }

  return {
    content,
    // unflatten frontmatter data. convert `parent.child` keys into `parent: { child: ... }`
    data: flat.unflatten(data || {}, {}) as Record<string, any>
  }
}
