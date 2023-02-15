# 点聚合 (AMap.MarkerCluster)
用于展示大量点标记，将点标记按照距离进行聚合，以提高绘制性能。点聚合支持用户自定义样式，以插件形式调用。

## 基础示例
<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-marker-cluster v-if="visible" :points="points"  @init="markerInit" @click="clickMarker">
        </el-amap-marker-cluster>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏标记' : '显示标记'}}</button>
        <button type="button" name="button" @click="changeData">修改数据</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    const china = require('./assets/js/china.js');
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 5,
          center: [104.937478,35.439575],
          points: Object.freeze(china),
          visible: true
        };
      },
      methods: {
        toggleVisible() {
          this.visible = !this.visible;
        },
        markerInit(e){
          console.log('marker init: ', e);
        },
        clickMarker(){
          alert('点击了标号')
        },
        changeData(){
          this.points = [{"lnglat":["113.864691","22.942327"]},{"lnglat":["113.370643","22.938827"]}]
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
renderClusterMarker  | Function | 该方法用来实现聚合点的自定义绘制，由开发者自己实现，API 将在绘制每个聚合点的时候调用这个方法，可以实现聚合点样式的灵活设定，指定了 renderClusterMarker 后 styles 无效。<br/>该函数的入参为一个Object，包含如下属性：<br/>1. count: 当前聚合点下聚合的 Marker 的数量<br/>2. marker: 当前聚合点显示的 Marker
renderMarker  | Function | 该方法用来实现非聚合点的自定义绘制，由开发者自己实现，API 将在绘制每个非聚合点的时候调用这个方法<br/>该函数的入参为一个Object，包含如下属性：<br/>marker: 非聚合点 Marker 对象
clusterByZoomChange | Boolean | 地图缩放过程中是否聚合。默认值 false。
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
points | Array | 数据格式为一组含有经纬度信息的数组，如下所示。其中【经纬度】lnglat 为必填字段，【权重】weight 为可选字段,以权重高的点为中心进行聚合。示例: [{"lnglat":["113.864691","22.942327"], weight: 1},{"lnglat":["113.370643","22.938827"], weight: 8}]
gridSize | Number | 聚合计算时网格的像素大小，默认60
maxZoom | Number | 最大的聚合级别，大于该级别就不进行相应的聚合。默认值为 18，即小于 18 级的级别均进行聚合，18 及以上级别不进行聚合
averageCenter | Boolean | 聚合点的图标位置是否是所有聚合内点的中心点。默认为 true。数据中如果含有权重值，以权重高的点为中心进行聚合
styles | Array | 指定聚合后的点标记的图标样式，[查看示例](https://lbs.amap.com/demo/jsapi-v2/example/mass-markers/markerclusterer)，可缺省，缺省时为默认样式<br/>数据元素分别对应聚合量在1-10,11-100,101-1000…的聚合点的样式；<br/>当用户设置聚合样式少于实际叠加的点数，未设置部分按照系统默认样式显示；<br/>单个图标样式包括以下几个属性：<br/>1. {string} url：图标显示图片的url地址（必选）<br/>2. {AMap.Size} size：图标显示图片的大小（必选）<br/>3. {AMap.Pixel} offset：图标定位在地图上的位置相对于图标左上角的偏移值。默认为(0,0),不偏移（可选）<br/>4. {AMap.Pixel} imageOffset：图片相对于可视区域的偏移值，此功能的作用等同CSS中的background-position属性。默认为(0,0)，不偏移（可选）<br/>5. {String} textColor：文字的颜色，默认为"#000000"（可选）<br/>6. {Number} textSize：文字的大小，默认为10（可选）


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.MarkerCluster | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.MarkerCluster | `AMap.MarkerCluster`实例
click | {cluster: Object, target: Object, lnglat: LngLat, markers: Marker} | 鼠标左键单击事件
