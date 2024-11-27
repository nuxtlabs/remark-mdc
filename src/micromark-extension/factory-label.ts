import { markdownLineEnding } from 'micromark-util-character'
import type { Effects, State, TokenTypeMap } from './types'
import { Codes } from './constants'

// This is a fork of:
// <https://github.com/micromark/micromark/blob/bf53bf9/lib/tokenize/factory-label.js>
// to allow empty labels, balanced brackets (such as for nested components),
// text instead of strings, and optionally disallows EOLs.

export default function createLabel(
  effects: Effects,
  ok: State,
  nok: State,
  type: keyof TokenTypeMap,
  markerType: keyof TokenTypeMap,
  stringType: keyof TokenTypeMap,
  disallowEol?: boolean,
) {
  let size = 0
  let balance = 0

  return start

  function start(code: number) {
    /* istanbul ignore if - always `[` */
    if (code !== Codes.openingSquareBracket) {
      throw new Error('expected `[`')
    }
    effects.enter(type)
    effects.enter(markerType)
    effects.consume(code)
    effects.exit(markerType)
    return afterStart
  }

  function afterStart(code: number) {
    if (code === Codes.closingSquareBracket) {
      effects.enter(markerType)
      effects.consume(code)
      effects.exit(markerType)
      effects.exit(type)
      return ok
    }

    effects.enter(stringType)
    return atBreak(code)
  }

  function atBreak(code: number) {
    if (
      code === Codes.EOF
      /* <https://github.com/micromark/micromark/blob/bf53bf9/lib/constant/constants.js#L34> */
      || size > 999
    ) {
      return nok(code)
    }

    if (code === Codes.closingSquareBracket && !balance--) {
      return atClosingBrace(code)
    }

    if (markdownLineEnding(code)) {
      if (disallowEol) {
        return nok(code)
      }

      effects.enter('lineEnding')
      effects.consume(code)
      effects.exit('lineEnding')
      return atBreak
    }

    effects.enter('chunkText', { contentType: 'text' })
    return label(code)
  }

  function label(code: number): State | undefined {
    if (
      code === Codes.EOF
      || markdownLineEnding(code)
      /* <https://github.com/micromark/micromark/blob/bf53bf9/lib/constant/constants.js#L34> */
      || size > 999
    ) {
      effects.exit('chunkText')
      return atBreak(code) as State
    }

    if (code === Codes.openingSquareBracket && ++balance > 3) {
      return nok(code)
    }

    if (code === Codes.closingSquareBracket && !balance--) {
      effects.exit('chunkText')
      return atClosingBrace(code)
    }

    effects.consume(code)
    return (code === Codes.backSlash ? labelEscape : label) as State
  }

  function atClosingBrace(code: number) {
    effects.exit(stringType)
    effects.enter(markerType)
    effects.consume(code)
    effects.exit(markerType)
    effects.exit(type)
    return ok
  }

  function labelEscape(code: number): undefined | State {
    if (code === Codes.openingSquareBracket || code === Codes.backSlash || code === Codes.closingSquareBracket) {
      effects.consume(code)
      size++
      return label as State
    }

    return label(code)
  }
}
