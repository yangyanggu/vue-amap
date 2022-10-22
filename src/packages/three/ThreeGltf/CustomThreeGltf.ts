import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {AnimationMixer, Clock} from 'three';
import {Tween, Easing} from '@tweenjs/tween.js'
import {ThreeGltf} from '@amap/three-layer'
import {clearGroup} from '../../../utils/threeUtil';
import type {GltfOptions} from '@amap/three-layer'
import type {MoveAnimation, Vec} from './Type'

interface Options extends GltfOptions{
  moveAnimation?: MoveAnimation  // 位置移动是否开启动画，开启后将会以参数中的duration进行插帧移动
}

class CustomThreeGltf extends ThreeGltf{
  moveAnimation?: MoveAnimation;
  prePosition?: number[]; // 前一次位置信息
  prePositionTween?: Tween<any>;
  moveFrame = -1; // 缓慢移动的动画帧
  preAngle?: number; // 前一次角度信息
  preAngleTween?: Tween<any>;
  angleFrame = -1;

  constructor(layer: any, options: Options, $vue: any, callback: () => void) {
    options.onLoaded = (gltf) => {
      (gltf as any).isCustomGroup = true;
      (gltf as any).$vue = $vue;
      this.moveAnimation = options.moveAnimation;
      if(callback){
        callback()
      }
    }
    super(layer, options)
  }

  setScale(scale: number | number[] | Vec) {
    let scaleArray: number[];
    if (typeof scale === 'number') {
      scaleArray = [scale, scale, scale];
    } else {
      scaleArray = scale as number[];
    }
    this.object.scale.set(...scaleArray);
  }

  setPosition(position) {
    const positionConvert = this.layer.convertLngLat(position);
    if (!this.moveAnimation || !this.moveAnimation.smooth) {
      this._updatePosition(positionConvert);
      this.prePosition = positionConvert;
    } else {
      if (!this.prePosition) {
        this._updatePosition(positionConvert);
        this.prePosition = positionConvert;
      } else {
        this._updatePositionTween(positionConvert);
      }
    }
  }

  _updatePositionTween(newPosition: number[]) {
    if (!this.prePosition) {
      return
    }
    if (this.prePositionTween) {
      this.prePositionTween.end();
    }
    const preObj = {
      x: this.prePosition[0],
      y: this.prePosition[1]
    };
    this._stopMoveAnimation();
    const duration = this.moveAnimation?.duration || 1000;
    this.prePositionTween = new Tween<any>(preObj).to({
      x: newPosition[0],
      y: newPosition[1]
    }).duration(duration).easing(Easing.Linear.None).onUpdate(() => {
      this._updatePosition([preObj.x, preObj.y]);
    }).start()
    this._moveAnimate();
    this.prePosition = newPosition;
  }

  _moveAnimate() {
    this.prePositionTween?.update();
    this.moveFrame = requestAnimationFrame(() => {
      this._moveAnimate();
    })
  }

  _stopMoveAnimation() {
    cancelAnimationFrame(this.moveFrame);
  }

  _updatePosition(position) {
    this.object.position.setX(position[0]);
    this.object.position.setY(position[1]);
    this.refresh();
  }

  setAngle(angle: number) {
    if (!this.moveAnimation || !this.moveAnimation.smooth) {
      this._updateAngle(angle);
      this.preAngle = angle;
    } else {
      if (this.preAngle === undefined) {
        this._updateAngle(angle);
        this.preAngle = angle;
      } else {
        this._updateAngleTween(angle);
      }
    }
  }

  _updateAngle(angle){
    const x = this.object.rotation.x;
    const z = this.object.rotation.z;
    const y = Math.PI / 180 * angle;
    this.object.rotation.set(x, y, z);
    this.refresh();
  }

  _updateAngleTween(angle){
    if (this.preAngle === undefined) {
      return
    }
    if (this.preAngleTween) {
      this.preAngleTween.end();
    }
    const preObj = {
      angle: this.preAngle
    };
    this._stopAngleAnimation();
    const duration = this.moveAnimation?.duration || 1000;
    this.preAngleTween = new Tween<any>(preObj).to({
      angle
    }).duration(duration).easing(Easing.Linear.None).onUpdate(() => {
      this._updateAngle(preObj.angle);
    }).onComplete(() => {
      this._stopAngleAnimation();
    }).start()
    this._angleAnimate();
    this.preAngle = angle;
  }

  _angleAnimate() {
    this.preAngleTween?.update();
    this.angleFrame = requestAnimationFrame(() => {
      this._angleAnimate();
    })
  }

  _stopAngleAnimation() {
    cancelAnimationFrame(this.angleFrame);
  }


  setMoveAnimation(move){
    this.moveAnimation = move;
  }

  remove(){
    if (this.object) {
      this.layer.removeObject(this.object)
    }
  }

  destroy() {
    this._stopAngleAnimation();
    this._stopMoveAnimation();
    this.prePosition = undefined;
    this.preAngle = undefined;
    this.prePositionTween = undefined;
    this.preAngleTween = undefined;
    if (this.object) {
      this.object.$vue = null;
    }
    super.destroy();
  }
}

export default CustomThreeGltf
