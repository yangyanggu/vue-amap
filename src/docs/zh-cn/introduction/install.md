# 安装

---

## npm 安装

推荐 npm 安装。

```
npm install @vuemap/vue-amap@legacy --save
```

## CDN

目前可通过 [https://www.jsdelivr.com/package/npm/@vuemap/vue-amap](https://cdn.jsdelivr.net/npm/@vuemap/vue-amap@legacy/dist/index.js) 获取Vue2版本最新版本的资源。

```html
<script src="https://cdn.jsdelivr.net/npm/@vuemap/vue-amap@legacy/dist/index.js"></script>
<!--加载自定义threeJS组件-->
<script src="https://cdn.jsdelivr.net/npm/@vuemap/vue-amap@legacy/dist/three.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@vuemap/vue-amap@legacy/dist/style.css"></script>
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
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <!-- 引入组件库 -->
  <script src="https://cdn.jsdelivr.net/npm/@vuemap/vue-amap@legacy/dist/index.js"></script>
  <!--加载自定义threeJS组件-->
  <script src="https://cdn.jsdelivr.net/npm/@vuemap/vue-amap@legacy/dist/three.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@vuemap/vue-amap@legacy/dist/style.css"></script>
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
