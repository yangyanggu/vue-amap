---
title: 切片图层
description: AMap.TileLayer 切片图层类，该类为基础类
head:
  - - meta
    - name: keywords
      content: 切片图层, AMap.TileLayer
---

# 切片图层 (AMap.TileLayer)
切片图层类，该类为基础类。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/official/tile
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
dataZooms | Array | 支持的缩放级别范围，默认范围 [2-30]
tileSize | Number | 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
tileUrl | String | 切片取图地址 如：' https://abc{0,1,2,3}.amap.com/tile?x=[x]&y=[y]&z=[z] ' [x] 、 [y] 、 [z] 分别替代切片的xyz。
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.TileLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.TileLayer | 实例初始化结束
complete |  | 图块切片加载完成事件

