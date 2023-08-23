export type { Effects, State, Code, TokenizeContext, TokenTypeMap } from 'micromark-util-types'

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
}