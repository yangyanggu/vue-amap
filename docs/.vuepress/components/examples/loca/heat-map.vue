<template>
  <div class="map-page-container">
    <el-amap
      view-mode="3D"
      :pitch="pitch"
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-loca>
        <el-amap-loca-heatmap
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
        />
      </el-amap-loca>
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
import {ElAmapLoca, ElAmapLocaHeatmap} from "@vuemap/vue-amap-loca";

const zoom = ref(10);
const center = ref([120.115196, 30.17133]);
const pitch = ref(55)

const sourceUrl = ref('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_house_order.json');
const layerStyle = ref({
  radius: 20,
  unit: 'px',
  height: 90,
  // radius: 10,
  // unit: 'px',
  // height: 10,
  gradient: {
    0.1: 'rgba(50,48,118,1)',
    0.2: 'rgba(127,60,255,1)',
    0.4: 'rgba(166,53,219,1)',
    0.6: 'rgba(254,64,95,1)',
    0.8: 'rgba(255,98,4,1)',
    1: 'rgba(236,220,79,1)',
  },
  value (index, feature) {
    return feature.properties.count;
  },
  min: 0,
  max: 10,  //4.6
  heightBezier: [0, .53, .37, .98],
})


const visible = ref(true)
const changeVisible = () => {
  visible.value = !visible.value;
}

const clickMap = (e) => {
  console.log('click map: ', e);
}
const initMap = (map) => {
  console.log('init map: ', map);
}

</script>

<style scoped>
</style>
