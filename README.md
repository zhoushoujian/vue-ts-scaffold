# Vue3 + typescript 脚手架

如果你的系统从没运行过这个命令：请运行git config --global core.autocrlf false

## 技术栈

vue3 + vue-router4 + pinia + typescript + webpack5(vite5) + element-plus + eslint + husky  + qiankun子应用  

默认使用webpack，可选用vite开发  

## 基础搭建

在这里我们使用的是 [pnpm](https://pnpm.io/zh/) 来作为本项目的包管理工具。

```bash
# 安装依赖
pnpm i

# 运行
pnpm start

# 打包
pnpm build

# vite
pnpm vite
```

> 本人开发环境
>
> node v16.20.0
>
> pnpm v7.32.0

## 第三方工具包介绍

1. `element-plus`: element-ui对应的vue3版本，提供的样板代码vue3组合式加ts，开发vue3过程中，推荐使用组合式开发
2. `pinia`: vue官方推荐的全局状态库，官方的原话是：`由于 Pinia 在生态系统中能够承担相同的职责且能做得更好，因此 Vuex 现在处于维护模式。它仍然可以工作，但不再接受新的功能。对于新的应用，建议使用 Pinia。`,所以推荐使用pinia，参考链接：https://cn.vuejs.org/guide/scaling-up/state-management.html#pinia。如果不是模块之前需要通信的状态或者需要透传多层级的状态，不建议将普通的局部状态放pinia里。
3. `@szhou/eslint-config`: 一整套eslint配置，已包含通用的eslint配置和规则

## 最佳实践

1. 文件和文件夹全部使用小写加中划线，避免因为大小写错误导致构建失败和git提交问题
2. 禁用eslint规则要慎重，不随意禁用规则
3. 不再使用的文件和变量要及时删除
4. 默认的文件格式化工具使用Prettier Eslint
5. 局部的，不复用的状态不要存全局状态，存在当前的vue状态里即可
6. 可复用的基础组件写在src/components文件夹下，不复用的基础组件写在各自业务文件夹的components文件夹下
7. 推荐使用组合式开发vue3
8. 定义的类型推荐使用I开头或者T开头，以区别类型和函数变量

## 脚手架通用能力
1. eslint相关配置全家桶
2. husky,lint-stage,commitlint相关的git提交钩子
3. typescript相关配置
4. webpack5,vite等构建工具相关的配置（包含polyfill,热更新,前端代理,css module等）
5. vue,vue-router框架全家桶环境搭建
6. webpack，vite和eslint已全部配置成支持jsx写法

## 目录结构

```tree
├── src                        // 源代码
│   ├── assets                 // 静态资源,图片、svg等
│   ├── components             // 全局公用组件，一般是比较通用的基础组件
│   ├── layouts                // 全局布局
│   ├── routers                // 路由配置
│   ├── services               // 请求接口
│   ├── stores                 // 全局状态
│   ├── styles                 // 全局样式
│   ├── utils                  // 工具类
│   ├── views                  // 视图类
```

