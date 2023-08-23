### v0.1.16
* 解决threejs图层与loca图层一起使用时坐标错乱问题

### v0.1.15
* 修复WMTS组件对象调用错误问题

### v0.1.14
* 所有组件增加extraOptions属性，用于提供额外的扩展，这样高德地图升级初始化属性可以立即使用

### v0.1.13
* 无任何修改，修改包的标签为legacy

### v0.1.12
* searchbox组件增加placeholder属性

### v0.1.11
* 适配1.4.x版本的JS

### v0.1.10
* 解决添加loca图层后旋转地图卡顿问题
* 解决marker和infowindow组件可能出现失效问题

### v0.1.8
* GLTF增加高度属性，用于修改模型高度
* loca增加激光图层
* loca修改面图层，适配新的API

### v0.1.7
* 调整CircleMarker组件参数和文档
* threejs版本升级到0.141.0
* searchbox组件增加inputCustom属性，用于自定义input框
* loca所有图层增加geoBufferSource字段，对应Loca.GeoBufferSource的数据源
* Loca.PolygonLayer图层增加新版本适配
* Loca增加三个光源组件
* Gltf组件增加停止动画方法
* 解决loca图层修改样式后报错问题
* 加载地图JS时增加offline参数用于离线部署

### v0.1.6
* 解决loca事件失效问题

### v0.1.5
* 解决loca销毁报错问题

### v0.1.4
* 解决弹出框销毁报错问题

### v0.1.3
* 解决loca更新后销毁地图报错问题

### v0.1.2
* 增加圆形标记 [PR](https://gitee.com/guyangyang/vue-amap/pulls/1)

### v0.1.1
* 增加定位组件
* 优化内存释放

### v0.1.0
* 重要革新，地图组件现在支持包装，可以将多个组件封装到一个新的组件里
* 新特性，现在提供用于自定义组件的能力了，提供了registerMixin
* initAMapApiLoader增加securityJsCode和serviceHost，用于适应新版本的key

### v0.0.23
* 修改WMS和WMTS的params参数名称，保持与官网一致

### v0.0.22
* Buildings图层，增加初始化后设置style

### v0.0.21
* 解决控件的position数据校验错误

### v0.0.20
* 开放lazyAMapApiLoaderInstance

### v0.0.19
* 解决地图控件加载报错问题
* 地图容器最外层增加position:relative属性

### v0.0.17
* 适配LOCA 2.0.6的API
* 增加ZMarkerLayer图层

### v0.0.16
* 增加搜索框组件

### v0.0.15
* 修复infoWindow某些情况下改变位置无法显示问题
* 增加VectorLayer图层

### v0.0.14
* loca的所有图层增加visibleDuration属性，用于图层显隐的渐变

### v0.0.13
* prop中如果属性是Object类型的增加deep监听

### v0.0.12
* loca图层默认style处理，增加feature.properties赋默认{}，屏蔽geojson数据不存在properties时初始化报错问题
* 修改包加载方式，取消@ 导入，改用相对路径进行导入

### v0.0.11
* 紧急修复loca图层不能异步加载数据问题

### v0.0.9
* 解决控件初始化报错问题
* 修复MarkerCluster  points修改后不能动态修改数据问题
* 完善API文档

### v0.0.8
* loca里的图层对style全部增加默认处理，优先读取geojson中的properties里的参数（仅针对支持function回调的style参数），其次读取defaultStyle中配置的值，当传入layerStyle时，优先使用layerStyle里的处理

### v0.0.7
* 重命名text的style属性为textStyle

### v0.0.6
* 完善threeJS对象销毁时内存处理
* loca的Layer事件增加event开放

### v0.0.5
* 完成loca所有图层的接入

### v0.0.4
* 增加threejs相关图层以及模型加载

### v0.0.3
* 接入loca

### v0.0.2
* 完成初始版本，该版本对接完amap相关API，后续接入loca和UI
