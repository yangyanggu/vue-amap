---
title: Amap
---

# Amap

地图容器

## Attributes

| Attribute  | Description                     | Type    | Accepted Values | Default |
|------------|---------------------------------|---------|-----------------|---------|
| show-label | 是否显示label                       | boolean | true / false    | true    |
| pitch    | 俯仰角度，默认 0，最大值根据地图当前 zoom 级别不断增大，2D地图下无效 。                | number  | —               | 0       |

## Events

| Event Name | Description                       | Parameters       |
|------------|-----------------------------------|------------------|
| change     | triggers when fixed state changed | (value: boolean) |
| click      | 单机地图                              | e                |

## Methods

| Method | Description | Parameters |
| ------ |-------------| ---------- |
| $$getInstance | 获取实例        | —          |

## Slots

| Name | Description               |
| ---- | ------------------------- |
| —    | customize default content |
