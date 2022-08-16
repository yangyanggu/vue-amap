<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapCircleMarker',
  mixins: [registerMixin],
  props: {
    zIndex: {
      type: Number
    },
    center: {
      type: Array,
      required: true
    },
    bubble: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: String
    },
    radius: {
      type: Number
    },
    strokeColor: {
      type: String
    },
    strokeOpacity: {
      type: Number
    },
    strokeWeight: {
      type: Number
    },
    fillColor: {
      type: String
    },
    fillOpacity: {
      type: Number
    },
    draggable: {
      type: Boolean,
      default: false
    },
    extData: {
      type: Object
    }
  },

  data() {
    return {
      converters: {},
      handlers: {}
    };
  },

  methods: {
    __initComponent(options) {
      this.$parentComponent = this.parentInstance.$amapComponent;
      this.$amapComponent = new AMap.CircleMarker(options);
      this.$parentComponent.add(this.$amapComponent);
    },
    destroyComponent() {
      // this.$parentComponent.remove(this.$amapComponent);
      if(!this.parentInstance.isDestroy){
        this.$parentComponent.remove(this.$amapComponent);
      }
      this.$amapComponent = null;
    },
    __strokeColor(value) {
      this.$amapComponent.setOptions({
        strokeColor: value
      });
    },
    __strokeOpacity(value) {
      this.$amapComponent.setOptions({
        strokeOpacity: value
      });
    },
    __strokeWeight(value) {
      this.$amapComponent.setOptions({
        strokeWeight: value
      });
    },
    __fillColor(value) {
      this.$amapComponent.setOptions({
        fillColor: value
      });
    },
    __fillOpacity(value) {
      this.$amapComponent.setOptions({
        fillOpacity: value
      });
    }
  },
  render() {
    return null;
  }
});
</script>
