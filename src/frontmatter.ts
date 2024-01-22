import yaml from 'js-yaml'
import * as flat from 'flat'

const FRONTMATTER_DELIMITER = '---'

export function stringifyFrontMatter (data: any, content = '') {
  if (!Object.keys(data).length) {
    return ''
  }

  data = flat.unflatten(data || {}, {})

  return [
    FRONTMATTER_DELIMITER,
    yaml.dump(data, { lineWidth: -1 }).trim(),
    FRONTMATTER_DELIMITER,
    content
  ].join('\n')
}

export function parseFrontMatter (content: string) {
  let data: any = {}
  if (content.startsWith(FRONTMATTER_DELIMITER)) {
    const idx = content.indexOf('\n' + FRONTMATTER_DELIMITER)
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
