module.exports = {
  preset: '@nuxt/test-utils',
  transform: {
    '^.+\\.mjs$': 'babel-jest'
  },

  setupFilesAfterEnv: ['./test/utils/setup-env'],

  moduleNameMapper: {},
  collectCoverageFrom: ['src/**', '!src/types/**'],
  transformIgnorePatterns: ['node_modules/(?!unified|bail)/.*']
}
