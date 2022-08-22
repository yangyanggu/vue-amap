---
title: AmapLayerVector
---

# AmapLayerVector
矢量标记图层。

## Attributes

Attribute | Type | Description
---|---|---|
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.VectorLayer | 实例初始化结束
