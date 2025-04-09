<template>
  <div class="map-container">
    <el-amap
      :show-label="false"
      :center="center"
      :zoom="zoom"
      :pitch="60"
      view-mode="3D"
      @click="clickMap"
      @init="initMap"
    >
      <el-amap-layer-custom-xyz
        url="http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
        :subdomains="subdomains"
        :mask="mask"
        :altitude="altitude"
        :visible="visible"
      />
      <el-amap-layer-canvas
        v-if="canvas"
        :canvas="canvas"
        :bounds="bounds"
        :z-index="180"
        @init="initLayer"
      />
      <el-amap-loca>
        <el-amap-ambient-light
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
    <div class="control-container">
      <el-button @click="changeVisible">
        {{ visible ? '隐藏' : '显示' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElAmapLayerCustomXyz from "@vuemap/vue-amap/packages/layer/data/CustomXyz/CustomXyz.vue";
import ElAmap from '@vuemap/vue-amap/packages/amap/amap.vue';
import ElAmapLoca from '@vuemap/vue-amap-loca/packages/Loca/Loca.vue';
import ElAmapAmbientLight from '@vuemap/vue-amap-loca/packages/AmbientLight/AmbientLight.vue';
import ElAmapLocaPolygon from '@vuemap/vue-amap-loca/packages/PolygonLayer/PolygonLayer.vue';
import ElAmapLayerCanvas from "@vuemap/vue-amap/packages/layer/data/Canvas/Canvas.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElAmapLayerCanvas,
    ElAmapLayerCustomXyz,
    ElAmap,
    ElAmapLoca,
    ElAmapAmbientLight,
    ElAmapLocaPolygon
  },
  data (){
    return {
      center: [116.335036, 39.900082],
      bounds: [116.335036, 39.900082,116.345036, 39.956275],
      zoom: 9,
      visible: true,
      subdomains: ["1", "2", "3", "4"],
      mask: undefined as any,
      polygonData: undefined as any,
      altitude: 0,
      style: {
        height: 10000,
        topColor (index, feature) {
          return 'rgba(255,255,255,0)';
        },
        sideTopColor (index, feature) {
          return 'rgba(0,255,255,0.4)';
        },
        sideBottomColor (index, feature) {
          return '#00C6DA';
        }
      },
      canvas: null as any,
      context: null as any,
    };
  },
  methods: {
    clickMap (e) {
      console.log('click map: ', e);
    },
    initMap (map) {
      console.log('init map: ', map);
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
          maskArea.push([bounds[i].map(item => item.toArray())]);
        }
        console.log('maskArea: ', maskArea);
        this.mask = maskArea;
        this.polygonData = {
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
        };
      });
      const canvas = document.createElement('canvas') as any;
      canvas.width = canvas.height = 200;

      const context = canvas.getContext('2d');
      context.fillStyle = 'rgb(0,100,255)';
      context.strokeStyle = 'white';
      context.globalAlpha = 1;
      context.lineWidth = 2;
      this.canvas = canvas;
      this.context = context;
    },
    changeVisible () {
      this.visible = !this.visible;
    },
    initLayer (layer) {
      let radious = 0;
      const draw = () => {
        this.context.clearRect(0, 0, 200, 200);
        this.context.globalAlpha = (this.context.globalAlpha - 0.01 + 1) % 1;
        radious = (radious + 1) % 100;

        this.context.beginPath();
        this.context.arc(100, 100, radious, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();

        // 刷新渲染图层
        layer.reFresh();

        AMap.Util.requestAnimFrame(draw);
      };
      draw();
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
