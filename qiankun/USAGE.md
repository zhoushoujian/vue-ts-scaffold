# qiankun的使用及工作原理

本篇文档介绍qiankun微前端的使用和工作原理，同时介绍基于webpack5和vite的qiankun配置  

## 使用

### 主应用

#### webpack5

1. `output`字段里要指定`publicPath`值，该值为项目的服务名，如/portal/  
2. `dev-server`里要指定`historyApiFallback`为true  

#### vite

1. 在`vite.config.ts`的base里配置服务名

#### src

1. 在`router`里指定路由前缀  
2. 在`micro-app.vue`文件里加载子应用，`qiankun.registerMicroApps` => `qiankun.start`  

### 子应用

#### webpack5

1. `output`字段里要指定`publicPath`，`library`，`libraryTarget`，`chunkLoadingGlobal`和`globalObject`  
2. `dev-server`里要指定`historyApiFallback`为`true`  
3. `dev-server`里的`proxy`代理主应用静态文件的请求  
4. 在`main.ts`里添加`qiankun`的三个生命周期钩子  

#### vite

1. 安装`vite-plugin-qiankun`,并在`vite.config.ts`的`plugins`里添加  
2. 在`vite.config.ts`里的`server`的`proxy`代理主应用静态文件的请求  
3. 在`main.ts`里添加`vite-plugin-qiankun`导出的三个`qiankun`生命周期钩子  
4. 在`vite.config.ts`的base里配置服务名

#### src

1. 在`router`里指定路由前缀，注意：这里的路由前缀要包含主应用的路由前缀  

## 工作原理

### 开发环境

基于前端代理服务器进行子应用请求转发  

1. 调试子应用项目，由于子应用请求的url包含主应用路由，所以会被前端代理服务器拦截，并转发到主应用，所以会先加载主应用的静态文件和api请求  
2. 主应用匹配到子应用的路由，于是发送请求，加载子应用的静态资源  
3. 加载子应用发送的第一个请求是请求子应用的html，html里包含js，于是便请求子应用的js  
4. 由于子应用的js等静态文件路径包含子应用的路由服务名前缀，所以会被前端代理服务器拦截，并转发到子应用自己的项目里  
5. 子应用请求自己的api等相关业务，微前端启动成功  


### 生产环境

基于nginx的docker镜像打包发布，基于nginx进行子应用请求转发

1. 在生产环境上访问子应用，由于在nginx上部署了拦截主应用路由和子应用路由的location，所以浏览器的第一个请求会被转发到主应用  
2. 主应用开始加载js等静态文件，主应用匹配到子应用的路由，于是发送请求，加载子应用的静态资源  
3. 加载子应用发送的第一个请求是请求子应用的html，html里包含js，于是便请求子应用的js  
4. 由于子应用的js等静态文件路径包含子应用的路由服务名前缀，所以会被nginx服务器的location匹配到，并转发到子应用的nginx  
5. 子应用请求自己的api等相关业务，微前端启动成功

### 注意

#### 请区别路由前缀和路由服务名前缀：  
前者是用于匹配浏览器url上的路径，用于命中vue-router里的路由；  
后者是用于在xhr加载静态文件时添加的请求前缀，用于区别不同的项目及服务，在生产环境上，需要将服务名前缀rewrite，因为该前缀是虚拟路径  

### 总结

开发环境走前端代理服务器，生产环境走nginx，两者实现原理的主要区别在第一步和第四步  
