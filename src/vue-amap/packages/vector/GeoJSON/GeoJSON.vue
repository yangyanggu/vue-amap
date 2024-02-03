<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {merge} from "lodash-es";
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils";
import type { PropType} from 'vue';

defineOptions({
  name: 'ElAmapGeojson',
  inheritAttrs: false
});

const props = defineProps(buildProps({
  // 要加载的标准GeoJSON对象
  geo: {
    type: Object,
    required: true
  },
  // marker的默认样式
  markerOptions: {
    type: Object as PropType<AMap.MarkerOptions>
  },
  // 指定点要素的绘制方式，缺省时为Marker的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
  getMarker: {
    type: Function
  },
  // polyline的默认样式
  polylineOptions: {
    type: Object as PropType<AMap.PolylineOptions>
  },
  // 指定线要素的绘制方式，缺省时为Polyline的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
  getPolyline: {
    type: Function
  },
  // polygon的默认样式
  polygonOptions: {
    type: Object as PropType<AMap.PolygonOptions>
  },
  // 指定面要素的绘制方式，缺省时为Polygon的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
  getPolygon: {
    type: Function
  } 
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.GeoJSON;

const {$$getInstance, parentInstance} = useRegister<AMap.GeoJSON, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.GeoJSON>((resolve) => {
    AMap.plugin(['AMap.GeoJSON'], () => {
      if (!options.getMarker) {
        options.getMarker = createMarker;
      }
      if (!options.getPolyline) {
        options.getPolyline = createPolyline;
      }
      if (!options.getPolygon) {
        options.getPolygon = createPolygon;
      }
      $amapComponent = new AMap.GeoJSON(options);
      parentComponent.add($amapComponent);
      resolve($amapComponent);
    });
  });

}, {
  emits,
  propsRedirect: {
    geo: 'geoJSON'
  },
  watchRedirectFn: {
    __geoJSON (value) {
      if($amapComponent){
        $amapComponent.importData(value);
      }
    }
  },
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        parentInstance?.$amapComponent.remove($amapComponent);
      }
      $amapComponent = null as any;
    }
  },
});

const createMarker = (geojson: any, lnglat: [number, number]) => {
  let options = props.markerOptions || {};
  options = merge({}, options, geojson.properties);
  options.position = lnglat;
  return new AMap.Marker(options);
};
const createPolyline = (geojson: any, lnglat: any) => {
  let options = props.polylineOptions || {};
  options = merge({}, options, geojson.properties);
  options.path = lnglat;
  return new AMap.Polyline(options);
};
const createPolygon = (geojson: any, lnglat: any) => {
  let options = props.polygonOptions || {};
  options = merge({}, options, geojson.properties);
  options.path = lnglat;
  return new AMap.Polygon(options);
};

defineExpose({
  $$getInstance
});

</script>
