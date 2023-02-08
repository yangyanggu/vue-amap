<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import locaMixin from '../../mixins/loca-component';

export default defineComponent({
  name: 'ElAmapLocaLink',
  mixins: [registerMixin, locaMixin],
  props: {
  },
  data() {
    return {
      converters: {},
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.LinkLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      const defaultStyleValue = {
        lineColors: ['rgba(255,255,255,1)', 'rgba(255,255,255,0)'],
        height: 100,
        smoothSteps: 100
      };
      const style = Object.assign({}, defaultStyleValue, this['defaultStyleValue']);
      const defaultLayerStyle = {
        lineColors: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.lineColors === undefined ? style.lineColors : feature.properties.lineColors;
        },
        height: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.height === undefined ? style.height : feature.properties.height;
        },
        smoothSteps: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.smoothSteps === undefined ? style.smoothSteps : feature.properties.smoothSteps;
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
