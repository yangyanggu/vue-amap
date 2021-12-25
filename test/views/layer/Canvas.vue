<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-canvas
        v-if="canvas"
        :canvas="canvas"
        :bounds="bounds"
        @init="initLayer"
      />
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
import ElAmapLayerCanvas from "@vue-map/packages/layer/data/Canvas/Canvas.vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerCanvas,
    ElAmap},
  data(){
    return {
      center: [116.33719, 39.942384],
      bounds: [116.327911, 39.939229,116.342659, 39.946275],
      zoom: 16,
      canvas: null as any,
      context: null as any,
      visible: true,
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
      const canvas = document.createElement('canvas') as any;
      canvas.width = canvas.height = 200;

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
      let radious = 0;
      const draw = () => {
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
