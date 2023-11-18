<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="pitch"
      @init="initMap"
    >
      <el-amap-layer-tiles3d
        :url="url"
        :layer-style="layerStyle"
      />
    </el-amap>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapLayerTiles3d} from "@vuemap/vue-amap";

const zoom = ref(15);
const center = ref([121.502325,31.238165]);

const pitch = ref(90)

const url = ref('https://a.amap.com/jsapi_demos/static/data3d/single.json');

const layerStyle = ref({
  light: {
    color: 'rgb(44,59,75)', // 设置光照颜色
    intensity: 2, // 设置光照强度
  }
})

const initMap = (map: any) => {
  console.log('init map: ', map);
}

</script>

<style>
</style>
