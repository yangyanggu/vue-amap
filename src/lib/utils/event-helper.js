let eventHelper;

class EventHelper {
  constructor() {
    /**
     * listener has表
     * {
     *  instance: {
     *              eventName: [...handlers]
     *            }
     * }
     */
    this._listener = new Map();
  }

  addListener(instance, eventName, handler, context) {
    if (!AMap) throw new Error('please wait for Map API load');
    // let listener = AMap.event.addListener(instance, eventName, handler, context);
    instance.on(eventName, handler, context);
    if (!this._listener.get(instance)) this._listener.set(instance, {});
    let listenerMap = this._listener.get(instance);
    if (!listenerMap[eventName]) listenerMap[eventName] = [];
    listenerMap[eventName].push(handler);

  }

  removeListener(instance, eventName, handler) {
    if (!AMap) throw new Error('please wait for Map API load');
    if (!this._listener.get(instance) || !this._listener.get(instance)[eventName]) return;
    let listenerArr = this._listener.get(instance)[eventName];
    if (handler) {
      let l_index = listenerArr.indexOf(handler);
      instance.off(listenerArr[l_index]);
      listenerArr.splice(l_index, 1);
    } else {
      listenerArr.forEach(listener => {
        instance.off(listener);
      });
      this._listener.get(instance)[eventName] = [];
    }
  }

  addListenerOnce(instance, eventName, handler, context) {
    return instance.on(eventName, handler, context, true);
  }

  trigger(instance, eventName, args) {
    return instance.emit(eventName, args);
  }

  clearListeners(instance) {
    let listeners = this._listener.get(instance);
    if (!listeners) return;
    Object.keys(listeners).map(eventName => {
      instance.clearEvents(eventName);
    });
  }
};

eventHelper = eventHelper || new EventHelper();

export default eventHelper;
