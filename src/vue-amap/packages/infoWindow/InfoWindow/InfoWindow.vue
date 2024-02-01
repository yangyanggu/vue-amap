<template>
  <div style="display: none;">
    <div ref="infoRef">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineOptions, onUnmounted, onUpdated, ref} from 'vue';
import {useRegister} from "../../../mixins";
import {propsTypes} from './props';
defineOptions({
  name: 'ElAmapInfoWindow',
  inheritAttrs: false
});
const props = defineProps(propsTypes);

const emits = defineEmits(['init', 'update:visible']);

let $amapComponent: AMap.InfoWindow;
let observer: MutationObserver | null = null;

const {$$getInstance, parentInstance} = useRegister<AMap.InfoWindow, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.InfoWindow>((resolve) => {
    if (!options.content) {
      options.content = getSlotContent();
    }
    $amapComponent = new AMap.InfoWindow(options);
    $amapComponent.on('close', () => {
      emits('update:visible', false);
    });
    console.log('parentComponent:" ', parentComponent);
    if (props.visible) {
      $amapComponent.open(parentComponent, props.position as [number, number]);
    }
    if(!props.content && $amapComponent) {
      // 观察器的配置（需要观察什么变动）
      const config = {attributes: true, childList: true, subtree: true};
      // 创建一个观察器实例并传入回调函数
      observer = new MutationObserver(() => {
        $amapComponent.setContent(getSlotContent());
      });
      observer.observe(infoRef.value as Node, config);
    }
    resolve($amapComponent);
  });

}, {
  emits,
  watchRedirectFn: {
    __position (position: [number, number]){
      if (props.visible) {
        $amapComponent.open(parentInstance?.$amapComponent, position);
      } else {
        $amapComponent.setPosition(position);
      }
    },
    __visible (flag: boolean) {
      // fixed Amap info-window reopen
      const position = $amapComponent.getPosition();
      if (position) {
        !flag ? $amapComponent.close() : $amapComponent.open(parentInstance?.$amapComponent, [position.lng, position.lat]);
      }
    },
  },
  destroyComponent () {
    if(observer){
      observer.disconnect();
      observer = null;
    }
    if($amapComponent){
      if($amapComponent.getIsOpen()){
        $amapComponent.close();
      }
      $amapComponent = null as any;
    }
  },
});

const infoRef = ref<HTMLDivElement>();
const getSlotContent = () => {
  return infoRef.value as HTMLDivElement;
};

onUnmounted(() => {
  if($amapComponent){
    $amapComponent.close();
  }
});

onUpdated(() => {
  if(!props.content && $amapComponent){
    $amapComponent.setContent(getSlotContent());
  }
});

defineExpose({
  $$getInstance
});

</script>
