---
title: 矢量标记图层
description: 使用 AMap.VectorLayer 矢量图层，可以将点线面统一管理
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 矢量标记图层, AMap.VectorLayer
---

# 矢量标记图层 (AMap.VectorLayer)
矢量标记图层。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/data/vector
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.VectorLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.VectorLayer | 实例初始化结束
