# 垂直于大地表面的 Marker 图层 (Loca.ZMarkerLayer)

垂直于大地表面的 Marker 图层，支持传入自定义 DOM 进行绘制。你可以使用它展示一些 和数据相关的文字、图片信息，而且它还支持永远朝向屏幕的特性，非常适合对文字类信息的展示。

#### 注意事项

> 该组件需要在 view-mode="3D" 下才能看出效果

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :zoom="zoom" :center="center" map-style="amap://styles/dark" view-mode="3D" :pitch="80" :rotation="202" :show-label="false" class="amap-demo">
        <el-amap-loca>
          <el-amap-loca-z-marker :visible="visible" :source-data="sourceData" @click="clickIcon" :layer-style="layerStyle"></el-amap-loca-z-marker>
        </el-amap-loca>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏标记' : '显示标记'}}</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

<script>
    var events = require('./assets/js/zmarker.js');
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          zoom: 16.28,
          center: [116.597005,39.914388],
          visible: true,
          sourceData: events,
          layerStyle: {
              unit: 'meter',
              content: (index, feat) => {
                   var props = feat.properties;
                  var leftColor = props.price < 60000 ? 'rgba(0, 28, 52, 0.6)' : 'rgba(33,33,33,0.6)';
                  var rightColor = props.price < 60000 ? '#038684' : 'rgba(172, 137, 51, 0.3)';
                  var borderColor = props.price < 60000 ? '#038684' : 'rgba(172, 137, 51, 1)';
                  return (
                      '<div style="width: 490px; height: 228px; padding: 0 0;">' +
                      '<p style="display: block; height:80px; line-height:80px;font-size:40px;background-image: linear-gradient(to right, '
                      + leftColor + ',' + leftColor + ',' + rightColor + ',rgba(0,0,0,0.4)); border:4px solid '
                      + borderColor + '; color:#fff; border-radius: 15px; text-align:center; margin:0; padding:5px;">' +
                      props['name'] +
                      ': ' +
                      (props['price'] / 10000) +
                      '</p><span style="width: 130px; height: 130px; margin: 0 auto; display: block; background: url(https://a.amap.com/Loca/static/loca-v2/demos/images/prism_'
                      + (props['price'] < 60000 ? 'blue' : 'yellow') + '.png);"></span></div>'
                  );
              },
              alwaysFront: true,
              size: [490/2, 222/2],
              rotation: 0,
          }
        };
      },
      mounted(){
        this.createData();
      },
      methods: {
        toggleVisible() {
          this.visible = !this.visible;
        },
        createData(){
        },
        clickIcon(feature, e){
          console.log('click: ', feature, e)
        }
      },
    };
  </script>

</script>

## 静态属性

仅且可以初始化配置，不支持响应式。

| 名称              | 类型    | 说明                                                             |
| ------------------- | --------- | ------------------------------------------------------------------ |
| initEvents        | Boolean | 是否创建事件，自动为loca图层创建click和mousemove事件。 默认 true |
| defaultStyleValue | Object  | 默认样式，可以查看下面属性说明                                   |
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性

支持响应式。

| 名称            | 类型    | 说明                                                                                                                                     |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| visible         | Boolean | 点标记是否可见，默认为true.                                                                                                              |
| zIndex          | Number  | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12                                     |
| sourceUrl       | String  | 数据源的链接地址，一般是接口地址，返回的数据必须是 geojson 格式。                                                                        |
| sourceData      | Object  | 数据对象。如果你不想使用 url 方式请求数据，可以直接填写请求好的 geojson 对象。  sourceUrl与sourceData只会生效一个，默认优先判断sourceUrl |
| layerStyle      | Object  | 图层样式                                                                                                                                 |
| zooms           | Array   | 图层缩放等级范围，默认[2,20]                                                                                                             |
| opacity         | Number  | 图层整体透明度，默认 1                                                                                                                   |
| visibleDuration | Number  | 图层显隐时候过渡的时间，默认为0                                                                                                          |

### layerStyle参数(覆盖所有默认值)

