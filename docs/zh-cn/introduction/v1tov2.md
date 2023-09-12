---
title: 从1.x迁移
description: 1.x升级到2.x版本
head:
  - - meta
    - name: keywords
      content: amap, 高德地图, vue3.0, 升级
---

# 从1.x迁移

::: tip
从2.0.0开始 @vuemap/vue-amap的默认版本将调整为2.x，也就是Vue3将作为默认版本
:::

将@vuemap/vue-amap 升级到2.x版本需要从以下几个方向调整：

---

## 修改库版本

将``@vuemap/vue-amap``的版本修改为 2.x
```shell
npm i @vuemap/vue-amap@2
```

## 安装需要使用的loca或者threejs的库

如果项目中使用了loca或者threejs的组件库，需要安装对应的组件库

```shell
// loca组件库
npm i @vuemap/vue-amap-loca@2

// threejs组件库
npm i @vuemap/vue-amap-extra@2
```


## 修改 initAMapApiLoader

现在``initAMapApiLoader``默认不再加载loca插件，如果项目中使用了loca，需要在参数中增加Loca说明：
````typescript
initAMapApiLoader({
  key: 'xxxx',
  Loca: {
    version: '2.0.0'
  }
})
````

## 升级@vuemap/unplugin-resolver

如果项目中使用了```@vuemap/unplugin-resolver```来作为自动导入组件，需要将该插件升级到2.x版本

```shell
npm i @vuemap/unplugin-resolver@2 -D
```

## 修改所有手动导入

如果项目中使用了手动导入依赖组件的方式的话，需要调整对应的库，所有loca功能需要从``@vuemap/vue-amap-loca``中导入，所有threejs组件需要从``@vuemap/vue-amap-extra``中导入

