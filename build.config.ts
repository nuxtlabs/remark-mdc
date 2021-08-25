import { BuildOptions } from 'unbuild'

export default <BuildOptions>{
  entries: [{ input: 'src/index' }],
  declaration: true,
  externals: ['unified', 'mdast']
}
