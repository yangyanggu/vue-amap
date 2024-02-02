<template>
  <div style="display: none;">
    <div ref="contentRef">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineOptions, useSlots, ref} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils/buildHelper";
import {isMapInstance, isOverlayGroupInstance} from '../../../utils';
import {propsTypes} from './props';
export type {MarkerMoveOptions} from './props';

defineOptions({
  name: 'ElAmapMarker',
  inheritAttrs: false
});

const props = defineProps(buildProps(propsTypes));
const emits = defineEmits(['init','update:position']);

let $amapComponent: AMap.Marker;

let withSlot = false;
const $slots = useSlots();
let observer: MutationObserver;
const contentRef = ref<HTMLDivElement>();
const {$$getInstance, parentInstance} = useRegister<AMap.Marker, any>((options, parentComponent) => {
  return new Promise<AMap.Marker>((resolve) => {
    if ($slots.default && $slots.default().length > 0) {
      withSlot = true;
      options.content = getSlotContent();
    }
    $amapComponent = new AMap.Marker(options);
    if (isMapInstance(parentComponent)) {
      parentComponent.add($amapComponent);
    } else if (isOverlayGroupInstance(parentComponent)) {
      parentComponent.addOverlay($amapComponent);
    }
    if(withSlot){
      // 观察器的配置（需要观察什么变动）
      const config = { attributes: true, childList: true, subtree: true };
      // 创建一个观察器实例并传入回调函数
      observer = new MutationObserver(() => {
        $amapComponent.setContent(getSlotContent());
      });
      observer.observe(contentRef.value as Node, config);
    }
    bindModelEvents();
    resolve($amapComponent);
  });

}, {
  emits,
  watchRedirectFn: {
    __position (position: [number, number]) {
      if(!props.moveOptions){
        $amapComponent.setPosition(position);
        return;
      }
      if(parentInstance?.$amapComponent){
        parentInstance.$amapComponent.plugin('AMap.MoveAnimation', () => {
          $amapComponent.moveTo(position, props.moveOptions);
        });
      }
    }
  },
  destroyComponent () {
    if(observer){
      observer.disconnect();
      observer = null as any;
    }
    if ($amapComponent && parentInstance?.$amapComponent) {
      $amapComponent.setMap(null);
      $amapComponent = null as any;
    }
  },
});

const getSlotContent = () => {
  return (contentRef.value as HTMLDivElement);
};

const bindModelEvents = () => {
  $amapComponent.on('dragend',() => {
    emitPosition();
  });
  $amapComponent.on('touchend',() => {
    emitPosition();
  });
};
const emitPosition = () => {
  const position = $amapComponent.getPosition() as AMap.LngLat;
  emits('update:position', position.toArray());
};

defineExpose({
  $$getInstance
});

</script>
