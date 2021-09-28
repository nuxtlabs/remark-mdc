import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [{ input: 'src/index.ts', name: 'index' }],
  declaration: true,
  inlineDependencies: true,
  externals: ['unified', 'mdast']
})
