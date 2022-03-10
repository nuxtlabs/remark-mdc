// Measure the number of character codes in chunks.
// Counts tabs based on their expanded size, and CR+LF as one character.
export function sizeChunks (chunks: any[]) {
  let index = -1
  let size = 0

  while (++index < chunks.length) {
    size += typeof chunks[index] === 'string' ? chunks[index].length : 1
  }

  return size
}

export function prefixSize (events: any, type: string) {
  const tail = events[events.length - 1]
  if (!tail || tail[1].type !== type) { return 0 }
  return sizeChunks(tail[2].sliceStream(tail[1]))
}

/**
 * Calculate line indention size, line indention could be consists of multiple `linePrefix` events
 * @param events parser tokens
 * @returns line indention size
 */
export function linePrefixSize (events: any[]) {
  let size = 0
  let index = events.length - 1
  let tail = events[index]
  while (index >= 0 && tail && tail[1].type === 'linePrefix' && tail[0] === 'exit') {
    size += sizeChunks(tail[2].sliceStream(tail[1]))
    index -= 1
    tail = events[index]
  }

  return size
}
