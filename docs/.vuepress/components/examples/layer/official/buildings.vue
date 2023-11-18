<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="50"
      :show-building-block="false"
    >
      <el-amap-layer-buildings :visible="visible" />
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
import {ElAmap, ElAmapLayerBuildings} from "@vuemap/vue-amap";

const zoom = ref(18);
const center = ref([121.59996, 31.197646]);


const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}

</script>

<style>
</style>
