<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-custom
        v-if="canvas"
        :canvas="canvas"
        :render="render"
        :always-render="true"
        :visible="visible"
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
import ElAmapLayerCustom from "@vue-map/packages/layer/data/Custom/Custom.vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerCustom,
    ElAmap},
  data(){
    return {
      center: [116.306206, 39.975468],
      zoom: 16,
      map: null as any,
      canvas: null as any,
      path: null as any,
      visible: true,
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
      this.map = map;
      const size = map.getSize();
      const canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      canvas.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      canvas.setAttribute('width', size.width);
      canvas.setAttribute('height', size.height);

      this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this.path.onclick = function () {
        console.log('svg path clicked')
      };
      const styleText = [] as string[];
      styleText.push('stroke:red');
      styleText.push('fill:green');
      styleText.push('fill-opacity:0.3');
      this.path.style.cssText = styleText.join(';');
      canvas.appendChild(this.path);
      this.canvas = canvas;
    },
    changeVisible(){
      this.visible = !this.visible;
    },
    render(){
      const paths = [] as string[];
      const center = this.map.lngLatToContainer(this.center);

      for (let k = 0; k < 6; k += 1) {
        const ag = Math.PI * 60 / 180 * k;
        const x = center.x + Math.cos(ag) * 50;
        const y = center.y + Math.sin(ag) * 50;
        paths.push(`${(k == 0 ? 'M' : 'L') + x  } ${  y}`);
      }
      const newPath = `${paths.join(' ')  } Z`;
      this.path.setAttribute('d', newPath);
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
