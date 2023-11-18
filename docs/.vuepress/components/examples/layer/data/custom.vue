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
        :always-render="false"
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

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapLayerCustom} from "@vuemap/vue-amap";

const zoom = ref(16);
const center = ref([116.306206, 39.975468]);
const visible = ref(true);

const canvas = ref<SVGSVGElement>(undefined);
let map: any = null;
let path: SVGPathElement = undefined;

const switchVisible = () => {
  visible.value = !visible.value;
}

const initMap = (mapInstance: any) => {
  map = mapInstance;
  const size = map.getSize();
  canvas.value = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  canvas.value.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  canvas.value.setAttribute('width', size.width);
  canvas.value.setAttribute('height', size.height);

  path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.onclick = function () {
    console.log('svg path clicked')
  };
  const styleText = [] as string[];
  styleText.push('stroke:red');
  styleText.push('fill:green');
  styleText.push('fill-opacity:0.3');
  path.style.cssText = styleText.join(';');
  canvas.value.appendChild(path);
}
const render = () => {
  const paths = [] as string[];
  const centerPixel = map.lngLatToContainer(center.value);

  for (let k = 0; k < 6; k += 1) {
    const ag = Math.PI * 60 / 180 * k;
    const x = centerPixel.x + Math.cos(ag) * 50;
    const y = centerPixel.y + Math.sin(ag) * 50;
    paths.push(`${(k == 0 ? 'M' : 'L') + x  } ${  y}`);
  }
  const newPath = `${paths.join(' ')  } Z`;
  path.setAttribute('d', newPath);
}
</script>

<style>
</style>
