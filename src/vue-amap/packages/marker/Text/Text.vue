<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {propsType} from "./props";

defineOptions({
  name: 'ElAmapText',
  inheritAttrs: false
});

defineProps(propsType);
const emits = defineEmits(['init','update:position']);

let $amapComponent: AMap.Text;

const {$$getInstance, parentInstance} = useRegister<AMap.Text, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.Text>((resolve) => {
    $amapComponent = new AMap.Text(options);
    parentComponent.add($amapComponent);
    bindModelEvents();
    resolve($amapComponent);
  });

}, {
  emits,
  propsRedirect: {
    textStyle: 'style'
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
