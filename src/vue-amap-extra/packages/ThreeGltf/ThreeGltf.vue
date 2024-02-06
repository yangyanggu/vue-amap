<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions, getCurrentInstance} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import CustomThreeGltf from "./CustomThreeGltf";
import type {MoveAnimation, Vec, ConfigLoader} from "./Type";
import type{PropType, ComponentInternalInstance} from "vue";

defineOptions({
  name: 'ElAmapThreeGltf',
  inheritAttrs: false
});

defineProps(buildProps({
  url: {
    type: String
  },
  position: {
    type: Array as PropType<number[]>
  },
  height: {
    type: Number,
    default: 0
  },
  rotation: {
    type: Object as PropType<Vec>
  },
  scale: {
    type: [Number, Array],
    default: 1
  },
  angle: {
    type: Number,
    default: 0
  },
  moveAnimation: {
    type: Object as PropType<MoveAnimation>
  }, //位置移动是否开启动画
  configLoader: {
    type: Function as PropType<ConfigLoader>
  },
  useModelCache: {
    type: Boolean,
    default: false
  }
}));
const emits = defineEmits(['init','click', 'mousemove', 'mouseover', 'mouseout']);

let $amapComponent: CustomThreeGltf;

const currentInstance = getCurrentInstance();

const {$$getInstance, parentInstance} = useRegister<CustomThreeGltf, any>((options, parentComponent) => {
  return new Promise<CustomThreeGltf>((resolve) => {
    // currentInstance.$$startAnimations = $$startAnimations;
    // currentInstance.$$stopAnimations = $$stopAnimations;
    // Object.assign( currentInstance.ctx, currentInstance.exposed);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    $amapComponent = new CustomThreeGltf(parentComponent, options, {
      $emit: emits,
      ...(currentInstance?.exposed || {})
    }, () => {
      resolve($amapComponent);
    });
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance.isDestroy){
        $amapComponent.remove();
      }
      $amapComponent.destroy();
      $amapComponent = null as any;
    }
  },
});

const $$startAnimations = () => {
  $amapComponent.startAnimations();
};
const $$stopAnimations = () => {
  $amapComponent.stopAnimations();
};

defineExpose({
  $$getInstance,
  $$startAnimations,
  $$stopAnimations,
});

</script>
