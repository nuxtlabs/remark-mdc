<template>
  <pre>{{ ast }}</pre>
</template>

<script lang="ts">
import { markdownToAST } from '~/utils/toAST'
const markdown = `
ssas
::test
# Test
::
`
export default {
  name: 'PageSlug',
  async asyncData() {
    const ast = await markdownToAST(markdown)
    return {
      ast
    }
  }
}
</script>

<style>
.flex {
  display: flex;
  width: 100%;
}
.w-25 {
  width: 25%;
}
.w-75 {
  width: 75%;
}
.px-4 {
  padding: 0 2em;
}
</style>
