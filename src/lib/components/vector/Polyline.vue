<template>
</template>
<script>
import registerMixin from '../../mixins/register-component';
import editorMixin from '../../mixins/editor-component';
import {isMapInstance, isOverlayGroupInstance, isVectorLayerInstance} from '../../utils/util';

export default {
  name: 'el-amap-polyline',
  mixins: [registerMixin, editorMixin],
  props: {
    path: {
      type: Array,
      required: true
    }, // polyline 路径，支持 lineString 和 MultiLineString
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
    borderWeight: {
      type: Number
    }, // 描边线宽度
    isOutline: {
      type: Boolean
    }, // 是否显示描边,默认false
    outlineColor: {
      type: String
    }, // 线条描边颜色，此项仅在isOutline为true时有效，默认：#00B2D5
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
    }, // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 实线： [0,0,0] 虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线 点画线： [10,2,10] ， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
    lineJoin: {
      type: String,
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['miter', 'round', 'bevel'].indexOf(value) !== -1;
      }
    }, // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
    lineCap: {
      type: String,
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['butt', 'round', 'square'].indexOf(value) !== -1;
      }
    }, // 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
    geodesic: {
      type: Boolean
    }, // 是否绘制成大地线，默认false
    showDir: {
      type: Boolean
    }// 是否延路径显示白色方向箭头,默认false。建议折线宽度大于6时使用
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
        borderWeight(value) {
          this.setOptions({borderWeight: value});
        },
        isOutline(value) {
          this.setOptions({isOutline: value});
        },
        outlineColor(value) {
          this.setOptions({outlineColor: value});
        },
        strokeStyle(value) {
          this.setOptions({strokeStyle: value});
        },
        strokeDasharray(value) {
          this.setOptions({strokeDasharray: value});
        },
        lineJoin(value) {
          this.setOptions({lineJoin: value});
        },
        lineCap(value) {
          this.setOptions({lineCap: value});
        },
        geodesic(value) {
          this.setOptions({geodesic: value});
        },
        showDir(value) {
          this.setOptions({showDir: value});
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
      this.$amapComponent = new AMap.Polyline(options);
      if (isMapInstance(this.$parentComponent)) {
        this.$parentComponent.add(this.$amapComponent);
      } else if (isOverlayGroupInstance(this.$parentComponent)) {
        this.$parentComponent.addOverlay(this.$amapComponent);
      } else if (isVectorLayerInstance(this.$parentComponent)) {
        this.$parentComponent.add(this.$amapComponent);
      }
    },
    createEditor() {
      return new Promise((resolve) => {
        if (this.$amapComponent.editor) {
          resolve();
        } else {
          AMap.plugin(['AMap.PolylineEditor'], () => {
            this.$amapComponent.editor = new AMap.PolylineEditor(this.$parentComponent, this.$amapComponent, this.editOptions);
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
      } else if (isVectorLayerInstance(this.$parentComponent)) {
        this.$parentComponent.remove(this.$amapComponent);
      }
      this.$amapComponent = null;
    }
  }
};
</script>
