---
title: 天气查询服务
description: AMap.Weather 天气查询服务
head:
  - - meta
    - name: keywords
      content: 天气查询服务,天气查询Hooks, AMap.Weather
---
# 天气查询插件 (AMap.Weather)
天气查询服务（AMAP.Weather）是 LBS 基础服务之一，地图 JS API 提供了两种查询服务：

* 实时天气
* 天气预报

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/hooks/weather
:::

## 返回的函数
函数 | 返回                                   | 说明
---|--------------------------------------|---|
getLive() | Promise\<WeatherLiveResult\> | 通过城市名称、区域编码（如杭州市、330100），查询目标城市/区域的实时天气状况
getForecast() | Promise\<WeatherForecastResult\> | 通过城市名称、区域编码（如北京市、110000），查询目标城市/区域的天气预报状况。

