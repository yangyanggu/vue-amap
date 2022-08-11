# GLTF
ThreeJS的gltf加载器封装的组件，用于加载gltf模型

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center"  :show-label="false" :zooms="[2, 30]" :show-building-block="false" view-mode="3D" :pitch="55" @init="initMap" class="amap-demo">
        <el-amap-layer-three :lights="lights" :hdr="hdrOptions" :zooms="[2, 30]">
          <el-amap-three-gltf v-if="position" :visible="visible" url="./assets/gltf/car4.gltf" :position="position" :scale="20" :angle="angle" :rotation="rotation" :height="height" @click="()=>{click(position)}" @mouseover="mouseover" @mouseout="mouseout" @init="initCar"></el-amap-three-gltf>
          <el-amap-three-gltf url="./assets/gltf/sgyj_point_animation.gltf" :position="[116.305206, 39.975468]" :scale="10" :rotation="rotation" @init="init"></el-amap-three-gltf>
        </el-amap-layer-three>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏图层' : '显示图层'}}</button>
        <button type="button" name="button" @click="moveCar">移动车辆</button>
        <button type="button" name="button" @click="stopCar">停止移动</button>
        <button type="button" name="button" @click="changeAngle">旋转车辆角度</button>
        <button type="button" name="button" @click="disposeCar">{{position ? '销毁车辆' : '生成车辆'}}</button>
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
          angle: 90,
          rotation: {x:90, y:0, z:0},
          height: 50,
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
        initCar(car){
          console.log('car: ', car);
        },
        moveCar(){
          let position = this.position;
          this.position = [position[0], position[1]+0.000001];
          this.timer = setTimeout(() => {
            this.moveCar();
          }, 300)
        },
        stopCar(){
          clearTimeout(this.timer);
        },
        disposeCar(){
          if(this.position){
            this.position = null;
          }else{
            this.position = [116.306206, 39.975468];
          }
        },
        click(e){console.log('click: ', e)},
        mouseover(e){console.log('mouseover: ', e)},
        mouseout(e){console.log('mouseout: ', e)},
        init(object, $vue){
          $vue.$$startAnimations();
        },
        changeAngle(){
          this.angle += 10;
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
position | Array | 车辆位置经纬度
visible | Boolean | 是否显示，默认 true
rotation | Object | 旋转角度,通过该参数调整模型方向
angle | Number | 模型绕Y轴旋转角度，该参数主要用于车辆模型的位置调整
height | Number | 模型离地高度

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | Object3D | 获取实例
$$startAnimations |   | 开始动画，当模型自带动画时，调用该方法将触发动画
$$stopAnimations |   | 停止动画

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object3D, 组件实例 | 实例初始化结束
click | Object3D | 点击事件
mouseover | Object3D | 鼠标悬浮
mouseout | Object3D | 鼠标离开

