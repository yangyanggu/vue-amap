<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-polygon
        v-model:path="polygon.path"
        :visible="polygon.visible"
        :editable="polygon.edit"
        :draggable="polygon.draggable"
        @click="click"
        @adjust="adjust"
      />
    </el-amap>
    <div class="control-container">
      <el-button @click="toggleVisible">
        {{ polygon.visible ? '隐藏标记' : '显示标记' }}
      </el-button>
      <el-button @click="changeDraggable">
        {{ polygon.draggable ? '禁止标记移动' : '允许标记移动' }}
      </el-button>
      <el-button @click="changeEditable">
        {{ polygon.edit ? '停止编辑' : '开始编辑' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapPolygon from "@vue-map/packages/vector/Polygon/Polygon.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapPolygon,
    ElAmap},
  data(){
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      polygon:{
        draggable: false,
        visible: true,
        edit: true,
        path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]],
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
      this.polygon.visible = !this.polygon.visible;
    },
    changeEditable() {
      this.polygon.edit = !this.polygon.edit;
    },
    changeDraggable(){
      this.polygon.draggable = !this.polygon.draggable;
    },
    click(e) {
      alert('click GeoJSON');
    },
    adjust(e){
      console.log('adjust: ', e)
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
