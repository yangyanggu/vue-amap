/**
 * 判断对象是不是map实例对象
 * @param instance
 * @returns {string|boolean}
 */
export function isMapInstance(instance) {
  if (!instance) {
    return false;
  }
  return instance.className === 'AMap.Map';
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
  return instance.className === 'Overlay.OverlayGroup';
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
  return instance.className === 'AMap.IndoorMap';
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
  return instance.className === 'AMap.LabelsLayer';
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
  return instance.CLASS_NAME === 'AMap.VectorLayer';
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
