<template>
  <div style="display: none">
    <div ref="popupRef">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineOptions, getCurrentInstance, ref, watch } from "vue";
import { useRegister, buildProps } from "@vuemap/vue-amap";
import { CSS2DObject } from "../ThreeLayer/CSS2DRenderer";
import CustomThreeGltf from "./CustomThreeGltf";
import type { MoveAnimation, Vec, ConfigLoader } from "./Type";
import type { PropType, ComponentInternalInstance } from "vue";
const popupRef = ref<HTMLDivElement>();

defineOptions({
  name: "ElAmapThreeGltf",
  inheritAttrs: false,
});

const props = defineProps(
  buildProps({
    url: {
      type: String,
    },
    position: {
      type: Array as PropType<number[]>,
    },
    height: {
      type: Number,
      default: 0,
    },
    rotation: {
      type: Object as PropType<Vec>,
    },
    scale: {
      type: [Number, Array],
      default: 1,
    },
    angle: {
      type: Number,
      default: 0,
    },
    moveAnimation: {
      type: Object as PropType<MoveAnimation>,
    }, //位置移动是否开启动画
    configLoader: {
      type: Function as PropType<ConfigLoader>,
    },
    useModelCache: {
      type: Boolean,
      default: false,
    },
    showPopup: {
      type: Boolean,
      default: false,
    },
    popupHeight: {
      //弹窗距离模型中心点的高度
      type: Number,
      default: 0,
    },
  })
);
const emits = defineEmits([
  "init",
  "click",
  "mousemove",
  "mouseover",
  "mouseout",
]);

let $amapComponent: CustomThreeGltf;

let popup: CSS2DObject;

const currentInstance = getCurrentInstance();

const { $$getInstance, parentInstance } = useRegister<CustomThreeGltf, any>(
  (options, parentComponent) => {
    return new Promise<CustomThreeGltf>((resolve) => {
      // currentInstance.$$startAnimations = $$startAnimations;
      // currentInstance.$$stopAnimations = $$stopAnimations;
      // Object.assign( currentInstance.ctx, currentInstance.exposed);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      $amapComponent = new CustomThreeGltf(
        parentComponent,
        options,
        {
          $emit: emits,
          ...(currentInstance?.exposed || {}),
        },
        () => {
          addPopup($amapComponent);
          resolve($amapComponent);
        }
      );
    });
  },
  {
    emits,
    destroyComponent () {
      if ($amapComponent && parentInstance?.$amapComponent) {
        if (!parentInstance.isDestroy) {
          $amapComponent.remove();
        }
        $amapComponent.layer?.cssRenderer?.domElement?.remove();
        $amapComponent.destroy();
        $amapComponent = null as any;
      }
    },
  }
);

const addPopup = (instance: CustomThreeGltf) => {
  const cssRender = instance.layer?.cssRenderer;
  if (cssRender == undefined || !props.showPopup) return;
  const element = popupRef.value as HTMLDivElement;
  const css2dObject = new CSS2DObject(element);
  css2dObject.center.set(0.5, 1);
  css2dObject.translateY(props.popupHeight || 0);
  popup = css2dObject;
  popup.visible = props.showPopup;
  instance.object.add(popup);
};

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

watch(
  () => props.showPopup,
  (val) => {
    if(val && !popup){
      addPopup($amapComponent);
      return;
    }
    popup.visible = val;
  }
);

watch(
  () => props.popupHeight,
  (val, old) => {
    if (popup) {
      const changeVal = (val || 0) - (old || 0);
      popup.translateY(changeVal || 0);
    }
  }
);
</script>
