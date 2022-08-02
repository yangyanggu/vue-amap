import {PointLight, Color} from 'three';
import type {Vec} from './Type';

interface Options {
  color: string // 颜色的rgb数值。缺省值为 0xffffff。
  intensity: number  // 光照的强度。缺省值为 1。
  distance: number // 这个距离表示从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)
  decay: number // 沿着光照距离的衰退量。缺省值 1
  position: Vec // 点位置
}

class ThreeLightPoint {
  object: any // Light
  layer: any // threejs的图层对象

  constructor(layer: any, options: Options) {
    this.layer = layer;
    const light = new PointLight(this.getColorHex(options.color), options.intensity, options.distance, options.decay);
    this.object = light;
    this.setPosition(options.position);
    layer.addObject(light);
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
    const positionConvert = this.layer.convertLngLat([position.x, position.y]);
    this.object.position.set(positionConvert[0], positionConvert[1], position.z);
    this.refresh();
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

export default ThreeLightPoint
