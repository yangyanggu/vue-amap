<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import locaMixin from '../../mixins/loca-component';

export default defineComponent({
  name: 'ElAmapLocaLaser',
  mixins: [registerMixin, locaMixin],
  props: {
    depth: {
      type: Boolean,
      default: true
    }// 图层中的要素是否具有前后遮盖关系，默认开启
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.LaserLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      const defaultStyleValue = {
        unit: 'px',
        height: 200,
        color: 'rgba(255,255,0,0.5)',
        angle: 0,
        lineWidth: 2,
        trailLength: 30,
        duration: 2000,
        interval: 0,
        delay: 0,
        repeat: undefined
      };
      const style = Object.assign({}, defaultStyleValue, this['defaultStyleValue']);
      const defaultLayerStyle = {
        unit: style.unit,
        height: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.height === undefined ? style.height : feature.properties.height;
        },
        color: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.color === undefined ? style.color : feature.properties.color;
        },
        angle: style.angle,
        lineWidth: style.lineWidth,
        trailLength: style.trailLength,
        duration: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.duration === undefined ? style.duration : feature.properties.duration;
        },
        interval: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.interval === undefined ? style.interval : feature.properties.interval;
        },
        delay: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.delay === undefined ? style.delay : feature.properties.delay;
        },
        repeat: style.repeat
      };
      const layerStyle = Object.assign({}, defaultLayerStyle, this['layerStyle']);
      this.$amapComponent.setStyle(layerStyle);
    }
  },
  render() {
    return null;
  }
});
</script>
