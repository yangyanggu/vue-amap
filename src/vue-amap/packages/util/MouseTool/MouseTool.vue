<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils/buildHelper";
import type { PropType} from 'vue';

export interface TooltipText {
  marker?: string
  circle?: string
  rectangle?: string
  polyline?: string
  polygon?: string
  measureArea?: string
  rule?: string
  rectZoomIn?: string
  rectZoomOut?: string
}

defineOptions({
  name: 'ElAmapMouseTool',
  inheritAttrs: false
});

const props = defineProps(buildProps({
  type: {
    type: String as PropType<'marker' | 'circle' | 'rectangle' | 'polyline' | 'polygon' | 'measureArea' | 'rule' | 'rectZoomIn' | 'rectZoomOut'>,
    required: true,
    default: 'marker',
    validator: (value: string): boolean => {
      return ['marker', 'circle', 'rectangle', 'polyline', 'polygon', 'measureArea', 'rule', 'rectZoomIn', 'rectZoomOut'].includes(value);
    }
  }, // 类型
  drawOptions: {
    type: Object,
    default: () => null
  }, // 绘制图层的属性
  autoClear: {
    type: Boolean,
    default: true
  }, // 是否绘制结束后自动清空图层
  showTooltip: {
    type: Boolean,
    default: true
  }, // 是否显示提示信息
  tooltipTextMap: {
    type: Object as PropType<TooltipText>,
    default: () => null
  }, // 提示信息的map
  textOptions: {
    type: Object,
    default: () => null
  },
  drawCursor: {
    type: String,
    default: 'crosshair'
  }
}));
const emits = defineEmits(['init','draw']);

let $amapComponent: AMap.MouseTool;

let preMapCursor = '';
const tipTexts = {
  marker: '单击地图选择点位',
  circle: '按住鼠标左键拖拽绘制圆',
  rectangle: '按住鼠标左键拖拽绘制矩形',
  polyline: '单击地图选择拐点，双击地图完成折线绘制',
  polygon: '单击地图选择拐点，双击地图完成多边形绘制',
  measureArea: '单击地图选择拐点，双击地图完成绘制并计算面积',
  rule: '单击地图选择拐点，右击地图完成绘制并计算距离',
  rectZoomIn: '按住鼠标左键拖拽绘制矩形，松开左键放大地图',
  rectZoomOut: '按住鼠标左键拖拽绘制矩形，松开左键放大地图',
};
let isDrawing = true;

const __type = () => {
  if(!isDrawing){
    return;
  }
  const type = props.type;
  if($amapComponent[type]){
    const options = props.drawOptions || {};
    $amapComponent[type](options);
    setText(tipTexts[type]);
  }
};

const {$$getInstance, parentInstance} = useRegister<AMap.MouseTool, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.MouseTool>((resolve) => {
    AMap.plugin(['AMap.MouseTool'], () => {
      if(props.tooltipTextMap){
        Object.assign(tipTexts, props.tooltipTextMap);
      }
      $amapComponent = new AMap.MouseTool(parentComponent);
      preMapCursor = parentComponent.getDefaultCursor();
      createTooltip();
      __type();
      bindEvent();
      changeMapCursor();
      resolve($amapComponent);
    });
  });

}, {
  emits,
  watchRedirectFn: {
    __type
  },
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        $amapComponent.close(true);
        revertMapCursor();
        if($text){
          parentInstance.$amapComponent.off('mousemove', getMousePosition);
          parentInstance.$amapComponent.remove($text);
          $text = null as any;
        }
      }
      $amapComponent = null as any;
    }
  },
});


let $text: AMap.Text;
const createTooltip = () => {
  if(props.showTooltip){
    const textOptions = props.textOptions || {};
    textOptions.anchor = 'top-left';
    textOptions.clickable= false;
    textOptions.bubble = true;
    textOptions.offset = [10, 10];
    $text = new AMap.Text(textOptions);
    parentInstance?.$amapComponent.add($text);
    parentInstance?.$amapComponent.on('mousemove',getMousePosition);
  }
};
const getMousePosition = (e: any) => {
  const lnglat = e.lnglat;
  $text.setPosition([lnglat.lng, lnglat.lat]);
};
const setText = (content: string) => {
  if($text){
    $text.setText(content);
  }
};
const bindEvent = () => {
  $amapComponent.on('draw', (e: {obj: any,type: string}) => {
    const type = props.type;
    let emitData: any;
    if(type === 'marker'){
      emitData = e.obj.getPosition().toArray();
    } else if (type === 'circle'){
      emitData = {
        center: e.obj.getCenter().toArray(),
        radius: e.obj.getRadius()
      };
    } else if (type === 'rectangle'){
      const bounds = e.obj.getBounds();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();
      emitData = [southWest.toArray(), northEast.toArray()];
    } else if (type === 'polyline'){
      const path = e.obj.getPath();
      emitData = path.map(v => v.toArray());
    } else if (type === 'polygon'){
      const path = e.obj.getPath();
      emitData = path.map(v => v.toArray());
    } else if (type === 'measureArea'){
      const path = e.obj.getPath().map(v => v.toArray());
      emitData = AMap.GeometryUtil.ringArea(path);
    } else if (type === 'rule'){
      const path = e.obj.getPath().map(v => v.toArray());
      emitData = AMap.GeometryUtil.distanceOfLine(path);
    } else if (type === 'rectZoomIn'){
      emitData = true;
    } else if (type === 'rectZoomOut'){
      emitData = true;
    }
    emits('draw', emitData, e.obj);
    if(props.autoClear){
      $$clear();
      __type();
    }
  });
};

const _close = (ifClear = true) => {
  $amapComponent.close(ifClear);
};

const $$close = (ifClear = true) => {
  isDrawing = false;
  if($amapComponent){
    _close(ifClear);
    revertMapCursor();
    if($text){
      $text.hide();
    }
  }
};
const $$open = () => {
  isDrawing = true;
  changeMapCursor();
  __type();
  if($text){
    $text.show();
  }
};
const $$clear = () => {
  _close(true);
};
const changeMapCursor = () => {
  parentInstance?.$amapComponent.setDefaultCursor(props.drawCursor);
};
const revertMapCursor = () => {
  if(preMapCursor){
    parentInstance?.$amapComponent.setDefaultCursor(preMapCursor);
  }
};

defineExpose({
  $$getInstance,
  $$open,
  $$close,
  $$clear
});

</script>
