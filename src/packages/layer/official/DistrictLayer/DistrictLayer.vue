<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapLayerDistrict',
  mixins: [registerMixin],
  props: {
    type: {
      type: String,
      default: 'Country',
      validator(value : string) {
        // 这个值必须匹配下列字符串中的一个
        return ['World', 'Country', 'Province'].indexOf(value) !== -1;
      }
    },
    adcode: {
      type: String
    }, // 行政区的编码 adcode与省市行政区对照表，下载地址：https://a.amap.com/lbs/static/file/AMap_adcode_citycode.xlsx.zip
    SOC: {
      type: String
    }, // 设定显示的国家,对应下载地址： https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json
    depth: {
      type: Number
    }, // 设定数据的层级深度，depth为0的时候只显示国家面，depth为1的时候显示省级， 当国家为中国时设置depth为2的可以显示市一级
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
    opacity: {
      type: Number
    }, // 透明度，默认 1
    styles: {
      type: Object
    }// 为简易行政区图设定各面的填充颜色和描边颜色。 styles各字段的值可以是颜色值，也可以是一个返回颜色值* 的回调函数function。
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      if ((this as any).type === 'World') {
        this.$amapComponent = new AMap.DistrictLayer.World(options);
      } else if ((this as any).type === 'Country') {
        this.$amapComponent = new AMap.DistrictLayer.Country(options);
      } else if ((this as any).type === 'Province') {
        this.$amapComponent = new AMap.DistrictLayer.Province(options);
      }
      this.$parentComponent.addLayer(this.$amapComponent);
    },
    destroyComponent() {
      if(!this.parentInstance.isDestroy){
        this.$parentComponent.removeLayer(this.$amapComponent);
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    },
    __SOC(value){
      this.$amapComponent.setSOC(value);
    }
  },
  render(){
    return null;
  }
});
</script>
