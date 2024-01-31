<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap';
import locaMixin from '../../mixins/loca-component';

export default defineComponent({
  name: 'ElAmapLocaLine',
  mixins: [registerMixin, locaMixin],
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.LineLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      const defaultStyleValue = {
        color: '#fff',
        lineWidth: 2,
        altitude: 0,
        borderWidth: 0,
        borderColor: '#fff',
        dashArray: [10, 0, 10, 0]
      };
      const style = Object.assign({}, defaultStyleValue, this['defaultStyleValue']);
      const defaultLayerStyle = {
        color: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.color === undefined ? style.color : feature.properties.color;
        },
        lineWidth: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.lineWidth === undefined ? style.lineWidth : feature.properties.lineWidth;
        },
        altitude: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.altitude === undefined ? style.altitude : feature.properties.altitude;
        },
        borderWidth: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.borderWidth === undefined ? style.borderWidth : feature.properties.borderWidth;
        },
        borderColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.borderColor === undefined ? style.borderColor : feature.properties.borderColor;
        },
        dashArray: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.dashArray === undefined ? style.dashArray : feature.properties.dashArray;
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
