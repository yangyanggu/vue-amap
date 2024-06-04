import {nextTick} from "vue";
import type {IProvideType} from '@vuemap/vue-amap';


interface IUseWatchFnType {
  setSource: () => void
  $amapComponent: () => any
  props: any
}

export interface IUseLocaTypes {
  $$getInstance: () => any
  parentInstance: IProvideType
}

export function useWatchFn (options: IUseWatchFnType){
  return {
    __layerStyle (style: any) {
      nextTick(() => {
        if (options.$amapComponent()?.setStyle) {
          options.$amapComponent().setStyle(style);
        }
      }).then();
    },
    __sourceUrl (){
      nextTick(() => {
        options.setSource();
      }).then();
    },
    __sourceData (){
      nextTick(() => {
        options.setSource();
      }).then();
    },
    __geoBufferSource (){
      nextTick(() => {
        options.setSource();
      }).then();
    },
    __visible (flag: boolean) {
      const $amapComponent = options.$amapComponent();
      if ($amapComponent?.show && $amapComponent?.hide) {
        !flag ? $amapComponent.hide(options.props.visibleDuration) : $amapComponent.show(options.props.visibleDuration);
      }
    }
  };
}

export function useLocaEvents (options: {
  parentInstance?: IProvideType
  $amapComponent: any
  emits: any,
  props: any
  setStyle: () => void
}){
  let isDragging = false;
  let isRotating = false;
  let source: any;
  const {parentInstance, $amapComponent, emits, props, setStyle}  = options;
  
  const setSource = () => {
    if (source) {
      source.destroy();
      source = null;
    }
    if (props.geoBufferSource) {
      if(typeof props.geoBufferSource === 'string'){
        source = new Loca.GeoBufferSource({
          url: props.geoBufferSource
        });
      }else{
        source = new Loca.GeoBufferSource({
          data: props.geoBufferSource
        });
      }
    }else if (props.sourceUrl) {
      source = new Loca.GeoJSONSource({
        url: props.sourceUrl
      });
    } else if (props.sourceData) {
      source = new Loca.GeoJSONSource({
        data: props.sourceData
      });
    } else {
      source = new Loca.GeoJSONSource({
      });
    }
    $amapComponent.setSource(source);
  };
  
  const initComplete = () => {
    if (props.initEvents) {
      bindEvents();
    }
  };
  const bindEvents = () => {
    if(parentInstance){
      const map = parentInstance.getMap();
      if(props.onClick !== null){
        map.on('click', clickMap);
      }
      if(props.onMousemove !== null){
        map.on('mousemove', mouseMoveMap);
        map.on('dragstart', dragStart);
        map.on('dragend', dragEnd);
        map.on('rotatestart', rotateStart);
        map.on('rotateend', rotateEnd);
        map.on('mouseout', mouseoutMap);
      }
      if(props.onRightclick !== null){
        map.on('rightclick', rightclickMap);
      }
    }
  };
  const clickMap = (e: any) => {
    const feature = _getFeature(e);
    emits('click', feature, e);
  };
  const rightclickMap = (e: any) => {
    const feature = _getFeature(e);
    emits('rightclick', feature, e);
  };
  const mouseMoveMap = (e:any) => {
    if(isDragging || isRotating){
      return;
    }
    const feature = _getFeature(e);
    emits('mousemove', feature, e);
  };
  const _getFeature = (e:any) => {
    return $amapComponent.queryFeature(e.pixel.toArray());
  };
  const dragStart =  () => {
    isDragging = true;
  };
  const dragEnd  = () => {
    isDragging = false;
  };
  const mouseoutMap =  () => {
    isDragging = false;
    isRotating = false;
  };
  const rotateStart  = () => {
    isRotating = true;
  };
  const rotateEnd  = () => {
    isRotating = false;
  };
  const unBindEvents =  ()  => {
    if(parentInstance){
      const map = parentInstance.getMap();
      map.off('click', clickMap);
      map.off('rightclick', rightclickMap);
      map.off('mousemove', mouseMoveMap);
      map.off('dragstart', dragStart);
      map.off('dragend', dragEnd);
      map.off('rotatestart', rotateStart);
      map.off('rotateend', rotateEnd);
      map.off('mouseout', mouseoutMap);
    }
  };
  
  setSource();
  setStyle();
  parentInstance?.$amapComponent.add($amapComponent);
  initComplete();
  
  const _destroyComponent = () => {
    unBindEvents();
    if(!parentInstance?.isDestroy){
      parentInstance?.$amapComponent.remove($amapComponent);
      $amapComponent.destroy();
    }
    if (source) {
      source.destroy();
      source = null;
    }
  };
  
  return {
    _destroyComponent,
    setSource
  };
}