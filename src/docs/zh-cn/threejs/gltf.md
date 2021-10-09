# GLTF
ThreeJS的gltf加载器封装的组件，用于加载gltf模型

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center"  :show-label="false" :zooms="[2, 30]" :show-building-block="false" view-mode="3D" :pitch="55" @init="initMap" class="amap-demo">
        <el-amap-layer-three :visible="visible" :lights="lights" :hdr="hdrOptions">
          <el-amap-three-gltf url="./assets/gltf/car4.gltf" :position="position" :rotation="{x:90, y:0, z:0}"></el-amap-three-gltf>
        </el-amap-layer-three>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏图层' : '显示图层'}}</button>
        <button type="button" name="button" @click="moveCar">移动车辆</button>
        <button type="button" name="button" @click="stopCar">停止移动</button>
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
      },
      methods: {
        toggleVisible(){
          this.visible = !this.visible;
        },
        initMap(map){
        },
        moveCar(){
          let position = this.position;
          this.position = [position[0]+0.000001, position[1]];
          this.timer = setTimeout(() => {
            this.moveCar();
          }, 300)
        },
        stopCar(){
          clearTimeout(this.timer);
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
url  | String | 模型地址,只支持gltf
scale | Number | 缩放大小

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
position | Array | 支持的缩放级别范围，默认范围 [2-20]
visible | Boolean | 是否显示，默认 true
rotation | Object | 旋转角度,通过该参数调整模型方向

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Object3D | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object3D | 实例初始化结束

