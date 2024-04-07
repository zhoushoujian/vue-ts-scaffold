# Vue 2 + typescript 脚手架

如果你的系统从没运行过这个命令：请运行git config --global core.autocrlf false

## 技术栈

vue2 + vue-router3  + typescript + webpack5(vite4) + element-ui + eslint + husky  + qiankun主应用  
默认使用webpack，可选用vite开发

## 基础搭建

在这里我们使用的是 [pnpm](https://pnpm.io/zh/) 来作为本项目的包管理工具。

```bash
# 安装依赖
pnpm i

# 运行
pnpm run dev

# 打包
pnpm run build

# 打包文件预览
pnpm run preview
```

> 本人开发环境
>
> node v16.20.0
>
> pnpm v7.32.0

## 说明

1. webpack构建支持ie 11，不要随意改动webpack配置文件
2. 支持qiankun微前端，提供微前端基座能力，可作为微前端子应用，微前端子应用应该使用vue3脚手架
3. 支持vue3的组合式api写法，见页面：`src\views\login\index.vue`
