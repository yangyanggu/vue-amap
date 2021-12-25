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
      <el-amap-loca @init="initLoca">
        <el-amap-loca-pulse-link
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
          :visible-duration="500"
        />
      </el-amap-loca>
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisible">
        {{ visible ? '隐藏' : '显示' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapLoca from "@vue-map/packages/loca/Loca/Loca.vue";
import ElAmapLocaPulseLink from "@vue-map/packages/loca/PulseLinkLayer/PulseLinkLayer.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLocaPulseLink,
    ElAmapLoca,
    ElAmap
  },
  data() {
    return {
      center: [109.595668,35.447184],
      zoom: 5,
      pitch: 55,
      visible: true,
      sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-out.json',
      layerStyle: {
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
      }
    }
  },
  methods: {
    clickMap(e) {
      console.log('click map: ', e);
    },
    initMap(e) {
      console.log('init map: ', e);
    },
    changeVisible() {
      this.visible = !this.visible;
    },
    initLoca(loca){
      loca.animate.start();
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
