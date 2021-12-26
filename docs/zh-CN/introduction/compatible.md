---
title: 兼容高德原生 SDK
---

# 兼容高德原生 SDK

---

`vue-amap` 能够抛开高德原生 SDK 覆盖大多数场景，但对于部分定制化程度较高的场景而言，可能还是需要引入高德原生 SDK 来支持。这章将介绍如何在 vue-amap 中使用高德 SDK。


## 实例方式

对于大多数 `vue-amap` 组件，都有 `init` 这个 `event`，参数为高德的实例，通过这样暴露高德实例的方式，开发者能够非常自由地将原生 SDK 和 vue-amap 结合起来使用。


*若涉及到高德原生 `AMap` 需要注意的点：*

* 确保 `vue-amap` 的导入名不是 `AMap`，推荐 `import VueAMap from '@vuemap/vue-amap'` 避免和高德全局的 `AMap` 冲突。
* 若 `eslint` 报错 `AMap is undefined` 之类的错误。请将 `AMap` 配置到 `.eslintrc` 的 `globals` 中。

::: demo You can set `offset` attribute to change the offset top，the default value is 0。

amap/basic

:::
