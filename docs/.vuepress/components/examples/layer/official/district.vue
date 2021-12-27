<template>
  <div class="map-page-container">
    <el-amap :center="center" :zoom="zoom">
      <el-amap-layer-district :visible="visible" type="Province" adcode="320000" :depth="2" :styles="styles"></el-amap-layer-district>
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
// 颜色辅助方法

export default defineComponent({
  data() {
    let colors = {};
    const getColorByAdcode = function (adcode) {
      if (!colors[adcode]) {
        let gb = Math.random() * 155 + 50;
        colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
      }

      return colors[adcode];
    };

    return {
      zoom: 6,
      center: [118.763563,32.061377],
      visible: true,
      styles: {
        'fill': function (properties) {
          // properties为可用于做样式映射的字段，包含
          // NAME_CHN:中文名称
          // adcode_pro
          // adcode_cit
          // adcode
          let adcode = properties.adcode;
          return getColorByAdcode(adcode);
        },
        'province-stroke': 'cornflowerblue',
        'city-stroke': 'white', // 中国地级市边界
        'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
      }
    };
  },

  methods: {
    switchVisible() {
      this.visible = !this.visible;
    },
  }
});
</script>
