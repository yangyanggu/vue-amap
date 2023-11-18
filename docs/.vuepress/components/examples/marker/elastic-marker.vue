<template>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
    >
      <el-amap-elastic-marker
        :position="componentMarker.position"
        title="标号"
        :visible="componentMarker.visible"
        :draggable="componentMarker.draggable"
        :zoom-style-mapping="componentMarker.zoomStyleMapping"
        :styles="componentMarker.styles"
        @init="markerInit"
        @click="clickMarker"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible()">
      {{ componentMarker.visible? '隐藏' : '显示' }}
    </button>
    <button @click="changeDraggable">
      {{ componentMarker.draggable ? '禁止标记移动' : '允许标记移动' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapElasticMarker} from "@vuemap/vue-amap";

const zoom = ref(16);
const center = ref([116.412866, 39.88365]);

const draggable = ref(false);

const componentMarker = ref({
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
});
const changeVisible = () => {
  componentMarker.value.visible = !componentMarker.value.visible;
}

const clickMap = (e: any) => {
  console.log('click map: ', e);
}
const initMap = (map: any) => {
  console.log('init map: ', map);
}

const changeDraggable = () => {
  componentMarker.value.draggable = !componentMarker.value.draggable;
}
const clickMarker = () => {
  alert('点击了标号');
}

const markerInit = (e) => {
  console.log('marker init: ', e);
}

</script>

<style>
</style>
