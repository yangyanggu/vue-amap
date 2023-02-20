---
title: Loca
description: Loca图层的外部容器
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, loca
---

# Loca
Loca图层的外部容器

## 基础示例

::: demo
examples/loca/loca
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型      | 说明
---|---------|---|
eventOptions | Object `{hitFirst: true}` | 事件属性，hitFirst是设置是否在选择到第一个要素后停止选择，用于事件数据选取，默认true
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Loca | 获取实例

## 事件

事件 | 参数                 | 说明
---|--------------------|---|
init | Loca               | 实例
click | \[Feature\], event | 当点击到标号时返回对应的feature数组，无数据时返回空数组
mousemove | \[Feature\], event     | 当鼠标移动滑过标号时返回对应的feature数组，无数据时返回空数组
rightclick | \[Feature\], event     | 鼠标右击时返回对应的feature数组，无数据时返回空数组
