---
title: 安装
---

# 安装

---

## npm 安装

推荐 npm 安装。

```
npm install @vuemap/vue-amap --save
```

## CDN

目前可通过 [unpkg.com/@vuemap/vue-amap](https://unpkg.com/@vuemap/vue-amap/dist/index.js) 获取最新版本的资源。

```html
<script src="https://unpkg.com/@vuemap/vue-amap/dist/index.js"></script>
<!--加载自定义threeJS组件-->
<script src="https://unpkg.com/@vuemap/vue-amap/dist/three.js"></script>
<script src="https://unpkg.com/@vuemap/vue-amap/dist/style.css"></script>
```

## Hello World

通过 CDN 的方式我们可以很容易地使用 vue-amap 写出一个 Hello world 页面。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>demo | vue-amap</title>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="app">
      <el-amap vid="amap"></el-amap>
    </div>
  </body>
  <!-- 先引入 Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/@vuemap/vue-amap/dist/index.js"></script>
  <!--加载自定义threeJS组件-->
  <script src="https://unpkg.com/@vuemap/vue-amap/dist/three.js"></script>
  <script src="https://unpkg.com/@vuemap/vue-amap/dist/style.css"></script>
  <script>
    // 初始化高德地图的 key 和插件
    window.VueAMap.initAMapApiLoader({
      key: 'YOUR_KEY',
    });

    new Vue({
      el: '#app',
      data: function(){
        return { }
      }
    });
  </script>
</html>
```
