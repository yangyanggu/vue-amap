# 图片图层 (AMap.ImageLayer)
图片图层类，用户可以将一张静态图片作为图层添加在地图上，图片图层会随缩放级别而自适应缩放。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-image url="https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg" :bounds="bounds" :visible="visible"></el-amap-layer-image>
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
          zoom: 15,
          center: [116.33719, 39.942384],
          visible: true,
          bounds: [116.327911, 39.939229,116.342659, 39.946275]
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
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
url | String | 图片地址链接
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
bounds | Array, AMap.Bounds | 图片的范围大小经纬度，如果传递数字数组类型: [minlng,minlat,maxlng,maxlat]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：6
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.ImageLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.ImageLayer | 实例初始化结束
complete |  | 加载完成事件

