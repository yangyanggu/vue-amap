---
title: 地图操作工具
description: AMap.ToolBar地图操作工具条插件。可支持视野级别缩放等操作。继承自 AMap.Control
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 地图操作工具, AMap.ToolBar
---
# 地图操作工具条插件 (AMap.ToolBar)
地图操作工具条插件。可支持方向导航、位置定位、视野级别缩放、视野级别选择等操作。继承自 AMap.Control

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/control/toolbar
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
position| String, Object | 控件停靠位置 { top: 5; left: 5; right: 5; bottom: 5 } 或者 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
offset | String | 地图默认鼠标样式。参数defaultCursor应符合CSS的cursor属性规范。

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否显示，默认true


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.ToolBar | 获取实例


## 事件

事件 | 参数 | 说明
---|---|---|
show | | 显示时触发此事件
hide | | 隐藏时触发此事件
