/**
 * 给地图实例绑定事件
 * @param instance
 * @param eventName
 * @param handler
 */
export function bindInstanceEvent(instance: any, eventName: string, handler: any){
  if(!instance || !instance.on){
    return;
  }
  instance.on(eventName, handler);
}

/**
 * 从地图实例上移除事件
 * @param instance
 * @param eventName
 * @param handler
 */
export function removeInstanceEvent(instance: any, eventName: string, handler: any){
  if(!instance || !instance.off){
    return;
  }
  instance.off(eventName, handler);
}