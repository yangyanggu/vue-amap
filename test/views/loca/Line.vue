<template>
  <div class="map-container">
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
        <el-amap-loca-line
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
        />
      </el-amap-loca>
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisible">
        {{ visible ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeStyle">
        切换样式
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapLoca from "@vue-map/packages/loca/Loca/Loca.vue";
import ElAmapLocaLine from "@vue-map/packages/loca/LineLayer/LineLayer.vue";
const colors = ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'].reverse();
export default defineComponent({
  name: "Map",
  components: {
    ElAmapLocaLine,
    ElAmapLoca,
    ElAmap
  },
  data() {
    return {
      center: [116.335036, 39.900082],
      zoom: 8,
      pitch: 55,
      visible: true,
      sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/bj_bus.json',
      layerStyle: {
        color (index, prop) {
          const i = index % colors.length;
          return colors[i];
        },
        lineWidth: (index, prop) => {
          const i = index % colors.length;
          return i * 0.1 + 2;
        },
        altitude (index, feature) {
          const i = index % colors.length;
          return 100 * i;
        },
        // dashArray: [10, 5, 10, 0],
        dashArray: [10, 0, 10, 0],
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
    changeStyle(){
      this.layerStyle = {
        color (index, prop) {
          const i = index % colors.length;
          return colors[i];
        },
        lineWidth: (index, prop) => {
          const i = index % colors.length;
          return i * 0.5 + 2;
        },
        altitude (index, feature) {
          const i = index % colors.length;
          return 100 * i;
        },
        // dashArray: [10, 5, 10, 0],
        dashArray: [10, 0, 10, 0],
      }
    }
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.control-container {
  position: absolute;
  padding: 24px;
  background: #ffffff;
  z-index: 2;
  bottom: 40px;
  left: 150px;
  right: 150px;
}
</style>
