<template>
  <div class="map-page-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      :pitch="60"
      view-mode="3D"
      :mask="mask"
      @init="initMap"
    >
      <el-amap-layer-custom-xyz
        url="http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
        :subdomains="subdomains"
        :mask="mask"
        :altitude="altitude"
        :visible="visible"
      />
      <el-amap-loca>
        <el-amap-loca-ambient-light
          :color="'#fff'"
          :intensity="0.6"
        />
        <el-amap-loca-polygon
          v-if="polygonData"
          :source-data="polygonData"
          :block-hide="false"
          :depth="false"
          :has-side="true"
          :layer-style="style"
        />
      </el-amap-loca>
    </el-amap>
  </div>
  <div class="toolbar">
    <button @click="switchVisible()">
      {{ visible ? '隐藏' : '显示' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElAmap, ElAmapLayerCustomXyz} from "@vuemap/vue-amap";
import {ElAmapLoca, ElAmapLocaAmbientLight, ElAmapLocaPolygon} from "@vuemap/vue-amap-loca";

const center = ref([116.335036, 39.900082])
const zoom = ref(8)
const visible = ref(true)
const subdomains = ref(["1", "2", "3", "4"])
let mask: any = undefined;
let polygonData: any = undefined;
const altitude = ref(10000)
const style = {
  height: 10000,
  topColor(index, feature) {
    return 'rgba(255,255,255,0)';
  },
  sideTopColor(index, feature) {
    return 'rgba(0,255,255,0.4)';
  },
  sideBottomColor(index, feature) {
    return '#00C6DA'
  }
}

const switchVisible = () => {
  visible.value = !visible.value;
}

const initMap = (map: any) => {
  console.log('map: ', map);
  const opts = {
    subdistrict: 0,
    extensions: 'all',
    level: 'city'
  };
  //利用行政区查询获取边界构建mask路径
  //也可以直接通过经纬度构建mask路径
  const district = new AMap.DistrictSearch(opts);
  const maskArea: any[] = [];
  district.search('北京市', (status, result) => {
    const bounds = result.districtList[0].boundaries;
    for (let i = 0; i < bounds.length; i += 1) {
      maskArea.push([bounds[i].map(item => item.toArray())])
    }
    console.log('maskArea: ', maskArea)
    mask = maskArea;
    polygonData = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": JSON.parse(JSON.stringify(maskArea))
          }
        }
      ]
    }
  })
}
</script>

<style>
</style>
