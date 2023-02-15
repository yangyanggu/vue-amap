# 比例尺插件 (AMap.Scale)
位于地图右下角，用户可控制其显示与隐藏。继承自 AMap.Control

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap :center="center" :zoom="zoom" class="amap-demo">
        <el-amap-control-scale :visible="visible" ></el-amap-control-scale>
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
position| String, Object | 控件停靠位置 { top: 5; left: 5; right: 5; bottom: 5 } 或者 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
offset | String | 地图默认鼠标样式。参数defaultCursor应符合CSS的cursor属性规范。
animateEnable | Array | 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否显示，默认true


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.Scale | 获取实例


## 事件

事件 | 参数 | 说明
---|---|---|
show | | 显示时触发此事件
hide | | 隐藏时触发此事件
