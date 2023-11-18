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
        <el-amap-loca-icon
          :visible="visible"
          :source-data="sourceData"
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
import {ElAmapLoca, ElAmapLocaIcon} from "@vuemap/vue-amap-loca";

const zoom = ref(4.8);
const center = ref([105.601, 35.32]);
const pitch = ref(55)

const trafficIcons = {
  1: 'https://a.amap.com/Loca/static/loca-v2/demos/images/traffic-control.png',
  2: 'https://a.amap.com/Loca/static/loca-v2/demos/images/jam.png',
  3: 'https://a.amap.com/Loca/static/loca-v2/demos/images/construction.png',
  4: 'https://a.amap.com/Loca/static/loca-v2/demos/images/close.png',
  5: 'https://a.amap.com/Loca/static/loca-v2/demos/images/fog.png',
  0: 'https://a.amap.com/Loca/static/loca-v2/demos/images/accident.png',
};
const sourceData = ref({})
const layerStyle = ref({
  unit: 'px',
  icon: (index, feature) => {
    const data = feature.properties.rawData;
    const url = trafficIcons[data.type % Object.keys(trafficIcons).length];
    return url;
  },
  iconSize: [40,40],
  rotation: 0,
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
  createData()
}

const createData = () => {
  fetch('/json/events.json').then(response => response.json()).then(events => {
    const _events = events[0].events;
    const list = _events.map(e => {
      const ll = e.lngLat.split(',');
      const arr = [parseFloat(ll[0]), parseFloat(ll[1])]
      return {
        "type": "Feature",
        "properties": {
          rawData: e
        },
        "geometry": {
          "type": "Point",
          "coordinates": arr
        }
      }
    })

    sourceData.value = Object.freeze({
      "type": "FeatureCollection",
      "features": list,
    });
  })
}

</script>

<style scoped>
</style>
