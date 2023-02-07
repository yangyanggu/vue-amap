<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-district-cluster
        :get-position="getPosition"
        :data="clusterData"
        :visible="visible"
        @featureClick="clickFeature"
        @init="initLayer"
      />
    </el-amap>
    <div class="control-container">
      <el-button @click="changeVisible">
        {{ visible ? '隐藏' : '显示' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmapLayerDistrictCluster from "@vue-map/packages/layer/data/DistrictCluster/DistrictCluster.vue";
import ElAmap from '@vue-map/packages/amap/amap.vue'

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerDistrictCluster,
    ElAmap},
  data(){
    return {
      center: [116.306206, 39.975468],
      zoom: 16,
      map: null as any,
      canvas: null as any,
      path: null as any,
      visible: true,
      getPosition(item) {
        if (!item) {
          return null;
        }
        const parts = item.split(',');
        //返回经纬度
        return [parseFloat(parts[0]), parseFloat(parts[1])];
      },
      clusterData: [] as any[]
    }
  },
  mounted() {
    fetch('https://a.amap.com/amap-ui/static/data/10w.txt').then(res => {
      return res.text()
    }).then(csv => {
      this.clusterData = csv.split('\n');
    })
  },
  methods: {
    clickMap(e){
      console.log('click map: ', e);
    },
    initMap(map){
      console.log('init map: ', map);
    },
    changeVisible(){
      this.visible = !this.visible;
    },
    initLayer(layer){
      console.log('聚合图层: ', layer);
    },
    clickFeature(e, feature){
      console.log('点击区划面： ', e, feature)
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
