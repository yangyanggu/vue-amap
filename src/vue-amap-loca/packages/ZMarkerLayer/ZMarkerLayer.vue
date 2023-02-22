<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import locaMixin from '../../mixins/loca-component';

export default defineComponent({
  name: 'ElAmapLocaZMarker',
  mixins: [registerMixin, locaMixin],
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.ZMarkerLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      const defaultStyleValue = {
        unit: 'px',
        content: '',
        size: [20, 20],
        rotation: 0,
        alwaysFront: false,
        altitude: 0
      };
      const style = Object.assign({}, defaultStyleValue, this['defaultStyleValue']);
      const defaultLayerStyle = {
        unit: style.unit,
        content: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.content === undefined ? style.content : feature.properties.content;
        },
        size: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.size === undefined ? style.size : feature.properties.size;
        },
        rotation: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
        },
        alwaysFront: style.alwaysFront,
        altitude: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.altitude === undefined ? style.altitude : feature.properties.altitude ;
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
