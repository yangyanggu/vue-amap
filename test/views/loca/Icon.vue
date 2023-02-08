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
      <el-amap-loca
        @click="clickMarker"
        @mousemove="mousemoveMarker"
        @rightclick="rightClickMarker"
      >
        <el-amap-loca-icon
          :visible="visible"
          :source-data="sourceData"
          :layer-style="layerStyle"
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
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue'
import ElAmapLoca from "@vuemap/vue-amap-loca/packages/Loca/Loca.vue";
import ElAmapLocaIcon from "@vuemap/vue-amap-loca/packages/IconLayer/IconLayer.vue";

const trafficIcons = {
  1: 'https://a.amap.com/Loca/static/loca-v2/demos/images/traffic-control.png',
  2: 'https://a.amap.com/Loca/static/loca-v2/demos/images/jam.png',
  3: 'https://a.amap.com/Loca/static/loca-v2/demos/images/construction.png',
  4: 'https://a.amap.com/Loca/static/loca-v2/demos/images/close.png',
  5: 'https://a.amap.com/Loca/static/loca-v2/demos/images/fog.png',
  0: 'https://a.amap.com/Loca/static/loca-v2/demos/images/accident.png',
};

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLocaIcon,
    ElAmapLoca,
    ElAmap
  },
  data() {
    return {
      center: [105.601, 35.32],
      zoom: 4.8,
      pitch: 55,
      visible: true,
      sourceData: {},
      layerStyle: {
        unit: 'px',
        icon: (index, feature) => {
          const data = feature.properties.rawData;
          const url = trafficIcons[data.type % Object.keys(trafficIcons).length];
          return url;
        },
        iconSize: [40,40],
        rotation: 0,
      }
    }
  },
  methods: {
    clickMap(e) {
      console.log('click map: ', e);
    },
    initMap(map) {
      console.log('init map: ', map);
      this.createData();
    },
    changeVisible() {
      this.visible = !this.visible;
    },
    createData(){
      fetch('./events.json').then(response => response.json()).then(events => {
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

        this.sourceData = Object.freeze({
          "type": "FeatureCollection",
          "features": list,
        });
      })
    },
    clickMarker(e) {
      console.log('click marker: ', e)
    },
    mousemoveMarker(e) {
      console.log('mousemove Marker: ', e)
    },
    rightClickMarker(e) {
      console.log('right click marker: ', e)
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
