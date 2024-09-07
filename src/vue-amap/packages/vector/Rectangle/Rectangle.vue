<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions, useAttrs} from 'vue';
import {debounce} from "lodash-es";
import {useRegister} from "../../../mixins";
import {useEditor} from "../../../mixins/useEditor";
import {
  isMapInstance,
  isOverlayGroupInstance,
  isVectorLayerInstance, toLngLat
} from "../../../utils";
import {propsTypes} from "./props";

defineOptions({
  name: 'ElAmapRectangle',
  inheritAttrs: false
});

const props = defineProps(propsTypes);
const emits = defineEmits(['init','update:bounds']);

let $amapComponent: AMap.Rectangle;
let destroying = false;

const {$$getInstance, parentInstance} = useRegister<AMap.Rectangle, any>((options, parentComponent) => {
  return new Promise<AMap.Rectangle>((resolve) => {
    $amapComponent = new AMap.Rectangle(options);
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
  converts: {
    bounds: (path: any): any => {
      return new AMap.Bounds(toLngLat(path[0]), toLngLat(path[1]));
    }
  },
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
    __fillColor (value: string) {
      if($amapComponent){
        $amapComponent.setOptions({fillColor: value});
      }
    },
    __fillOpacity (value: number) {
      if($amapComponent){
        $amapComponent.setOptions({fillOpacity: value});
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
    __editable (flag: boolean) {
      createEditor().then(() => {
        flag ? resetEditor() : editor.close();
      });
    },
    __bounds (bounds: AMap.Bounds){
      if($amapComponent){
        $amapComponent.setBounds(bounds);
        resetEditor();
      }
    }
  },
  destroyComponent () {
    destroying = true;
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

const resetEditor = debounce(() => {
  if(editor && props.editable){
    editor.close();
    editor.setTarget();
    editor.setTarget($amapComponent);
    editor.open();
  }
}, 50);

const bindModelEvents = () => {
  $amapComponent.on('dragend',() => {
    emitModel($amapComponent);
  });
  $amapComponent.on('touchend',() => {
    emitModel($amapComponent);
  });
};
const emitModel = (target: AMap.Rectangle) => {
  if(destroying){
    return;
  }
  const bounds = target.getBounds() as AMap.Bounds;
  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();
  const paths = [southWest.toArray(), northEast.toArray()];
  emits('update:bounds', paths);
};

let editor: AMap.RectangleEditor;
const attrs = useAttrs();
const createEditor = () => {
  return new Promise<void>((resolve) => {
    if (editor) {
      resolve();
    } else {
      AMap.plugin(['AMap.RectangleEditor'], () => {
        editor = new AMap.RectangleEditor(parentInstance?.$amapComponent, $amapComponent, props.editOptions);
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
  // editor.on('end',(e) => {
  //   emitModel(e.target);
  // });
};

defineExpose({
  $$getInstance
});

</script>
