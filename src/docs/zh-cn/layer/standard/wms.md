# WMS (AMap.TileLayer.WMS)
用于加载OGC标准的WMS地图服务的一种图层类，仅支持EPSG3857坐标系统的WMS图层。
[查看 WMS的OGC标准](http://www.opengeospatial.org/standards/wms)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-wms :visible="visible" :url="url" :blend="false" :params="params"></el-amap-layer-wms>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏图层' : '显示图层'}}</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 3,
          center: [-99.241291, 39.51401],
          visible: true,
          url: 'https://ahocevar.com/geoserver/wms',
          params: {
            Layer: '0',
            Version: '1.0.0',
            Format: 'image/png',
            TileMatrixSet: 'EPSG:3857'
          }
        };
      },
      methods: {
        toggleVisible(){
          this.visible = !this.visible;
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
blend  | Boolean | 地图级别切换时，不同级别的图片是否进行混合，如图层的图像内容为部分透明请设置为false
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
url | String | wmts服务的url地址，如：' https://services.arcgisonline.com/arcgis/rest/services/'+ 'Demographics/USA_Population_Density/MapServer/WMTS/'
params | Object | OGC标准的WMS地图服务的GetMap接口的参数，包括VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT等，<br/>CRS、BBOX、REQUEST、WIDTH、HEIGHT等参数请勿添加，例如：<br/>{ </br/>  LAYERS: 'topp:states',<br/>  VERSION:'1.3.0',<br/>  FORMAT:'image/png'<br/>  }
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.TileLayer.WMS | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | TileLayer.WMS | 实例初始化结束
complete |  | 图块切片加载完成事件

