<template>
</template>
<script>
import registerMixin from '../../mixins/register-component';
import {merge} from 'lodash-es';

export default {
  name: 'el-amap-geojson',
  mixins: [registerMixin],
  props: {
    geo: {
      type: Object,
      required: true
    }, // 要加载的标准GeoJSON对象
    markerOptions: {
      type: Object
    }, // marker的默认样式
    getMarker: {
      type: Function
    }, // 指定点要素的绘制方式，缺省时为Marker的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
    polylineOptions: {
      type: Object
    }, // polyline的默认样式
    getPolyline: {
      type: Function
    }, // 指定线要素的绘制方式，缺省时为Polyline的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
    polygonOptions: {
      type: Object
    }, // polygon的默认样式
    getPolygon: {
      type: Function
    } // 指定面要素的绘制方式，缺省时为Polygon的默认样式。geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
  },
  data() {
    return {
      propsRedirect: {
        geo: 'geoJSON'
      },
      converters: {},
      handlers: {
        geo(value) {
          this.importData(value);
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise((resolve) => {
        AMap.plugin(['AMap.GeoJSON'], () => {
          if (!options.getMarker) {
            options.getMarker = this.createMarker;
          }
          if (!options.getPolyline) {
            options.getPolyline = this.createPolyline;
          }
          if (!options.getPolygon) {
            options.getPolygon = this.createPolygon;
          }
          this.$amapComponent = new AMap.GeoJSON(options);
          this.$parentComponent.add(this.$amapComponent);
          resolve();
        });
      });
    },
    createMarker(geojson, lnglat) {
      let options = this.markerOptions || {};
      options = merge({}, options, geojson.properties);
      options.position = lnglat;
      return new AMap.Marker(options);
    },
    createPolyline(geojson, lnglat) {
      let options = this.polylineOptions || {};
      options = merge({}, options, geojson.properties);
      options.path = lnglat;
      return new AMap.Polyline(options);
    },
    createPolygon(geojson, lnglat) {
      let options = this.polygonOptions || {};
      options = merge({}, options, geojson.properties);
      options.path = lnglat;
      return new AMap.Polygon(options);
    },
    destroyComponent() {
      this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
    }
  }
};
</script>
