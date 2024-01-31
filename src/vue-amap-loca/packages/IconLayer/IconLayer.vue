<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap';
import locaMixin from '../../mixins/loca-component';

export default defineComponent({
  name: 'ElAmapLocaIcon',
  mixins: [registerMixin, locaMixin],
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.IconLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      const defaultStyleValue = {
        unit: 'px',
        icon: '',
        iconSize: [20, 20],
        rotation: 0,
        opacity: 1,
        offset: [0, 0]
      };
      const style = Object.assign({}, defaultStyleValue, this['defaultStyleValue']);
      const defaultLayerStyle = {
        unit: style.unit,
        icon: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.icon === undefined ? style.icon : feature.properties.icon;
        },
        iconSize: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.iconSize === undefined ? style.iconSize : feature.properties.iconSize;
        },
        rotation: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
        },
        opacity: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.opacity === undefined ? style.opacity : feature.properties.opacity;
        },
        offset: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.offset === undefined ? style.offset : feature.properties.offset;
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
