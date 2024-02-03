import {
  inject,
  onMounted,
  onBeforeUnmount,
  onBeforeUpdate,
  onUpdated,
  getCurrentInstance,
  isProxy, toRaw, unref,
  watch,
  nextTick
} from 'vue';
import {convertEventToLowerCase, eventReg, upperCamelCase, bindInstanceEvent, removeInstanceEvent} from "../utils";
import type {ComponentInternalInstance, WatchStopHandle} from 'vue';

export type TRegisterFn = () => void
export interface IProvideType{
  // 父组件的地图相关实例
  $amapComponent: any
  // // 父组件用来缓存需要执行注册的回调
  // needInitComponents: TRegisterFn[]
  // 当组件初始化的时候如果父组件还未初始化成功，那么需要调用该方法将自身的初始化方法注册到父组件中
  addChildComponent: (cb: TRegisterFn) => void
  // 父组件是否已经销毁
  isDestroy: boolean
}


interface TInitComponentProps {
  // 属性名重定向
  propsRedirect?: Record<string, string>;
  emits: (event: any, ...args: any[]) => void;
  // 转化数据使用
  converts?: Record<string, (val: any) => any>
  // 是否是根节点，只用于map组件初始化使用
  isRoot?: boolean
  // 监听事件使用的方法，默认是读取地图实例的属性的set方法
  watchRedirectFn?: Record<string, (source:  any) => any>
  // 需要初始化的子组件
  needInitComponents?: TRegisterFn[]
  provideData?: IProvideType
  destroyComponent?: () => void
}

export const provideKey = 'parentInstance';

