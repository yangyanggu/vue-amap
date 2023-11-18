<template>
  <div class="map-page-container">
    <el-amap
      v-if="center"
      :center="center"
      :zoom="18"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeMount} from 'vue';
import {ElAmap, useGeolocation ,lazyAMapApiLoaderInstance} from "@vuemap/vue-amap";

const center = ref(null)

onBeforeMount(() => {
  lazyAMapApiLoaderInstance.then(() => {
    useGeolocation({
      enableHighAccuracy: true,
      needAddress: true
    }).then(res => {
      const {getCurrentPosition, getCityInfo} = res;
      getCurrentPosition().then(currentPosition => {
        center.value = currentPosition.position.toArray();
        console.log('currentPosition: ', currentPosition)
      });
      getCityInfo().then(cityResult => {
        console.log('cityResult: ', cityResult)
      })
    })
  })
})

</script>

<style scoped>

</style>