| 名称        | 类型             | 说明                                                                                                                                                                       |
| ------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| unit        | String           | 点的单位，会影响半径和边宽度。可选值：px：像素，meter：地理单位米  default 'px'                                                                                            |
| content     | String, Function | Marker 的内容，是一个 HTML 的片段字符串，可以通过 dom 的 style 设置 dom 样式， 并且支持 img 等各种类型的 dom，可通过回调函数对每个点进行设置。目前此类型尚不支持 IE 浏览器 |
| size        | Array, Function  | Marker 大小，影响宽高。 default [20,20]                                                                                                                                    |
| rotation    | Number, Function | 图标的旋转角度，可以通过回调为每个点设置不同的旋转角（单位:角度） default 0                                                                                                |
| alwaysFront | Boolean          | 是否让每个 Marker 总是朝向视角方向。default false                                                                                                                          |

### defaultStyleValue参数(提供默认参数，但会被geojson的properties属性中的值覆盖)

| 名称        | 类型    | 说明                                                                                                                                                                       |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| unit        | String  | 点的单位，会影响半径和边宽度。可选值：px：像素，meter：地理单位米  default 'px'                                                                                            |
| content     | String  | Marker 的内容，是一个 HTML 的片段字符串，可以通过 dom 的 style 设置 dom 样式， 并且支持 img 等各种类型的 dom，可通过回调函数对每个点进行设置。目前此类型尚不支持 IE 浏览器 |
| size        | Array   | Marker 大小，影响宽高。 default [20,20]                                                                                                                                    |
| rotation    | Number  | 图标的旋转角度，可以通过回调为每个点设置不同的旋转角（单位:角度） default 0                                                                                                |
| alwaysFront | Boolean | 是否让每个 Marker 总是朝向视角方向。default false                                                                                                                          |

### style说明

所有loca的Layer组件对Style设置提供了默认处理，支持function回调方式的属性都提供了默认回调实现，优先读取gesjson的properties中的值，读取不到的情况下会读取defaultStyleValue配置的值，最后会使用组件内默认设置的值。`<br/>`
该默认处理可以被layerStyle中的设置给覆盖。目前默认设置已基本符合日常使用，如果需要在选中目标时做高亮处理，则推荐根据示例使用事件监听然后动态修改layerStyle来实现。`<br/>`
style数据有可以有三个来源，优先级按顺序处理，第一个最高 `<br/>`

##### 1、layerStyle属性配置

```javascript
{
  unit: 'meter',
  content: (index, feat) => {
     var props = feat.properties;
     var leftColor = props.price < 60000 ? 'rgba(0, 28, 52, 0.6)' : 'rgba(33,33,33,0.6)';
     var rightColor = props.price < 60000 ? '#038684' : 'rgba(172, 137, 51, 0.3)';
     var borderColor = props.price < 60000 ? '#038684' : 'rgba(172, 137, 51, 1)';
     return (
       '<div style="width: 490px; height: 228px; padding: 0 0;">' +
       '<p style="display: block; height:80px; line-height:80px;font-size:40px;background-image: linear-gradient(to right, '
       + leftColor + ',' + leftColor + ',' + rightColor + ',rgba(0,0,0,0.4)); border:4px solid '
       + borderColor + '; color:#fff; border-radius: 15px; text-align:center; margin:0; padding:5px;">' 
       + props['name'] +
        ': ' +
         (props['price'] / 10000) +
         '</p><span style="width: 130px; height: 130px; margin: 0 auto; display: block; background: url(https://a.amap.com/Loca/static/loca-v2/demos/images/prism_'
         + (props['price'] < 60000 ? 'blue' : 'yellow') + '.png);"></span></div>'
        );
     },
     alwaysFront: true,
     size: [490/2, 222/2],
     rotation: 0
}
```

##### 2、geojson的properties属性

```json
{
  "type": "FeatureCollection",
  "name": "Polygon",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    { 
      "type": "Feature", 
      "properties": {
        "icon": '/img/1.png',
        "rotation": 90
      }, 
      "geometry": { 
        "type": "Point", 
        "coordinates": [ 119.958676782427744, 32.121127961388339]
      }
    }
  ]
}
```

##### 3、defaultStyleValue属性配置

```javascript
{
  unit: 'meter',
  content: '',
  alwaysFront: true,
  size: [490/2, 222/2],
  rotation: 0
}
```

## ref 可用方法

提供无副作用的同步帮助方法

| 函数 | 返回 | 说明
| ------ | ------ | ------ |
\$$getInstance() | Loca.ZMarkerLayer | 获取实例


## 事件

事件 | 参数 | 说明
---|---|---|
init | Loca.ZMarkerLayer| 实例
click | Feature, event | 当点击到标号时返回对应的feature，否则返回undefined
mousemove | Feature, event | 当鼠标移动滑过标号时返回对应的feature，否则返回undefined

