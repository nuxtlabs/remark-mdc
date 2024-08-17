import { unflatten as _unflatten } from 'flat'

export const NON_UNWRAPPABLE_TYPES = [
  'componentContainerSection',
  'componentContainerDataSection',
  'containerComponent',
  'leafComponent'
]

// unflatten frontmatter data. convert `parent.child` keys into `parent: { child: ... }`
// supports escaping \. to . and \\ to \
export function unflatten (obj: any) {
  // prevent happened to use eascape placeholder
  const salt = Math.random().toString(36).slice(2, 11)
  const escapePlaceholder = `__ESCAPED_DOT_${salt}__`
  const escapeBackslashPlaceholder = `__ESCAPED_BACKSLASH_${salt}__`
  const escapedDotRegex = new RegExp(escapePlaceholder, 'g')
  const escapedBackslashRegex = new RegExp(escapeBackslashPlaceholder, 'g')

  function escapeDotsInKeys (o: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
      Object.entries(o).map(([key, value]) => [
        key.replace(/\\\\/g, escapeBackslashPlaceholder)
          .replace(/\\\./g, escapePlaceholder),
        value
      ])
    )
  }

  function restoreEscapedChars (o: any): any {
    if (typeof o !== 'object' || o === null) { return o }
    if (Array.isArray(o)) { return o.map(restoreEscapedChars) }

    const restored: Record<string, any> = {}
    for (const [key, value] of Object.entries(o)) {
      const restoredKey = key.replace(escapedDotRegex, '.')
        .replace(escapedBackslashRegex, '\\')
      restored[restoredKey] = restoreEscapedChars(value)
    }
    return restored
  }

  const escapedObj = escapeDotsInKeys(obj)
  const unflattenedObj = _unflatten(escapedObj)
  return restoreEscapedChars(unflattenedObj)
}
