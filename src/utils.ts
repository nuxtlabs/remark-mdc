export const CONTAINER_NODE_TYPES = new Set([
  'componentContainerSection',
  'containerComponent',
  'leafComponent'
])

export const NON_UNWRAPPABLE_TYPES = new Set([
  'componentContainerSection',
  'componentContainerDataSection',
  'containerComponent',
  'leafComponent',
  'table',
  'pre',
  'code',
  'textComponent'
])
