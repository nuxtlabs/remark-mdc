import type { CompileContext as MdastCompileContext } from 'mdast-util-from-markdown'
import type { Parent } from 'mdast'
import type { CompileContext as MicromarkCompileContext } from 'micromark-util-types'
export type { Effects, State, Code, TokenizeContext, TokenTypeMap, Token } from 'micromark-util-types'
export type { Nodes } from 'mdast'

export type CompileContext = MicromarkCompileContext & MdastCompileContext

export type Container = Parent & {
  type: 'componentContainer'
  rawData?: string
  mdc?: {
    unwrapped?: string
  }
}

export type ComponentContainerSection = Parent & {
  type: 'componentContainerSection'
  rawData?: string
}

export type ComponentContainerDataSection = Parent & {
  type: 'componentContainerDataSection'
  rawData?: string
}

export type TextComponent = Partial<Parent> & {
  type: 'textComponent'
  name: string
  attributes: Record<string, any>
}

declare module 'mdast' {
  interface RootContentMap {
    componentContainer: Container
    componentText: Container
    componentContainerSection: ComponentContainerSection
    componentContainerDataSection: ComponentContainerDataSection
    textComponent: TextComponent
  }
}

declare module 'micromark-util-types' {
  interface TokenTypeMap {
    componentContainer: 'componentContainer',
    componentContainerName: 'componentContainerName',
    componentContainerFence: 'componentContainerFence',
    componentContainerSequence: 'componentContainerSequence',
    componentContainerSection: 'componentContainerSection',
    componentContainerSectionSequence: 'componentContainerSectionSequence',
    componentContainerSectionTitle: 'componentContainerSectionTitle',
    componentContainerContent: 'componentContainerContent',

    componentContainerLabel: 'componentContainerLabel',
    componentContainerLabelMarker: 'componentContainerLabelMarker',
    componentContainerLabelString: 'componentContainerLabelString',

    componentContainerDataSection: 'componentContainerDataSection',

    componentContainerAttributes: 'componentContainerAttributes',
    componentContainerAttributesMarker: 'componentContainerAttributesMarker',
    componentContainerAttribute: 'componentContainerAttribute',
    componentContainerAttributeId: 'componentContainerAttributeId',
    componentContainerAttributeClass: 'componentContainerAttributeClass',
    componentContainerAttributeName: 'componentContainerAttributeName',
    componentContainerAttributeInitializerMarker: 'componentContainerAttributeInitializerMarker',
    componentContainerAttributeValueLiteral: 'componentContainerAttributeValueLiteral',
    componentContainerAttributeValue: 'componentContainerAttributeValue',
    componentContainerAttributeValueMarker: 'componentContainerAttributeValueMarker',
    componentContainerAttributeValueData: 'componentContainerAttributeValueData',

    bindingContent: 'bindingContent',
    bindingFence: 'bindingFence',

    escapeCharacter: 'escapeCharacter',

    // Component Text
    componentText: 'componentText',
    componentTextMarker: 'componentTextMarker',
    componentTextName: 'componentTextName',
    componentTextLabel: 'componentTextLabel',
    componentTextLabelMarker: 'componentTextLabelMarker',
    componentTextLabelString: 'componentTextLabelString',

    componentTextAttributes: 'componentTextAttributes',
    componentTextAttributesMarker: 'componentTextAttributesMarker',
    componentTextAttribute: 'componentTextAttribute',
    componentTextAttributeId: 'componentTextAttributeId',
    componentTextAttributeClass: 'componentTextAttributeClass',
    componentTextAttributeName: 'componentTextAttributeName',
    componentTextAttributeInitializerMarker: 'componentTextAttributeInitializerMarker',
    componentTextAttributeValueLiteral: 'componentTextAttributeValueLiteral',
    componentTextAttributeValue: 'componentTextAttributeValue',
    componentTextAttributeValueMarker: 'componentTextAttributeValueMarker',
    componentTextAttributeValueData: 'componentTextAttributeValueData',

    // Text Span
    textSpan: 'textSpan',

    // Others
    formGfmTaskCheckbox: 'formGfmTaskCheckbox'
    doubleBracket: 'doubleBracket'
  }

  interface CompileData {
    componentAttributes: [string, any][]
  }
}
