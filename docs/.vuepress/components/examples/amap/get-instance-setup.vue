<template>
  <div class="map-page-container">
    <el-amap ref="mapRef" :min-zoom="10" :max-zoom="22" :center="center" :zoom="zoom" @init="init" @click="click">
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="getMap()">获取地图实例</button>
  </div>
</template>
<script lang="ts" setup>
import {ref, getCurrentInstance} from 'vue';

const {proxy} = getCurrentInstance();
const mapRef = ref();
const zoom = ref(16);
const center = ref([121.59996, 31.197646]);
let map = null;
const getMap = () => {
  // bmap vue component
  console.log('setup $refs: ', mapRef.value.$$getInstance())
};
const init = (o) => {
  map = o;
  console.log('setup center: ', o.getCenter())
  console.log('setup init $refs: ', mapRef.value.$$getInstance())
}
const click = () => {
  alert('click map')
}
</script>
<style>
</style>
