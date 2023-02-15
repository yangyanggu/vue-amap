# 室内图层 (AMap.IndoorMap)
室内图层，用于在适当级别展示室内地图，并提供显示商铺tip、切换楼层等功能。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :show-indoor-map="false" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-indoor-map :visible="visible" @init="init"></el-amap-layer-indoor-map>
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
    .floor-list{
      padding-left: 4px;
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
        },
        init(layer){
          console.log(layer);
          layer.showIndoorMap('B000A9VHIG');
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
cursor  | String | 指定鼠标悬停到店铺面时的鼠标样式
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1
hideFloorBar  | Boolean | 是否隐藏楼层切换控件，默认值：false

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.IndoorMap | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.IndoorMap | 实例初始化结束
