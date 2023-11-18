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
      <el-amap-loca>
        <el-amap-loca-point
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
import {ElAmapLoca, ElAmapLocaPoint} from "@vuemap/vue-amap-loca";

const zoom = ref(4.8);
const center = ref([105.601, 35.32]);
const pitch = ref(55)

const sourceUrl = ref('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json')
const colors = [
  'rgba(254,255,198,0.95)',
  'rgba(255,238,149,0.95)',
  'rgba(255,217,99,0.95)',
  'rgba(255,175,43,0.95)',
  'rgba(255,135,24,0.95)',
  'rgba(234,10,0,0.95)',
  'rgba(195,0,0,0.95)',
  'rgba(139,0,0,0.95)',
];
const layerStyle = ref({
  unit: 'meter',
  radius: (index, f) => {
    const n = f.properties['人口'];
    return n * 100;
  },
  color: (index, f) => {
    const n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
    return colors[n];
  },
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

</script>

<style scoped>
</style>
