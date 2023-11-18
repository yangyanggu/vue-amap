<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
    >
      <el-amap-layer-mapbox-vector-tile
        :visible="visible"
        :url="url"
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
import {ElAmap, ElAmapLayerMapboxVectorTile} from "@vuemap/vue-amap";

const zoom = ref(12);
const center = ref([121.59996, 31.197646]);

const url = ref('https://restapi.amap.com/rest/lbs/geohub/tiles/mvt?key=747f980f217a31ba68d99301045a3fa7&z=[z]&x=[x]&y=[y]&size=512&id=1ed4ee90-dd77-11eb-9642-a7be29d36ac6');

const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}

</script>

<style>
</style>
