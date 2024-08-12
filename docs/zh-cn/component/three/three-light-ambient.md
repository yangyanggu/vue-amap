---
title: 环境光
description: 环境光会均匀的照亮场景中的所有物体
head:
  - - meta
    - name: keywords
      content: AmbientLight, 环境光
---

# 环境光
环境光会均匀的照亮场景中的所有物体

::: tip
来源 ```@vuemap/vue-amap-extra``` 组件库
:::

## 基础示例

::: demo
examples/three/three-gltf
:::


## 动态属性
支持响应式。

名称 | 类型                                         | 说明
---|--------------------------------------------|---|
color | String                                     | 环境光颜色，可以是rgba，或者red之类的,默认#ffffff
intensity | Number                              | 光照的强度。缺省值为 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回    | 说明
---|-------|---|
$$getInstance() | AmbientLight | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AmbientLight | 实例初始化结束

