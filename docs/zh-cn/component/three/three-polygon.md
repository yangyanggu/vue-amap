---
title: ThreeJS面图层
description: gltf图层用于加载gltf模型，提供基础的模型加载和修改基础属性的能力
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 面图层, threeJS
---

# ThreeJS面图层
基于ThreeJS实现的面图层，支持顶部、底部、侧面颜色配置，侧面可以使用图片进行贴图，实现墙壁效果

::: tip
来源 ```@vuemap/vue-amap-extra``` 组件库
:::

## 基础示例

::: demo
examples/three/three-polygon
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
sideTopColor  | String | 侧面顶部颜色, 默认 #ffffff
sideBottomColor  | String | 侧面底部颜色,当顶部和底部颜色不一致时渐变 默认 #ffffff
sideTexture | String | 侧面贴图图片地址，侧面优先使用该属性,默认空 ，图片宽高必须是2的n次方，推荐使用512*512
topColor | String | 顶部颜色, 默认 #ffffff
bottomColor | String | 底部颜色, 默认 #ffffff
height | Number | 楼层高度，优先读取geojson数据中properties中的height，默认 30
depthTest | Boolean | 是否进行深度检测， 默认 true
source | Object | geojson数据，支持挖孔面

## 动态属性
支持响应式。

名称 | 类型                                         | 说明
---|--------------------------------------------|---|


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | ThreePolygon | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | ThreePolygon | 实例初始化结束

