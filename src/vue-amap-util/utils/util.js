/**
 * 判断对象是不是map实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isMapInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance instanceof AMap.Map;
}

/**
 * 判断对象是不是OverlayGroup实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isOverlayGroupInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance instanceof AMap.OverlayGroup;
}

/**
 * 判断对象是不是IndoorMap实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isIndoorMapInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance instanceof AMap.IndoorMap;
}

/**
 * 判断对象是不是LabelsLayer实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isLabelsLayerInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance instanceof AMap.LabelsLayer;
}

/**
 * 判断对象是不是VectorLayer实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isVectorLayerInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance instanceof AMap.VectorLayer;
}

/**
 * 将$props中的事件名称转换为地图组件需要的事件名
 * @param functionName
 * @returns {string|*}
 */
export function convertEventToLowerCase(functionName){
  if(!functionName || functionName.length < 4){
    return functionName;
  }
  const func = functionName.substring(3, functionName.length);
  const firstLetter = functionName[2].toLowerCase();
  return firstLetter + func;
}

export const eventReg = /^on[A-Z]+/;

/**
 * 加载JS文件
 * @param url
 * @param callback
 */
export function loadScript(url, callback){
  if(!url){
    throw new Error('请传入url');
  }
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.defer = true;
  script.src = url;
  document.body.appendChild(script);
  if(callback){
    script.addEventListener('load',() => {
      callback();
    });
  }
}

export function convertLnglat(lnglat){
  if(Array.isArray(lnglat)){
    return lnglat.map(convertLnglat);
  }
  return lnglat.toArray();
}
