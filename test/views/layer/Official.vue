<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-buildings :visible="visible.buildings" />
      <el-amap-layer-district
        type="Province"
        :visible="visible.district"
        adcode="320000"
        :depth="2"
        :styles="styles"
      />
      <el-amap-layer-indoor-map
        :visible="visible.indoor"
        @init="initIndoorLayer"
      />
      <el-amap-layer-road-net :visible="visible.road" />
      <el-amap-layer-satellite :visible="visible.satellite" />
      <el-amap-layer-tile
        :visible="visible.tile"
        :tile-url="'https://wprd0{1,2,3,4}.is.autonavi.com/appmaptile?x=[x]&y=[y]&z=[z]&size=1&scl=1&style=8&ltype=11'"
      />
      <el-amap-layer-traffic :visible="visible.traffic" />
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisibleBuildings">
        建筑楼块3D图层{{ visible.buildings ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeVisibleDistrict">
        简易行政区划图{{ visible.district ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeVisibleIndoor">
        室内图层{{ visible.indoor ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeVisibleRoad">
        路网图层{{ visible.road ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeVisibleSatellite">
        卫星图层{{ visible.satellite ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeVisibleTile">
        切片图层{{ visible.tile ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeVisibleTraffic">
        实时交通图层{{ visible.traffic ? '隐藏' : '显示' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue'
import ElAmapLayerBuildings from "@vuemap/vue-amap/packages/layer/official/Buildings/Buildings.vue";
import ElAmapLayerDistrict from "@vuemap/vue-amap/packages/layer/official/DistrictLayer/DistrictLayer.vue";
import ElAmapLayerIndoorMap from "@vuemap/vue-amap/packages/layer/official/IndoorMap/IndoorMap.vue";
import ElAmapLayerRoadNet from "@vuemap/vue-amap/packages/layer/official/RoadNet/RoadNet.vue";
import ElAmapLayerSatellite from "@vuemap/vue-amap/packages/layer/official/Satellite/Satellite.vue";
import ElAmapLayerTile from "@vuemap/vue-amap/packages/layer/official/TileLayer/TileLayer.vue";
import ElAmapLayerTraffic from "@vuemap/vue-amap/packages/layer/official/Traffic/Traffic.vue";

const colors = {};
const getColorByAdcode = function (adcode) {
  if (!colors[adcode]) {
    const gb = Math.random() * 155 + 50;
    colors[adcode] = `rgb(${  gb  },${  gb  },255)`;
  }

  return colors[adcode];
};

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerTraffic,
    ElAmapLayerTile,
    ElAmapLayerSatellite,
    ElAmapLayerRoadNet,
    ElAmapLayerIndoorMap,
    ElAmapLayerDistrict,
    ElAmapLayerBuildings,
    ElAmap},
  data(){
    return {
      center: [116.33719, 39.942384],
      bounds: [116.327911, 39.939229,116.342659, 39.946275],
      zoom: 16,
      canvas: null as any,
      context: null as any,
      visible: {
        buildings: false,
        district: false,
        indoor: false,
        road: false,
        satellite: false,
        tile: false,
        traffic: false
      },
      styles: {
        'fill': function (properties) {
          // properties为可用于做样式映射的字段，包含
          // NAME_CHN:中文名称
          // adcode_pro
          // adcode_cit
          // adcode
          const adcode = properties.adcode;
          return getColorByAdcode(adcode);
        },
        'province-stroke': 'cornflowerblue',
        'city-stroke': 'white', // 中国地级市边界
        'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
      }
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
    },
    changeVisibleBuildings(){
      this.visible.buildings = !this.visible.buildings;
    },
    changeVisibleDistrict(){
      if(this.visible.district){
        this.center = [118.763563,32.061377];
        this.zoom = 6;
      }
      this.visible.district = !this.visible.district;
    },
    changeVisibleIndoor(){
      if(this.visible.indoor){
        this.center = [121.5273285, 31.21515044];
        this.zoom = 14;
      }
      this.visible.indoor = !this.visible.indoor;
    },
    changeVisibleRoad(){
      this.visible.road = !this.visible.road;
    },
    changeVisibleSatellite(){
      this.visible.satellite = !this.visible.satellite;
    },
    changeVisibleTile(){
      this.visible.tile = !this.visible.tile;
    },
    changeVisibleTraffic(){
      this.visible.traffic = !this.visible.traffic;
    },
    initIndoorLayer(layer){
      layer.showIndoorMap('B000A9VHIG');
    }
  }
})
</script>

<style scoped>
.map-container{
  width: 100%;
  height: 100%;
  position: relative;
}
.control-container{
  position: absolute;
  padding: 24px;
  background: #ffffff;
  z-index: 2;
  bottom: 40px;
  left: 150px;
  right: 150px;
}
</style>
