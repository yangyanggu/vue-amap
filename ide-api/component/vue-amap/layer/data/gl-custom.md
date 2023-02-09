---
title: AmapLayerGlCustom
---

# AmapLayerGlCustom
3d 自定义图层

## Attributes

Attribute | Type | Description
---|---|---|
init  | Function | 初始化的时候，开发者可以在这个函数参数里面获取 gl 上下文，进行一些初始化的操作。
render | Function | 绘制函数，初始化完成时候，开发者需要给该图层设定render方法，该方法需要实现图层的绘制，API会在合适的时机自动调用该方法
zooms | Array | 支持的缩放级别范围，默认范围 [2-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1
reEventWhenUpdate | Boolean | 是否在组件更新时重新注册事件，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

## Events

Event Name | Parameters | Description
---|---|---|
init | AMap.GLCustomLayer | 实例初始化结束

