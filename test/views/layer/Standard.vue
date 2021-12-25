<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-mapbox-vector-tile
        :styles="styles"
        url="https://restapi.amap.com/rest/lbs/geohub/tiles/mvt?key=6e79f6d236e295632f21b385e363b6e8&z=[z]&x=[x]&y=[y]&size=512&id=1ed4ee90-dd77-11eb-9642-a7be29d36ac6"
      />
      <el-amap-layer-wms
        :visible="visible.wms"
        url="https://ahocevar.com/geoserver/wms"
        :param="params"
      />
      <el-amap-layer-wmts
        :visible="visible.wmts"
        url="https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/"
        :param="params"
      />
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisibleMapbox">
        矢量瓦片块{{ visible.mapbox ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeVisiblWms">
        WMS{{ visible.wms ? '隐藏' : '显示' }}
      </el-button>
      <el-button @click="changeVisibleWmst">
        WMST{{ visible.wmts ? '隐藏' : '显示' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapLayerMapboxVectorTile
  from "@vue-map/packages/layer/standard/MapboxVectorTileLayer/MapboxVectorTileLayer.vue";
import ElAmapLayerWms from "@vue-map/packages/layer/standard/WMS/WMS.vue";
import ElAmapLayerWmts from "@vue-map/packages/layer/standard/WMTS/WMTS.vue";

const colors = {};

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerWmts,
    ElAmapLayerWms,
    ElAmapLayerMapboxVectorTile,
    ElAmap},
  data(){
    return {
      center: [116.33719, 39.942384],
      bounds: [116.327911, 39.939229,116.342659, 39.946275],
      zoom: 16,
      canvas: null as any,
      context: null as any,
      visible: {
        mapbox: false,
        wms: false,
        wmts: false,
      },
      params: {
        Layer: '0',
        Version: '1.0.0',
        Format: 'image/png',
        TileMatrixSet: 'EPSG:3857'
      },
      styles:  {
        polygon: {
          color: 'rgba(62,110,255,0.3)',
          borderColor: '#3E6EFF',
          borderWidth: 2,
          visible: 1
        },
        line: {
          color: '#3E6EFF',
          lineWidth: 2,
          visible: 1
        },
        point: {
          radius: 6,
          color:  '#3E6EFF',
          borderColor: '#FFFFFF',
          borderWidth: 2,
          visible: 1
        }
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
    changeVisibleMapbox(){
      this.visible.mapbox = !this.visible.mapbox;
    },
    changeVisiblWms(){
      this.visible.wms = !this.visible.wms;
    },
    changeVisibleIndoor(){
      this.visible.wmts = !this.visible.wmts;
    },
    changeVisibleWmst(){
      this.visible.wmts = !this.visible.wmts;
    },
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
