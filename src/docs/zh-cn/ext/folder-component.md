# 包装地图组件
``0.1.0版本``开始支持包装地图组件，可以将地图的子组件（el-amap以外的组件包含自定义组件）打包到一个组件中，根据自己的业务进行组件封装。

## 使用方法
创建一个vue组件，放入子组件

## 基础示例代码

创建``CustomLoca.vue``组件
```js
<template>
  <div>
    <el-amap-loca-line :source-url="sourceUrl" :layer-style="layerStyle"></el-amap-loca-line>
  </div>
</template>

<script>
var colors = ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'].reverse();
export default {
  name: "CustomLoca",
  data(){
    return {
      sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/bj_bus.json',
      layerStyle: {
        color: function (index) {
          var i = index % colors.length;
          return colors[i];
        },
        lineWidth: (index) => {
          var i = index % colors.length;
          return i * 0.1 + 2;
        },
        altitude: function (index) {
          var i = index % colors.length;
          return 100 * i;
        },
        // dashArray: [10, 5, 10, 0],
        dashArray: [10, 0, 10, 0],
      }
    }
  }
}
</script>

<style scoped>

</style>
```
地图加载代码
```js
<template>
  <div id="app">
    <el-amap :center="[116.335036, 39.900082]" :zoom="8">
      <el-amap-loca>
        <custom-loca/>
      </el-amap-loca>
    </el-amap>
    <test-root />
  </div>
</template>

<script>
import CustomLoca from './components/CustomLoca'

export default {
  name: 'App',
  components: {
    CustomLoca
  }
}
</script>

<style>
#app {
  height: 600px;
}
</style>
```


