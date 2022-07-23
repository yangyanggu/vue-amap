<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="60"
      :show-building-block="false"
      :features="['bg','road']"
    >
      <el-amap-layer-three
        :lights="lights"
        :hdr="hdrOptions"
      >
        <el-amap-three-gltf
          url="/gltf/sgyj_point_animation.gltf"
          :position="position"
          :scale="[10,10,10]"
          :rotation="rotation"
          :visible="visible"
          @init="init"
        />
        <el-amap-three-gltf
          url="/gltf/car2.gltf"
          :position="carPosition"
          :scale="[10,10,10]"
          :rotation="rotation"
          :move-animation="moveAnimation"
          :angle="carAngle"
          @init="initCar"
        />
      </el-amap-layer-three>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible? '隐藏' : '显示' }}
    </button>
    <button @click="stopCar()">
      停止移动
    </button>
    <button @click="startCar()">
      继续移动
    </button>
  </div>
</template>

<style>
</style>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      zoom: 18,
      center: [121.59996, 31.197646],
      visible: true,
      position: [121.59996, 31.197646],
      rotation: {x:90, y:0, z:0},
      carPosition: [121.59996, 31.197646],
      moveAnimation: {duration: 1000,smooth: true},
      carAngle: 90,
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
        path: '/hdr/'
      },
      carInterval: -1
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
    init(object, $vue){
      $vue.$$startAnimations();
      console.log('gltf object: ', object);
      console.log('gltf $vue: ', $vue);
    },
    initCar(){
      this.startCar();
    },
    startCar(){
      this.carInterval = setInterval(() => {
        const lng = this.carPosition[0] + Math.random() * 0.0001;
        const lat = this.carPosition[1] + Math.random() * 0.0001;
        const newPosition = [lng, lat];
        const angle = Math.random() * 360
        this.carPosition = newPosition;
        this.carAngle = angle;
      }, 1000)
    },
    stopCar(){
      clearInterval(this.carInterval);
    }
  }
});
</script>
