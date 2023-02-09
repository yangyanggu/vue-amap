---
title: AmapLayerTiles3d
---

# AmapLayerTiles3d
使用 AMap.3DTilesLayer 图层加载渲染标准 3D Tiles 数据，可支持 i3dm、b3dm、pnts 格式

## Attributes

Attribute | Type | Description
---|---|---|
url | String | 3d Tiles 入口文件
threeScriptUrl | String | ThreeJS的文件加载地址
threeGltfLoader | String | threeJS的GltfLoader文件加载地址
layerStyle | Object | 图层样式
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.3DTilesLayer | 实例初始化结束

