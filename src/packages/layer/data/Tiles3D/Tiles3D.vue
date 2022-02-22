<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../../mixins/register-component';
import {loadScript} from "../../../../utils/util";

export default defineComponent({
  name: 'ElAmapLayerTiles3d',
  mixins: [registerMixin],
  props: {
    url: {
      type: String,
      required: true
    },
    threeScriptUrl: {
      type: String,
      default: '//a.amap.com/jsapi_demos/static/data3d/lib/three.117.js'
    },
    threeGltfLoader: {
      type: String,
      default: '//a.amap.com/jsapi_demos/static/data3d/lib/GLTFLoader.117.min.js'
    },
    layerStyle: {
      type: Object
    }
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise<void>((resolve) => {
        this.$parentComponent.plugin(['AMap.3DTilesLayer'], () => {
          if(!window['THREE']){
            loadScript(options.threeScriptUrl, () => {
              loadScript(options.threeGltfLoader, () => {
                this.createLayer(options);
                resolve();
              })
            })
          }else{
            this.createLayer(options);
            resolve();
          }
        });
      });
    },
    destroyComponent() {
      // this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
    },
    createLayer(options){
      let layerStyle = {};
      if(options.layerStyle){
        layerStyle = JSON.parse(JSON.stringify(options.layerStyle))
      }
      this.$amapComponent = new AMap['3DTilesLayer']({
        map: this.$parentComponent,
        url: options.url, // 3d Tiles 入口文件
        style: layerStyle
      });
      console.log(this.$amapComponent)
    }
  },
  render(){
    return null;
  }
});
</script>
