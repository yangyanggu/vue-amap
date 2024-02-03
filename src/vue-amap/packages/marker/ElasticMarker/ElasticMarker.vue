<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils";

defineOptions({
  name: 'ElAmapElasticMarker',
  inheritAttrs: false
});

defineProps(buildProps({
  position: {
    type: [Array, Object],
    required: true
  }, // 点标记在地图上显示的位置
  title: {
    type: String
  }, // 鼠标滑过点标记时的文字提示。不设置则鼠标滑过点标无文字提示。
  offset: {
    type: [Array, Object]
  }, // 点标记显示位置偏移量，默认值为 [0,0] 。Marker指定position后，默认以marker左上角位置为基准点（若设置了anchor，则以anchor设置位置为基准点），对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
  clickable: {
    type: Boolean,
    default: true
  }, // 点标记是否可点击，默认值: true
  draggable: {
    type: Boolean,
    default: false
  }, // 设置点标记是否可拖拽移动，默认值：false
  bubble: {
    type: Boolean,
    default: false
  }, // 事件是否冒泡，默认为 false
  zooms: {
    type: Array
  }, // 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
  cursor: {
    type: String
  }, // 指定鼠标悬停时的鼠，默认值：'pointer'
  topWhenClick: {
    type: Boolean,
    default: false
  }, // 鼠标点击时marker是否置顶，默认false ，不置顶
  zoomStyleMapping: {
    type: Object
  }, // 表示地图级别与styles中样式的映射，{14:0,15:0,16:1,17:1,}表示14到15级使用styles中的第0个样式，16-17级使用第二个样式
  styles: {
    type: Array
  }, // 多个不同样式的数组
  extData: {
    type: Object,
    default: () => null
  }
}));
const emits = defineEmits(['init','update:position']);

let $amapComponent: AMap.ElasticMarker;

const {$$getInstance, parentInstance} = useRegister<AMap.ElasticMarker, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.ElasticMarker>((resolve) => {
    AMap.plugin(['AMap.ElasticMarker'], () => {
      $amapComponent = new AMap.ElasticMarker(options);
      parentComponent.add($amapComponent);
      bindModelEvents();
      resolve($amapComponent);
    });
  });

}, {
  emits,
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
  const position = $amapComponent.getPosition();
  emits('update:position', position?.toArray());
};

defineExpose({
  $$getInstance
});

</script>
