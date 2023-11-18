<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="60"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-three>
        <el-amap-three-light-ambient
          color="rgb(255,255,255)"
          :intensity="1"
        />
        <el-amap-three-polygon
          v-if="source"
          :visible="visible"
          :source="source"
          top-color="rgba(255,0,0,0)"
          bottom-color="rgba(255,0,0,0.2)"
          side-top-color="rgba(255,255,0,0.1)"
          side-bottom-color="rgba(255,255,0,0.9)"
          :depth-test="true"
          :height="1500"
        />
      </el-amap-layer-three>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap} from "@vuemap/vue-amap";
import {ElAmapLayerThree, ElAmapThreeLightAmbient, ElAmapThreePolygon} from "@vuemap/vue-amap-extra";

const center = ref([120.109233, 30.246411]);
const zoom = ref(12);
const visible = ref(true);
const source = ref<any>(null);

const clickMap = (e: any) => {
  console.log('click map: ', e);
}
const initMap = (map: any) => {
  console.log('init map: ', map);
  fetch('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_gn.json')
      .then(res => res.json())
      .then(res => {
        source.value = res;
      })
}
const changeVisible = () => {
  visible.value = !visible.value;
}
</script>

<style>
</style>
