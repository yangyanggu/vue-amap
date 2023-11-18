<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-marker-cluster
        v-if="visible"
        :points="markerPoints"
        @init="markerInit"
        @click="clickMarker"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      显隐
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapMarkerCluster} from "@vuemap/vue-amap";

const center = ref([104.937478, 35.439575]);
const zoom = ref(5);
const markerPoints = ref([]);
const visible = ref(true);

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
  fetch('//a.amap.com/jsapi_demos/static/china.js').then(res => res.text()).then(text => {
    const array = text.split('=');
    if(array.length === 2){
      markerPoints.value = JSON.parse(array[1].trim())
    }
  })
}
const changeVisible = () => {
  visible.value = !visible.value;
}
const markerInit = (e) => {
  console.log('marker init: ', e);
}
const clickMarker = (e) => {
  console.log('marker click: ', e);
}
</script>

<style scoped>
</style>
