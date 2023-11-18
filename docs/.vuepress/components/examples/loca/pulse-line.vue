<template>
  <div class="map-page-container">
    <el-amap
      view-mode="3D"
      :pitch="pitch"
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-loca @init="initLoca">
        <el-amap-loca-pulse-line
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
          :visible-duration="500"
        />
      </el-amap-loca>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap} from "@vuemap/vue-amap";
import {ElAmapLoca, ElAmapLocaPulseLine} from "@vuemap/vue-amap-loca";

const zoom = ref(5);
const center = ref([109.595668,35.447184]);
const pitch = ref(55)

const sourceUrl = ref('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-in.json');
const headColors = ['#ECFFB1', '#146968', '#146968', '#146968', '#146968', '#146968', '#146968', '#146968'];
const trailColors = [
  'rgba(255,178,6, 0.2)',
  'rgba(255,178,6, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
  'rgba(20,105,104, 0.2)',
];
const layerStyle = ref({
  altitude: 0,
  lineWidth: (_, feature) => feature.properties.lineWidthRatio * 4 + 1,
  headColor: (_, feature) => headColors[feature.properties.type],
  trailColor: (_, feature) => trailColors[feature.properties.type],
  interval: 0.5,
  duration: 2000,
})


const visible = ref(true)
const changeVisible = () => {
  visible.value = !visible.value;
}

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
}

const initLoca = (loca: any) => {
  loca.animate.start();
}

</script>

<style scoped>
</style>
