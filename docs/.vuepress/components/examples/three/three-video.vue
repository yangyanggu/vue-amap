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
      <el-amap-layer-three>
        <el-amap-three-light-ambient />
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

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap} from "@vuemap/vue-amap";
import {ElAmapLayerThree, ElAmapThreeLightAmbient, ElAmapThreeVideo} from "@vuemap/vue-amap-extra";

const videoDestroy = ref(true);
const center = ref([116.306206, 39.975468]);
const zoom = ref(15);
const visible = ref(true);
const rotation = ref({x: 90, y: 0, z: 0});
const translate = ref({
  x: 0,
  y: 70,
  z: 0
});
const scale = ref(0.5);
const altitude = ref(200);
const video = ref('/video/test.mp4');
const opacity = ref(0.5);
const videoOption = ref({
  width: 480,
  height: 246
});
const alwaysFront = ref(true);
let canvas: HTMLCanvasElement = null;
let context: CanvasRenderingContext2D = null;

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
  canvas = document.createElement('canvas') as any;
  canvas.width = 512;
  canvas.height = 512;
  context = canvas.getContext('2d');
}
const changeVisible = () => {
  visible.value = !visible.value;
}
const changeDestroy = () => {
  videoDestroy.value = !videoDestroy.value;
}
const initLayer = (layer) => {
  console.log('init layer: ', layer);
}
const init = () => {
  const image = new Image();
  image.src = "/images/screen.jpeg";
  image.onload = () => {
    context?.drawImage(image, 0, 0)
  }
}
</script>

<style>
</style>
