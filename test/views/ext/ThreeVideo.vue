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
          v-if="canvas"
          video="/test.mp4"
          :video-width="480"
          :video-height="270"
          :canvas="canvas"
          :position="center"
          :scale="1"
          :height="200"
          :rotation="rotation"
          @init="init"
        />
      </el-amap-layer-three>
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisible">
        {{ visible ? '隐藏' : '显示' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapLayerThree from "@vue-map/packages/ext/ThreeLayer/ThreeLayer.vue";
import ElAmapThreeVideo from "@vue-map/packages/ext/ThreeVideo/ThreeVideo.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapThreeVideo,
    ElAmapLayerThree,
    ElAmap},
  data(){
    return {
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
      canvas.width = canvas.height = 512;

      const context = canvas.getContext('2d');
      context.fillStyle = 'rgb(0,100,255)';
      context.strokeStyle = 'white';
      context.globalAlpha = 1;
      context.lineWidth = 2;
      this.canvas = canvas;
      this.context = context;
    },
    changeVisible(){
      this.visible = !this.visible;
    },
    initLayer(layer){
      console.log('init layer: ', layer);
    },
    init(){
      let radius = 0;
      const draw = () => {
        this.context.clearRect(0, 0, 512, 512);
        this.context.globalAlpha = (this.context.globalAlpha - 0.01 + 1) % 1;
        if(radius > 256){
          radius = 20
        }else{
          radius += 1
        }

        this.context.beginPath();
        this.context.arc(256, 256, radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();

        requestAnimationFrame(() => {
          draw()
        });
      };
      draw();
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
