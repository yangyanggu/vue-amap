# 自定义图层 (AMap.CustomLayer)
自定义图层是一种完全由开发者来指定绘制方法的图层

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" @init="initMap" class="amap-demo">
        <el-amap-layer-custom v-if="canvas" :visible="visible" :canvas="canvas" :render="render"></el-amap-layer-custom>
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
          zoom: 3,
          center: [116.306206, 39.975468],
          visible: true,
          canvas: null,
          map: null,
          path: null
        };
      },
      methods: {
        toggleVisible(){
          this.visible = !this.visible;
        },
        initMap(map){
          this.map = map;
          var size = map.getSize();
          var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          canvas.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          canvas.setAttribute('width', size.width);
          canvas.setAttribute('height', size.height);
      
          this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          this.path.onclick = function () {
              console.log('svg path clicked')
          };
          var styleText = [];
          styleText.push('stroke:red');
          styleText.push('fill:green');
          styleText.push('fill-opacity:0.3');
          this.path.style.cssText = styleText.join(';');
          canvas.appendChild(this.path);
          this.canvas = canvas;
        },
        render(){
          var newPath = [];
          var center = this.map.lngLatToContainer(this.center);
  
          for (var k = 0; k < 6; k += 1) {
              var ag = Math.PI * 60 / 180 * k;
              var x = center.x + Math.cos(ag) * 50;
              var y = center.y + Math.sin(ag) * 50;
              newPath.push((k == 0 ? 'M' : 'L') + x + ' ' + y);
          }
          newPath = newPath.join(' ') + ' Z';
          this.path.setAttribute('d', newPath);
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
canvas  | HTMLElement | canvas 对象,必填
render | Function | 绘制函数，初始化完成时候，开发者需要给该图层设定render方法，该方法需要实现图层的绘制，API会在合适的时机自动调用该方法
alwaysRender | Boolean | 是否主动，默认 false
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zooms | Array | 支持的缩放级别范围，默认范围 [2-20]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.CustomLayer | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.CustomLayer | 实例初始化结束

