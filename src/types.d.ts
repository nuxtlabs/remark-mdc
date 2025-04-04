interface ComponentHandler {
  name: string
  instance: any
  options?: any
}

export interface RemarkMDCOptions {
  components?: ComponentHandler[]
  maxAttributesLength?: number
  autoUnwrap?: boolean | {
    safeTypes?: Array<string>
  }
  yamlCodeBlockProps?: boolean
  indentContent?: boolean
  experimental?: {
    /**
     * @deprecated This feature is out of experimental, use `autoUnwrap`
     */
    autoUnwrap?: boolean
    /**
     * @deprecated This feature is out of experimental, use `yamlCodeBlockProps`
     */
    componentCodeBlockYamlProps?: boolean
  }
}
