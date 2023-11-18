<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
    >
      <el-amap-control-geolocation
        :visible="visible"
        @complete="getLocation"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

import {ElAmap, ElAmapControlGeolocation} from "@vuemap/vue-amap";

const zoom = ref(12);
const center = ref([121.59996, 31.197646]);

const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}

const getLocation = (e: any) => {
  console.log('getLocation: ', e)
}

</script>

<style>
</style>
