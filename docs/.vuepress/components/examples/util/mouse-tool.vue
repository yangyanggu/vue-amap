<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-mouse-tool
        v-if="created"
        :type="type"
        :auto-clear="true"
        @draw="draw"
      />
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="created = !created">
      {{ created ? '销毁' : '创建' }}
    </button>
    <button @click="changeMarker('marker')">
      绘制标号
    </button>
    <button @click="changeMarker('circle')">
      绘制圆
    </button>
    <button @click="changeMarker('rectangle')">
      绘制矩形
    </button>
    <button @click="changeMarker('polyline')">
      绘制线
    </button>
    <button @click="changeMarker('polygon')">
      绘制面
    </button>
    <button @click="changeMarker('measureArea')">
      计算面积
    </button>
    <button @click="changeMarker('rule')">
      计算距离
    </button>
    <button @click="changeMarker('rectZoomIn')">
      框选放大地图
    </button>
    <button @click="changeMarker('rectZoomOut')">
      框选缩小地图
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  data(){
    return {
      center: [121.5273285, 31.21515044],
      zoom: 16,
      markers: null,
      type: 'marker',
      created: true
    }
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
    },
    draw(e, target){
      console.log('绘制完成 : ', e, target)
    },
    changeMarker(type: string){
      this.type = type;
    }
  }
})
</script>

<style scoped>
</style>
