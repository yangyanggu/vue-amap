---
title: 自定义地图组件
description: 通过RegisterMixin或者useRegister自定义自己的地图组件
head:
  - - meta
    - name: keywords
      content: 自定义地图组件, RegisterMixin, useRegister
---

# 自定义地图组件
``1.1.2版本``开始支持自定义地图组件，通过加载``registerMixin``(选项式API)实现自己的组件，``2.1.0``版本开始支持通过``useRegister``(组合式API)来实现自定义组件。

## 1、选项式API <Badge text="1.1.2+" />

### 1.1使用方法
首先需要导入 ``registerMixin``，再methods中创建一个__initComponent方法，该方法是子组件被创建时调用，可以使用``parentInstance.$amapComponent``获取到上级组件的实例对象

### 1.2基础示例代码

创建``test.vue``组件
```vue
<template>
  <div>
  </div>
</template>

<script>
import {registerMixin} from "@vuemap/vue-amap";
import {defineComponent} from "vue";

export default defineComponent({
  name: "test",
  mixins: [registerMixin],
  methods: {
    __initComponent(){
      console.log('this.parentInstance: ', this.parentInstance);
      let map = this.parentInstance.$amapComponent;
      let position = this.parentInstance.$amapComponent.getCenter();
      let marker = new AMap.Marker({
        position: position
      })
      map.add(marker);
    }
  }
})
</script>
```
地图加载代码
```vue
<template>
  <div id="app">
    <el-amap :center="[116.335036, 39.900082]" :zoom="8">
      <test />
    </el-amap>
  </div>
</template>

<script>
import test from './components/test.vue'
import {defineComponent} from "vue";
export default defineComponent({
  name: 'App',
  components: {
    test
  },
})
</script>

<style>
#app {
  height: 600px;
}
</style>
```

#### parentInstance的说明
``parentInstance``通过provide为所有子组件提供实例，parentInstance指向的是最近的一个提供【parentInstance】的vue组件，当前提供parentInstance的组件有以下几个

| 组件名称                 | 说明                                    |
|----------------------|---------------------------------------|
| el-amap              | 地图组件，根组件存在，提供map实例                    |
| el-loca              | Loca容器，所有loca图层的容器，loca图层必须放在el-loca内 |
| el-amap-layer-labels | 标号图层，只可以放el-amap-label组件              |
| el-amap-layer-vector | 矢量图层，只可以放矢量的子图层                       |
| el-amap-layer-three  | 三维图层，只可以放el-amap-three-gltf组件         |

## 2、组合式API <Badge text="2.1.0+" />

### 2.1使用方法
首先需要导入 ``useRegister``，``useRegister``的第一个参数是创建高德地图组件实例的回调方法，有两个参数，一个是props定义的所有属性和其对应的值，另一个是上级父组件的高德地图实例。
``useRegister``的第二个参数是一个`TInitComponentProps`类型，具体参数说明见下表。
`useRegister`会返回一个对象，包含两个属性，一个是`$$getInstance`用于获取高德SDK的实例，这个可以通过`defineExpose`开放出去，第二个是`parentInstance`，是上级的vue组件实例，可以获取常用的属性。

### 2.2基础示例代码

创建``CustomMarker.vue``组件
```vue
<script setup lang="ts">
  import {useRegister} from '@vuemap/vue-amap'

  defineProps({
    position: {
      type: Array,
      required: true
    }
  })

  const emits = defineEmits(['init'])
  let $amapComponent: AMap.Marker

  const {$$getInstance, parentInstance} = useRegister<AMap.Marker, any>((options, parentComponent) => {
    return new Promise<AMap.Marker>((resolve) => {
      $amapComponent = new AMap.Marker(options);
      parentComponent.add($amapComponent)
      resolve($amapComponent)
    })
  }, {
    emits,
    destroyComponent () {
      if ($amapComponent && parentInstance?.$amapComponent) {
        $amapComponent.setMap(null);
        $amapComponent = null as any;
      }
    },
  })

  defineExpose({
    $$getInstance
  })
</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
```
地图加载代码
```vue
<script setup lang="ts">
  import {ref} from 'vue'
  import {ElAmap} from "@vuemap/vue-amap";
  import CustomMarker from "./components/CustomMarker.vue";

  const center = ref([120, 31]);
</script>

<template>
  <div style="height: 600px">
    <el-amap :center="center">
      <custom-marker :position="center"></custom-marker>
    </el-amap>
  </div>
</template>

<style scoped>
</style>

```

#### TInitComponentProps参数说明

| 参数名称             | 说明                                                                                                                                                                                               |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| propsRedirect    | 属性名称重定向，有些高德SDK的属性名会与vue默认的prop名称冲突，比如`style`，这时候就需要自己定义一个新的名称，并传入`propsRedirect`修改为高德SDK需要的名称。示例： `{ styles: 'style'}`                                                                          |
| emits            | defineEmits返回的值，一般至少需要一个init的事件                                                                                                                                                                  |
| converts         | 将props属性的值转化为高德需要的值，这个一般用于将经纬度转化为`AMap.Lnglat`等等，示例：{bounds: (path) => { return new AMap.Bounds(convertHelper.toLngLat(path[0]), convertHelper.toLngLat(path[1])); }}                            |
| watchRedirectFn  | 重写对props属性变化监听的方法，默认情况下组件内部会查找高德SDK里属性的set方法，比如`position`会查找`setPosition`，但有些时候我们需要修改这个默认行为，那么就需要传入props名称，前面加上两个下划线，比如：{__position: () => { xxxx}}，这样组件内部就不会再去找`setPosition`，而是直接使用`__position` |
 | destroyComponent | 在销毁组件时需要调用的方法，一般用于从父级中移除对象，比如从高德SDK的地图实例中移除 marker的实例                                                                                                                                            | 