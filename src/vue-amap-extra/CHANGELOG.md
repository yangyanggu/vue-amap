### @vuemap/vue-amap-extra v2.1.5
* 解决gltf组件有可能popup空指针异常
* 解决gltf popup更新属性后没有立刻生效问题

### @vuemap/vue-amap-extra v2.1.4
* 合入[Gltf增加3D popup](https://gitee.com/guyangyang/vue-amap/pulls/6)

### @vuemap/vue-amap-extra v2.1.3
* 合入[Gltf增加popup](https://gitee.com/guyangyang/vue-amap/pulls/5)

### @vuemap/vue-amap-extra v2.1.2
* 升级@vuemap/three-layer 解决地图调整大小后三维模型变形问题

### @vuemap/vue-amap-extra v2.1.1
* 解决gltf组件事件报错问题

### @vuemap/vue-amap-extra v2.1.0
* 所有组件更新为组合式API

### @vuemap/vue-amap-extra v2.0.11
* 优化three-layer图层渲染机制
* three-layer图层添加click  mouseover  mouseout事件，优化three事件系统，支持自定义物体也能触发事件
* three-layer添加webGLRendererParameters用于初始化WebglRenderer时提供额外参数
* gltf组件添加useModelCache属性，针对同一个gltf可以提供克隆能力，减少内存使用

### @vuemap/vue-amap-extra v2.0.10
* threelayer后处理渲染时增加时间

### @vuemap/vue-amap-extra v2.0.9
* threelayer组件alpha参数默认调整为true
* threelayer组件增加createCanvas属性，支持创建新的canvas绘制threejs，隔离引擎

### @vuemap/vue-amap-extra v2.0.8
* threelayer组件支持增加后处理

### @vuemap/vue-amap-extra v2.0.7
* 升级@vuemap/vue-amap-util版本，现在组件在给地图传递数据时会取消proxy和ref，防止后续地图使用对象时会触发循环watch，提高加载性能

### @vuemap/vue-amap-extra v2.0.6
* 升级@vuemap/layer-3dtiles 支持region包围盒

### @vuemap/vue-amap-extra v2.0.5
* 升级@vuemap/layer-3dtiles 解决3dtiles加载报错问题

### @vuemap/vue-amap-extra v2.0.4
* 解决gltf组件销毁异常问题

### @vuemap/vue-amap-extra v2.0.3
* 解决VSCODE开发时组件类型为any问题

### @vuemap/vue-amap-extra v2.0.2
* 升级依赖解决vite热更新失败问题

### @vuemap/vue-amap-extra v2.0.1
* 解决依赖的util包问题
* 所有组件增加extraOptions属性，用于提供额外的扩展，这样高德地图升级初始化属性可以立即使用

### v2.0.0
* 新版本发布，@vuemap/vue-amap 拆分为三个包```@vuemap/vue-amap```、```@vuemap/vue-amap-loca```、```@vuemap/vue-amap-extra```
* 升级方式请查看文档
