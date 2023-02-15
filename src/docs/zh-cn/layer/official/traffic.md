# 实时交通图层 (AMap.TileLayer.Traffic)
实时交通图层类，继承自TileLayer。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-traffic :visible="visible"></el-amap-layer-traffic>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">{{visible ? '隐藏交通图层' : '显示交通图层'}}</button>
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
autoRefresh  | Boolean | 是否自动更新数据，默认开启
tileSize | Number | 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256
interval | Number | 自动更新数据的间隔毫秒数，默认 180ms
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.TileLayer.Traffic | 获取实例
stopFresh |  | 停止自动更新数据

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.TileLayer.Traffic | 实例初始化结束
complete |  | 图块切片加载完成事件
