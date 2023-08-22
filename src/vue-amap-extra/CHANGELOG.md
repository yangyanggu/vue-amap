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
