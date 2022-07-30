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
        :hdr="hdrOptions"
      >
        <el-amap-three-light-ambient
          color="rgb(255,255,255)"
          :intensity="0.6"
        />
        <el-amap-three-light-directional
          color="rgb(255,0,255)"
          :intensity="1"
          :position="{x:0, y:1, z:0}"
        />
        <el-amap-three-light-hemisphere
          color="blue"
          :intensity="1"
          :position="{x:1, y:0, z:0}"
        />
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
