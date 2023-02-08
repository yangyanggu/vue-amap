<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import locaMixin from '../../mixins/loca-component';

export default defineComponent({
  name: 'ElAmapLocaPulseLine',
  mixins: [registerMixin, locaMixin],
  props: {
    depth: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      converters: {},
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.PulseLineLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      const defaultStyleValue = {
        lineWidth: 1,
        headColor: 'rgba(0, 0, 0, 0.75)',
        trailColor: 'rgba(0, 0, 0, 0.25)',
        altitude: 0,
        interval: 1,
        duration: 2000
      };
      const style = Object.assign({}, defaultStyleValue, this['defaultStyleValue']);
      const defaultLayerStyle = {
        lineWidth: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.lineWidth === undefined ? style.lineWidth : feature.properties.lineWidth;
        },
        headColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.headColor === undefined ? style.headColor : feature.properties.headColor;
        },
        trailColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.trailColor === undefined ? style.trailColor : feature.properties.trailColor;
        },
        altitude: style.altitude,
        interval: style.interval,
        duration: style.duration
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
