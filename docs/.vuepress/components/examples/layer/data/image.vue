<template>
  <div class="map-page-container">
    <el-amap :center="center" :zoom="zoom">
      <el-amap-layer-image url="https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg" :bounds="bounds" :visible="visible"></el-amap-layer-image>
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
      zoom: 15,
      center: [116.33719, 39.942384],
      visible: true,
      bounds: [116.327911, 39.939229,116.342659, 39.946275]
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
  }
});
</script>
