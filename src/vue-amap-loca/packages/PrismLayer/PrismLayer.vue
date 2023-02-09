<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import locaMixin from '../../mixins/loca-component';

export default defineComponent({
  name: 'ElAmapLocaPrism',
  mixins: [registerMixin, locaMixin],
  props: {
    cullface: {
      type: String
    }, // 剔除背面/前面的面（选择剔除将会提升性能），可选：back/front/none，back是剔除背面的面，front是剔除前面的面，none是不进行剔除。
    acceptLight: {
      type: Boolean,
      default: true
    }, // 面是否接受光照，光照信息在 loca 对象中配置
    shininess: {
      type: Number
    }, // 立体网格的粗糙度，值越高，说明表面越粗糙。
    hasSide: {
      type: Boolean,
      default: true
    }, // 当面有厚度的时候，有没有侧面和底面
    depth: {
      type: Boolean,
      default: true
    }// 是否开启深度检测，开启后可能会影响zIndex
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.PrismLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      const defaultStyleValue = {
        radius: 20,
        unit: 'px',
        sideNumber: 3,
        rotation: 0,
        altitude: 0,
        height: 100,
        topColor: '#fff',
        sideTopColor: '#fff',
        sideBottomColor: '#fff'
      };
      const style = Object.assign({}, defaultStyleValue, this['defaultStyleValue']);
      const defaultLayerStyle = {
        radius: style.radius,
        unit: style.unit,
        sideNumber: style.sideNumber,
        rotation: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
        },
        altitude: style.altitude,
        height: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.height === undefined ? style.height : feature.properties.height;
        },
        topColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.topColor === undefined ? style.topColor : feature.properties.topColor;
        },
        sideTopColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.sideTopColor === undefined ? style.sideTopColor : feature.properties.sideTopColor;
        },
        sideBottomColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.sideBottomColor === undefined ? style.sideBottomColor : feature.properties.sideBottomColor;
        }
      };
      const layerStyle = Object.assign({}, defaultLayerStyle, this['layerStyle']);
      this.$amapComponent.setStyle(layerStyle);
    }
  },
  render(){
    return null;
  }
});
</script>