const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Jestの初期設定
  testEnvironment: 'jest-environment-jsdom', // JSDOM環境で実行
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Babelでトランスパイル
  },
};

module.exports = createJestConfig(customJestConfig);
