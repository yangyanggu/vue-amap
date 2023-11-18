<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="20"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-district-cluster
        :get-position="getPosition"
        :data="clusterData"
        :visible="visible"
        @featureClick="clickFeature"
        @init="initLayer"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {ElAmap, ElAmapLayerDistrictCluster} from "@vuemap/vue-amap";

const zoom = ref(15);
const center = ref([116.33719, 39.942384]);
const visible = ref(true);
const changeVisible = () => {
  visible.value = !visible.value;
}

const clusterData = ref<any[]>([]);
const getPosition = (item: any) => {
  if (!item) {
    return null;
  }
  const parts = item.split(',');
  //返回经纬度
  return [parseFloat(parts[0]), parseFloat(parts[1])];
}
onMounted(() => {
  fetch('https://a.amap.com/amap-ui/static/data/10w.txt').then(res => {
    return res.text()
  }).then(csv => {
    clusterData.value = csv.split('\n');
  })
})

const clickMap = (e: any) => {
  console.log('click map: ', e);
}
const initMap = (map: any) => {
  console.log('init map: ', map);
}
const initLayer = (layer: any) => {
  console.log('聚合图层: ', layer);
}
const clickFeature = (e: any, feature: any) => {
  console.log('点击区划面： ', e, feature)
}
</script>

