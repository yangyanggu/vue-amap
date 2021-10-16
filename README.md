
# @vuemap/vue-amap
[![npm package](https://img.shields.io/npm/v/@vuemap/vue-amap.svg)](https://www.npmjs.org/package/@vuemap/vue-amap)
[![NPM downloads](http://img.shields.io/npm/dm/@vuemap/vue-amap.svg)](https://npmjs.org/package/@vuemap/vue-amap)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/@vuemap/vue-amap/dist/index.js?compression=gzip&label=gzip%20size:%20JS)
[![license](https://img.shields.io/github/license/elemefe/vue-amap.svg?style=flat-square)](https://github.com/ElemeFE/vue-amap)
[![star](https://gitee.com/guyangyang/vue-amap/badge/star.svg?theme=dark)](https://gitee.com/guyangyang/vue-amap/stargazers)

> @vuemap/vue-amap是一套基于Vue 2.0和高德地图的地图组件。
> 该版本对原vue-amap组件进行升级，主要适配amap2.0相关的接口，同时调整事件绑定形式，调整为使用v-on进行事件绑定。
> 组件中将会对高德可视化组件loca进行封装，同时提供threejs的接口
> 该项目基于 https://github.com/ElemeFE/vue-amap/ 开发

```html
觉得有用可以给个star
```

## 群号
![avatar](./image/vue-mapvgl.png)

## 捐赠支持
<img src="./src/docs/assets/images/zhifubao.jpg" alt="支付宝" width="270px" />
<img src="./src/docs/assets/images/weixin.png" alt="微信" width="270px"/>

## 安装
```
npm i -S @vuemap/vue-amap
```

## 文档
**[https://docs.guyixi.cn/vue-amap/](https://docs.guyixi.cn/vue-amap/)**


## 快速上手

引入@vuemap/vue-amap

```javascript
// 引入vue-amap
import VueAMap from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';

Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'YOUR_KEY',
});

//如果需要使用自定义的threeJS相关的组件，需要额外引入库中的three。该包只提供常用的模型加载，灯光，HDR等相关能力，更细致的控制需要在模型初始化后获取对象进行操作
import VueAmapThree from '@vuemap/vue-amap/dist/three'
Vue.use(VueAmapThree);
```

## 组件

### 地图

```vue
<el-amap  :zoom="zoom" :center="center">
</el-amap>
```

