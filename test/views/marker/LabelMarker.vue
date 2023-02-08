<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-labels>
        <el-amap-label-marker
          v-if="created"
          :visible="labelOptions.visible"
          :position="labelOptions.position"
          :text="labelOptions.text"
          :icon="labelOptions.icon"
          @init="markerInit"
        />
        <el-amap-label-marker
          v-for="item in labels"
          :key="item.id"
          :re-event-when-update="true"
          :position="item.position"
          :text="item.text"
          :icon="item.icon"
          @click="() => {clickMarker(item)}"
        />
      </el-amap-layer-labels>
    </el-amap>
    <div class="control-container">
      <el-button @click="changeCenter">
        更换中心点
      </el-button>
      <el-button @click="changeVisible">
        显隐
      </el-button>
      <el-button @click="createOrDestroy">
        {{ created ? '销毁' : '创建' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue'
import ElAmapLabelMarker from "@vuemap/vue-amap/packages/marker/LabelMarker/LabelMarker.vue";
import ElAmapLayerLabels from "@vuemap/vue-amap/packages/layer/data/Labels/Labels.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerLabels,
    ElAmapLabelMarker,
    ElAmap},
  data(){
    return {
      center: [121.5495395, 31.21515044],
      zoom: 16,
      labelOptions: {
        visible: true,
        position: [121.5495395, 31.21515044],
        text: {
          content: '测试content',
          direction: 'right',
          style: {
            fontSize: 15,
            fillColor: '#fff',
            strokeColor: 'rgba(255,0,0,0.5)',
            strokeWidth: 2,
            padding: [3, 10],
            backgroundColor: 'yellow',
            borderColor: '#ccc',
            borderWidth: 3,
          }
        },
        icon: {
          image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
          anchor: 'bottom-center',
          size: [25, 34],
          clipOrigin: [459, 92],
          clipSize: [50, 68]
        },
      },
      labels: [] as any[],
      created: true,
      timer: null as any
    }
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  mounted() {
    this.timer = setInterval(() => {
      this.labels = [{
        id:1,
        visible: true,
        position: [121.5495395, 31.21615044],
        text: {
          content: new Date().toLocaleString(),
          direction: 'right',
          style: {
            fontSize: 15,
            fillColor: '#fff',
            strokeColor: 'rgba(255,0,0,0.5)',
            strokeWidth: 2,
            padding: [3, 10],
            backgroundColor: 'yellow',
            borderColor: '#ccc',
            borderWidth: 3,
          }
        },
        icon: {
          image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
          anchor: 'bottom-center',
          size: [25, 34],
          clipOrigin: [459, 92],
          clipSize: [50, 68]
        },
      }/*,{
          id:2,
          visible: true,
          position: [121.5495395, 31.21415044],
          text: {
            content: new Date().toLocaleString(),
            direction: 'right',
            style: {
              fontSize: 15,
              fillColor: '#fff',
              strokeColor: 'rgba(255,0,0,0.5)',
              strokeWidth: 2,
              padding: [3, 10],
              backgroundColor: 'yellow',
              borderColor: '#ccc',
              borderWidth: 3,
            }
          },
          icon: {
            image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
            anchor: 'bottom-center',
            size: [25, 34],
            clipOrigin: [459, 92],
            clipSize: [50, 68]
          },
        }*/];
    },1000)
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
      this.labelOptions.visible = !this.labelOptions.visible;
    },
    markerInit(e){

      console.log('marker init: ', e);
    },
    createOrDestroy() {
      this.created = !this.created;
    },
    clickMarker(item){
      console.log('item: ', item)
      console.log('labels[0]: ', this.labels[0])
      console.log('是否相等: ', item === this.labels[0])
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
