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
        <el-amap-loca-grid
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

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "Map",
  data() {
    const colors = ['#FAE200', '#D27E37', '#C53634', '#C12B6E', '#A92E9A', '#67238A', '#211A50', '#18244E'].reverse();
    const heights = [100, 200, 400, 600, 800, 1400, 1800, 4000];

    return {
      center: [114.341232, 30.567523],
      zoom: 11,
      pitch: 55,
      visible: true,
      sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/wh_car.json',
      layerStyle: {
        unit: 'meter',
        radius: 66,
        gap: 0,
        altitude: 100,
        height(index, feature) {
          const ranks = feature.coordinates && feature.coordinates.length || 0;
          return ranks < 5 ?
              heights[0] : ranks < 10 ?
                  heights[1] : ranks < 20 ?
                      heights[2] : ranks < 30 ?
                          heights[3] : ranks < 50 ?
                              heights[4] : ranks < 80 ?
                                  heights[5] : ranks < 100 ?
                                      heights[6] : heights[7];
        },
        topColor(index, feature) {
          const ranks = feature.coordinates && feature.coordinates.length || 0;
          return ranks < 5 ?
              colors[0] : ranks < 10 ?
                  colors[1] : ranks < 20 ?
                      colors[2] : ranks < 30 ?
                          colors[3] : ranks < 50 ?
                              colors[4] : ranks < 80 ?
                                  colors[5] : ranks < 100 ?
                                      colors[6] : colors[7];
        },
        sideTopColor(index, feature) {
          const ranks = feature.coordinates && feature.coordinates.length || 0;
          return ranks < 5 ?
              colors[0] : ranks < 10 ?
                  colors[1] : ranks < 20 ?
                      colors[2] : ranks < 30 ?
                          colors[3] : ranks < 50 ?
                              colors[4] : ranks < 80 ?
                                  colors[5] : ranks < 100 ?
                                      colors[6] : colors[7];
        },
        sideBottomColor(index, feature) {
          const ranks = feature.coordinates && feature.coordinates.length || 0;
          return ranks < 5 ?
              colors[0] : ranks < 10 ?
                  colors[1] : ranks < 20 ?
                      colors[2] : ranks < 30 ?
                          colors[3] : ranks < 50 ?
                              colors[4] : ranks < 80 ?
                                  colors[5] : ranks < 100 ?
                                      colors[6] : colors[7];
        }
      }
    }
  },
  methods: {
    clickMap(e) {
      console.log('click map: ', e);
    },
    initMap(map) {
      console.log('init map: ', map);
    },
    changeVisible() {
      this.visible = !this.visible;
    },
  }
})
</script>

<style scoped>
</style>
