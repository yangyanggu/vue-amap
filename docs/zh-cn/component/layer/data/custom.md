---
title: 自定义图层
description: AMap.CustomLayer 自定义图层是一种完全由开发者来指定绘制方法的图层
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 自定义图层, AMap.CustomLayer
---

# 自定义图层 (AMap.CustomLayer)
自定义图层是一种完全由开发者来指定绘制方法的图层

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/data/custom
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
canvas  | HTMLElement | canvas 对象,必填
render | Function | 绘制函数，初始化完成时候，开发者需要给该图层设定render方法，该方法需要实现图层的绘制，API会在合适的时机自动调用该方法
alwaysRender | Boolean | 是否主动，默认 false
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.CustomLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.CustomLayer | 实例初始化结束

