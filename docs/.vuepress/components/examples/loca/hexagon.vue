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
        <el-amap-loca-hexagon
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
import {ElAmapLoca, ElAmapLocaHexagon} from "@vuemap/vue-amap-loca";

const zoom = ref(10);
const center = ref([120.115196, 30.17133]);
const pitch = ref(55)

const colors = ['#F4FFB3', '#BFDDA8', '#96CA8D', '#75BA89', '#5EAC86', '#4D9A96', '#3F748F', '#1D3748'].reverse();
const heights = [100, 200, 300, 900, 1000, 1200, 1500, 3000];
// 计算路口rank之和
function sum(arr) {
  let sum = 0;
  arr.forEach(a => {
    sum += a.properties.rank;
  });
  return sum;
}

const sourceUrl = ref('https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_road_level.json')
const layerStyle = ref({
  unit: 'meter',
  radius: 120,
  gap: 0,
  altitude: 0,
  height (index, feature) {
    const ranks = sum(feature.coordinates);
    // return ranks < 60 ? heights[2] : heights[6];
    return ranks < 20 ?
        heights[0] : ranks < 40 ?
            heights[1] : ranks < 60 ?
                heights[2] : ranks < 80 ?
                    heights[3] : ranks < 100 ?
                        heights[4] : ranks < 120 ?
                            heights[5] : ranks < 130 ?
                                heights[6] : heights[7];
  },
  topColor (index, feature) {
    const ranks = sum(feature.coordinates);
    // return ranks < 60 ? colors[1] : colors[6];
    return ranks < 20 ?
        colors[0] : ranks < 40 ?
            colors[1] : ranks < 60 ?
                colors[2] : ranks < 80 ?
                    colors[3] : ranks < 100 ?
                        colors[4] : ranks < 120 ?
                            colors[5] : ranks < 130 ?
                                colors[6] : colors[7];
  },
  sideBottomColor (index, feature) {
    const ranks = sum(feature.coordinates);
    // return ranks < 60 ? colors[1] : colors[6];
    return ranks < 20 ?
        colors[0] : ranks < 40 ?
            colors[1] : ranks < 60 ?
                colors[2] : ranks < 80 ?
                    colors[3] : ranks < 100 ?
                        colors[4] : ranks < 120 ?
                            colors[5] : ranks < 130 ?
                                colors[6] : colors[7];
  },
  sideTopColor (index, feature) {
    const ranks = sum(feature.coordinates);
    // return ranks < 60 ? colors[1] : colors[6];
    return ranks < 20 ?
        colors[0] : ranks < 40 ?
            colors[1] : ranks < 60 ?
                colors[2] : ranks < 80 ?
                    colors[3] : ranks < 100 ?
                        colors[4] : ranks < 120 ?
                            colors[5] : ranks < 130 ?
                                colors[6] : colors[7];
  }
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
