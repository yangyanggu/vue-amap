---
title: 默认图层
---

# 默认图层 (AMap.createDefaultLayer)

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/official/default
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否可见，默认为true。
zIndex | Number | 默认zIndex：0
opacity | Number | 透明度

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|


## 事件

事件 | 参数 | 说明
---|---|---|
init |  | 实例初始化结束
