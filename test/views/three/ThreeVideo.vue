<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="60"
      :show-building-block="false"
      :features="['bg','road']"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-three :lights="lights">
        <el-amap-three-video
          v-if="canvas && videoDestroy"
          :visible="visible"
          :video="video"
          :video-width="videoOption.width"
          :video-height="videoOption.height"
          :video-translate="translate"
          :canvas="canvas"
          :position="center"
          :scale="scale"
          :altitude="altitude"
          :rotation="rotation"
          :opacity="opacity"
          :always-front="alwaysFront"
          @init="init"
        />
      </el-amap-layer-three>
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisible">
        {{ visible ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeDestroy">
        {{ videoDestroy ? '销毁' : '创建' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapLayerThree from "@vue-map/packages/three/ThreeLayer/ThreeLayer.vue";
import ElAmapThreeVideo from "@vue-map/packages/three/ThreeVideo/ThreeVideo.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapThreeVideo,
    ElAmapLayerThree,
    ElAmap},
  data(){
    return {
      videoDestroy: true,
      center: [116.306206, 39.975468],
      zoom: 16,
      visible: true,
      position: [116.306206, 39.975468],
      angle: 90,
      rotation: {x:90, y:0, z:0},
      lights: [{
        type: 'AmbientLight',
        args: []
      }],
      translate: {
        x: 0,
        y: 70,
        z: 0
      },
      scale: 0.5,
      altitude: 500,
      video: '/test.mp4',
      opacity: 0.5,
      videoOption: {
        width: 480,
        height: 246
      },
      alwaysFront: true,
      canvas: null as any,
      context: null as any,
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
      const canvas = document.createElement('canvas') as any;
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      this.canvas = canvas;
      this.context = context;
    },
    changeVisible(){
      this.visible = !this.visible;
    },
    changeDestroy(){
      this.videoDestroy = !this.videoDestroy;
    },
    initLayer(layer){
      console.log('init layer: ', layer);
    },
    init(){
      const image = new Image();
      image.src="/screen.jpeg";
      image.onload = () => {
        this.context.drawImage(image, 0, 0)
      }
    },
    clickGltf(e){
      console.log(' click gltf: ', e);
    },
  }
})
</script>

<style scoped>
.map-container{
  width: 100%;
  height: 100%;
  position: relative;
}
.control-container{
  position: absolute;
  padding: 24px;
  background: #ffffff;
  z-index: 2;
  bottom: 40px;
  left: 150px;
  right: 150px;
}
</style>
