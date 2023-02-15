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
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## Events

Event Name | Parameters | Description
---|---|---|
init |  | 实例初始化结束
