# 建筑楼块3D图层 (AMap.Buildings)
建筑楼块 3D 图层。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" view-mode="3D" class="amap-demo">
        <el-amap-layer-buildings :visible="visible"></el-amap-layer-buildings>
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
          zoom: 14,
          center: [121.5273285, 31.21515044],
          visible: true
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
wallColor | ``Array<String>``,String | 楼块侧面颜色，支持 rgba、rgb、十六进制等
roofColor | ``Array<String>``,String | 楼块顶面颜色，支持 rgba、rgb、十六进制等
heightFactor | Number | 楼块的高度系数因子，默认为 1，也就是正常高度
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
styleOpts | Object(BuildingStyleOptions) | 楼块的围栏和样式设置
zooms | Array | 图层缩放等级范围，默认 [2, 20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

### BuildingStyleOptions

名称 | 类型 | 说明
---|---|---|
hideWithoutStyle | Boolean | 是否隐藏围栏之外的楼块
areas | ``Array<Area>`` | 围栏信息数组

#### Area

名称 | 类型 | 说明
---|---|---|
rejectTexture | Boolean | 是否屏蔽自定义地图的纹理
visible | Boolean | 是否可见
path | ``Array<Array<number, number>>`` | 围栏经纬度列表
color1 | String | 围栏区域内楼块顶面颜色，支持 rgba、rgb、十六进制等
color2 | String | 围栏区域内楼块侧面颜色，支持 rgba、rgb、十六进制等

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.Buildings | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.Buildings | 实例初始化结束
complete |  | 图块切片加载完成事件
