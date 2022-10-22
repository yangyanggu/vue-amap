import {SpotLight, Color} from 'three';
import type {Vec} from './Type';
import type CustomThreeLayer from '@vue-map/packages/three/ThreeLayer/CustomThreeLayer'

interface Options {
  color: string // 颜色的rgb数值。缺省值为 0xffffff。
  intensity: number  // 光照的强度。缺省值为 1。
  distance: number // 这个距离表示从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)
  angle: number // 光线散射角度，最大为Math.PI/2
  penumbra: number // 聚光锥的半影衰减百分比。在0和1之间的值。默认为0
  decay: number // 沿着光照距离的衰退量。缺省值 1
  position: Vec // 点位置
  target: any // 目标模型
}

class ThreeLightSpot {
  object: SpotLight | null // Light
  layer: CustomThreeLayer | null // threejs的图层对象

  constructor(layer: CustomThreeLayer, options: Options) {
    this.layer = layer;
    const light = new SpotLight(this.getColorHex(options.color), options.intensity, options.distance, options.angle, options.penumbra, options.decay);
    this.object = light;
    this.setPosition(options.position);
    this.setTarget(options.target);
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

  setPosition(position: Vec){
    const positionConvert = this.layer?.convertLngLat([position.x, position.y]);
    this.object!.position.set(positionConvert[0], positionConvert[1], position.z);
    this.refresh();
  }

  setTarget(target?: any) {
    if(target){
      this.object!.target = target;
      this.refresh();
    }
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

export default ThreeLightSpot
