import type { Effects, State, TokenizeContext, Code } from 'micromark-util-types'
import { markdownLineEnding } from 'micromark-util-character'
import { factorySpace } from 'micromark-factory-space'
import componentContainer from './tokenize-inline'
import { Codes } from './constants'

/**

text

:component

text

 */
function tokenize (this: TokenizeContext, effects: Effects, ok: State, nok: State) {
  const self = this

  const tokenizeSugerSyntax = componentContainer.tokenize.call(
    self,
    effects,
    factorySpace(effects, exit as State, 'linePrefix'),
    nok
  )

  return factorySpace(effects, lineStart as State, 'linePrefix')

  function lineStart (code: Code): void | State {
    if (code === Codes.colon) {
      return tokenizeSugerSyntax(code)
    }
    return nok(code)
  }

  function exit (code: Code): void | State {
    if (markdownLineEnding(code) || code === Codes.EOF) {
      return ok(code)
    }
    return nok(code)
  }
}

export default {
  tokenize
}
