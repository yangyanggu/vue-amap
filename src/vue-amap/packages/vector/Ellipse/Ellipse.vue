<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin,isMapInstance, isOverlayGroupInstance, isVectorLayerInstance} from '@vuemap/vue-amap-util';
import editorMixin from '../../../mixins/editor-component';


export default defineComponent({
  name: 'ElAmapEllipse',
  mixins: [registerMixin, editorMixin],
  props: {
    center: {
      type: Array,
      required: true
    }, // 圆心位置
    radius: {
      type: Array,
      required: true
    }, // 椭圆的半径，用2个元素的数组表示，单位：米 如： radius: [1000, 2000] 表示横向半径是1000，纵向的半径是2000 默认值： [1000, 1000]v
    bubble: {
      type: Boolean,
      default: false
    }, // 是否将覆盖物的鼠标或touch等事件冒泡到地图上
    cursor: {
      type: String
    }, // 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
    strokeColor: {
      type: String
    }, // 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
    strokeOpacity: {
      type: Number
    }, // 轮廓线透明度，取值范围 [0,1] ，0表示完全透明，1表示不透明。默认为0.9
    strokeWeight: {
      type: Number
    }, // 轮廓线宽度。默认 2
    fillColor: {
      type: String
    }, // 多边形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
    fillOpacity: {
      type: Number
    }, // 多边形填充透明度，取值范围 [0,1] ，0表示完全透明，1表示不透明。默认为0.5
    draggable: {
      type: Boolean,
      default: false
    }, // 设置多边形是否可拖拽移动，默认为false
    extData: {
      type: Object,
      default: () => null
    },
    strokeStyle: {
      type: String,
      validator(value : string) {
        // 这个值必须匹配下列字符串中的一个
        return ['solid', 'dashed'].indexOf(value) !== -1;
      }
    }, // 轮廓线样式，实线:solid，虚线:dashed
    strokeDasharray: {
      type: Array
    }// 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 实线： [0,0,0] 虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线 点画线： [10,2,10] ， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
  },
  emits: ['update:center', 'update:radius'],
  data() {
    return {
      converters: {},
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.Ellipse(options);
      if (isMapInstance(this.$parentComponent)) {
        this.$parentComponent.add(this.$amapComponent);
      } else if (isOverlayGroupInstance(this.$parentComponent)) {
        this.$parentComponent.addOverlay(this.$amapComponent);
      } else if (isVectorLayerInstance(this.$parentComponent)) {
        this.$parentComponent.add(this.$amapComponent);
      }
      this.bindModelEvents();
    },
    bindModelEvents(){
      this.$amapComponent.on('dragend',() => {
        this.emitModel(this.$amapComponent);
      });
      this.$amapComponent.on('touchend',() => {
        this.emitModel(this.$amapComponent);
      });
    },
    createEditor() {
      return new Promise<void>((resolve) => {
        if (this.$amapComponent.editor) {
          resolve();
        } else {
          AMap.plugin(['AMap.EllipseEditor'], () => {
            this.$amapComponent.editor = new AMap.EllipseEditor(this.$parentComponent, this.$amapComponent, this.editOptions);
            this.setEditorEvents();
            this.bindEditorModelEvents();
            resolve();
          });
        }
      });
    },
    bindEditorModelEvents(){
      this.$amapComponent.editor.on('addnode',(e) => {
        this.emitModel(e.target);
      });
      this.$amapComponent.editor.on('adjust',(e) => {
        this.emitModel(e.target);
      });
      this.$amapComponent.editor.on('move',(e) => {
        this.emitModel(e.target);
      });
      this.$amapComponent.editor.on('add',(e) => {
        this.emitModel(e.target);
      });
      this.$amapComponent.editor.on('end',(e) => {
        this.emitModel(e.target);
      });
    },
    emitModel(target){
      this.$emit('update:center', target.getCenter().toArray());
      this.$emit('update:radius', target.getRadius());
    },
    destroyComponent() {
      if (this.$amapComponent.editor) {
        if(!this.parentInstance.isDestroy){
          this.$amapComponent.editor.close();
        }
        this.$amapComponent.editor = null;
      }
      if(!this.parentInstance.isDestroy){
        if (isMapInstance(this.$parentComponent)) {
          this.$parentComponent.remove(this.$amapComponent);
        } else if (isOverlayGroupInstance(this.$parentComponent)) {
          this.$parentComponent.removeOverlay(this.$amapComponent);
        } else if (isVectorLayerInstance(this.$parentComponent)) {
          this.$parentComponent.remove(this.$amapComponent);
        }
      }
      if(this.$amapComponent.destroy){
        this.$amapComponent.destroy();
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    },
    __zIndex(value) {
      if(this.$amapComponent){
        this.$amapComponent.setOptions({zIndex: value});
      }
    },
    __strokeColor(value) {
      if(this.$amapComponent){
        this.$amapComponent.setOptions({strokeColor: value});
      }
    },
    __strokeOpacity(value) {
      if(this.$amapComponent){
        this.$amapComponent.setOptions({strokeOpacity: value});
      }
    },
    __strokeWeight(value) {
      if(this.$amapComponent){
        this.$amapComponent.setOptions({strokeWeight: value});
      }
    },
    __fillColor(value) {
      if(this.$amapComponent){
        this.$amapComponent.setOptions({fillColor: value});
      }
    },
    __fillOpacity(value) {
      if(this.$amapComponent){
        this.$amapComponent.setOptions({fillOpacity: value});
      }
    },
    __strokeStyle(value) {
      if(this.$amapComponent){
        this.$amapComponent.setOptions({strokeStyle: value});
      }
    },
    __strokeDasharray(value) {
      if(this.$amapComponent){
        this.$amapComponent.setOptions({strokeDasharray: value});
      }
    },
    __editable(flag) {
      this.createEditor().then(() => {
        flag === true ? this.$amapComponent.editor.open() : this.$amapComponent.editor.close();
      });
    },
  },
  render(){
    return null;
  }
});
</script>
