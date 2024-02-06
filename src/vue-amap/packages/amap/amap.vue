<template>
  <div class="el-vue-amap-container">
    <div
      :id="mapDomId"
      class="el-vue-amap"
    />
    <slot />
  </div>
</template>
<script setup lang="ts">
import {defineOptions, ref, nextTick, provide, onBeforeUnmount} from 'vue';
import {useRegister, provideKey} from "../../mixins";
import guid from "../../utils/guid";
import {lazyAMapApiLoaderInstance} from "../../services";
import {propsType} from "./props";
import type {IProvideType, TRegisterFn} from "../../mixins";

defineOptions({
  name: 'ElAmap',
  inheritAttrs: false
});

const needInitComponents: TRegisterFn[] = [];
const provideData:IProvideType = {
  $amapComponent: undefined,
  addChildComponent (cb){
    needInitComponents.push(cb);
  },
  isDestroy: false
};

provide(provideKey, provideData);

const props = defineProps(propsType);

const emits = defineEmits(['init','update:zoom', 'update:center', 'update:rotation', 'update:pitch']);

const mapDomId = ref<string>(props.vid as string || guid());
let $amapComponent: AMap.Map;

const {$$getInstance} = useRegister((options) => {
  return new Promise<AMap.Map>((resolve, reject) => {
    if(!lazyAMapApiLoaderInstance){
     reject(new Error('请初始化initAMapApiLoader'));
     return;
    }
    lazyAMapApiLoaderInstance.then(() => {
      nextTick(() => {
        $amapComponent = new AMap.Map(mapDomId.value, options);
        provideData.$amapComponent = $amapComponent;
        bindModelEvents();
        resolve($amapComponent);
      });
    }).catch((e: any) => {
      reject(e);
    });
  });
  
}, {
  isRoot: true,
  emits,
  needInitComponents,
  provideData,
  watchRedirectFn: {
    __dragEnable (flag: boolean){
      if($amapComponent){
        $amapComponent.setStatus({dragEnable: flag});
      }
    },
    __zoomEnable (flag: boolean){
      if($amapComponent){
        $amapComponent.setStatus({zoomEnable: flag});
      }
    },
    __jogEnable (flag: boolean){
      if($amapComponent){
        $amapComponent.setStatus({jogEnable: flag});
      }
    },
    __keyboardEnable (flag: boolean){
      if($amapComponent){
        $amapComponent.setStatus({keyboardEnable: flag});
      }
    },
    __doubleClickZoom (flag: boolean){
      if($amapComponent){
        $amapComponent.setStatus({doubleClickZoom: flag});
      }
    },
    __scrollWheel (flag: boolean){
      if($amapComponent){
        $amapComponent.setStatus({scrollWheel: flag});
      }
    },
    __rotateEnable (flag: boolean){
      if($amapComponent){
        $amapComponent.setStatus({rotateEnable: flag});
      }
    },
    __resizeEnable (flag: boolean){
      if($amapComponent){
        $amapComponent.setStatus({resizeEnable: flag});
      }
    },
    __showIndoorMap (flag: boolean){
      if($amapComponent){
        $amapComponent.setStatus({showIndoorMap: flag});
      }
    }
  }
});
const bindModelEvents = () => {
  $amapComponent.on('zoomchange',() => {
    emits('update:zoom', $amapComponent.getZoom());
  });
  $amapComponent.on('rotatechange',() => {
    emits('update:rotation', $amapComponent.getRotation());
    emits('update:pitch', $amapComponent.getPitch());
  });
  $amapComponent.on('dragging',() => {
    emits('update:center', getCenter());
    emits('update:pitch', $amapComponent.getPitch());
  });
  $amapComponent.on('touchmove',() => {
    emits('update:center', getCenter());
  });
};
const getCenter = (): [number, number] => {
  const center = $amapComponent.getCenter();
  return [center.lng, center.lat];
};

onBeforeUnmount(() => {
  if ($amapComponent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    $amapComponent.clearEvents();
    $amapComponent.destroy();
    $amapComponent = null as any;
  }
});

defineExpose({
  $$getInstance
});

</script>

<style lang="scss">
.el-vue-amap-container {
  height: 100%;
  position: relative;

  .el-vue-amap {
    height: 100%;
  }
}
</style>
