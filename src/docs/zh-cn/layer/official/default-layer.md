# 默认图层 (AMap.createDefaultLayer)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-default ></el-amap-layer-default>
      </el-amap>
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
        };
      },
      methods: {
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否可见，默认为true。
zIndex | Number | 默认zIndex：0
opacity | Number | 透明度

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|


## 事件

事件 | 参数 | 说明
---|---|---|
init |  | 实例初始化结束
