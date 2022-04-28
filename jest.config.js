/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/tests/**',
    '!**/node_modules/**',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.ts'],
}

module.exports = config
