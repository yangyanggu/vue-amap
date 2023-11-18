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
      <el-amap-loca @init="initLoca">
        <el-amap-loca-pulse-link
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
          :visible-duration="500"
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
import {ElAmapLoca, ElAmapLocaPulseLink} from "@vuemap/vue-amap-loca";

const zoom = ref(5);
const center = ref([109.595668,35.447184]);
const pitch = ref(55)

const sourceUrl = ref('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-out.json');
const layerStyle = ref({
  unit: 'meter',
  dash: [40000, 0, 40000, 0],
  lineWidth () {
    return [20000, 1000];
  },
  height (index, feat) {
    return feat.distance / 3 + 10;
  },
  // altitude: 1000,
  smoothSteps: 30,
  speed (index, prop) {
    return 1000 + Math.random() * 200000;
  },
  flowLength: 100000,
  lineColors (index, feat) {
    return ['rgb(255,228,105)', 'rgb(255,164,105)', 'rgba(1, 34, 249,1)'];
  },
  maxHeightScale: 0.3, // 弧顶位置比例
  headColor: 'rgba(255, 255, 0, 1)',
  trailColor: 'rgba(255, 255,0,0)',
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

const initLoca = (loca: any) => {
  loca.animate.start();
}

</script>

<style scoped>
</style>
