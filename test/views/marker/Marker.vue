<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-marker
        v-model:position="componentMarker.position"
        :visible="componentMarker.visible"
        :draggable="componentMarker.draggable"
        :move-options="moveOptions"
        @init="markerInit"
        @click="clickMarker"
      >
        <div
          :class="[createClass]"
          style="padding: 5px 10px;white-space: nowrap;background: blue;color: #fff;"
        >
          {{ text }}
        </div>
      </el-amap-marker>
      <el-amap-marker
        :position="componentMarker2.position"
        :content="componentMarker2.content"
      />
      <el-amap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      >
        <el-input v-model="text" />
        <el-button
          @click="clickButton"
        >
          测试点击
        </el-button>
      </el-amap-marker>
      <el-amap-marker
        v-for="item in testData"
        :key="item.key"
        :position="item.center"
      >
        <div>{{ item.key }}</div>
      </el-amap-marker>
    </el-amap>
    <div class="control-container">
      <el-button @click="changePosition">
        更换位置
      </el-button>
      <el-button @click="toggleVisible">
        {{ componentMarker.visible ? '隐藏标记' : '显示标记' }}
      </el-button>
      <el-button @click="changeDraggable">
        {{ componentMarker.draggable ? '禁止标记移动' : '允许标记移动' }}
      </el-button>
      <el-button @click="changeText">
        更换marker内容
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue';
import ElAmapMarker from "@vuemap/vue-amap/packages/marker/Marker/Marker.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapMarker,
    ElAmap},
  data (){
    return {
      center: [121.5273285, 31.21515044],
      zoom: 16,
      markers: [
        {
          position: [121.5273285, 31.21515044],
          id: 1
        }
      ],
      componentMarker: {
        position: [121.5273285, 31.21315058],
        visible: true,
        draggable: false
      },
      componentMarker2: {
        position: [121.5283285, 31.21315058],
        content: 'hello world'
      },
      text: '测试content',
      testData: [{ center: [121.47054713223952, 31.219212711974038], key: '021_GA027' },
        { center: [121.51326838183398, 31.222604897193477], key: '021_GA054' },
        { center: [121.49850341562114, 31.216586683573897], key: '021_GA017' },
        { center: [121.49311169834493, 31.21689267791807], key: '021_GA018' },
        { center: [121.50443502305552, 31.235724001288325], key: '021_GA049' }],
      moveOptions: {
        duration: 200,
        autoRotation: false
      }
    };
  },
  methods: {
    clickMap (e){
      console.log('click map: ', e);
    },
    initMap (map){
      console.log('init map: ', map);
    },
    changeCenter (){
      const lng = this.center[0]+0.01;
      const lat = this.center[1]+0.01;
      this.center = [lng, lat];
    },
    changePosition () {
      const position = this.componentMarker.position;
      this.componentMarker.position = [position[0] + 0.002, position[1] - 0.002];
    },
    changeDraggable () {
      this.componentMarker.draggable = !this.componentMarker.draggable;
    },
    toggleVisible () {
      this.componentMarker.visible = !this.componentMarker.visible;
    },
    markerInit (e){
      console.log('marker init: ', e);
    },
    clickMarker (){
      alert('点击了标号');
    },
    clickArrayMarker (marker){
      alert(`点击了标号,标号ID： ${marker.id}`);
    },
    changeText (){
      this.text = `测试content${ new Date().toLocaleString()}`;
      this.testData =[
        { center: [121.38342286560045, 31.089097150616002], key: 'aaaaa' },
        { center: [121.48965024665117, 31.223329098428916], key: '021_GA021' },
        { center: [121.51779294880103, 31.234662084824777], key: '021_GA053' },
        { center: [121.47054713223952, 31.219212711974038], key: '021_GA027' },
      ];
    },
    createClass (){
      return 'test b';
    },
    clickButton (){
      alert('测试点击');
    }
  }
});
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
