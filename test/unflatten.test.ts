import { describe, test, expect } from 'vitest'
import { unflatten } from '../src/utils'

describe('unflatten', () => {
  test('should able to escape dot', () => {
    expect(unflatten({
      key1: 1,
      'key2.subkey': 2,
      'key3\\.subkeys': 3,
      'key4\\\\.subkeys': 4,
      'key5\\..\\.subkeys': 5,
      'key6\\\\.\\.subkeys': 6
    })).toMatchInlineSnapshot(`
      {
        "key1": 1,
        "key2": {
          "subkey": 2,
        },
        "key3.subkeys": 3,
        "key4\\": {
          "subkeys": 4,
        },
        "key5.": {
          ".subkeys": 5,
        },
        "key6\\": {
          ".subkeys": 6,
        },
      }
    `)
  })
})