export const useRegister = <T, D = any>(_init: (options: any, parentComponent: D) => Promise<T>, params: TInitComponentProps) => {
  let componentInstance = getCurrentInstance() as ComponentInternalInstance;
  let {props, attrs} = componentInstance;
  let parentInstance = inject<IProvideType | undefined>(provideKey, undefined);
  const emits = params.emits;

  let isMounted = false;
  let $amapComponent: T;
  
  onMounted(() => {
    if(parentInstance){
      if(parentInstance.$amapComponent){
        register();
      }else{
        parentInstance.addChildComponent(register);
      }
    }else if(params.isRoot){
      register();
    }
  });
  onBeforeUnmount(() => {
    if(!$amapComponent){
      return;
    }
    unregisterEvents();
    stopWatchers();
    if(params.destroyComponent){
      params.destroyComponent();
    }else{
      destroyComponent();
    }
    if(params.provideData){
      params.provideData.isDestroy = true;
    }
    parentInstance = undefined;
    props = undefined as any;
    attrs = undefined as any;
    componentInstance = undefined as any;
    $amapComponent = undefined as any;
  });
  
  onBeforeUpdate(() => {
    if(props.reEventWhenUpdate && isMounted && $amapComponent){
      unregisterEvents();
    }
  });
  
  onUpdated(() => {
    if(props.reEventWhenUpdate && isMounted && $amapComponent){
      registerEvents();
    }
  });
  
  const register = () => {
    const options = convertProps();
    _init(options, parentInstance?.$amapComponent).then(mapInstance => {
      $amapComponent = mapInstance;
      registerEvents();
      initProps();
      setPropWatchers();
      // @ts-ignore
      Object.assign(componentInstance.ctx, componentInstance.exposed);
      // @ts-ignore
      emits('init', $amapComponent, componentInstance.ctx);
      nextTick(() => {
        createChildren();
      }).then();
      isMounted = true;
    });
  };
  
  // 初始化属性
  const initProps = () => {
    const propsList = ['editable', 'visible', 'zooms'];

    propsList.forEach(propStr => {
      if (props[propStr] !== undefined) {
        const handleFun = getHandlerFun(propStr);
        handleFun && handleFun.call($amapComponent, convertProxyToRaw(convertSignalProp(propStr, props[propStr])));
      }
    });
  };
  
  // 开始处理props数据
  const propsRedirect = params.propsRedirect || {};
  const convertProps = () => {
    const propsCache: Record<string, any> = {};
    if(props.extraOptions){
      Object.assign(propsCache, props.extraOptions);
    }
    Object.keys(props).forEach(_key => {
      let key = _key;
      const propsValue = convertSignalProp(key, props[key]);
      if (propsValue !== undefined){
        if (propsRedirect && propsRedirect[_key]){
          key = propsRedirect[key];
        }
        propsCache[key] = propsValue;
      }
    });
    return propsCache;
  };
  
  const converters = params.converts || {};
  const convertSignalProp = (key: string, sourceData: any) => {
    if (converters && converters[key]) {
      return converters[key].call(this, sourceData);
    }
    return sourceData;
  };

  const convertProxyToRaw = (value: any) => {
    if(isProxy(value)){
      return toRaw(value);
    }
    return unref(value);
  };
  
  // 结束处理props数据
  
  // 开始监控数据变化
  let unwatchFns: WatchStopHandle[] = [];
  let watchRedirectFn: Record<string, (source:  any) => any> = Object.assign({
    __visible: (flag: boolean) => {
      if(!!$amapComponent && !!$amapComponent['show'] && !!$amapComponent['hide']){
        !flag ? $amapComponent['hide']() : $amapComponent['show']();
      }
    },
    __zIndex (value: number){
      if ($amapComponent && $amapComponent['setzIndex']) {
        $amapComponent['setzIndex'](value);
      }
    }
  }, params.watchRedirectFn || {});
  const setPropWatchers = () => {

    Object.keys(props).forEach(prop => {
      let handleProp = prop;
      if (propsRedirect && propsRedirect[prop]) handleProp = propsRedirect[prop];
      const handleFun = getHandlerFun(handleProp);
      if (!handleFun) return;
      const watchOptions = {
        deep: false
      };
      const propValueType = Object.prototype.toString.call(props[prop]);
      if ( propValueType === '[object Object]' || propValueType === '[object Array]') {
        watchOptions.deep = true;
      }
      // watch props
      const unwatch = watch(() => props[prop], nv => {
        handleFun.call($amapComponent, convertProxyToRaw(convertSignalProp(prop, nv)));
      }, watchOptions);

      // collect watchers for destroyed
      unwatchFns.push(unwatch);
    });
  };
  
  const stopWatchers = () => {
    unwatchFns.forEach(fn => fn());
    unwatchFns = [];
    watchRedirectFn = undefined as any;
  };

  const getHandlerFun = (prop: string) => {
    if (watchRedirectFn[`__${prop}`]) {
      return watchRedirectFn[`__${prop}`];
    }
    if(!$amapComponent){
      return null;
    }
    return $amapComponent[`set${upperCamelCase(prop)}`];
  };
  // 监控数据变化
  
  
  // 开始为地图实例注册事件
  const cacheEvents: Record<string, any> = {};
  const registerEvents = () => {
    Object.keys(attrs).forEach(key => {
      if(eventReg.test(key)){
        const eventKey = convertEventToLowerCase(key);
        bindInstanceEvent($amapComponent, eventKey, attrs[key]);
        cacheEvents[eventKey] = attrs[key];
      }
    });
  };
  const unregisterEvents = () => {
    Object.keys(cacheEvents).forEach(eventKey => {
      removeInstanceEvent($amapComponent, eventKey, cacheEvents[eventKey]);
      delete cacheEvents[eventKey];
    });
  };
  
  // 处理事件
  
  const createChildren = () => {
    const needInitComponents = params.needInitComponents || [];
    while (needInitComponents.length > 0){
      needInitComponents[0]();
      needInitComponents.splice(0, 1);
    }
  };
  
  // 销毁组件时的回调
  const destroyComponent = () => {
    if(!$amapComponent){
      return;
    }
    ($amapComponent as any).setMap && ($amapComponent as any).setMap(null);
    ($amapComponent as any).close && ($amapComponent as any).close();
    ($amapComponent as any).editor && ($amapComponent as any).editor.close();
  };

  function $$getInstance (): T{
    return $amapComponent;
  }
  return {
    $$getInstance,
    parentInstance,
    isMounted
  };
};
