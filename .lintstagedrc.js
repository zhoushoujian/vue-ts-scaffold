module.exports = {
  'src/**/*.vue': ['prettier --write', 'eslint --fix'],
  'src/**/*.{ts,vue}': () => 'tsc --noEmit',
};
