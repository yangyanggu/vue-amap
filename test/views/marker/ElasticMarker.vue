<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-elastic-marker
        v-model:position="componentMarker.position"
        title="标号"
        :visible="componentMarker.visible"
        :draggable="componentMarker.draggable"
        :zoom-style-mapping="componentMarker.zoomStyleMapping"
        :styles="componentMarker.styles"
        @init="markerInit"
        @click="clickMarker"
      />
    </el-amap>
    <div class="control-container">
      <el-button @click="changeCenter">
        更换中心点
      </el-button>
      <el-button @click="changeVisible">
        显隐
      </el-button>
      <el-button @click="changeDraggable">
        {{ componentMarker.draggable ? '禁止标记移动' : '允许标记移动' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmapElasticMarker from "@vue-map/packages/marker/ElasticMarker/ElasticMarker.vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapElasticMarker,
    ElAmap},
  data(){
    return {
      center: [116.412866, 39.88365],
      zoom: 16,
      componentMarker: {
        position: [116.412866, 39.88365],
        visible: true,
        draggable: false,
        zoomStyleMapping:  {
          14: 0,
          15: 0,
          16: 1,
          17: 1,
          18: 1,
          19: 1,
          20: 1
        },
        styles: [{
          icon: {
            img: 'https://a.amap.com/jsapi_demos/static/resource/img/故宫.png',
            size: [16, 16],//可见区域的大小
            anchor: 'bottom-center',//锚点
            fitZoom: 14,//最合适的级别
            scaleFactor: 2,//地图放大一级的缩放比例系数
            maxScale: 2,//最大放大比例
            minScale: 1//最小放大比例
          },
          label: {
            content: '祈年殿',
            position: 'BM',
            minZoom: 15
          }
        },{
          icon: {
            img: 'https://a.amap.com/jsapi_demos/static/resource/img/qiniandian.png',
            size: [128, 160],
            anchor: 'bottom-center',
            fitZoom: 17.5,
            scaleFactor: 2,
            maxScale: 2,
            minScale: 0.125
          },
          label: {
            content: '祈年殿',
            position: 'BM'
          }
        }],
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
    changeCenter(){
      const lng = this.center[0]+0.01;
      const lat = this.center[1]+0.01;
      this.center = [lng, lat];
    },
    changeVisible(){
      this.componentMarker.visible = !this.componentMarker.visible;
    },
    markerInit(e){
      console.log('marker init: ', e);
    },
    clickMarker(){
      alert('点击了标号')
    },
    changeDraggable() {
      this.componentMarker.draggable = !this.componentMarker.draggable;
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
