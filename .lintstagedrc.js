module.exports = {
  'src/**/*.{vue,ts,js}': ["eslint --rule \"'no-console':'error'\""],
  'src/**/*.{ts,vue}': () => 'vue-tsc --noEmit',
};
