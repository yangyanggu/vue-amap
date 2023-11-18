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
        :points="points"
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
import China from '../../../assets/china.json';

const center = ref([104.937478, 35.439575]);
const zoom = ref(5);
const points = ref(China);
const visible = ref(true);

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
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
