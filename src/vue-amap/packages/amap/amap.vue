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
import {defineOptions, ref, defineModel, nextTick, provide, onBeforeUnmount} from 'vue';
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

const emits = defineEmits(['init']);

const mapDomId = ref<string>(props.vid as string || guid());
let $amapComponent: AMap.Map;
// 地图显示的缩放级别，可以设置为浮点数；若center与level未赋值，地图初始化默认显示用户所在城市范围。
const zoom = defineModel<number>('zoom');
// 地图顺时针旋转角度，取值范围 [0-360] ，默认值：0
const rotation = defineModel<number>('rotation');
// 俯仰角度，默认 0，最大值根据地图当前 zoom 级别不断增大，2D地图下无效 。
const pitch = defineModel<number>('pitch');
// // 初始中心经纬度
const center = defineModel<[number, number]>('center');

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
    zoom.value = $amapComponent.getZoom();
  });
  $amapComponent.on('rotatechange',() => {
    rotation.value = $amapComponent.getRotation();
    pitch.value = $amapComponent.getPitch();
  });
  $amapComponent.on('dragging',() => {
    center.value = getCenter();
    pitch.value = $amapComponent.getPitch();
  });
  $amapComponent.on('touchmove',() => {
    center.value = getCenter();
  });
};
const getCenter = (): [number, number] => {
  const center = $amapComponent.getCenter();
  return [center.lng, center.lat];
};

onBeforeUnmount(() => {
  if ($amapComponent) {
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
