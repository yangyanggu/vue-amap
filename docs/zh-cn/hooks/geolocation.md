---
title: 定位
description: AMap.Geolocation 定位服务插件。融合了浏览器定位、高精度IP定位、安卓定位sdk辅助定位等多种手段，提供了获取当前准确位置、获取当前城市信息、持续定位(浏览器定位)等功能
head:
  - - meta
    - name: keywords
      content: 定位, AMap.Geolocation, 精准定位Hooks
---
# 定位 (AMap.Geolocation)
AMap.Geolocation 定位服务插件。融合了浏览器定位、高精度IP定位、安卓定位sdk辅助定位等多种手段，提供了获取当前准确位置、获取当前城市信息、持续定位(浏览器定位)等功能。用户可以通过两种当时获得定位的成败和结果，一种是在 getCurrentPosition的时候传入回调函数来处理定位结果，一种是通过事件监听来取得定位结果。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/hooks/geolocation
:::

## 静态属性
定位hooks初始化参数

名称 | 类型      | 说明
---|---------|---|
enableHighAccuracy| boolean | 进行浏览器原生定位的时候是否尝试获取较高精度，可能影响定位效率，默认为false
convert | boolean | 是否将定位结果转换为高德坐标
timeout | number  | 定位的超时时间，毫秒
maximumAge | number  | 浏览器原生定位的缓存时间，毫秒
GeoLocationFirst | boolean  | 优先使用H5定位，默认移动端为true，PC端为false
noIpLocate | number  | 是否禁用IP精确定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用
getCityWhenFail | boolean  | 定位失败之后是否返回基本城市定位信息
needAddress | boolean  | 是否需要将定位结果进行逆地理编码操作
extensions | string  | 是否需要详细的逆地理编码信息，默认为'base'只返回基本信息，可选'all'

## 返回的函数
函数 | 返回                                   | 说明
---|--------------------------------------|---|
getCurrentPosition() | Promise\<CurrentPositionResult\> | 获取 用户的精确位置，有失败几率
getCityInfo() | Promise\<CurrentPositionResult\> | 根据用户 IP 获取 用户所在城市信息。

