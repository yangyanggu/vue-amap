<template>
  <el-card>
    <el-form
      ref="formRef"
      :model="form"
      label-width="80px"
    >
      <el-form-item
        label="jsapi key"
        required
        prop="key"
      >
        <el-input v-model="form.key" />
      </el-form-item>
      <el-form-item
        label="选择插件"
        prop="selectedPlugins"
      >
        <div>
          <div>
            <el-button
              type="primary"
              @click="selectAll"
            >
              全选
            </el-button>
            <el-button @click="cancelSelect">
              全不选
            </el-button>
          </div>
          <el-checkbox-group v-model="form.selectedPlugins">
            <div
              v-for="item in pluginList"
              :key="item.value"
            >
              <el-checkbox
                :label="item.value"
              >
                {{ item.label }}
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-divider />
      <div class="control-container">
        <el-button
          type="primary"
          @click="downloadJSAPi"
        >
          下载JSAPI
        </el-button>
        <el-button
          type="primary"
          @click="downloadLOCA"
        >
          下载loca
        </el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {ElMessage} from 'element-plus';
  import type {FormInstance} from 'element-plus'

  const pluginList: {label: string, value: string}[] = [
    {
      label: '灵活点标记，可以随着地图级别改变样式和大小的 Marker',
      value: 'AMap.ElasticMarker'
    },
    {
      label: '工具条，控制地图的缩放、平移等',
      value: 'AMap.ToolBar'
    },
    {
      label: '比例尺，显示当前地图中心的比例尺',
      value: 'AMap.Scale'
    },
    {
      label: '鹰眼，显示缩略图',
      value: 'AMap.HawkEye'
    },
    {
      label: '图层切换，用于几个常用图层切换显示',
      value: 'AMap.MapType'
    },
    {
      label: '鼠标工具插件',
      value: 'AMap.MouseTool'
    },
    {
      label: '圆编辑插件',
      value: 'AMap.CircleEditor'
    },
    {
      label: '多边形编辑插件',
      value: 'AMap.PolygonEditor'
    },
    {
      label: '折线编辑器',
      value: 'AMap.PolylineEditor'
    },
    {
      label: '点聚合插件',
      value: 'AMap.MarkerCluster'
    },
    {
      label: '测距插件，可以用距离或面积测量',
      value: 'AMap.RangingTool'
    },
    {
      label: '热力图插件',
      value: 'AMap.HeatMap'
    },
    {
      label: 'Marker动画插件',
      value: 'AMap.MoveAnimation'
    }
  ]

  const selectAll = () => {
    form.value.selectedPlugins = pluginList.map(item => item.value)
  }
  const cancelSelect = () => {
    form.value.selectedPlugins = []
  }

  const form = ref<{
    key: string,
    selectedPlugins: string[]
  }>({
    key: '',
    selectedPlugins: []
  })

  const formRef = ref<FormInstance>()

  const downloadJSAPi = () => {
    formRef.value?.validate((flag) => {
      if(flag){
        fetch(`https://webapi.amap.com/maps?v=2.0&key=${form.value.key}&plugin=${form.value.selectedPlugins.join(',')}`)
            .then(res => res.text())
            .then(res => {
              if(res.includes('<AMap JSAPI> Error key')){
                ElMessage.error('JSAPI key错误');
                return
              }
              // res += '\r\n AMap.createDefaultLayer=function(){}'
              const index = res.match(/[a-z]\.layers=[a-z]\.layers\|\|\[]/).index;
              console.log('index: ', index)
              if(index > -1){
                const minLetter = res.substring(index, index+1);
                console.log('minLetter: ', minLetter)
                res = res.replace(`${minLetter}.layers=${minLetter}.layers||[]`, `${minLetter}.layers=${minLetter}.layers||[new AMap.VectorLayer()]`)
              }
              downloadTxt('amap.min.js', res)
            })
      }
    })
  }

  const downloadLOCA = () => {
    formRef.value?.validate((flag) => {
      if(flag){
        fetch(`https://webapi.amap.com/loca?v=2.0.0&key=${form.value.key}`)
            .then(res => res.text())
            .then(res => {
              if(res.includes('<AMap JSAPI> Error key')){
                ElMessage.error('JSAPI key错误');
                return
              }
              downloadTxt('loca.min.js', res)
            })
      }
    })
  }

  const downloadTxt = (fileName: string, content: string) => {
    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8"
    });
    // 创建URL对象
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.download = fileName;
    element.href = url;
    document.body.appendChild(element);
    element.click();
    // 释放内存
    URL.revokeObjectURL(url);
    document.body.removeChild(element);
  }
</script>

<style lang="scss" scoped>
.control-container{
  width: 100%;
  text-align: center;
}
</style>