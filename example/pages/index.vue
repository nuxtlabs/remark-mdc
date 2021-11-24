<template>
  <div class="flex">
    <textarea v-model="markdown" class="flex-1"></textarea>
    <pre class="flex-1">{{ ast }}</pre>
    <pre class="flex-1">{{ md }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from '@vue/composition-api'
import { astToMarkdown, markdownToAST } from '~/utils/toAST'

const markdown = ref(`# Hello World

::test-component
---
data: value
---
Default slot

#secondary-slot
Secondary slot value
::

`)
const md = ref('')
const ast = ref<any>({})

watch(markdown, async (val: string) => {
  try {
    ast.value = (await markdownToAST(val)) as any
    md.value = (await astToMarkdown(ast.value)) as string
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
})
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
