module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.ts",
    "!**/tests/**",
    "!**/node_modules/**"
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: [
    '**/tests/**/*.test.ts'
  ],
  moduleNameMapper: {
    "^#/(.+)": "<rootDir>/src/$1"
  },
};
