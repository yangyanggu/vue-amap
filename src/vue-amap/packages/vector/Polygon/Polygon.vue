<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions, useAttrs} from 'vue';
import {debounce} from "lodash-es";
import {useRegister} from "../../../mixins";
import {useEditor} from "../../../mixins/useEditor";
import {
  convertLnglat,
  isMapInstance,
  isOverlayGroupInstance,
  isVectorLayerInstance
} from "../../../utils";
import {propsTypes} from "./props";

defineOptions({
  name: 'ElAmapPolygon',
  inheritAttrs: false
});

const props = defineProps(propsTypes);
const emits = defineEmits(['init','update:path']);

let $amapComponent: AMap.Polygon;
let destroying = false;

const {$$getInstance, parentInstance} = useRegister<AMap.Polygon, any>((options, parentComponent) => {
  return new Promise<AMap.Polygon>((resolve) => {
    $amapComponent = new AMap.Polygon(options);
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
    __path (path: AMap.LngLatLike[]){
      if($amapComponent){
        $amapComponent.setPath(path);
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
const emitModel = (target: AMap.Polygon) => {
  if(destroying){
    return;
  }
  const paths = target.getPath();
  const pathArray = paths?.map(convertLnglat);
  emits('update:path', pathArray);
};

let editor: AMap.PolygonEditor;
const attrs = useAttrs();
const createEditor = () => {
  return new Promise<void>((resolve) => {
    if (editor) {
      resolve();
    } else {
      AMap.plugin(['AMap.PolygonEditor'], () => {
        editor = new AMap.PolygonEditor(parentInstance?.$amapComponent, $amapComponent, props.editOptions);
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
