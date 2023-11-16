interface ComponentHanlder {
  name: string
  instance: any
  options?: any
}

export interface RemarkMDCOptions {
  components?: ComponentHanlder[]
  experimental?: {
    autoUnwrap?: boolean
    componentCodeBlockProps?: boolean
  }
}
