<template>
  <div class="map-page-container">
    <el-amap :center="center" :zoom="zoom">
      <el-amap-layer-flexible :visible="visible" :create-tile="createTile"></el-amap-layer-flexible>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">{{visible? '隐藏' : '显示'}}</button>
  </div>
</template>

<style>
</style>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      zoom: 12,
      center: [121.59996, 31.197646],
      visible: true
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
    createTile(x, y, z, success, fail){
      let c = document.createElement('canvas');
      c.width = c.height = 256;

      let cxt = c.getContext("2d");
      cxt.font = "15px Verdana";
      cxt.fillStyle = "#ff0000";
      cxt.strokeStyle = "#FF0000";
      cxt.strokeRect(0, 0, 256, 256);
      cxt.fillText('(' + [x, y, z].join(',') + ')', 10, 30);
      // 通知API切片创建完成
      success(c);
    }
  }
});
</script>
