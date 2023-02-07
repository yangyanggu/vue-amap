<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      view-mode="3D"
      :pitch="20"
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
  name: "DistrictCluster",
  data(){
    return {
      center: [116.306206, 39.975468],
      zoom: 16,
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

