<template>
  <div class="map-page-container">
    <el-amap />
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount} from 'vue';
import {ElAmap, useWeather ,lazyAMapApiLoaderInstance} from "@vuemap/vue-amap";

onBeforeMount(() => {
  lazyAMapApiLoaderInstance.then(() => {
    useWeather().then(res => {
      const {getLive, getForecast} = res;
      getLive('南京市').then(liveResult => {
        console.log('liveResult: ', liveResult)
      });
      getForecast('南京市').then(forecastResult => {
        console.log('forecastResult: ', forecastResult)
      })
    })
  })
})

</script>

<style scoped>

</style>