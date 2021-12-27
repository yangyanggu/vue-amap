<template>
  <div class="map-page-container">
    <el-amap :center="center" :zoom="zoom" @init="initMap">
      <el-amap-layer-canvas v-if="canvas" :canvas="canvas" :bounds="bounds" :visible="visible" @init="initLayer"></el-amap-layer-canvas>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">{{visible? '隐藏' : '显示'}}</button>
  </div>
</template>

<style>
</style>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      zoom: 15,
      center: [116.33719, 39.942384],
      visible: true,
      bounds: [116.327911, 39.939229,116.342659, 39.946275],
      canvas: null,
      context: null
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
    initMap(map){
      let canvas = document.createElement('canvas');
      canvas.width = canvas.height = 200;

      let context = canvas.getContext('2d');
      context.fillStyle = 'rgb(0,100,255)';
      context.strokeStyle = 'white';
      context.globalAlpha = 1;
      context.lineWidth = 2;
      this.canvas = canvas;
      this.context = context;
    },
    initLayer(layer){
      let radious = 0;
      let draw = () => {
        this.context.clearRect(0, 0, 200, 200);
        this.context.globalAlpha = (this.context.globalAlpha - 0.01 + 1) % 1;
        radious = (radious + 1) % 100;

        this.context.beginPath();
        this.context.arc(100, 100, radious, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();

        // 刷新渲染图层
        layer.reFresh();

        AMap.Util.requestAnimFrame(draw);
      };
      draw();
    }
  }
});
</script>
