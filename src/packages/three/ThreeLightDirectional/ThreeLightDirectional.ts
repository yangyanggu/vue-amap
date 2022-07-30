import {DirectionalLight, Color, Vector3} from 'three';
import type {Vec} from "./Type";

interface Options {
  color: string // 颜色的rgb数值。缺省值为 0xffffff。
  intensity: number  // 光照的强度。缺省值为 1。
  position: Vec // 灯光位置
  target: any // 目标位置
}

class ThreeLightDirectional {
  object: any // Light
  layer: any // threejs的图层对象

  constructor(layer: any, options: Options) {
    this.layer = layer;
    const light = new DirectionalLight(this.getColorHex(options.color), options.intensity);
    this.object = light;
    this.setPosition(options.position);
    layer.addObject(light);
    return light;
  }

  setColor(color: string) {
    this.object.color = this.getColorHex(color);
    this.refresh();
  }

  getColorHex(color: string){
    return new Color(color).getHex();
  }

  setIntensity(intensity: number) {
    this.object.intensity = intensity;
    this.refresh();
  }

  setPosition(position: Vec){
    this.object.position.set(position.x, position.y, position.z);
    this.refresh();
  }

  setTarget(target?: any){
    if(target){
      this.object.target = target;
      this.refresh();
    }
  }

  refresh() {
    this.layer.setUpdate();
  }

  remove(){
    if (this.object) {
      this.layer.removeObject(this.object)
    }
  }

  destroy() {
    if (this.object) {
      this.object = null;
      this.layer = null;
    }
  }
}

export default ThreeLightDirectional
