---
title: 3DTiles图层
description: 使用 AMap.3DTilesLayer 图层加载渲染标准 3D Tiles 数据，可支持 i3dm、b3dm、pnts 格式
head:
  - - meta
    - name: keywords
      content: 3D Tiles, AMap.3DTilesLayer
---

# 3DTiles图层 (AMap.3DTilesLayer)

::: warning
不再推荐使用，该官方插件缺少文档和更新，兼容性较差。<br/>推荐使用自定义实现的3dtiles组件，[文档地址](/zh-cn/component/three/three-tiles3d.html)
:::
使用 AMap.3DTilesLayer 图层加载渲染标准 3D Tiles 数据，可支持 i3dm、b3dm、pnts 格式。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::


## 基础示例

::: demo
examples/layer/data/tiles3d
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
url | String | 3d Tiles 入口文件
threeScriptUrl | String | ThreeJS的文件加载地址
threeGltfLoader | String | threeJS的GltfLoader文件加载地址
layerStyle | Object | 图层样式
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.3DTilesLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.3DTilesLayer | 实例初始化结束

