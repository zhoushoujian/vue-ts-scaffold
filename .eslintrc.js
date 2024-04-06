module.exports = {
  extends: ['@szhou/eslint-config/vue.js', '@szhou/eslint-config/base.js', '@szhou/eslint-config/prettier.js'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      modules: true,
    },
    parser: '@typescript-eslint/parser',
    createDefaultProgram: true,
    extraFileExtensions: ['.vue'],
  },
  globals: {
    NodeJS: 'readonly',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {},
};
