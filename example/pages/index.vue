<template>
  <div class="flex">
    <textarea v-model="markdown" class="flex-1" />
    <pre class="flex-1">{{ ast }}</pre>
    <pre class="flex-1">{{ md }}</pre>
  </div>
</template>

<script setup lang="ts">
const markdown = ref(`# Hello World

[span]

- [ ] Task 1 [span]
- [x] Task 2

::simple-text
test
::

::single-empty-slot
#slot
::

::with-frontmatter
---
key: value
array:
  - item
  - itemKey: value
---
::

::with-frontmatter-and-nested-component
---
key: value
array:
  - item
  - itemKey: value
---
Default slot

#secondary-slot

Secondary slot value

  :::hello
  ---
  key: value
  ---
  :::

::
`)
const ast = useMarkdownParser(markdown)
const md = useMarkdownGenerator(ast)
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
