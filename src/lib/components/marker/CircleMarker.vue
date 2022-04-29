<template>
  <div></div>
</template>

<script>
import registerMixin from '../../mixins/register-component';

export default {
  name: 'el-amap-circle-marker',
  mixins: [registerMixin],
  props: {
    zIndex: {
      type: Number
    },
    visible: {
      type: Boolean,
      default: true
    },
    center: {
      type: Array,
      required: true
    },
    bubble: {
      type: Boolean
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
      handlers: {
        strokeColor(value) {
          this.setOptions({
            strokeColor: value
          });
        },
        strokeOpacity(value) {
          this.setOptions({
            strokeOpacity: value
          });
        },
        strokeWeight(value) {
          this.setOptions({
            strokeWeight: value
          });
        },
        fillColor(value) {
          this.setOptions({
            fillColor: value
          });
        },
        fillOpacity(value) {
          this.setOptions({
            fillOpacity: value
          });
        }
      }
    };
  },

  methods: {
    __initComponent(options) {
      this.$parentComponent = this.parentInstance.$amapComponent;
      this.$amapComponent = new AMap.CircleMarker(options);
      this.$parentComponent.add(this.$amapComponent);
    },
    destroyComponent() {
      this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
    }
  },
  render() {
    return null;
  }
};
</script>
