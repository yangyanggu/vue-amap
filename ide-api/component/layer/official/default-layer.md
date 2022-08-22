---
title: AmapLayerDefault
---

# AmapLayerDefault

## Attributes

Attribute | Type | Description
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否可见，默认为true。
zIndex | Number | 默认zIndex：0
opacity | Number | 透明度
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

## Events

Event Name | Parameters | Description
---|---|---|
init |  | 实例初始化结束
