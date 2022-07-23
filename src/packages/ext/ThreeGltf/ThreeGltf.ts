import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {AnimationMixer, Clock} from 'three';
import {Tween, Easing} from '@tweenjs/tween.js'
import {clearGroup} from '../../../utils/threeUtil';
import type {MoveAnimation, Vec} from './Type'

interface Options {
  url: string //模型下载地址
  position: number[] // 模型的经纬度
  height: number  // 高度，模型的离地高度
  rotation: Vec // 模型旋转角度
  scale: number | number[]  //模型缩放级别，可以整体缩放和按X Y Z缩放
  angle: number //  模型旋转角度
  moveAnimation?: MoveAnimation  // 位置移动是否开启动画，开启后将会以参数中的duration进行插帧移动
}

class ThreeGltf {
  moveAnimation?: MoveAnimation;
  object: any // 加载模型后的Object3D对象
  animations: any // 模型的动画
  layer: any // threejs的图层对象
  linerAnimationFrame = -1; //gltf动画
  prePosition?: number[]; // 前一次位置信息
  prePositionTween?: Tween<any>;
  moveFrame = -1; // 缓慢移动的动画帧
  preAngle?: number; // 前一次角度信息
  preAngleTween?: Tween<any>;
  angleFrame = -1;

  constructor(layer: any) {
    this.layer = layer;
  }

  init(options: Options, $vue: any) {
    this.moveAnimation = options.moveAnimation;
    return new Promise<void>((resolve) => {
      const loader = new GLTFLoader(); // 读取模型
      loader.load(options.url, (gltf) => {
        const object = gltf.scene;
        object.isCustomGroup = true;
        object.$vue = $vue;
        const animations = gltf.animations;
        this.layer.addEnvMap(object);
        this.layer.addObject(object);
        this.object = object;
        this.animations = animations;
        this.setScale(options.scale);
        this.setRotation(options.rotation);
        this.setAngle(options.angle);
        this.setPosition(options.position);
        this.setHeight(options.height);
        resolve();
      });
    });
  }

  setScale(scale: number | number[]) {
    let scaleArray: number[];
    if (typeof scale === 'number') {
      scaleArray = [scale, scale, scale];
    } else {
      scaleArray = scale;
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

  setRotation(rotation: Vec) {
    if (rotation) {
      const x = Math.PI / 180 * (rotation.x || 0);
      const y = Math.PI / 180 * (rotation.y || 0);
      const z = Math.PI / 180 * (rotation.z || 0);
      this.object.rotation.set(x, y, z);
      this.refresh();
    }
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

  setHeight(height) {
    if (height !== undefined) {
      this.object.position.setZ(height);
      this.refresh();
    }
  }

  setMoveAnimation(move){
    this.moveAnimation = move;
  }

  refresh() {
    this.layer.setUpdate();
  }

  show() {
    this.object.visible = true;
    this.refresh();
  }

  hide() {
    this.object.visible = false;
    this.refresh();
  }

  animate(callback) {
    this.linerAnimationFrame = requestAnimationFrame(() => {
      this.animate(callback);
    });
    callback();
  }

  startAnimations() {
    if (this.animations) {
      const animations = this.animations;
      const mixer = new AnimationMixer(this.object);
      const actions = {};
      for (let i = 0; i < animations.length; i++) {
        const clip = animations[i];
        actions[clip.name] = mixer.clipAction(clip);
      }
      const clock = new Clock();
      for (const name in actions) {
        actions[name].play();
      }
      this.animate(() => {
        const dt = clock.getDelta();
        if (mixer) mixer.update(dt);
        this.refresh();
      });
    }
  }

  stopAnimations() {
    cancelAnimationFrame(this.linerAnimationFrame);
  }

  destroy() {
    this.stopAnimations();
    this._stopAngleAnimation();
    this._stopMoveAnimation();
    this.prePosition = undefined;
    this.preAngle = undefined;
    this.prePositionTween = undefined;
    this.preAngleTween = undefined;
    if (this.object) {
      this.object.$vue = null;
      clearGroup(this.object);
      this.object = null;
      this.layer = null;
    }
  }
}

export default ThreeGltf
