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
import {defineOptions, ref, useSlots} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils/buildHelper";
import {isMapInstance, isOverlayGroupInstance} from '../../../utils';
import guid from "../../../utils/guid";
import {propsTypes} from './props';
export type {MarkerMoveOptions} from './props';

defineOptions({
  name: 'ElAmapMarker',
  inheritAttrs: false
});

const props = defineProps(buildProps(propsTypes));
const emits = defineEmits(['init','update:position']);


const tempId = `marker-${guid()}`;

const divId = ref('');

let $amapComponent: AMap.Marker;

let withSlot = false;
const $slots = useSlots();

const {$$getInstance, parentInstance} = useRegister<AMap.Marker, any>((options, parentComponent) => {
  return new Promise<AMap.Marker>((resolve) => {
    if ($slots.default && $slots.default().length > 0) {
      withSlot = true;
      options.content = `<div id="${tempId}"></div>`;
    }
    $amapComponent = new AMap.Marker(options);
    if (isMapInstance(parentComponent)) {
      parentComponent.add($amapComponent);
    } else if (isOverlayGroupInstance(parentComponent)) {
      parentComponent.addOverlay($amapComponent);
    }
    if(withSlot){
      divId.value = tempId;
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
    if ($amapComponent && parentInstance?.$amapComponent) {
      $amapComponent.setMap(null);
      $amapComponent = null as any;
    }
  },
});

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
