/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/tests/**', '!**/node_modules/**'],
  testMatch: ['<rootDir>/src/**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@$': '<rootDir>/src',
    '^@/(.+)$': '<rootDir>/src/$1',
  },
}

module.exports = config
