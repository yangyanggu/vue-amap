# 信息窗体(AMap.InfoWindow)
用于在地图上展示复杂的说明性信息的类型。<br/>信息窗体，地图仅可同时展示一个信息窗体，推荐为信息窗体通过样式显示设置尺寸

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-info-window
          :position="position"
          :visible.sync="visible">
          <div>
            <p>{{text}}</p>
            <button @click="clickButton">点击按钮</button>
          </div>
        </el-amap-info-window>
      </el-amap>
      <button @click="switchWindow()">{{visible ? '隐藏信息窗口' : '显示信息窗口'}}</button>
      <button @click="changePosition()">修改位置</button>
      <button @click="changeText()">修改内容</button>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data () {
        return {
          zoom: 14,
          center: [121.5273285, 31.21515044],
          position: [121.5273285, 31.21515044],
          visible: true,
          text: '测试slot'
        }
      },

      mounted() {
      },

      methods: {
        switchWindow() {
          this.visible = !this.visible;
        },
        clickButton(){
          alert('点击infowindow的按钮')
        },
        changePosition(){
          let p = this.position;
          this.position = [p[0]+0.001, p[1]+0.001];
        },
        changeText(){
          this.text = new Date().toLocaleString();
        }
      }
    };
  </script>

</script>


## 静态属性

仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
isCustom | Boolean | 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）
autoMove | Boolean | 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
avoid  | Boolean | autoMove 为 true 时，自动平移到视野内后的上右下左的避让宽度。默认值： [20, 20, 20, 20]
closeWhenClickMap | Boolean | 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体
offset | Array | 信息窗体显示位置偏移量。默认基准点为信息窗体的底部中心。默认值: [0, 0]
extraOptions | Object | 额外扩展属性，会直接将属性拷贝到初始化的options中，当key与props内的一样时会被props覆盖

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否可见，默认 true。支持sync
content | String, HTMLElement | 显示内容，可以是HTML要素字符串或者HTMLElement对象。也可以根据示例中的方式使用slot实现
size | Array | 信息窗体尺寸（isCustom为true时，该属性无效）
anchor | String  | 信息窗体锚点。默认值：'bottom-center'。可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
position | Array | 信息窗体显示基点位置


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | AMap.InfoWindow | 获取实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例
open| |信息窗体打开之后触发事件
close| |信息窗体关闭之后触发事件
