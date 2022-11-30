import type { Effects, State, Code, TokenizeContext } from 'micromark-util-types'
import { asciiAlpha, asciiAlphanumeric } from 'micromark-util-character'
import { Codes } from './constants'

export default function createName (this: TokenizeContext, effects: Effects, ok: State, nok: State, nameType: string) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this

  return start

  function start (code: Code): State | void {
    if (asciiAlpha(code)) {
      effects.enter(nameType)
      effects.consume(code)
      return name
    }

    return nok(code)
  }

  function name (code: Code): State | void {
    if (code === Codes.dash || code === Codes.underscore || asciiAlphanumeric(code)) {
      effects.consume(code)
      return name
    }

    effects.exit(nameType)
    // To do next major: disallow `-` at end of name too, for consistency.
    return self.previous === Codes.underscore ? nok(code) : ok(code)
  }
}
