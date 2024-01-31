<script lang="ts">
import {defineComponent} from "vue";
import {merge} from 'lodash-es';
import {registerMixin,isMapInstance, isOverlayGroupInstance, isVectorLayerInstance} from '@vuemap/vue-amap';


export default defineComponent({
  name: 'ElAmapGeojson',
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
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise<void>((resolve) => {
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
      if(!this.parentInstance.isDestroy){
        this.$parentComponent.remove(this.$amapComponent);
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    },
    __geoJSON(value) {
      if(this.$amapComponent){
        this.$amapComponent.importData(value);
      }
    }
  },
  render(){
    return null;
  }
});
</script>
