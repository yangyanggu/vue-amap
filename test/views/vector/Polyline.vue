<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-polyline
        v-model:path="polyline.path"
        :editable="polyline.editable"
        :visible="polyline.visible"
        :draggable="polyline.draggable"
        @click="click"
      />
    </el-amap>
    <div class="control-container">
      <el-button @click="toggleVisible">
        {{ polyline.visible ? '隐藏标记' : '显示标记' }}
      </el-button>
      <el-button @click="changeDraggable">
        {{ polyline.draggable ? '禁止标记移动' : '允许标记移动' }}
      </el-button>
      <el-button @click="changeEditable">
        {{ polyline.editable ? '停止编辑' : '开始编辑' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue'
import ElAmapPolyline from "@vuemap/vue-amap/packages/vector/Polyline/Polyline.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapPolyline,
    ElAmap},
  data(){
    return {
      zoom: 15,
      center: [121.5273285, 31.25515044],
      polyline: {
        path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
        editable: false,
        visible: true,
        draggable: false
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
    toggleVisible(){
      this.polyline.visible = !this.polyline.visible;
    },
    changeEditable() {
      this.polyline.editable = !this.polyline.editable;
    },
    changeDraggable(){
      this.polyline.draggable = !this.polyline.draggable;
    },
    click(e) {
      alert('click GeoJSON');
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
