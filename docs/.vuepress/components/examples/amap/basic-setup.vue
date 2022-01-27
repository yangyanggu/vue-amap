<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      @init="init"
    />
  </div>
  <div class="toolbar">
    <button @click="add()">
      添加标号
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
const zoom = ref(12);
const center = ref([121.59996, 31.197646]);
let map = null;
const init = (e) => {
  const marker = new AMap.Marker({
    position: [121.59996, 31.197646]
  });
  e.add(marker);
  map = e;
  console.log('map init: ', map)
}
const add = () => {
  const marker = new AMap.Marker({
    position: [121.59996, 31.177646]
  });
  map.add(marker);
}
</script>

<style>
</style>
