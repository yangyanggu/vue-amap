import {AmbientLight, Color} from 'three';
import type CustomThreeLayer from '../ThreeLayer/CustomThreeLayer'

interface Options {
  color: string // 颜色的rgb数值。缺省值为 0xffffff。
  intensity: number  // 光照的强度。缺省值为 1。
}

class ThreeLightAmbient {
  object: AmbientLight | null // Light
  layer: CustomThreeLayer | null // threejs的图层对象

  constructor(layer: CustomThreeLayer, options: Options) {
    this.layer = layer;
    const light = new AmbientLight(this.getColorHex(options.color), options.intensity);
    this.object = light;
    layer.add(light);
  }

  setColor(color: string) {
    this.object!.color = new Color(color);
    this.refresh();
  }

  getColorHex(color: string){
    return new Color(color).getHex();
  }

  setIntensity(intensity: number) {
    this.object!.intensity = intensity;
    this.refresh();
  }

  refresh() {
    this.layer?.update();
  }

  remove(){
    if (this.object) {
      this.layer?.remove(this.object)
    }
  }

  destroy() {
    if (this.object) {
      this.object = null;
      this.layer = null;
    }
  }
}

export default ThreeLightAmbient
