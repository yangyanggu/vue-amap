---
title: 3DTiles图层
description: 使用 AMap.3DTilesLayer 图层加载渲染标准 3D Tiles 数据，可支持 i3dm、b3dm、pnts 格式
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 3D Tiles, AMap.3DTilesLayer
---

# 3DTiles图层 (AMap.3DTilesLayer)
使用 AMap.3DTilesLayer 图层加载渲染标准 3D Tiles 数据，可支持 i3dm、b3dm、pnts 格式。

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

