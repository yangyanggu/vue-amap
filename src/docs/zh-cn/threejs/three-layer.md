# ThreeJS的图层 
ThreeJS图层，基于AMap.GLCustomLayer，增加通用的配置，目前包含lights（灯光）、hdr。
可以通过获取scene来自定义添加模型，由于高德限制，threejs的版本必须使用0.117.1版本。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center"  :show-label="false" :zooms="[2, 30]" :show-building-block="false" view-mode="3D" :pitch="55" @init="initMap" class="amap-demo">
        <el-amap-layer-three :visible="visible" :lights="lights" :hdr="hdrOptions" :zooms="[2, 30]">
          <el-amap-three-gltf v-for="(item, index) in gltfs" :key="index" :scale="6" url="./assets/gltf/sgyj_point_animation.gltf" :position="item.position" :rotation="{x:90, y:0, z:0}"></el-amap-three-gltf>
        </el-amap-layer-three>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏图层' : '显示图层'}}</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 800px;
    }
  </style>

  <script>
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 20,
          center: [116.306206, 39.975468],
          visible: true,
          position: [116.306206, 39.975468],
          timer: null,
          gltfs: [],
          lights: [
            {
              type: 'DirectionalLight', // 灯光类型， 可选值见下面的字典
              args: [0xffffff, 1], // 灯光初始化时需要的参数，具体参数顺序可以查看threejs官网灯光的说明。 采用 ...args 的方式进行初始化
              position: {
                x: 1000,
                y: -100,
                z: 900
              }, // 光源的位置
            },
            {
              type: 'AmbientLight', // 灯光类型， 可选值见下面的字典
              args: [0xffffff, 0.3], // 灯光初始化时需要的参数，具体参数顺序可以查看threejs官网灯光的说明。 采用 ...args 的方式进行初始化
            }
          ],
          hdrOptions: {
            urls: [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ],
            path: './assets/hdr/'
          },
        };
      },
      mounted(){
        let array = [];
        for(let i=0; i< 2;i++){
          let lng = 116.306206 + Math.random() * 0.001;
          let lat = 39.975468 + Math.random() * 0.001;
          array.push({
            position: [lng, lat],
          })
        }
        this.gltfs = array;
      },
      methods: {
        toggleVisible(){
          this.visible = !this.visible;
        },
        initMap(map){
        },
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
lights  | Array | 配置灯光数据，具体参数见下面
hdr | Object | HDR功能配置，具体参数见下面
alpha | Boolean | canvas是否包含alpha (透明度)。默认为 false
antialias | Boolean | 是否执行抗锯齿。默认为false

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1

### HDR配置
```html
{
  urls: [], // HDR贴图下载地址，需要6个文件，代表6个方向
  path: '/', // HDR下载地址的路径前缀
  exposure: 1.0 // 光亮程度
}
```

### 灯光配置
```html
{
  type: 'DirectionalLight', //灯光类型， 可选值见下面的字典
  args: [], //灯光初始化时需要的参数，具体参数顺序可以查看threejs官网灯光的说明。 采用 ...args 的方式进行初始化
  position: {
    x: 0,
    y: 0,
    z: 0
  }, //光源的位置
  lookAt: {
    x: 0,
    y: 0,
    z: 0
  } //光源查看的目标点
}

const lightTypes = {
  AmbientLight: THREE.AmbientLight, // 环境光  环境光会均匀的照亮场景中的所有物体
  DirectionalLight: THREE.DirectionalLight, // 平行光  平行光是沿着特定方向发射的光
  HemisphereLight: THREE.HemisphereLight, // 半球光  光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
  PointLight: THREE.PointLight, // 点光源  从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光
  RectAreaLight: THREE.RectAreaLight, // 平面光光源  平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源
  SpotLight: THREE.SpotLight // 聚光灯  光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
};
```

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.CustomLayer | 获取实例
$$getScene | THREE.Scene | 获取场景对象
$$getRender | WebGLRenderer | 获取WebGLRenderer对象
$$refresh |   | 刷新图层

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.CustomLayer | 实例初始化结束

