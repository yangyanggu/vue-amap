<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      @init="init"
    />
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap} from "@vuemap/vue-amap";

const zoom = ref(12);
const center = ref([121.59996, 31.197646]);
const init = (map: any) => {
  const eye = new AMap.HawkEye();
  map.addControl(eye);
  console.log('map init: ', map)
}
</script>

<style>
</style>
