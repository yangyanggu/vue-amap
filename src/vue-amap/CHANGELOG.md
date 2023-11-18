### @vuemap/vue-amap v2.0.24
* 解决视频图层无法使用跨域视频问题
* 增加3个hooks，天气、IP定位、普通定位

### @vuemap/vue-amap v2.0.23
* 升级@vuemap/amap-xyz-layer版本，提高自定义瓦片纠偏图层性能

### @vuemap/vue-amap v2.0.22
* 解决@vue/cli脚手架加载组件库启动报错

### @vuemap/vue-amap v2.0.21
* 升级@vuemap/vue-amap-util版本，现在组件在给地图传递数据时会取消proxy和ref，防止后续地图使用对象时会触发循环watch，提高加载性能

### @vuemap/vue-amap v2.0.20
* 解决点聚合图层卡顿问题

### @vuemap/vue-amap v2.0.19
* 升级自定义瓦片图层依赖，增加海拔功能，可以配合loca面图层实现凸起的瓦片能力，详情见文档示例

### @vuemap/vue-amap v2.0.18
* 解决部分开发环境加载组件后提示`POLYGON_CLIPPING_MAX_QUEUE_SIZE`错误
* 增加自定义纠偏瓦片图层，该图层支持加载`wgs84` `gcj02` `bd09`三种坐标系瓦片

### @vuemap/vue-amap v2.0.17
* 解决打包后style.css文件目录变更问题

### @vuemap/vue-amap v2.0.16
* searchbox组件增加防抖功能

### @vuemap/vue-amap v2.0.15
* 升级`@vuemap/district-cluster`依赖

### @vuemap/vue-amap v2.0.14
* Marker组件增加`moveOptions`属性，设置该属性后可以在修改position时自动调用marker的moveTo方法增加动画

### @vuemap/vue-amap v2.0.13
* 解决VSCODE开发时组件类型为any问题

### @vuemap/vue-amap v2.0.12
* 配置index.d.ts

### @vuemap/vue-amap v2.0.11
* 解决WMTS组件对象调用错误问题

### @vuemap/vue-amap v2.0.10
* 升级区划插件依赖

### @vuemap/vue-amap v2.0.9
* 升级区划插件依赖

### @vuemap/vue-amap v2.0.8
* 解决鼠标工具组件开关时提示信息和cursor优化
* 适配SSR

### @vuemap/vue-amap v2.0.7
* 升级依赖解决vite热更新失败问题
* 更改jsloader

### @vuemap/vue-amap v2.0.5
* 升级依赖

### @vuemap/vue-amap v2.0.4
* 解决依赖的util包问题

### @vuemap/vue-amap v2.0.3
* 解决打包生成的.d.ts文件中部分props丢失问题

### @vuemap/vue-amap v2.0.1
* 所有组件增加extraOptions属性，用于提供额外的扩展，这样高德地图升级初始化属性可以立即使用

### v2.0.0
* 新版本发布，@vuemap/vue-amap 拆分为三个包```@vuemap/vue-amap```、```@vuemap/vue-amap-loca```、```@vuemap/vue-amap-extra```
* 升级方式请查看文档

### v1.1.21
* 增加区划聚合图层

### v1.1.20
* searchbox组件增加placeholder属性

### v1.1.19
* 解决geojson数据更新无法触发重绘问题

### v1.1.18
* 解决打包之后3dtiles没有放入全局问题

### v1.1.17
* 适配JSAPI 1.4.x
* 升级threejs版本
* 重构threejs相关组件库，改用@amap/three-layer插件提供基础能力
* 增加自定义的3dtiles图层，使用@vuemap/layer-3dtiles实现

### v1.1.16
* 所有loca图层增加rightclick事件
* 调整loca图层事件实现方案，当initEvents为true时，只有绑定了事件才会真实的去对map进行事件绑定
* 解决loca图层存在mousemove事件时，旋转地图卡顿问题
* loca组件增加事件，支持click、mousemove、rightclick，事件支持返回所有选中的点和只返回最上层的点，默认返回最上层点

### v1.1.15
* 解决marker自定义slot时事件失效问题

### v1.1.14
* 解决某些情况下marker和infowindow更新会报错问题

### v1.1.12
* 所有组件增加reEventWhenUpdate属性，主要用于数组更新时，解决绑定了事件但事件的对象不会更新问题，默认false

### v1.1.11
* 解决组件名称冲突
* 增加鼠标操作工具组件，用于绘制点、线、面等等
* 增加点和矢量图形的位置和路径的v-model实现
* 优化threejs面图层材质逻辑，加快加载速度

### v1.1.10
* 增加ThreeVideo图层
* threeJS增加环境光、平行光、半球光、点光源、聚光灯
* threeJS解决HDR失效问题，HDR更改为全局生效
* three增加面图层，用于生成建筑
* map地图center、rotation、pitch、zoom支持v-model
* 解决部分组件销毁时没有从地图上移出问题
* 完善Loca面图层

### v1.1.8
* 增加视频图层
* 重构ThreeLayer图层
* 重构Gltf图层
* Gltf图层增加移动动画和高度属性
* 增加Loca的激光图层Loca.LaserLayer

### v1.1.7
* 解决marker和infoWindow的使用slot时会因为父组件数据更新而不停刷新的问题

### v1.1.6
* 解决loca图层修改样式后报错问题
* 加载地图JS时增加offline参数用于离线部署

### v1.1.5
* threejs版本升级到0.141.0
* 所有loca图层销毁时增加判断父组件是否销毁
* searchbox组件增加inputCustom属性，用于自定义input框
* loca所有图层增加geoBufferSource字段，对应Loca.GeoBufferSource的数据源
* Loca.PolygonLayer图层增加新版本适配
* Loca增加三个光源组件
* Gltf组件增加停止动画方法

### v1.1.4
* 增加CircleMarker组件
* 解决销毁组件后报错问题（由于高德加强了了地图销毁的内存释放的逻辑引起）

### v1.1.3
* 解决loca图层内存无法释放问题
* 解决新版本loca会导致销毁报错，页面崩溃问题

### v1.1.2
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
