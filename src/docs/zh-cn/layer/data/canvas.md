# Canvas图层 (AMap.CanvasLayer)
Canvas图层类，用户可以将一个 Canvas 作为图层添加在地图上，Canvas图层会随缩放级别而自适应缩放。

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" @init="initMap" class="amap-demo">
        <el-amap-layer-canvas v-if="canvas" :canvas="canvas" :bounds="bounds" :visible="visible" @init="initLayer"></el-amap-layer-canvas>
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
          bounds: [116.327911, 39.939229,116.342659, 39.946275],
          canvas: null,
          context: null
        };
      },
      methods: {
        toggleVisible(){
          this.visible = !this.visible;
        },
        initMap(map){
          var canvas = document.createElement('canvas');
          canvas.width = canvas.height = 200;
      
          var context = canvas.getContext('2d');
          context.fillStyle = 'rgb(0,100,255)';
          context.strokeStyle = 'white';
          context.globalAlpha = 1;
          context.lineWidth = 2;
          this.canvas = canvas;
          this.context = context;
        },
        initLayer(layer){
          var radious = 0;
          var draw = () => {
              this.context.clearRect(0, 0, 200, 200);
              this.context.globalAlpha = (this.context.globalAlpha - 0.01 + 1) % 1;
              radious = (radious + 1) % 100;
      
              this.context.beginPath();
              this.context.arc(100, 100, radious, 0, 2 * Math.PI);
              this.context.fill();
              this.context.stroke();
      
              // 刷新渲染图层
              layer.reFresh();
      
              AMap.Util.requestAnimFrame(draw);
          };
          draw();
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
canvas | HTMLCanvasElement | Canvas DOM 对象
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
bounds | Array, AMap.Bounds | 图片的范围大小经纬度，如果传递数字数组类型: [minlng,minlat,maxlng,maxlat]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：6
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.CanvasLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.CanvasLayer | 实例初始化结束
complete |  | 加载完成事件

