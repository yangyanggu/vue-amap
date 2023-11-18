<template>
  <div class="map-page-container">
    <el-amap
      v-if="center"
      :center="center"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeMount} from 'vue';
import {ElAmap, useCitySearch ,lazyAMapApiLoaderInstance} from "@vuemap/vue-amap";

const center = ref<number[]>(null)

onBeforeMount(() => {
  lazyAMapApiLoaderInstance.then(() => {
    useCitySearch().then(res => {
      const {getLocalCity} = res;
      getLocalCity().then(cityResult => {
        center.value = cityResult.bounds.getCenter().toArray()
        console.log('cityResult: ', cityResult)
      })
    })
  })
})

</script>

<style scoped>

</style>