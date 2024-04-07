module.exports = {
  extends: ['@szhou/eslint-config'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    createDefaultProgram: true,
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {},
};
