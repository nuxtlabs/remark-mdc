import { markdownSpace } from 'micromark-util-character'
import type { Effects, State, Code, TokenizeContext } from 'micromark-util-types'
import { Codes } from './constants'
import createLabel from './factory-label'

const label: any = { tokenize: tokenizeLabel, partial: true }
const gfmCheck: any = { tokenize: checkGfmTaskCheckbox, partial: true }
const doubleBracketCheck: any = { tokenize: checkDoubleBracket, partial: true }

function tokenize (this: TokenizeContext, effects: Effects, ok: State, nok: State) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this

  return start

  function start (code: Code): State | undefined {
    if (code !== Codes.openingSquareBracket) {
      throw new Error('expected `[`')
    }

    // When we are in the beginning of task list line,
    // there is a good chance that we are dealing with a GFM task list
    if (
      self.previous === Codes.EOF &&
      self._gfmTasklistFirstContentOfListItem
    ) {
      return effects.check(gfmCheck, nok, attemptLabel)(code)
    }

    // Ignore double brackets `[[`, AKA Wiki Links syntax
    if (self.previous === Codes.openingSquareBracket) {
      return nok(code)
    }
    return effects.check(doubleBracketCheck, nok, attemptLabel)(code)
  }

  function attemptLabel (code: Code): State | undefined {
    effects.enter('textSpan')
    return effects.attempt(label, exit as State, nok)(code)
  }

  function exit (code: Code): State | undefined {
    // Prevent conflict with link syntax
    if (code === Codes.openingParentheses || code === Codes.openingSquareBracket) {
      return nok(code)
    }

    return exitOK(code)
  }

  function exitOK (code: Code): State | undefined {
    effects.exit('textSpan')
    return ok(code)
  }
}

/**
 * Labels starts with `[` and ends with `]`
 */
function tokenizeLabel (effects: Effects, ok: State, nok: State) {
  return createLabel(effects, ok, nok, 'componentTextLabel', 'componentTextLabelMarker', 'componentTextLabelString')
}

export default {
  tokenize
}

function checkGfmTaskCheckbox (effects: Effects, ok: State, nok: State) {
  return enter

  function enter (code: Code): State | undefined {
    effects.enter('formGfmTaskCheckbox')
    effects.consume(code)
    return check
  }

  function check (code: Code): State | undefined {
    if (markdownSpace(code)) {
      effects.consume(code)
      return check
    }
    if (code === Codes.uppercaseX || code === Codes.lowercaseX) {
      effects.consume(code)
      return check
    }

    if (code === Codes.closingSquareBracket) {
      effects.exit('formGfmTaskCheckbox')
      return ok(code)
    }

    return nok(code)
  }
}

function checkDoubleBracket (effects: Effects, ok: State, nok: State) {
  return enter

  function enter (code: Code): State | undefined {
    effects.enter('doubleBracket')
    effects.consume(code)
    return check
  }

  function check (code: Code): State | undefined {
    if (code !== Codes.openingSquareBracket) {
      return nok(code)
    }

    effects.exit('doubleBracket')
    return ok(code)
  }
}
