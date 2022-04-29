<template>
  <div class="menu-container">
    <el-menu
      default-active="/"
      :router="true"
    >
      <el-menu-item
        v-for="item in menus"
        :key="item.path"
        :index="item.path"
      >
        {{ item.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Menu",
  data() {
    return {
      menus: [
        {
          path: '/',
          name: '地图'
        },
        {
          path: '/infoWindow',
          name: '信息框'
        },
        {
          path: '/layer/canvas',
          name: 'Canvas图层'
        },
        {
          path: '/layer/custom',
          name: '自定义图层'
        },{
          path: '/layer/flexible',
          name: '灵活切片图层'
        },{
          path: '/layer/heatMap',
          name: '热力图'
        },{
          path: '/layer/image',
          name: '图片图层'
        },
        {
          path: '/layer/official',
          name: '官方图层'
        },
        {
          path: '/layer/standard',
          name: '标准图层'
        },
        {
          path: '/loca/grid',
          name: 'loca网格图'
        },
        {
          path: '/loca/heatmap',
          name: 'loca热力图'
        },{
          path: '/loca/hexagon',
          name: 'loca蜂窝网格图'
        },{
          path: '/loca/icon',
          name: 'loca图标图层'
        },{
          path: '/loca/line',
          name: 'loca线图层'
        },{
          path: '/loca/link',
          name: 'loca链接线图层'
        },{
          path: '/loca/point',
          name: 'loca圆点图层'
        },{
          path: '/loca/polygon',
          name: 'loca面图层'
        },{
          path: '/loca/prism',
          name: 'loca棱柱图层'
        },{
          path: '/loca/pulseLine',
          name: 'loca轨迹线图层'
        },{
          path: '/loca/pulseLink',
          name: 'loca连接飞线图层'
        },{
          path: '/loca/scatter',
          name: 'loca贴地点图层'
        },{
          path: '/loca/zmarker',
          name: 'loca垂直于大地表面的 Marker 图层'
        },{
          path: '/marker/elasticMarker',
          name: 'marker灵活点标记'
        },{
          path: '/marker/labelMarker',
          name: 'marker标注类'
        },{
          path: '/marker/marker',
          name: 'marker点标记'
        },{
          path: '/marker/markerCluster',
          name: 'marker点聚合'
        },{
          path: '/marker/massMarker',
          name: 'marker海量点'
        },{
          path: '/marker/text',
          name: 'marker文本'
        },{
          path: '/marker/circle',
          name: 'marker圆'
        },{
          path: '/vector/text',
          name: 'vector贝塞尔曲线'
        },{
          path: '/vector/circle',
          name: 'vector圆'
        },{
          path: '/vector/ellipse',
          name: 'vector椭圆'
        },{
          path: '/vector/geoJSON',
          name: 'vector GeoJSON'
        },{
          path: '/vector/polygon',
          name: 'vector多边形'
        },{
          path: '/vector/polyline',
          name: 'vector折线'
        },{
          path: '/vector/rectangle',
          name: 'vector矩形'
        },{
          path: '/layer/tiles3D',
          name: '3DTiles图层'
        },{
          path: '/ext/gltf',
          name: 'ThreeJS Gltf示例'
        }
      ]
    }
  }
})
</script>

<style scoped>
.menu-container{
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
