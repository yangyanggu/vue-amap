<template>
  <div class="map-page-container">
    <el-amap
      view-mode="3D"
      :pitch="pitch"
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-loca>
        <el-amap-loca-z-marker
          :visible="visible"
          :source-url="sourceUrl"
          :layer-style="layerStyle"
          :visible-duration="500"
        />
      </el-amap-loca>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="changeVisible">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data() {
    const colors = [
      'rgba(254,255,198,0.95)',
      'rgba(255,238,149,0.95)',
      'rgba(255,217,99,0.95)',
      'rgba(255,175,43,0.95)',
      'rgba(255,135,24,0.95)',
      'rgba(234,10,0,0.95)',
      'rgba(195,0,0,0.95)',
      'rgba(139,0,0,0.95)',
    ];
    return {
      center: [116.597005,39.914388],
      zoom: 16,
      pitch: 75,
      visible: true,
      sourceUrl: '/json/zmarker.json',
      layerStyle: {
        unit: 'meter',
        content: (index, feat) => {
          const props = feat.properties;
          const leftColor = props.price < 60000 ? 'rgba(0, 28, 52, 0.6)' : 'rgba(33,33,33,0.6)';
          const rightColor = props.price < 60000 ? '#038684' : 'rgba(172, 137, 51, 0.3)';
          const borderColor = props.price < 60000 ? '#038684' : 'rgba(172, 137, 51, 1)';
          return (
              `${'<div style="width: 490px; height: 228px; padding: 0 0;">' +
              '<p style="display: block; height:80px; line-height:80px;font-size:40px;background-image: linear-gradient(to right, '}${
               leftColor  },${  leftColor  },${  rightColor  },rgba(0,0,0,0.4)); border:4px solid ${
               borderColor  }; color:#fff; border-radius: 15px; text-align:center; margin:0; padding:5px;">${
              props['name']
              }: ${
              props['price'] / 10000
              }</p><span style="width: 130px; height: 130px; margin: 0 auto; display: block; background: url(https://a.amap.com/Loca/static/loca-v2/demos/images/prism_${
               props['price'] < 60000 ? 'blue' : 'yellow'  }.png);"></span></div>`
          );
        },
        alwaysFront: true,
        size: [490/2, 222/2],
        rotation: 0,
      }
    }
  },
  methods: {
    clickMap(e) {
      console.log('click map: ', e);
    },
    initMap(map) {
      console.log('init map: ', map);
    },
    changeVisible() {
      this.visible = !this.visible;
    },
  }
})
</script>

<style scoped>
</style>
