<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions, useAttrs} from 'vue';
import {useRegister} from "../../../mixins";
import {useEditor} from "../../../mixins/useEditor";
import {
  isMapInstance,
  isOverlayGroupInstance,
  isVectorLayerInstance
} from "../../../utils";
import {propsTypes} from "./props";

defineOptions({
  name: 'ElAmapBezierCurve',
  inheritAttrs: false
});

const props = defineProps(propsTypes);
const emits = defineEmits(['init','update:path']);

let $amapComponent: AMap.BezierCurve;

const {$$getInstance, parentInstance} = useRegister<AMap.BezierCurve, any>((options, parentComponent) => {
  return new Promise<AMap.BezierCurve>((resolve) => {
    $amapComponent = new AMap.BezierCurve(options);
    if (isMapInstance(parentComponent)) {
      parentComponent.add($amapComponent);
    } else if (isOverlayGroupInstance(parentComponent)) {
      parentComponent.addOverlay($amapComponent);
    } else if (isVectorLayerInstance(parentComponent)) {
      parentComponent.add($amapComponent);
    }
    bindModelEvents();
    resolve($amapComponent);
  });

}, {
  emits,
  watchRedirectFn: {
    __zIndex (value: number) {
      if($amapComponent){
        $amapComponent.setOptions({zIndex: value});
      }
    },
    __strokeColor (value: string) {
      if($amapComponent){
        $amapComponent.setOptions({strokeColor: value});
      }
    },
    __strokeOpacity (value: number) {
      if($amapComponent){
        $amapComponent.setOptions({strokeOpacity: value});
      }
    },
    __strokeWeight (value: number) {
      if($amapComponent){
        $amapComponent.setOptions({strokeWeight: value});
      }
    },
    __borderWeight (value: number) {
      if($amapComponent){
        $amapComponent.setOptions({borderWeight: value});
      }
    },
    __isOutline (value: boolean) {
      if($amapComponent){
        $amapComponent.setOptions({isOutline: value});
      }
    },
    __outlineColor (value: string) {
      if($amapComponent){
        $amapComponent.setOptions({outlineColor: value});
      }
    },
    __strokeStyle (value: "solid" | "dashed" | undefined) {
      if($amapComponent){
        $amapComponent.setOptions({strokeStyle: value});
      }
    },
    __strokeDasharray (value: any) {
      if($amapComponent){
        $amapComponent.setOptions({strokeDasharray: value});
      }
    },
    __lineJoin (value: any) {
      if($amapComponent){
        $amapComponent.setOptions({lineJoin: value});
      }
    },
    __lineCap (value: any) {
      if($amapComponent){
        $amapComponent.setOptions({lineCap: value});
      }
    },
    __geodesic (value: any) {
      if($amapComponent){
        $amapComponent.setOptions({geodesic: value});
      }
    },
    __showDir (value: any) {
      if($amapComponent){
        $amapComponent.setOptions({showDir: value});
      }
    },
    __editable (flag: boolean) {
      createEditor().then(() => {
        flag ? editor.open() : editor.close();
      });
    }
  },
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if (editor) {
        if(!parentInstance.isDestroy){
          editor.close();
        }
        editor = null as any;
      }
      if(!parentInstance.isDestroy){
        if (isMapInstance(parentInstance.$amapComponent)) {
          parentInstance.$amapComponent.remove($amapComponent);
        } else if (isOverlayGroupInstance(parentInstance.$amapComponent)) {
          parentInstance.$amapComponent.removeOverlay($amapComponent);
        } else if (isVectorLayerInstance(parentInstance.$amapComponent)) {
          parentInstance.$amapComponent.remove($amapComponent);
        }
      }
      if($amapComponent.destroy){
        $amapComponent.destroy();
      }
      $amapComponent = null as any;
    }
  },
});

const bindModelEvents = () => {
  $amapComponent.on('dragend',() => {
    emitModel($amapComponent);
  });
  $amapComponent.on('touchend',() => {
    emitModel($amapComponent);
  });
};
const emitModel = (target: AMap.BezierCurve) => {
  const path = target.getPath();
  emits('update:path', path);
};

let editor: AMap.BezierCurveEditor;
const attrs = useAttrs();
const createEditor = () => {
  return new Promise<void>((resolve) => {
    if (editor) {
      resolve();
    } else {
      AMap.plugin(['AMap.BezierCurveEditor'], () => {
        editor = new AMap.BezierCurveEditor(parentInstance?.$amapComponent, $amapComponent, props.editOptions);
        useEditor(editor, attrs);
        bindEditorModelEvents();
        resolve();
      });
    }
  });
};
const bindEditorModelEvents = () => {
  editor.on('addnode',(e) => {
    emitModel(e.target);
  });
  editor.on('adjust',(e) => {
    emitModel(e.target);
  });
  editor.on('removenode',(e) => {
    emitModel(e.target);
  });
  editor.on('add',(e) => {
    emitModel(e.target);
  });
  editor.on('end',(e) => {
    emitModel(e.target);
  });
};

defineExpose({
  $$getInstance
});

</script>
