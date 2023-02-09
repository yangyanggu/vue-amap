---
title: 简介
description: 简介
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 简介, 分包
---

# 简介

::: warning
@vuemap/vue-amap 2.0版本以作为默认版本存在，并且原1.0包拆分为三个组件库，灵活使用。
:::
---

## 为什么升级2.0

不管是0.x版本还是1.0版本，在开发初期都没有考虑后续扩展、包体积等问题，导致在扩展功能时，依赖包的安装越来越大，且在使用```initAMapApiLoader```加载高德地图JS文件时默认加载了loca库，这就导致页面初始化时等待时间会变长。
为了解决这几个核心问题，原``@vuemap/vue-amap``库被拆分为三个库，核心库保留原名，新增加``@vuemap/vue-amap-loca``库用于提供loca相关组件，增加``@vuemap/vue-amap-extra``提供扩展组件，主要用于提供扩展的threejs相关组件。


## 怎么从1.x升级到2.x

从1.x升级到2.x请看[升级文档]()

