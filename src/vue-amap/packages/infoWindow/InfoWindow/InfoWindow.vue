<template>
  <div style="display: none;">
    <teleport
      v-if="!!divId"
      :to="'#'+divId"
    >
      <slot />
    </teleport>
  </div>
</template>
<script setup lang="ts">
import {defineOptions, onUnmounted, ref} from 'vue';
import {useRegister} from "../../../mixins";
import guid from "../../../utils/guid";
import {propsTypes} from './props';
defineOptions({
  name: 'ElAmapInfoWindow',
  inheritAttrs: false
});
const props = defineProps(propsTypes);

const emits = defineEmits(['init', 'update:visible']);

const needTeleport = !props.content;

const tempId = `info-${guid()}`;

const divId = ref('');

let $amapComponent: AMap.InfoWindow;

const {$$getInstance, parentInstance} = useRegister<AMap.InfoWindow, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.InfoWindow>((resolve) => {
    if (!options.content) {
      options.content = `<div id="${tempId}"></div>`;
    }
    $amapComponent = new AMap.InfoWindow(options);
    $amapComponent.on('close', () => {
      emits('update:visible', false);
    });
    if (props.visible) {
      $amapComponent.open(parentComponent, props.position as [number, number]);
      if(needTeleport){
        divId.value = tempId;
      }
    }
    resolve($amapComponent);
  });

}, {
  emits,
  watchRedirectFn: {
    __position (position: [number, number]){
      if (props.visible) {
        $amapComponent.open(parentInstance?.$amapComponent, position);
        if(needTeleport){
          divId.value = tempId;
        }
      } else {
        $amapComponent.setPosition(position);
      }
    },
    __visible (flag: boolean) {
      // fixed Amap info-window reopen
      const position = $amapComponent.getPosition();
      if (position) {
        if(!flag){
          $amapComponent.close();
        }else{
          $amapComponent.open(parentInstance?.$amapComponent, [position.lng, position.lat]);
          if(needTeleport){
            divId.value = tempId;
          }
        }
        // !flag ? $amapComponent.close() : $amapComponent.open(parentInstance?.$amapComponent, [position.lng, position.lat]);
      }
    },
  },
  destroyComponent () {
    if($amapComponent){
      if($amapComponent.getIsOpen()){
        $amapComponent.close();
      }
      $amapComponent = null as any;
    }
  },
});

onUnmounted(() => {
  if($amapComponent){
    $amapComponent.close();
  }
});

defineExpose({
  $$getInstance
});

</script>
