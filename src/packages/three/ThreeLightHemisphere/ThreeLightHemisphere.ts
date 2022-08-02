import {HemisphereLight, Color} from 'three';
import type {Vec} from "./Type";

interface Options {
  color: string // 颜色的rgb数值。缺省值为 0xffffff。
  groundColor: string // 传递的地面发出光线的颜色
  intensity: number  // 光照的强度。缺省值为 1。
  position: Vec // 灯光位置
}

class ThreeLightHemisphere {
  object: any // Light
  layer: any // threejs的图层对象

  constructor(layer: any, options: Options) {
    this.layer = layer;
    const light = new HemisphereLight(this.getColorHex(options.color), this.getColorHex(options.groundColor), options.intensity);
    this.object = light;
    this.setPosition(options.position);
    layer.addObject(light);
  }

  setColor(color: string) {
    this.object.color = this.getColorHex(color);
    this.refresh();
  }

  setGroundColor(color: string) {
    this.object.groundColor = this.getColorHex(color);
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

export default ThreeLightHemisphere
