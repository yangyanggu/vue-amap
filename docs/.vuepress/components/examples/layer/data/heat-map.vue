<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      @init="initMap"
    >
      <el-amap-layer-heat-map
        v-if="dataSet"
        :visible="visible"
        :data-set="dataSet"
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
import {ElAmap, ElAmapLayerHeatMap} from "@vuemap/vue-amap";

const zoom = ref(11);
const center = ref([116.418261, 39.921984]);

const dataSet = ref(null)

const visible = ref(true)
const switchVisible = () => {
  visible.value = !visible.value;
}

const initMap = () => {
  fetch('//a.amap.com/jsapi_demos/static/resource/heatmapData.js').then(res => res.text()).then(text => {
    const array = text.split('=');
    if(array.length === 2){
      let str = array[1].trim();
      str = str.replace(';','')
      dataSet.value = {
        data: JSON.parse(str),
        max: 100
      }
    }
  })
}

</script>

<style>
</style>
