<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-geojson
        v-if="geoJSON"
        :geo="geoJSON"
        :polygon-options="polygonOptions"
        :visible="visible"
        :draggable="draggable"
        @click="click"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="toggleVisible">
      {{ visible ? '隐藏标记' : '显示标记' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapGeojson} from "@vuemap/vue-amap";

const zoom = ref(7);
const center = ref([107.943579, 30.131735]);
const draggable = ref(false);
const visible = ref(true);
const geoJSON = ref(null);
const polygonOptions = ref({
  strokeColor: 'red',
  fillColor: 'blue'
});
const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
  fetch('//a.amap.com/jsapi_demos/static/geojson/chongqing.json').then(res => res.json()).then(json => {
    geoJSON.value = json;
  })
}
const toggleVisible = () => {
  visible.value = !visible.value;
}
const click = (e) => {
  alert('click GeoJSON');
}
</script>

<style scoped>
</style>
