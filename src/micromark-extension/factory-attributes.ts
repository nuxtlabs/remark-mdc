import type { Effects, State } from 'micromark-util-types'
import { factorySpace } from 'micromark-factory-space'
import { factoryWhitespace } from 'micromark-factory-whitespace'

import {
  markdownLineEnding,
  markdownLineEndingOrSpace,
  asciiAlpha,
  asciiAlphanumeric,
  markdownSpace
} from 'micromark-util-character'

export default function createAttributes(
  effects: Effects,
  ok: State,
  nok: State,
  attributesType: string,
  attributesMarkerType: string,
  attributeType: string,
  attributeIdType: string,
  attributeClassType: string,
  attributeNameType: string,
  attributeInitializerType: string,
  attributeValueLiteralType: string,
  attributeValueType: string,
  attributeValueMarker: string,
  attributeValueData: string,
  disallowEol?: boolean
) {
  let type: string
  let marker: number | undefined

  return start

  function start(code: number) {
    // Always a `{`
    effects.enter(attributesType)
    effects.enter(attributesMarkerType)
    effects.consume(code)
    effects.exit(attributesMarkerType)
    return between
  }

  function between(code: number): void | State {
    if (code === 35 /* `#` */) {
      type = attributeIdType
      return shortcutStart(code) as State
    }

    if (code === 46 /* `.` */) {
      type = attributeClassType
      return shortcutStart(code) as State
    }

    if (code === 58 /* `:` */ || code === 95 /* `_` */ || asciiAlpha(code)) {
      effects.enter(attributeType)
      effects.enter(attributeNameType)
      effects.consume(code)
      return name as State
    }

    if (disallowEol && markdownSpace(code)) {
      return factorySpace(effects, between as State, 'whitespace')(code)
    }

    if (!disallowEol && markdownLineEndingOrSpace(code)) {
      return factoryWhitespace(effects, between as State)(code)
    }

    return end(code)
  }

  function shortcutStart(code: number) {
    effects.enter(attributeType)
    effects.enter(type)
    effects.enter(type + 'Marker')
    effects.consume(code)
    effects.exit(type + 'Marker')
    return shortcutStartAfter
  }

  function shortcutStartAfter(code: number) {
    if (
      code === null /* EOF */ ||
      code === 34 /* `"` */ ||
      code === 35 /* `#` */ ||
      code === 39 /* `'` */ ||
      code === 46 /* `.` */ ||
      code === 60 /* `<` */ ||
      code === 61 /* `=` */ ||
      code === 62 /* `>` */ ||
      code === 96 /* `` ` `` */ ||
      code === 125 /* `}` */ ||
      markdownLineEndingOrSpace(code)
    ) {
      return nok(code)
    }

    effects.enter(type + 'Value')
    effects.consume(code)
    return shortcut
  }

  function shortcut(code: number) {
    if (
      code === null /* EOF */ ||
      code === 34 /* `"` */ ||
      code === 39 /* `'` */ ||
      code === 60 /* `<` */ ||
      code === 61 /* `=` */ ||
      code === 62 /* `>` */ ||
      code === 96 /* `` ` `` */
    ) {
      return nok(code)
    }

    if (code === 35 /* `#` */ || code === 46 /* `.` */ || code === 125 /* `}` */ || markdownLineEndingOrSpace(code)) {
      effects.exit(type + 'Value')
      effects.exit(type)
      effects.exit(attributeType)
      return between(code)
    }

    effects.consume(code)
    return shortcut
  }

  function name(code: number) {
    if (
      code === 45 /* `-` */ ||
      code === 46 /* `.` */ ||
      code === 58 /* `:` */ ||
      code === 95 /* `_` */ ||
      asciiAlphanumeric(code)
    ) {
      effects.consume(code)
      return name
    }

    effects.exit(attributeNameType)

    if (disallowEol && markdownSpace(code)) {
      return factorySpace(effects, nameAfter as State, 'whitespace')(code)
    }

    if (!disallowEol && markdownLineEndingOrSpace(code)) {
      return factoryWhitespace(effects, nameAfter as State)(code)
    }

    return nameAfter(code)
  }

  function nameAfter(code: number) {
    if (code === 61 /* `=` */) {
      effects.enter(attributeInitializerType)
      effects.consume(code)
      effects.exit(attributeInitializerType)
      return valueBefore
    }

    // Attribute w/o value.
    effects.exit(attributeType)
    return between(code)
  }

  function valueBefore(code: number): void | State {
    if (
      code === null /* EOF */ ||
      code === 60 /* `<` */ ||
      code === 61 /* `=` */ ||
      code === 62 /* `>` */ ||
      code === 96 /* `` ` `` */ ||
      code === 125 /* `}` */ ||
      (disallowEol && markdownLineEnding(code))
    ) {
      return nok(code)
    }

    if (code === 34 /* `"` */ || code === 39 /* `'` */) {
      effects.enter(attributeValueLiteralType)
      effects.enter(attributeValueMarker)
      effects.consume(code)
      effects.exit(attributeValueMarker)
      marker = code
      return valueQuotedStart as State
    }

    if (disallowEol && markdownSpace(code)) {
      return factorySpace(effects, valueBefore as State, 'whitespace')(code)
    }

    if (!disallowEol && markdownLineEndingOrSpace(code)) {
      return factoryWhitespace(effects, valueBefore as State)(code)
    }

    effects.enter(attributeValueType)
    effects.enter(attributeValueData)
    effects.consume(code)
    marker = undefined
    return valueUnquoted as State
  }

  function valueUnquoted(code: number) {
    if (
      code === null /* EOF */ ||
      code === 34 /* `"` */ ||
      code === 39 /* `'` */ ||
      code === 60 /* `<` */ ||
      code === 61 /* `=` */ ||
      code === 62 /* `>` */ ||
      code === 96 /* `` ` `` */
    ) {
      return nok(code)
    }

    if (code === 125 /* `}` */ || markdownLineEndingOrSpace(code)) {
      effects.exit(attributeValueData)
      effects.exit(attributeValueType)
      effects.exit(attributeType)
      return between(code)
    }

    effects.consume(code)
    return valueUnquoted
  }

  function valueQuotedStart(code: number) {
    if (code === marker) {
      effects.enter(attributeValueMarker)
      effects.consume(code)
      effects.exit(attributeValueMarker)
      effects.exit(attributeValueLiteralType)
      effects.exit(attributeType)
      return valueQuotedAfter
    }

    effects.enter(attributeValueType)
    return valueQuotedBetween(code)
  }

  function valueQuotedBetween(code: number): void | State {
    if (code === marker) {
      effects.exit(attributeValueType)
      return valueQuotedStart(code) as State
    }

    if (code === null /* EOF */) {
      return nok(code)
    }

    // Note: blank lines can’t exist in content.
    if (markdownLineEnding(code)) {
      return disallowEol ? nok(code) : factoryWhitespace(effects, valueQuotedBetween as State)(code)
    }

    effects.enter(attributeValueData)
    effects.consume(code)
    return valueQuoted as State
  }

  function valueQuoted(code: number) {
    if (code === marker || code === null /* EOF */ || markdownLineEnding(code)) {
      effects.exit(attributeValueData)
      return valueQuotedBetween(code)
    }

    effects.consume(code)
    return valueQuoted
  }

  function valueQuotedAfter(code: number) {
    return code === 125 /* `}` */ || markdownLineEndingOrSpace(code) ? between(code) : end(code)
  }

  function end(code: number) {
    if (code === 125 /* `}` */) {
      effects.enter(attributesMarkerType)
      effects.consume(code)
      effects.exit(attributesMarkerType)
      effects.exit(attributesType)
      return ok
    }

    return nok(code)
  }
}
