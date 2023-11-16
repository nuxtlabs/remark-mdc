<template>
  <div>
    <label for="autoUnwrap">
      <input id="autoUnwrap" v-model="mdcOptions.experimental.autoUnwrap" type="checkbox"> auto unwrap
    </label>
    <label for="componentCodeBlockProps">
      <input id="componentCodeBlockProps" v-model="mdcOptions.experimental.componentCodeBlockProps" type="checkbox">
      Component props code block style
    </label>
    <div class="flex">
      <textarea v-model="markdown" class="flex-1" />
      <pre class="flex-1">{{ ast }}</pre>
      <pre class="flex-1">{{ md }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const mdcOptions = ref({ experimental: { autoUnwrap: true, componentCodeBlockProps: false } })
const markdown = ref(`# Hello World

{{ $doc.name || 'Nuxt' }}

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
const ast = useMarkdownParser(markdown, mdcOptions)
const md = useMarkdownGenerator(ast, mdcOptions)
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
