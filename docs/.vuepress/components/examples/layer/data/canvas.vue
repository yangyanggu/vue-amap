<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      @init="initMap"
    >
      <el-amap-layer-canvas
        v-if="canvas"
        :canvas="canvas"
        :bounds="bounds"
        :visible="visible"
        @init="initLayer"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapLayerCanvas} from "@vuemap/vue-amap";

const zoom = ref(15);
const center = ref([116.33719, 39.942384]);
const visible = ref(true);
const bounds = [116.327911, 39.939229,116.342659, 39.946275];

const canvas = ref<HTMLCanvasElement>(undefined);
let context: CanvasRenderingContext2D = undefined;

const switchVisible = () => {
  visible.value = !visible.value;
}
const initMap = (map: any) => {
  canvas.value = document.createElement('canvas');
  canvas.value.width = canvas.value.height = 200;

  context = canvas.value.getContext('2d');
  context.fillStyle = 'rgb(0,100,255)';
  context.strokeStyle = 'white';
  context.globalAlpha = 1;
  context.lineWidth = 2;
}
const initLayer = (layer: any) => {
  let radious = 0;
  const draw = () => {
    context.clearRect(0, 0, 200, 200);
    context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1;
    radious = (radious + 1) % 100;

    context.beginPath();
    context.arc(100, 100, radious, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    // 刷新渲染图层
    layer.reFresh();

    AMap.Util.requestAnimFrame(draw);
  };
  draw();
}

</script>

<style>
</style>
