# 鹰眼控件 (AMap.HawkEye)
鹰眼控件，用于显示缩略地图，显示于地图右下角，可以随主图的视口变化而变化，也可以配置成固定位置实现类似于南海附图的效果。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :center="center" :zoom="zoom" class="amap-demo">
        <el-amap-control-hawk-eye :visible="visible" ></el-amap-control-hawk-eye>
      </el-amap>

      <div class="toolbar">
        <button @click="switchVisible()">{{visible? '隐藏' : '显示'}}</button>
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
      data: function() {
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          visible: true
        };
      },

      methods: {
        switchVisible() {
          this.visible = !this.visible;
        },
      }
    };
  </script>

</script>

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
autoMove | Boolean | 是否随主图视口变化移动
showRectangle | Boolean | 是否显示视口矩形
showButton | Boolean | 是否显示打开关闭的按钮
mapStyle | String | 缩略图要显示的地图自定义样式，如'amap://styles/dark'
layers | Array | 缩略图要显示的图层类型，默认为普通矢量地图
width | String | 缩略图的宽度，同CSS，如'200px'
height | String | 缩略图的高度，同CSS，如'200px'
offset | Array | 缩略图距离地图右下角的像素距离，如 [2,2]
borderStyle | String | 缩略图的边框样式，同CSS，如"double solid solid double"
borderColor | String | 缩略图的边框颜色，同CSS，如'silver'
borderRadius | String | 缩略图的边框角度，同CSS，如'5px'
borderWidth | String | 缩略图的边框宽度，同CSS，如'2px'
buttonSize | String | 箭头按钮的像素尺寸，同CSS，如'12px'
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否显示，默认true
isOpen | Boolean | 默认是否展开


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.HawkEye | 获取实例


## 事件

事件 | 参数 | 说明
---|---|---|
show | | 显示时触发此事件
hide | | 隐藏时触发此事件
