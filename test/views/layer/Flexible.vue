<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-flexible
        :create-tile="createTile"
        :visible="visible"
      />
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
import ElAmapLayerFlexible from "@vue-map/packages/layer/data/Flexible/Flexible.vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerFlexible,
    ElAmap},
  data(){
    return {
      center: [121.5273285, 31.21515044],
      zoom: 16,
      visible: true
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
    },
    changeVisible(){
      this.visible = !this.visible;
    },
    createTile(x, y, z, success, fail){
      const c = document.createElement('canvas');
      c.width = c.height = 256;

      const cxt = c.getContext("2d") as any;
      cxt.font = "15px Verdana";
      cxt.fillStyle = "#ff0000";
      cxt.strokeStyle = "#FF0000";
      cxt.strokeRect(0, 0, 256, 256);
      cxt.fillText(`(${  [x, y, z].join(',')  })`, 10, 30);
      // 通知API切片创建完成
      success(c);
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
