---
title: 获取高德地图实例
description: vue-amap获取高德地图实例可以通过init事件或者通过ref调用地图组件的$$getInstance方法获取实例，同时提供了普通示例和setup示例
head:
  - - meta
    - name: keywords
      content: 获取地图实例, init事件, ref, 地图ts类型
---
# 地图

获取地图实例方式有两种：<br/>
1、通过init事件<br/>
2、通过ref获取地图组件对象，然后调用$$getInstance方法<br/>

详细使用请查看下面的示例，可以在控制台看出打印效果

## 基础示例

### 普通示例
::: demo
examples/amap/get-instance
:::

### Setup示例
::: demo
examples/amap/get-instance-setup
:::
