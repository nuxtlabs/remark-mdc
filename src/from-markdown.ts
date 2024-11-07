/**
 * Based on: https://github.com/syntax-tree/mdast-util-directive
 * Version: 2.1.0
 * License: MIT (https://github.com/syntax-tree/mdast-util-directive/blob/main/license)
 */
import { parseEntities } from 'parse-entities'
import { kebabCase } from 'scule'
import type { Token, CompileContext, Container, Nodes } from './micromark-extension/types'
import type { RemarkMDCOptions } from './types'
import { NON_UNWRAPPABLE_TYPES } from './utils'

export default (opts: RemarkMDCOptions = {}) => {
  const canContainEols = ['textComponent']

  const experimentalAutoUnwrap = (node: Container) => {
    if (opts.experimental?.autoUnwrap && NON_UNWRAPPABLE_TYPES.includes(node.type)) {
      const nonSlotChildren = (node.children).filter((child: any) => child.type !== 'componentContainerSection')
      if (nonSlotChildren.length === 1 && !NON_UNWRAPPABLE_TYPES.includes(nonSlotChildren[0].type)) {
        const nonSlotChildIndex = node.children.indexOf(nonSlotChildren[0])

        node.children.splice(nonSlotChildIndex, 1, ...(nonSlotChildren[0] as Container).children)
        node.mdc = node.mdc || {}
        node.mdc.unwrapped = nonSlotChildren[0].type
      }
    }
  }
  const enter = {
    componentContainer: enterContainer,
    componentContainerSection: enterContainerSection,
    componentContainerDataSection: enterContainerDataSection,
    componentContainerAttributes: enterAttributes,
    componentContainerLabel: enterContainerLabel,
    bindingContent: enterBindingContent,
    componentLeaf: enterLeaf,
    componentLeafAttributes: enterAttributes,

    componentText: enterText,
    textSpan: enterTextSpan,
    componentTextAttributes: enterAttributes
  }
  const exit = {
    bindingContent: exitBindingContent,
    componentContainerSectionTitle: exitContainerSectionTitle,
    listUnordered: conditionalExit,
    listOrdered: conditionalExit,
    listItem: conditionalExit,
    componentContainerSection: exitContainerSection,
    componentContainerDataSection: exitContainerDataSection,
    componentContainer: exitContainer,
    componentContainerAttributeClassValue: exitAttributeClassValue,
    componentContainerAttributeIdValue: exitAttributeIdValue,
    componentContainerAttributeName: exitAttributeName,
    componentContainerAttributeValue: exitAttributeValue,
    componentContainerAttributes: exitAttributes,
    componentContainerLabel: exitContainerLabel,
    componentContainerName,

    componentContainerAttributeInitializerMarker (this: CompileContext) {
    // If an attribute name follows by `=` it should be treat as string
      const attributes = (this.data as any).componentAttributes
      attributes[attributes.length - 1][1] = ''
    },

    componentLeaf: exitToken,
    componentLeafAttributeClassValue: exitAttributeClassValue,
    componentLeafAttributeIdValue: exitAttributeIdValue,
    componentLeafAttributeName: exitAttributeName,
    componentLeafAttributeValue: exitAttributeValue,
    componentLeafAttributes: exitAttributes,
    componentLeafName: exitName,

    componentText: exitToken,
    textSpan: exitToken,
    componentTextAttributeClassValue: exitAttributeClassValue,
    componentTextAttributeIdValue: exitAttributeIdValue,
    componentTextAttributeName: exitAttributeName,
    componentTextAttributeValue: exitAttributeValue,
    componentTextAttributes: exitAttributes,
    componentTextName: componentContainerName
  }

  // Bindings
  function enterBindingContent (this: CompileContext, token: Token) {
    const regex = /([^|]*)(?:\|\|\s*'(.*)')?/
    const values = regex.exec(this.sliceSerialize(token))

    this.enter({
      type: 'textComponent',
      name: 'binding',
      attributes: {
        value: values?.[1]?.trim(),
        defaultValue: values?.[2]
      }
    }, token)
  }

  function exitBindingContent (this: CompileContext, token: Token) {
    this.exit(token)
  }

  function enterContainer (this: CompileContext, token: Token) {
    enterToken.call(this, 'containerComponent', token)
  }

  function exitContainer (this: CompileContext, token: Token) {
    const container = this.stack[this.stack.length - 1] as Container
    if (container.children.length > 1) {
      const dataSection = container.children.find((child: any) => child.rawData) as Container
      container.rawData = dataSection?.rawData
    }

    experimentalAutoUnwrap(container)

    container.children = container.children.flatMap((child: any) => {
      if (child.rawData) {
        return []
      }
      if (child.name === 'default' || !child.name) {
        // Project default slot unwrap state to parent
        if (child.mdc?.unwrapped) {
          container.mdc = container.mdc || {}
          container.mdc.unwrapped = child.mdc?.unwrapped
        }
        return child.children
      }
      child.data = {
        hName: 'component-slot',
        hProperties: {
          ...child.attributes,
          [`v-slot:${child.name}`]: ''
        }
      }
      return child
    })

    this.exit(token)
  }

  function enterContainerSection (this: CompileContext, token: Token) {
    enterToken.call(this, 'componentContainerSection', token)
  }

  function enterContainerDataSection (this: CompileContext, token: Token) {
    enterToken.call(this, 'componentContainerDataSection', token)
  }

  function exitContainerSection (this: CompileContext, token: Token) {
    const section = this.stack[this.stack.length - 1] as Container

    /**
     * Ensure lists and list-items are closed before closing section
     * This issue occurs because `---` separators ar conflict with markdown lists
     */
    attemptClosingOpenListSection.call(this, section)

    experimentalAutoUnwrap(section)

    this.exit(token)
  }

  function exitContainerDataSection (this: CompileContext, token: Token) {
    let section = this.stack[this.stack.length - 1]

    /**
   * Ensure lists and list-items are closed before closing section
   * This issue occurs because `---` separators ar conflict with markdown lists
   */
    section = attemptClosingOpenListSection.call(this, section as Nodes)

    if (section.type === 'componentContainerDataSection') {
      section.rawData = this.sliceSerialize(token)
      this.exit(token)
    }
  }

  function exitContainerSectionTitle (this: CompileContext, token: Token) {
    (this.stack[this.stack.length - 1] as any).name = this.sliceSerialize(token)?.trim()
  }

  function enterLeaf (this: CompileContext, token: Token) {
    enterToken.call(this, 'leafComponent', token)
  }

  function enterTextSpan (this: CompileContext, token: Token) {
    this.enter({ type: 'textComponent', name: 'span', attributes: {}, children: [] }, token)
  }

  function enterText (this: CompileContext, token: Token) {
    enterToken.call(this, 'textComponent', token)
  }

  function enterToken (this: CompileContext, type: string, token: Token) {
    this.enter({ type: type as any, name: '', attributes: {}, children: [] }, token)
  }

  function componentContainerName (this: CompileContext, token: Token) {
    (this.stack[this.stack.length - 1] as any).name = kebabCase(this.sliceSerialize(token))
  }

  function exitName (this: CompileContext, token: Token) {
    (this.stack[this.stack.length - 1] as any).name = this.sliceSerialize(token)
  }

  function enterContainerLabel (this: CompileContext, token: Token) {
    this.enter({ type: 'paragraph', data: { componentLabel: true } as any, children: [] }, token)
  }

  function exitContainerLabel (this: CompileContext, token: Token) {
    this.exit(token)
  }

  function enterAttributes (this: CompileContext) {
    (this.data as any).componentAttributes = []
    this.buffer() // Capture EOLs
  }

  function exitAttributeIdValue (this: CompileContext, token: Token) {
    (this.data as any).componentAttributes.push(['id', parseEntities(this.sliceSerialize(token))])
  }

  function exitAttributeClassValue (this: CompileContext, token: Token) {
    (this.data as any).componentAttributes.push(['class', parseEntities(this.sliceSerialize(token))])
  }

  function exitAttributeValue (this: CompileContext, token: Token) {
    const attributes = (this.data as any).componentAttributes
    const lastAttribute = attributes[attributes.length - 1]

    lastAttribute[1] = (typeof lastAttribute[1] === 'string' ? lastAttribute[1] : '') + parseEntities(this.sliceSerialize(token))
  }

  function exitAttributeName (this: CompileContext, token: Token) {
  // Attribute names in CommonMark are significantly limited, so character
  // references can’t exist.

    // Use `true` as attribute default value to solve issue of attributes without value (example `:block{attr1 attr2}`)
    (this.data as any).componentAttributes.push([this.sliceSerialize(token), true])
  }

  function exitAttributes (this: CompileContext) {
    const attributes = (this.data as any).componentAttributes
    const cleaned: Record<string, any> = {}
    let index = -1
    let attribute

    while (++index < attributes.length) {
      attribute = attributes[index]
      // Convert attribute names to kebab-case
      const name = kebabCase(attribute[0])

      if (name === 'class' && cleaned.class) {
        cleaned.class += ' ' + attribute[1]
      } else {
        cleaned[name] = attribute[1]
      }
    }

    // this.setData('componentAttributes')
    (this.data as any).componentAttributes = attributes
    this.resume() // Drop EOLs

    let stackTop = this.stack[this.stack.length - 1]

    if (stackTop.type !== 'textComponent' || stackTop.name === 'span') {
      while (!stackTop.position?.end && (stackTop as Container).children?.length > 0) {
        stackTop = (stackTop as Container).children[(stackTop as Container).children.length - 1]
      }
    }

    (stackTop as any).attributes = cleaned
  }

  function exitToken (this: CompileContext, token: Token) {
    this.exit(token)
  }

  function conditionalExit (this: CompileContext, token: Token) {
  // As of mdast-util-from-markdown@1.1.0 tokenStack items is an array containing the token and a handler
  // https://github.com/syntax-tree/mdast-util-from-markdown/blob/752dc22acfc517d280612e8d499d5ce0cd5a4495/dev/lib/index.js#L548
    const [section] = this.tokenStack[this.tokenStack.length - 1]
    if ((section as Token).type === token.type) {
      this.exit(token)
    }
  }

  function attemptClosingOpenListSection (this: CompileContext, section: Nodes) {
  /**
   * Ensure lists and list-items are closed before closing section
   * This issue occurs because `---` separators ar conflict with markdown lists
   */
    while (section.type === 'listItem' || section.type === 'list') {
      // As of mdast-util-from-markdown@1.1.0 tokenStack items is an array containing the token and a handler
      // https://github.com/syntax-tree/mdast-util-from-markdown/blob/752dc22acfc517d280612e8d499d5ce0cd5a4495/dev/lib/index.js#L548
      const [stackToken] = this.tokenStack[this.tokenStack.length - 1]
      this.exit(stackToken)
      section = this.stack[this.stack.length - 1] as Nodes
    }
    return section
  }

  return {
    canContainEols,
    enter,
    exit
  }
}
