---
title: POI搜索
description: AMap.AutoComplete用于进行 POI 搜索联想与数据查询的相关类型,提供默认的功能
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 搜索, AMap.AutoComplete
---

# 搜索 (AMap.AutoComplete)
用于进行 POI 搜索联想与数据查询的相关类型

## 基础示例

::: demo
examples/control/search-box
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
datatype | String | 返回的数据类型。可选值：all-返回所有数据类型、poi-返回POI数据类型、bus-返回公交站点数据类型、busline-返回公交线路数据类型目前暂时不支持多种类型
inputId | String | 可选参数，用来指定一个input输入框，设定之后，在input输入文字将自动生成下拉选择列表。输入框DOM对象的id值
outputId | String | 可选参数，指定一个现有的div的id或者元素，作为展示提示结果的容器，当指定了input的时候有效，缺省的时候将自动创建一个显示结果面板
outPutDirAuto | Boolean | 默认为true，表示是否在input位于页面较下方的时候自动将输入面板显示在input上方以避免被遮挡
closeResultOnScroll | Boolean | 页面滚动时关闭搜索结果列表，默认 true
lang | String | 设置检索语言类型，默认中文 'zh_cn'
inputCustom | Boolean | 是否自定义input，自定义的时候将使用用户的inputId，默认 false

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否显示，默认true
type | String | 输入提示时限定POI类型，多个类型用“|”分隔，目前只支持Poi类型编码如“050000” 默认值：所有类别
city | String | 输入提示时限定城市。可选值：城市名（中文或中文全拼）、citycode、adcode；默认值：“全国”
citylimit | Boolean | 是否强制限制在设置的城市内搜索,默认值为：false，true：强制限制设定城市，false：不强制限制设定城市


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.AutoComplete | 获取实例


## 事件

事件 | 参数 | 说明
---|---|---|
select | event | 鼠标点击或者回车选中某个POI信息时触发此事件
choose | event | 鼠标或者键盘上下键选择POI信息时触发此事件

### 事件回调的event参数
参数 | 类型 | 说明
---|---|---|
id | String | POI唯一标识
name | String | name
adcode | String | 区域编码
district | String | 所属区域
location | String | 位置
type | String | 类型

### 常见问题
1、搜索框中输入内容，但没有可选的下拉框出现
```text
原因：
一、新版本的key都需要配合安全密钥使用，初始化 initAMapApiLoader 时需要配上安全密钥或安全代理
二、下拉框的默认zIndex较低，当在弹出框中使用时，结果的下拉框会被盖住。下拉框的class为 amap-sug-result， 因此需要增加 .amap-sug-result{z-index:1000}去处理
```
