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
    "^#/([a-zA-Z0-9\-])/(.+)": "<rootDir>/packages/@bvetree/$1/src/$2"
  },
};
