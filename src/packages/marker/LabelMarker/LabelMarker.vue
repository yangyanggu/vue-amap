<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapLabelMarker',
  mixins: [registerMixin],
  props: {
    name: {
      type: String
    }, // 标注名称，作为标注标识，并非最终在地图上显示的文字内容，显示文字内容请设置 opts.text.content
    position: {
      type: [Array, Object],
      required: true
    }, // 标注位置
    zooms: {
      type: Array
    }, // 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
    opacity: {
      type: Number
    }, // 标注透明度，默认值: 1
    rank: {
      type: Number
    }, // 避让优先级，获取标注的优先级，该优先级用于 labelsLayer 支持避让时，rank 值大的标注会避让掉 rank 值低的标注。默认值：1
    icon: {
      type: Object
    }, // 标注图标设置
    text: {
      type: Object
    }, // 标注文本设置
    extData: null
  },
  data() {
    return {
      converters: {
      },
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.LabelMarker(options);
      this.$parentComponent.add(this.$amapComponent);
      // console.log('this.$amapComponent: ', this.$amapComponent);
    },
    destroyComponent() {
      this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  },
  render() {
    return null
  }
});
</script>
