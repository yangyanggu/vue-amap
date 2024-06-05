<template>
  <div style="display: none">
    <div style="width: 0; height: 0; position: relative" ref="popupRef">
      <div
        class="content-container"
        style="transform: translate(-50%, -100%); position: absolute"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineOptions, getCurrentInstance, ref, watch } from "vue";
import { useRegister, buildProps } from "@vuemap/vue-amap";
import CustomThreeGltf from "./CustomThreeGltf";
import type { MoveAnimation, Vec, ConfigLoader } from "./Type";
import type { PropType, ComponentInternalInstance } from "vue";
import { CSS2DObject } from "../ThreeLayer/CSS2DRenderer";
import { CSS3DObject } from "../ThreeLayer/CSS3DRenderer";
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
    popupScale: {
      //三维弹窗的缩放比例(只有在threelayer的cssRenderType为3D时生效)
      type: [Number, Array<Number>],
      default: 1,
    },
    popupType:{//信息弹窗类型
      type:String as PropType<'2D'|'3D'>,
      default:'2D'
    }
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

let popup: CSS2DObject | CSS3DObject;

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
  const element = popupRef.value as HTMLDivElement;
  const contentEle = element.querySelector('.content-container');
  if(contentEle?.children?.length==0) return;
  if (props.popupType === "2D") {
    const css2dObject = new CSS2DObject(element);
    css2dObject.center.set(0.5, 1);
    css2dObject.translateY(props.popupHeight || 0);
    popup = css2dObject;
    popup.visible = props.showPopup;
    instance.object.add(popup);
  } else if (props.popupType === "3D") {
    const scales =
      typeof props.popupScale === "number"
        ? [props.popupScale, props.popupScale, props.popupScale]
        : props.popupScale;
    const css3DObject = new CSS3DObject(element);
    css3DObject.translateY(props.popupHeight || 0);
    css3DObject.scale.set(scales[0], scales[1], scales[2]);
    popup = css3DObject;
    popup.visible = props.showPopup;
    instance.object.add(popup);
  }
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

watch(
  () => props.popupScale,
  (val) => {
    if (popup && val) {
      const scales = typeof val === "number" ? [val, val, val] : val;
      popup.scale.set(scales[0], scales[1], scales[2]);
    }
  }
);
</script>
