import type { Plugin } from 'unified'
import type { Node } from 'unist'
import type { Root } from 'mdast'
import { kebabCase } from 'scule'
import { visit } from 'unist-util-visit'
import { parseFrontMatter } from './frontmatter'
import toMarkdown from './to-markdown'
import fromMarkdown from './from-markdown'
import syntax from './micromark-extension'

const toFrontMatter = (yamlString: string) => `---\n${yamlString}\n---`

interface ComponentHanlder {
  name: string
  instance: any
  options?: any
}

interface ComponentNode extends Node {
  name?: string
  attributes?: Record<string, any>
  rawData?: string
}

interface RemarkMDCOptions {
  components?: ComponentHanlder[]
}

export default <Plugin<Array<RemarkMDCOptions>, string, Root>>(
  function remarkMDC({ components = [] }: RemarkMDCOptions = {}) {
    // @ts-ignore
    const data = this.data()

    add('micromarkExtensions', syntax())
    add('fromMarkdownExtensions', fromMarkdown)
    add('toMarkdownExtensions', toMarkdown)

    function add(field: string, value: any) {
      /* istanbul ignore if - other extensions. */
      if (!data[field]) {
        data[field] = []
      }

      ;(data[field] as any[]).push(value)
    }

    if (components.length) {
      return async (tree: ComponentNode, { data }: { data: Record<string, any> }) => {
        const jobs: Promise<unknown>[] = []
        visit<ComponentNode, string[]>(tree, ['textComponent', 'leafComponent', 'containerComponent'], node => {
          bindNode(node, data)
          const { instance: handler, options } = components.find(c => c.name === node.name) || {}
          if (handler) {
            jobs.push(handler(options)(node, data))
          }
        })

        await Promise.all(jobs)
        return tree
      }
    }

    return (tree: ComponentNode, { data }: { data: Record<string, any> }) => {
      visit<ComponentNode, string[]>(tree, ['textComponent', 'leafComponent', 'containerComponent'], node => {
        bindNode(node, data)
      })
    }
  }
)

function bindNode(node: ComponentNode, data: Record<string, any>) {
  const nodeData = node.data || (node.data = {})

  nodeData.hName = kebabCase(node.name)
  nodeData.hProperties = bindData(
    {
      ...node.attributes,
      // Parse data slots and retrieve data
      ...getNodeData(node)
    },
    data
  )
}

function getNodeData(node: ComponentNode) {
  if (!node.rawData) {
    return {}
  }

  const yaml = node.rawData
  const { data } = parseFrontMatter(toFrontMatter(yaml))

  return data
}

function bindData(data: Record<string, any>, pageData: Record<string, any>) {
  const entries = Object.entries(data).map(([key, value]) => {
    if (key.startsWith(':')) {
      return [key, value]
    }
    if (typeof value === 'string') {
      return [pageData[value] ? `:${key}` : key, value]
    }
    return [`:${key}`, JSON.stringify(value)]
  })
  return Object.fromEntries(entries)
}
