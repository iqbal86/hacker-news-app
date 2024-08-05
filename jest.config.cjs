module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testTimeout: 50 * 1000,
  testPathIgnorePatterns: ['./e2e'],
  coveragePathIgnorePatterns: ['ApiProvider.tsx'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|css|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test/mocks/fileMock.ts',
  },
}
