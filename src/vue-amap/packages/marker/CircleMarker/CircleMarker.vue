<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils";

defineOptions({
  name: 'ElAmapCircleMarker',
  inheritAttrs: false
});

defineProps(buildProps({
  zIndex: {
    type: Number
  },
  center: {
    type: Array,
    required: true
  },
  bubble: {
    type: Boolean,
    default: false
  },
  cursor: {
    type: String
  },
  radius: {
    type: Number
  },
  strokeColor: {
    type: String
  },
  strokeOpacity: {
    type: Number
  },
  strokeWeight: {
    type: Number
  },
  fillColor: {
    type: String
  },
  fillOpacity: {
    type: Number
  },
  draggable: {
    type: Boolean,
    default: false
  },
  extData: {
    type: Object
  }
}));
const emits = defineEmits(['init','update:center']);

let $amapComponent: AMap.CircleMarker;

const {$$getInstance, parentInstance} = useRegister<AMap.CircleMarker, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.CircleMarker>((resolve) => {
    $amapComponent = new AMap.CircleMarker(options);
    parentComponent.add($amapComponent);
    bindModelEvents();
    resolve($amapComponent);
  });

}, {
  emits,
  watchRedirectFn: {
    __strokeColor (value: string) {
      $amapComponent.setOptions({
        strokeColor: value
      });
    },
    __strokeOpacity (value: number) {
      $amapComponent.setOptions({
        strokeOpacity: value
      });
    },
    __strokeWeight (value: number) {
      $amapComponent.setOptions({
        strokeWeight: value
      });
    },
    __fillColor (value: string) {
      $amapComponent.setOptions({
        fillColor: value
      });
    },
    __fillOpacity (value: number) {
      $amapComponent.setOptions({
        fillOpacity: value
      });
    }
  },
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        parentInstance?.$amapComponent.remove($amapComponent);
      }
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
  const center = $amapComponent.getCenter();
  emits('update:center', center.toArray());
};

defineExpose({
  $$getInstance
});

</script>
