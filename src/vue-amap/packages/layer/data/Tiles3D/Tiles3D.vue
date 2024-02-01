<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import {loadScript} from "../../../../utils";

defineOptions({
  name: 'ElAmapLayerTiles3d',
  inheritAttrs: false
});

defineProps(buildProps({
  url: {
    type: String,
    required: true
  },
  threeScriptUrl: {
    type: String,
    default: '//a.amap.com/jsapi_demos/static/data3d/lib/three.117.js'
  },
  threeGltfLoader: {
    type: String,
    default: '//a.amap.com/jsapi_demos/static/data3d/lib/GLTFLoader.117.min.js'
  },
  layerStyle: {
    type: Object
  }
}));
const emits = defineEmits(['init']);

let $amapComponent: any;

const {$$getInstance, parentInstance} = useRegister<any, AMap.Map>((options, parentComponent) => {
  return new Promise<any>((resolve) => {
    parentComponent.plugin(['AMap.3DTilesLayer'], () => {
      if(!window['THREE']){
        loadScript(options.threeScriptUrl, () => {
          loadScript(options.threeGltfLoader, () => {
            createLayer(options);
            resolve($amapComponent);
          });
        });
      }else{
        createLayer(options);
        resolve($amapComponent);
      }
    });
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent) {
      $amapComponent = null as any;
    }
  },
});

const createLayer = (options: any) => {
  let layerStyle: any = {};
  if(options.layerStyle){
    layerStyle = JSON.parse(JSON.stringify(options.layerStyle));
  }
  $amapComponent = new AMap['3DTilesLayer']({
    map: parentInstance?.$amapComponent,
    url: options.url, // 3d Tiles 入口文件
    style: layerStyle
  });
};

defineExpose({
  $$getInstance
});

</script>
