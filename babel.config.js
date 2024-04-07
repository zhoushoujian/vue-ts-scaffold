module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,
      },
    ],
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: {
          version: 3,
          proposals: true,
        },
        targets: {
          chrome: '58',
          ie: '11',
        },
        loose: true, //支持IE需要设置为true
        debug: false,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime', //优化包体积大小，会暴露到全局方法的原型上，但不能暴露全局关键字，如await，??
    ['@babel/plugin-transform-private-property-in-object', { loose: false }],
    ['@babel/plugin-transform-private-methods', { loose: false }],
    ['@babel/plugin-transform-class-properties', { loose: false }],
  ],
};
