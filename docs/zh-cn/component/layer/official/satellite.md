---
title: 卫星图层
description: AMap.TileLayer.Satellite 卫星影像图层
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 卫星图层, AMap.TileLayer.Satellite
---

# 卫星图层 (AMap.TileLayer.Satellite)
卫星图层类，继承自TileLayer。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/official/satellite
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
tileSize | Number | 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.TileLayer.Satellite | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.TileLayer.Satellite | 实例初始化结束
complete |  | 图块切片加载完成事件

