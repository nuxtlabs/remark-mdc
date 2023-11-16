interface ComponentHandler {
  name: string
  instance: any
  options?: any
}

export interface RemarkMDCOptions {
  components?: ComponentHandler[]
  experimental?: {
    autoUnwrap?: boolean
  }
}
