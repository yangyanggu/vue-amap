<template>
  <slot />
</template>
<script setup lang="ts">
import { defineOptions, provide } from "vue";
import { useRegister, buildProps, provideKey } from "@vuemap/vue-amap";
import CustomThreeLayer from "./CustomThreeLayer";
import type { TRegisterFn, IProvideType } from "@vuemap/vue-amap";
import type { PropType } from "vue";
import type { HDROptions, LightOption } from "./Type";
import type { WebGLRendererParameters } from "three";

defineOptions({
  name: "ElAmapLayerThree",
  inheritAttrs: false,
});

const needInitComponents: TRegisterFn[] = [];
const provideData: IProvideType = {
  $amapComponent: undefined,
  addChildComponent(cb) {
    needInitComponents.push(cb);
  },
  isDestroy: false,
};

provide(provideKey, provideData);

defineProps(
  buildProps({
    lights: {
      type: Array as PropType<LightOption[]>,
      default() {
        return [];
      },
    }, // 灯光数组
    hdr: {
      type: Object as PropType<HDROptions>,
    },
    zooms: {
      type: Array as PropType<number[]>,
      default() {
        return [2, 20];
      },
    }, // 支持的缩放级别范围，默认范围 [2, 20]
    opacity: {
      type: Number,
    }, // 透明度，默认 1
    alpha: {
      type: Boolean,
      default: true,
    }, // canvas是否包含alpha (透明度)。默认为 false
    antialias: {
      type: Boolean,
      default: false,
    }, // 是否执行抗锯齿。默认为false
    customCoordsCenter: {
      type: Array as PropType<number[]>,
      default() {
        return null;
      },
    },
    axesHelper: {
      type: Boolean,
      default: false,
    },
    createCanvas: {
      type: Boolean,
      default: false,
    },
    webGLRendererParameters: {
      type: Object as PropType<WebGLRendererParameters>,
      default() {
        return undefined;
      },
    },
    cssRenderType: {
      type: String as PropType<"2D" | "3D" | undefined>,
      default: undefined,
    },
  })
);
const emits = defineEmits(["init"]);

let $amapComponent: CustomThreeLayer;

const { $$getInstance, parentInstance } = useRegister<CustomThreeLayer, any>(
  (options, parentComponent) => {
    return new Promise<CustomThreeLayer>((resolve) => {
      $amapComponent = new CustomThreeLayer(parentComponent, options, () => {
        provideData.$amapComponent = $amapComponent;
        resolve($amapComponent);
      });
    });
  },
  {
    emits,
    provideData,
    needInitComponents,
    destroyComponent() {
      if ($amapComponent) {
        $amapComponent.destroy();
        $amapComponent = null as any;
      }
    },
  }
);

const convertLngLat = (lnglat: any) => {
  return $amapComponent.convertLngLat(lnglat);
};
const addObject = (object: any) => {
  $amapComponent.add(object);
};
const removeObject = (object: any) => {
  $amapComponent.remove(object);
};
const addEnvMap = (obj: any) => {
  $amapComponent.addEnvMap(obj);
};
const $$getScene = () => {
  return $amapComponent.getScene();
};
const $$getRender = () => {
  return $amapComponent.getRender();
};
const $$refresh = () => {
  $amapComponent.refreshMap();
};
const $$addPass = (pass: any) => {
  $amapComponent.addPass(pass);
};
const $$removePass = (pass: any) => {
  $amapComponent.removePass(pass);
};

defineExpose({
  $$getInstance,
  convertLngLat,
  addObject,
  removeObject,
  addEnvMap,
  $$getScene,
  $$getRender,
  $$refresh,
  $$addPass,
  $$removePass,
});
</script>
