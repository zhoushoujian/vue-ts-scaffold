module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposals: true,
        },
        loose: false,
        debug: false,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime', //优化包体积大小，会暴露到全局方法的原型上，但不能暴露全局关键字，如await，??
  ],
};
