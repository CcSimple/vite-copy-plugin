<!--
 * @Author: Cc-Mac 840054486@qq.com
 * @Date: 2022-07-07 16:40:03
 * @LastEditors: Cc-Mac 840054486@qq.com
 * @LastEditTime: 2022-07-07 16:49:14
 * @FilePath: /svelte-hiprint/packages/vite-copy-plugin/README.md
-->
# vite-copy-plugin

> 试了几个资源复制插件，不是没用就是不合适，于是便有了此插件

## 安装

```
npm i vite-copy-plugin
```

## 使用

```javascript

import CopyPlugin from "vite-copy-plugin";

// vite 配置
export default defineConfig({
  plugins: [
    CopyPlugin([
      // 目录复制
      {from: 'src/static', to: 'dist/static'},
      // 文件复制到目录(空及取vite配置的build.outDir 默认 dist)
      {from: 'src/static/style.css', to: ''}, 
      // 文件复制文件
      {from: 'src/static/style.css', to: 'dist/index.css'}, 
    ])
  ],
});
