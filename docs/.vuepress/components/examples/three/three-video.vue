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
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
    <button @click="changeDestroy">
      {{ videoDestroy ? '销毁' : '创建' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      videoDestroy: true,
      center: [116.306206, 39.975468],
      zoom: 15,
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
      altitude: 200,
      video: '/video/test.mp4',
      opacity: 0.5,
      videoOption: {
        width: 480,
        height: 246
      },
      alwaysFront: true,
      canvas: null as any,
      context: null as any,
    };
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
      image.src="/images/screen.jpeg";
      image.onload = () => {
        this.context.drawImage(image, 0, 0)
      }
    }
  }
});
</script>

<style>
</style>
