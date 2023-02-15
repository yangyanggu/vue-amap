# 矢量标记图层 (AMap.VectorLayer)
矢量标记图层。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-vector :visible="visible"  @init="init">
          <el-amap-circle :center="center" :radius="100"></el-amap-circle>
        </el-amap-layer-vector>
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
          visible: true,
        };
      },
      methods: {
        toggleVisible(){
          this.visible = !this.visible;
        },
        init(layer){
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.VectorLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.VectorLayer | 实例初始化结束
