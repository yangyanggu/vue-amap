<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
      @complete="completeMap"
      @moveend="moveendMap"
    >
      <el-amap-info-window
        v-model:visible="visible"
        :position="center"
      >
        <div>hello world</div>
      </el-amap-info-window>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      显隐
    </button>
    <button @click="changeCenter">
      更换中心点
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapInfoWindow} from "@vuemap/vue-amap";

const zoom = ref(16);
const center = ref([120,31]);

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
const completeMap = (e: any) => {
  console.log(e);
}
const moveendMap = (e: any) => {
  console.log('moveendMap: ', e);
}
const changeCenter = () => {
  const lng = center.value[0]+0.01;
  const lat = center.value[1]+0.01;
  center.value = [lng, lat];
}

</script>

<style scoped>
</style>
