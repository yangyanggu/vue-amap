<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
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
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible? '隐藏' : '显示' }}
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
      center: [116.306206, 39.975468],
      zoom: 16,
      visible: true,
      canvas: null,
      map: null,
      path: null
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
    initMap(map){
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
});
</script>
