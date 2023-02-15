---
title: 建筑楼块3D图层
description: 使用 AMap.Buildings 建筑楼块3D图层,添加独立的楼块图层，楼块图层同样接收自定义样式
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 建筑楼块3D图层, AMap.Buildings
---

# 建筑楼块3D图层 (AMap.Buildings)
建筑楼块 3D 图层。

::: tip
来源 ```@vuemap/vue-amap``` 组件库
:::

## 基础示例

::: demo
examples/layer/official/buildings
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
wallColor | Array,String | 楼块侧面颜色，支持 rgba、rgb、十六进制等
roofColor | Array,String | 楼块顶面颜色，支持 rgba、rgb、十六进制等
heightFactor | Number | 楼块的高度系数因子，默认为 1，也就是正常高度
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
styleOpts | Object(BuildingStyleOptions) | 楼块的围栏和样式设置
zooms | Array | 图层缩放等级范围，默认 [2, 20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

### BuildingStyleOptions 楼块的围栏和样式设置

名称 | 类型            | 说明
---|---------------|---|
hideWithoutStyle | Boolean       | 是否隐藏围栏之外的楼块
areas | Array\<Area\> | 围栏信息数组,围栏信息对象为下面的Area对象

#### Area 围栏信息对象

名称 | 类型 | 说明
---|---|---|
rejectTexture | Boolean | 是否屏蔽自定义地图的纹理
visible | Boolean | 是否可见
path | Array | 围栏路径的经纬度列表
color1 | String | 围栏区域内楼块顶面颜色，支持 rgba、rgb、十六进制等
color2 | String | 围栏区域内楼块侧面颜色，支持 rgba、rgb、十六进制等

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.Buildings | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.Buildings | 实例初始化结束
complete |  | 图块切片加载完成事件
