# 地图

获取地图实例方式有三种：<br/>
1、通过init事件<br/>
2、通过ref获取地图组件对象，然后调用$$getInstance方法<br/>

详细使用请查看下面的示例，可以在控制台看出打印效果

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-amap ref="map" :min-zoom="10" :max-zoom="22" :center="center" :zoom="zoom" @init="init" @click="click" class="bmap-demo">
      </el-amap>
      <div class="toolbar">
        <button @click="getMap()">get map</button>
      </div>
    </div>
  </template>

  <style>
    .bmap-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        return {
          zoom: 16,
          center: [121.59996, 31.197646],
          map: null,
        };
      },
      mounted() {
      },
      methods: {
        getMap() {
          // bmap vue component
          console.log('$refs: ', this.$refs.map.$$getInstance())
        },
        init(o) {
          this.map = o;
          console.log(o.getCenter())
          console.log(this.$refs.map.$$getInstance())
        },
        click(){
          alert('click map')
        }
      }
    };
  </script>

</script>

