import {Vector3} from 'three';
import {CircleSweepPass} from "./CircleSweepPass";

interface Options {
  color: string // 颜色的rgb数值。缺省值为 0xffffff。
  maxRadius: number  // 最大半径，默认1000。
  position: number[] // 中心点位置
}

class ThreePassCircle {
  object: any // Light
  layer: any // threejs的图层对象
  shaderMaterial: any
  frame = -1
  maxRadius: number

  constructor(layer: any, options: Options) {
    this.maxRadius = options.maxRadius;
    this.layer = layer;
    // const shaderPass = this.createShaderPass(options);
    const center = this.layer.convertLngLat(options.position)
    const vp = new Vector3(center[0], center[1], 0);
    const shaderPass = new CircleSweepPass(this.layer.getRender(), this.layer.getScene(), this.layer.getCamera(),{
      center: vp,
      innerRadius: 0,
      outerRadius: 0.1
    });
    this.object = shaderPass;
    this.layer.addPass(shaderPass);
    this.start();
  }

  start(){
    /*this.shaderMaterial.uniforms.u_r.value += 0.001;
    if (this.shaderMaterial.uniforms.u_r.value >= this.maxRadius) {
      this.shaderMaterial.uniforms.u_r.value = 20
    }*/
    if(this.object.depthMaterial.uniforms.innerRadius.value > 100) {
      this.object.depthMaterial.uniforms.innerRadius.value = 0
      this.object.depthMaterial.uniforms.outerRadius.value = 0.1
    }
    this.object.depthMaterial.uniforms.innerRadius.value += 0.4
    this.object.depthMaterial.uniforms.outerRadius.value += 0.4
    this.refresh();
    this.frame = requestAnimationFrame(() => {
      this.start();
    })
  }

  stop() {
    cancelAnimationFrame(this.frame);
  }

  refresh() {
    this.layer.setUpdate();
  }

  remove(){
    if (this.object) {
      this.layer.removePass(this.object)
    }
  }

  destroy() {
    this.stop();
    if (this.object) {
      if(this.object.dispose){
        this.object.dispose()
      }
      this.object = null;
      this.layer = null;
    }
  }
}

export default ThreePassCircle
