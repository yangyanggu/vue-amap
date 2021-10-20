<template>
</template>
<script>
import registerMixin from '../../mixins/register-component';
import editorMixin from '../../mixins/editor-component';
import {isMapInstance, isOverlayGroupInstance} from '../../utils/util';

export default {
  name: 'el-amap-ellipse',
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
      type: Boolean
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
      type: Boolean
    }, // 设置多边形是否可拖拽移动，默认为false
    extData: null,
    strokeStyle: {
      type: String,
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['solid', 'dashed'].indexOf(value) !== -1;
      }
    }, // 轮廓线样式，实线:solid，虚线:dashed
    strokeDasharray: {
      type: Array
    }// 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 实线： [0,0,0] 虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线 点画线： [10,2,10] ， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
  },
  data() {
    const _this = this;
    return {
      converters: {},
      handlers: {
        zIndex(value) {
          this.setOptions({zIndex: value});
        },
        strokeColor(value) {
          this.setOptions({strokeColor: value});
        },
        strokeOpacity(value) {
          this.setOptions({strokeOpacity: value});
        },
        strokeWeight(value) {
          this.setOptions({strokeWeight: value});
        },
        fillColor(value) {
          this.setOptions({fillColor: value});
        },
        fillOpacity(value) {
          this.setOptions({fillOpacity: value});
        },
        strokeStyle(value) {
          this.setOptions({strokeStyle: value});
        },
        strokeDasharray(value) {
          this.setOptions({strokeDasharray: value});
        },
        editable(flag) {
          _this.createEditor().then(() => {
            flag === true ? this.editor.open() : this.editor.close();
          });
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.Ellipse(options);
      if (isMapInstance(this.$parentComponent)) {
        this.$parentComponent.add(this.$amapComponent);
      } else if (isOverlayGroupInstance(this.$parentComponent)) {
        this.$parentComponent.addOverlay(this.$amapComponent);
      }
    },
    createEditor() {
      return new Promise((resolve) => {
        if (this.$amapComponent.editor) {
          resolve();
        } else {
          AMap.plugin(['AMap.EllipseEditor'], () => {
            this.$amapComponent.editor = new AMap.EllipseEditor(this.$parentComponent, this.$amapComponent, this.editOptions);
            this.setEditorEvents();
            resolve();
          });
        }
      });
    },
    destroyComponent() {
      if (this.$amapComponent.editor) {
        this.$amapComponent.editor.close();
      }
      this.$amapComponent.destroy();
      if (isMapInstance(this.$parentComponent)) {
        this.$parentComponent.remove(this.$amapComponent);
      } else if (isOverlayGroupInstance(this.$parentComponent)) {
        this.$parentComponent.removeOverlay(this.$amapComponent);
      }
      this.$amapComponent = null;
    }
  }
};
</script>
