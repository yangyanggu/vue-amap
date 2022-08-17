<template>
  <div class="map-container">
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
    <div class="control-container">
      <el-button @click="created = !created">
        {{ created ? '销毁' : '创建' }}
      </el-button>
      <el-button @click="changeMarker('marker')">
        绘制标号
      </el-button>
      <el-button @click="changeMarker('circle')">
        绘制圆
      </el-button>
      <el-button @click="changeMarker('rectangle')">
        绘制矩形
      </el-button>
      <el-button @click="changeMarker('polyline')">
        绘制线
      </el-button>
      <el-button @click="changeMarker('polygon')">
        绘制面
      </el-button>
      <el-button @click="changeMarker('measureArea')">
        计算面积
      </el-button>
      <el-button @click="changeMarker('rule')">
        计算距离
      </el-button>
      <el-button @click="changeMarker('rectZoomIn')">
        框选放大地图
      </el-button>
      <el-button @click="changeMarker('rectZoomOut')">
        框选缩小地图
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'
import ElAmapMouseTool from "@vue-map/packages/util/MouseTool/MouseTool.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapMouseTool,
    ElAmap},
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
