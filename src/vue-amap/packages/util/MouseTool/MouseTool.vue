<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import type { PropType} from "vue";
interface TooltipText {
  marker?: string
  circle?: string
  rectangle?: string
  polyline?: string
  polygon?: string
  measureArea?: string
  rule?: string
  rectZoomIn?: string
  rectZoomOut?: string
}

export default defineComponent({
  name: 'ElAmapMouseTool',
  mixins: [registerMixin],
  props: {
    type: {
      type: String,
      required: true,
      default: 'marker',
      validator(value: string) {
        return ['marker', 'circle', 'rectangle', 'polyline', 'polygon', 'measureArea', 'rule', 'rectZoomIn', 'rectZoomOut'].includes(value)
      }
    }, // 类型
    drawOptions: {
      type: Object,
      default: () => null
    }, // 绘制图层的属性
    autoClear: {
      type: Boolean,
      default: true
    }, // 是否绘制结束后自动清空图层
    showTooltip: {
      type: Boolean,
      default: true
    }, // 是否显示提示信息
    tooltipTextMap: {
      type: Object as PropType<TooltipText>,
      default: () => null
    }, // 提示信息的map
    textOptions: {
      type: Object,
      default: () => null
    }
  },
  emits: ['draw'],
  data() {
    return {
      preMapCursor: '',
      tipTexts: {
        marker: '单击地图选择点位',
        circle: '按住鼠标左键拖拽绘制圆',
        rectangle: '按住鼠标左键拖拽绘制矩形',
        polyline: '单击地图选择拐点，双击地图完成折线绘制',
        polygon: '单击地图选择拐点，双击地图完成多边形绘制',
        measureArea: '单击地图选择拐点，双击地图完成绘制并计算面积',
        rule: '单击地图选择拐点，右击地图完成绘制并计算距离',
        rectZoomIn: '按住鼠标左键拖拽绘制矩形，松开左键放大地图',
        rectZoomOut: '按住鼠标左键拖拽绘制矩形，松开左键放大地图',
      }
    };
  },
  methods: {
    __initComponent() {
      return new Promise<void>((resolve) => {
        AMap.plugin(['AMap.MouseTool'], () => {
          if(this.tooltipTextMap){
            Object.assign(this.tipTexts, this.tooltipTextMap);
          }
          this.$amapComponent = new AMap.MouseTool(this.$parentComponent);
          this.createTooltip();
          this.__type();
          this.bindEvent();
          this.preMapCursor = this.$parentComponent.getDefaultCursor();
          this.$parentComponent.setDefaultCursor('crosshair');
          resolve();
        });
      });
    },
    __type(){
      const type = this.type;
      if(this.$amapComponent[type]){
        const options = this.drawOptions || {};
        this.$amapComponent[type](options);
        this.setText(this.tipTexts[type]);
      }
    },
    createTooltip(){
      if(this.showTooltip){
        const textOptions = this.textOptions || {};
        textOptions.anchor = 'top-left';
        textOptions.clickable= false;
        textOptions.bubble = true;
        textOptions.offset = [10, 10]
        this.$text = new AMap.Text(textOptions);
        this.$parentComponent.add(this.$text);
        this.$parentComponent.on('mousemove',this.getMousePosition)
      }
    },
    getMousePosition(e){
      const lnglat = e.lnglat;
      this.$text.setPosition([lnglat.lng, lnglat.lat])
    },
    setText(content: string){
      if(this.$text){
        this.$text.setText(content);
      }
    },
    bindEvent(){
      this.$amapComponent.on('draw', (e: {obj: any,type: string}) => {
        const type = this.type;
        let emitData;
        if(type === 'marker'){
          emitData = e.obj.getPosition().toArray();
        } else if (type === 'circle'){
          emitData = {
            center: e.obj.getCenter().toArray(),
            radius: e.obj.getRadius()
          }
        } else if (type === 'rectangle'){
          const bounds = e.obj.getBounds();
          const southWest = bounds.getSouthWest();
          const northEast = bounds.getNorthEast();
          emitData = [southWest.toArray(), northEast.toArray()]
        } else if (type === 'polyline'){
          const path = e.obj.getPath();
          emitData = path.map(v => v.toArray())
        } else if (type === 'polygon'){
          const path = e.obj.getPath();
          emitData = path.map(v => v.toArray())
        } else if (type === 'measureArea'){
          const path = e.obj.getPath().map(v => v.toArray());
          emitData = AMap.GeometryUtil.ringArea(path);
        } else if (type === 'rule'){
          const path = e.obj.getPath().map(v => v.toArray());
          emitData = AMap.GeometryUtil.distanceOfLine(path);
        } else if (type === 'rectZoomIn'){
          emitData = true
        } else if (type === 'rectZoomOut'){
          emitData = true
        }
        this.$emit('draw', emitData, e.obj)
        if(this.autoClear){
          this.$$clear();
          this.__type();
        }
      })
    },
    $$close(ifClear = true){
      if(this.$amapComponent){
        this.$amapComponent.close(ifClear);
      }
    },
    $$open(){
      this.__type();
    },
    $$clear(){
      this.$$close(true);
    },
    destroyComponent() {
      if(!this.parentInstance.isDestroy){
        this.$amapComponent.close(true);
        this.$parentComponent.setDefaultCursor(this.preMapCursor);
        if(this.$text){
          this.$parentComponent.off('mousemove', this.getMousePosition);
          this.$parentComponent.remove(this.$text);
          this.$text = null;
        }
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  },
  render(){
    return null;
  }
});
</script>
