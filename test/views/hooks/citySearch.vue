<template>
  <el-amap />
</template>

<script setup lang="ts">
import {onBeforeMount} from 'vue';
import {ElAmap, useCitySearch ,lazyAMapApiLoaderInstance} from "@vuemap/vue-amap";

onBeforeMount(() => {
  lazyAMapApiLoaderInstance.then(() => {
    useCitySearch().then(res => {
      const {getLocalCity} = res;
      getLocalCity().then(cityResult => {
          console.log('cityResult: ', cityResult)
      })
    })
  })
})

</script>

<style scoped>

</style>