module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    'react/prop-types': 0,
    'no-use-before-define': 0, // so we can put styles below
    'no-console': 0, // when in rome, stays in rome
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
