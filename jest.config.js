const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Next.js のルートディレクトリ
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
