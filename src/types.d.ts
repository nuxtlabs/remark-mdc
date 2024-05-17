interface ComponentHandler {
  name: string
  instance: any
  options?: any
}

export interface RemarkMDCOptions {
  components?: ComponentHandler[]
  maxAttributesLength?: number
  experimental?: {
    autoUnwrap?: boolean
    componentCodeBlockYamlProps?: boolean
  }
}
