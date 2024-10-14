const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // プロジェクトのルートを指定
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Jestの初期設定
  testEnvironment: 'jsdom', // テスト環境をブラウザに設定
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Babelでファイルをトランスパイル
  },
};

module.exports = createJestConfig(customJestConfig);
