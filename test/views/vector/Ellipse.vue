<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-ellipse
        v-model:center="circleCenter"
        v-model:radius="radius"
        :visible="visible"
        :editable="edit"
        :draggable="draggable"
        @click="click"
      />
    </el-amap>
    <div class="control-container">
      <el-button @click="toggleVisible">
        {{ visible ? '隐藏标记' : '显示标记' }}
      </el-button>
      <el-button @click="changeDraggable">
        {{ draggable ? '禁止标记移动' : '允许标记移动' }}
      </el-button>
      <el-button @click="changeEditable">
        {{ edit ? '停止编辑' : '开始编辑' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapEllipse from "@vue-map/packages/vector/Ellipse/Ellipse.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapEllipse,
    ElAmap},
  data(){
    return {
      zoom: 13,
      center: [121.5273285, 31.21515044],
      draggable: false,
      visible: true,
      edit: true,
      circleCenter: [121.5273285, 31.21515044],
      radius: [500, 200],
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
    },
    changeEditable() {
      this.edit = !this.edit;
    },
    toggleVisible(){
      this.visible = !this.visible;
    },
    changeDraggable(){
      this.draggable = !this.draggable;
    },
    click(e) {
      alert('click Circle');
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
