###v1.1.2
* 重要革新，地图组件现在支持包装，可以将多个组件封装到一个新的组件里
* 新特性，现在提供用于自定义组件的能力了，提供了registerMixin
* initAMapApiLoader增加securityJsCode和serviceHost，用于适应新版本的key
* 增加定位组件 el-amap-control-geolocation

### 1.0.12
* 修改WMS和WMTS的params参数名称，保持与官网一致

### 1.0.11
* 修复多边形编辑的事件无法触发问题

### 1.0.10
* 地图增加terrain属性，用于支持2.1Beta开启地形

### 1.0.9
* 解决loca图层无法加载问题

### 1.0.8
* Buildings图层，增加初始化后设置style

### 1.0.7
* 解决控件的position数据校验错误

### 1.0.6
* 修复圆等图形无法加载问题
* 放开lazyAMapApiLoaderInstance，提供原生调用能力

### 1.0.5
* 修复ElAmapLayerThree包名错误问题

### 1.0.4
* 增加3dtiles图层
* 增加gltf模型加载
* 修复地图组件中enable属性切换失效问题

### 1.0.3
* 修改打包出来后CDN加载方式时的全局变量，保持与vue2版本一致
* 属性监听时增加针对Object和Array深度监听

### 1.0.2
* 修复打包后地图无法渲染问题

### 1.0.1
* 修复地图组件无法触发click事件问题
* 修复简易行政区划图层控制台警告问题
* map容器增加relative定位

### 1.0.0
vue3版本发布
