<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import {isIndoorMapInstance} from "../../../../utils";

defineOptions({
  name: 'ElAmapLayerIndoorMap',
  inheritAttrs: false
});

defineProps(buildProps({
  opacity: {
    type: Number
  }, // 透明度，默认 1
  cursor: {
    type: String
  }, // 指定鼠标悬停到店铺面时的鼠标样式
  hideFloorBar: {
    type: Boolean,
    default: false
  }// 是否隐藏楼层切换控件，默认值：false
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.IndoorMap;

const {$$getInstance, parentInstance} = useRegister<AMap.IndoorMap, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.IndoorMap>((resolve) => {
    AMap.plugin(['AMap.IndoorMap'], () => {
      $amapComponent = new AMap.IndoorMap(options);
      const layers = parentComponent.getLayers();
      layers.push($amapComponent as any);
      parentComponent.setLayers(layers);
      resolve($amapComponent);
    });
  });

}, {
  emits,
  watchRedirectFn: {
    __hideFloorBar (flag: boolean) {
      !flag ? $amapComponent.hideFloorBar() : $amapComponent.showFloorBar();
    }
  },
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      const layers = parentInstance.$amapComponent.getLayers();
      let index = -1;
      for (let i = 0;i < layers.length;i++) {
        if (isIndoorMapInstance(layers[i])) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        layers.splice(index, 1);
        parentInstance.$amapComponent.setLayers(layers);
      }
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
