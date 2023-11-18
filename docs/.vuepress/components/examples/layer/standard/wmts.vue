<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
    >
      <el-amap-layer-wmts
        :visible="visible"
        :url="url"
        :blend="false"
        :params="params"
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
import {ElAmap, ElAmapLayerWmts} from "@vuemap/vue-amap";

const zoom = ref(12);
const center = ref([121.59996, 31.197646]);

const url = ref('https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/');

const params = {
  Layer: '0',
  Version: '1.0.0',
  Format: 'image/png',
  TileMatrixSet: 'EPSG:3857'
}

const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}

</script>

<style>
</style>
