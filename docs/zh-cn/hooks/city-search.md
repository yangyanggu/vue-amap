---
title: IP定位获取当前城市信息
description: AMap.CitySearch 根据IP定位获取当前城市信息
head:
  - - meta
    - name: keywords
      content: 城市定位, AMap.CitySearch, 城市定位Hooks
---
# IP定位插件 (AMap.CitySearch)
如果不需要获取精确的位置，只需要城市级别的定位信息，推荐使用AMap.CitySearch插件，AMap.CitySearch插件获取所在城市相比通过浏览器定位的方式也更快捷.

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/hooks/city-search
:::

## 返回的函数
函数 | 返回                                   | 说明
---|--------------------------------------|---|
getLocalCity() | Promise\<CitySearchLocalCityResult\> | 获取当前城市定位信息

