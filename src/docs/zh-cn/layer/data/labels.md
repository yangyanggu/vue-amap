# 标注层 (AMap.LabelsLayer)
标注层。<br/>
有三种方法添加标注。使用效果见下面示例<br/>
1、通过init事件拿到layer实例，再调用`add`方法进行添加<br/>
2、通过$refs拿到layer的vue实例，再通过`$$add`方法进行添加<br/>
3、通过`slot`方式进行添加

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap  :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-layer-labels ref="labels" :visible="visible" :collision="false" @init="init">
          <el-amap-label-marker :position="labelOptions.position" :text="labelOptions.text" :icon="labelOptions.icon"></el-amap-label-marker>
        </el-amap-layer-labels>
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
          labelOptions: {
            position: [121.5495395, 31.21515044],
            text: {
              content: '测试slot',
              direction: 'right',
              style: {
                  fontSize: 15,
                  fillColor: '#fff',
                  strokeColor: 'rgba(255,0,0,0.5)',
                  strokeWidth: 2,
                  padding: [3, 10],
                  backgroundColor: 'yellow',
                  borderColor: '#ccc',
                  borderWidth: 3,
              }
            },
            icon: {
              image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
              anchor: 'bottom-center',
              size: [25, 34],
              clipOrigin: [459, 92],
              clipSize: [50, 68]
            }
          }
        };
      },
      methods: {
        toggleVisible(){
          this.visible = !this.visible;
        },
        init(layer){
          this.$refs.labels.$$add(new AMap.LabelMarker({
              position: [121.5273285, 31.21515044],
              opacity: 1,
              zIndex: 2,
              icon: {
                  image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
                  anchor: 'bottom-center',
                  size: [25, 34],
                  clipOrigin: [459, 92],
                  clipSize: [50, 68]
              },
              text: {
                  content: '测试$refs $$add',
                  direction: 'right',
                  style: {
                      fontSize: 15,
                      fillColor: '#fff',
                      strokeColor: 'rgba(255,0,0,0.5)',
                      strokeWidth: 2,
                      padding: [3, 10],
                      backgroundColor: 'yellow',
                      borderColor: '#ccc',
                      borderWidth: 3,
                  }
              }
          }));
          layer.add(new AMap.LabelMarker({
              position: [121.4973285, 31.21515044],
              opacity: 1,
              zIndex: 2,
              icon: {
                  image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
                  anchor: 'bottom-center',
                  size: [25, 34],
                  clipOrigin: [459, 92],
                  clipSize: [50, 68]
              },
              text: {
                  content: '测试layer.add',
                  direction: 'right',
                  style: {
                      fontSize: 15,
                      fillColor: '#fff',
                      strokeColor: 'rgba(255,0,0,0.5)',
                      strokeWidth: 2,
                      padding: [3, 10],
                      backgroundColor: 'yellow',
                      borderColor: '#ccc',
                      borderWidth: 3,
                  }
              }
          }))
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
zooms | Array | 支持的缩放级别范围，默认范围 [2-30]
visible | Boolean | 是否显示，默认 true
zIndex | Number | 图层叠加的顺序值，1 表示最底层。默认 zIndex：120
opacity | Number | 透明度，默认 1
collision | Boolean | 标注层内的标注是否避让
allowCollision | Boolean | 标注层内的标注是否允许其它标注层对它避让

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.LabelsLayer | 获取实例
$$add() | | 添加LabelMarker，可以传单个实例，也可以传多个实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | AMap.LabelsLayer | 实例初始化结束


