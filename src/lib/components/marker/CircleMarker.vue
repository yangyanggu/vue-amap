<template>
  <div></div>
</template>

<script>
import registerMixin from '../../mixins/register-component';

export default {
  name: 'el-amap-circle-marker',
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    zIndex: {
      type: Number
    },
    visible: {
      type: Boolean,
      default: true
    },
    center: {
      type: Array,
      $type: 'LngLat'
    },
    bubble: {
      type: Boolean
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
      this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
    }
  },
  render() {
    return null;
  }
};
</script>
