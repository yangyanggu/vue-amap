# 自定义地图组件
``0.1.0版本``开始支持自定义地图组件，通过加载``registerMixin``实现自己的组件

## 使用方法
首先需要导入 ``registerMixin``，再methods中创建一个__initComponent方法，该方法是子组件被创建时调用，可以使用``parentInstance.$amapComponent``获取到上级组件的实例对象

## 基础示例代码

创建``test.vue``组件
```js
<template>
  <div>
  </div>
</template>

<script>
import {registerMixin} from "@vuemap/vue-amap";

export default {
  name: "test",
  mixins: [registerMixin],
  methods: {
    __initComponent(){
      let map = this.parentInstance.$amapComponent;
      let position = this.parentInstance.$amapComponent.getCenter();
      let marker = new AMap.Marker({
        position: position
      })
      map.add(marker);
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
      <test />
    </el-amap>
  </div>
</template>

<script>
import test from './components/test'

export default {
  name: 'App',
  components: {
    test
  }
}
</script>

<style>
#app {
  height: 600px;
}
</style>

```

### parentInstance的说明
``parentInstance``通过provide为所有子组件提供实例，parentInstance指向的是最近的一个提供【parentInstance】的vue组件，当前提供parentInstance的组件有以下几个

组件名称 | 说明
---|---|
el-amap | 地图组件，根组件存在，提供map实例
el-loca | Loca容器，所有loca图层的容器，loca图层必须放在el-loca内
el-amap-layer-labels | 标号图层，只可以放el-amap-label组件
el-amap-layer-vector | 矢量图层，只可以放矢量的子图层
el-amap-layer-three | 三维图层，只可以放el-amap-three-gltf组件


