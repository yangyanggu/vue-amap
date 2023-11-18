<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-mass-marks
        :visible="visible"
        :data="points"
        :styles="styles"
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
import {ElAmap, ElAmapMassMarks} from "@vuemap/vue-amap";
import City from '../../../assets/citys.json';

const zoom = ref(5);
const center = ref([102.342785, 35.312316]);

const points = ref(City);

const styles = ref([{
  url: 'https://webapi.amap.com/images/mass/mass0.png',
  anchor: [6, 6],
  size: [11, 11],
  zIndex: 3,
}, {
  url: 'https://webapi.amap.com/images/mass/mass1.png',
  anchor: [4, 4],
  size: [7, 7],
  zIndex: 2,
}, {
  url: 'https://webapi.amap.com/images/mass/mass2.png',
  anchor: [3, 3],
  size: [5, 5],
  zIndex: 1,
}
])

const visible = ref(true)
const changeVisible = () => {
  visible.value = !visible.value;
}

const clickMap = (e: any) => {
  console.log('click map: ', e);
}
const initMap = (map: any) => {
  console.log('init map: ', map);
}

const markerInit = (e: any) => {
  console.log('marker init: ', e);
}

const clickMarker = (e: any) => {
  console.log('marker click: ', e);
}


</script>

<style scoped>
</style>
