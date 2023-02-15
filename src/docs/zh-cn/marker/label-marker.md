# 标注 (AMap.LabelMarker)
标注类

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-labels>
          <el-amap-label-marker :visible="labelOptions.visible" :position="labelOptions.position" :text="labelOptions.text" :icon="labelOptions.icon" @click="clickMarker"></el-amap-label-marker>
        </el-amap-layer-labels>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{labelOptions.visible ? '隐藏标注' : '显示标注'}}</button>
        <button type="button" name="button" @click="changePosition">改变标注位置</button>
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
          zoom: 14,
          center: [121.5273285, 31.21515044],
          labelOptions: {
            visible: true,
            position: [121.5495395, 31.21515044],
            text: {
              content: '测试content',
              direction: 'right',
              style: {
                  fontSize: 15,
                  fillColor: '#fff',
                  strokeColor: 'rgba(255,0,0,0.5)',
                  strokeWidth: 2,
                  padding: [3, 10],
                  backgroundColor: 'yellow',
                  borderColor: '#ccc',
                  borderWidth: 3,
              }
            },
            icon: {
              image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
              anchor: 'bottom-center',
              size: [25, 34],
              clipOrigin: [459, 92],
              clipSize: [50, 68]
            }
          }
        };
      },
      methods: {
        changePosition() {
          let position = this.labelOptions.position;
          this.labelOptions.position = [position[0] + 0.002, position[1] - 0.002];
        },
        toggleVisible() {
          this.labelOptions.visible = !this.labelOptions.visible;
        },
        clickMarker(){
          alert('点击了标号')
        },
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
name  | String | 标注名称，作为标注标识，并非最终在地图上显示的文字内容，显示文字内容请设置 opts.text.content
rank  | Number | 避让优先级，获取标注的优先级，该优先级用于 labelsLayer 支持避让时，rank 值大的标注会避让掉 rank 值低的标注。默认值：1
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 标注是否可见，默认为true。
zIndex | Number | 标注的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：1
position | Array | 标注在地图上显示的位置
zooms | Array | 标注显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
icon | Object | 标注图标设置
text  | Object | 标注文本设置
extData | any | 用户自定义属 ，支持JavaScript API任意数据类型，如 Marker的id等。可将自定义数据保存在该属性上，方便后续操作使用。

### icon参数
名称 | 类型 | 说明
---|---|---|
image | String | 图标 url。
size | Array[x,y] | 图标大小，默认值： [36, 36]
clipOrigin | Array[x,y] | 图标所在图片偏移位置，默认值: [0, 0]
clipSize | Array[x,y] | 图标所在图片裁剪大小，若未设置，则使用图片大小
anchor | Array[x,y], String | 图标锚点，锚点位置对应设置的 position 位置。可选值：'top-left'| 'top-center'|'top-right'|'middle-left'|'center'| 'middle-right'| 'bottom-left'| 'bottom-center'| 'bottom-right' 。默认值：'top-left'。

### text参数
名称 | 类型 | 说明
---|---|---|
content | String | 文本标注的内容，该属性为直接显示在标注上的文本内容。
direction | String | 文本标注方位。若设置了 icon，则 direction 是以 icon 为中心的偏移，若未设置 icon，则相对 position 偏移。 可选值：'top'|'right'|'bottom'|'left'|'center'。默认值: right
offset | Array[x,y] | 偏移量，在 direction 基础上的偏移。默认值 [0, 0]
zooms | Array | 文本显示级别范围，可单独设置文本显示范围
style | Object | 文本样式设置

### text.style参数
名称 | 类型 | 说明
---|---|---|
fontSize | Number | 文字大小，默认值： 12
fillColor | String | 文字颜色
strokeColor | String | 文字描边颜色
padding | String, Array | 文字 padding。默认值： [3, 3, 3, 3]
backgroundColor | String | 文字背景颜色
borderColor | String | 文字背景描边颜色
borderWidth | Number | 文字背景描边粗细
fold | Boolean | 文字是否折行（6个字一折行）


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.LabelMarker | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.LabelMarker | `AMap.LabelMarker`实例
click | MapsEvent | 鼠标左键单击事件
mousemove | MapsEvent | 鼠标移动
mouseover | MapsEvent | 鼠标移近点标记时触发事件
mouseout | MapsEvent | 鼠标移出点标记时触发事件
mousedown | MapsEvent | 鼠标在点标记上按下时触发事件
mouseup | MapsEvent | 鼠标在点标记上按下后抬起时触发事件
touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备
touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备
touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备
