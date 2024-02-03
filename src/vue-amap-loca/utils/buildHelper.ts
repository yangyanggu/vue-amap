import {commonProps} from '@vuemap/vue-amap';
import type {ICommonProps, IPropOptions} from '@vuemap/vue-amap';
import type {ComponentObjectPropsOptions, PropType} from "vue";

export interface ILocaProps{
  // 
  sourceUrl: IPropOptions<string>
  // 
  sourceData: IPropOptions<object>
  // 
  geoBufferSource: IPropOptions
  // 
  layerStyle: IPropOptions<object>
  defaultStyleValue: IPropOptions<object>
  zooms: IPropOptions<object>
  opacity: IPropOptions<number>
  initEvents: IPropOptions<boolean>
  visibleDuration: IPropOptions<number>
  onClick:  IPropOptions<(e: any) => void>
  onMousemove:  IPropOptions<(e: any) => void>
  onRightclick:  IPropOptions<(e: any) => void>
}

/**
 * 绑定Loca的属性
 * @param props
 */
export const buildLocaProps = <Props extends ComponentObjectPropsOptions>(props: Props): Props & {
  [K  in keyof ICommonProps]: ICommonProps[K]
} & {
  [T  in keyof ILocaProps]: ILocaProps[T]
} => {
  return Object.assign({}, commonProps, {
    sourceUrl: {
      type: String
    },
    sourceData: {
      type: Object
    },
    geoBufferSource: {
      type: [ArrayBuffer, String],
      default () {
        return null;
      }
    },
    layerStyle: {
      type: Object
    },
    defaultStyleValue: {
      type: Object,
      default () {
        return {};
      }
    },
    zooms: {
      type: Array
    },
    opacity: {
      type: Number
    },
    initEvents: {
      type: Boolean,
      default: true
    },
    visibleDuration: {
      type: Number,
      default: 0
    },
    onClick: {
      type: Function as PropType<(e: any) => void>,
      default: null
    },
    onMousemove: {
      type: Function as PropType<(e: any) => void>,
      default: null
    },
    onRightclick: {
      type: Function as PropType<(e: any) => void>,
      default: null
    },
  } as ILocaProps, props);
};

export const commonEmitNames = ['init', 'mousemove', 'click', 'rightclick' ];