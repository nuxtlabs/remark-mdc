import { markdownLineEnding } from 'micromark-util-character'
import { factorySpace } from 'micromark-factory-space'
import type { Effects, State, TokenizeContext, Code } from './types'
import componentContainer from './tokenize-inline'
import { Codes } from './constants'

/**
 * text
 *
 * :component
 *
 * text
 */
function tokenize(this: TokenizeContext, effects: Effects, ok: State, nok: State) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this

  const tokenizeSugerSyntax = componentContainer.tokenize.call(
    self,
    effects,
    factorySpace(effects, exit as State, 'linePrefix'),
    nok,
  )

  return factorySpace(effects, lineStart as State, 'linePrefix')

  function lineStart(code: Code): undefined | State {
    if (code === Codes.colon) {
      return tokenizeSugerSyntax(code)
    }
    return nok(code)
  }

  function exit(code: Code): undefined | State {
    if (markdownLineEnding(code) || code === Codes.EOF) {
      return ok(code)
    }
    return nok(code)
  }
}

export default {
  tokenize,
}
