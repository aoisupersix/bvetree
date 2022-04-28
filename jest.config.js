/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/*/src/**/*.ts',
    '!**/tests/**',
    '!**/node_modules/**',
  ],
  projects: [
    {
      testMatch: ['<rootDir>/packages/bvetree-parser/src/tests/**/*.test.ts'],
      displayName: { name: '@bvetree/parser', color: 'blue' },
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/packages/bvetree-parser/tsconfig.json',
        },
      },
    },
  ],
}

module.exports = config
