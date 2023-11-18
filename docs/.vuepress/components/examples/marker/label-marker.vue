<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-labels>
        <el-amap-label-marker
          :visible="labelOptions.visible"
          :position="labelOptions.position"
          :text="labelOptions.text"
          :icon="labelOptions.icon"
          @click="clickMarker"
        />
      </el-amap-layer-labels>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ labelOptions.visible? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapLayerLabels, ElAmapLabelMarker} from "@vuemap/vue-amap";

const zoom = ref(16);
const center = ref([121.5495395, 31.21515044]);

const labelOptions = ref({
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
  }
});
const changeVisible = () => {
  labelOptions.value.visible = !labelOptions.value.visible;
}

const clickMap = (e: any) => {
  console.log('click map: ', e);
}
const initMap = (map: any) => {
  console.log('init map: ', map);
}

const clickMarker = () => {
  alert('点击了标号');
}

</script>

<style scoped>
</style>
