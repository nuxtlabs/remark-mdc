<template>
  <div class="flex">
    <textarea v-model="markdown" class="flex-1"></textarea>
    <pre class="flex-1">{{ ast }}</pre>
    <pre class="flex-1">{{ md }}</pre>
  </div>
</template>

<script lang="ts">
import { astToMarkdown, markdownToAST } from '~/utils/toAST'

export default {
  name: 'PageSlug',
  asyncData() {
    return {
      markdown: '',
      ast: {},
      md: ''
    }
  },
  watch: {
    async markdown(val) {
      try {
        this.ast = await markdownToAST(val)
        this.md = await astToMarkdown(this.ast)
      } catch (e) {
        console.error(e)
      }
    }
  },
  mounted() {
    this.markdown = `# Hello World

::test-component
---
data: value
---

Default slot

#secondary-slot

Secondary slot value
::
    `
  }
}
</script>

<style>
.flex {
  display: flex;
  width: 100%;
}
.flex-1 {
  flex: 1;
  height: calc(100vh - 40px);
  overflow: scroll;
}
</style>
