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
        <el-amap-loca-link
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
import {ElAmapLoca, ElAmapLocaLink} from "@vuemap/vue-amap-loca";

const zoom = ref(8);
const center = ref([116.335036, 39.900082]);
const pitch = ref(55)

const sourceUrl = ref('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/bj_bus.json')
const colors = ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'].reverse();
const layerStyle = ref({
  lineColors : colors,
  height : (index, prop) => {
    const i = index % colors.length;
    return i * 200 + 40;
  },
  smoothSteps : 100,
  // dashArray: [10, 5, 10, 0],
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
