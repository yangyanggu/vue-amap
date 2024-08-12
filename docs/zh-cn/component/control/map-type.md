---
title: 地图类型切换
description: AMap.MapType地图类型切换插件。用户通过该插件进行地图切换
head:
  - - meta
    - name: keywords
      content: 地图类型切换, AMap.MapType, 卫星图, 矢量图, 路网图
---
# 地图类型切换插件 (AMap.MapType)
地图类型切换插件。用户通过该插件进行地图切换。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/control/map-type
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
defaultType | Number | 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
showTraffic  | Boolean | 叠加实时交通图层 默认值：false
showRoad | Boolean | 叠加路网图层 默认值：false
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否显示，默认true


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.MapType | 获取实例


## 事件

事件 | 参数 | 说明
---|---|---|
show | | 显示时触发此事件
hide | | 隐藏时触发此事件
