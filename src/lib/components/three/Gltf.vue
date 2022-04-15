<template></template>
<script>
import registerMixin from '../../mixins/register-component';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {AnimationMixer, Clock} from 'three';
import {clearGroup} from '../../utils/threeUtil';

export default {
  name: 'el-amap-three-gltf',
  mixins: [registerMixin],
  inject: {
    parentInstance: {
      default: null
    }
  },
  props: {
    url: {
      type: String
    },
    position: {
      type: Array
    },
    rotation: {
      type: Object
    },
    scale: {
      type: Number,
      default: 1
    },
    angle: {
      type: Number
    }
  },
  data() {
    const _this = this;
    return {
      handlers: {
        position() {
          _this.setPosition();
        },
        visible() {
          _this.setVisible();
        },
        rotation() {
          _this.setRotation();
        },
        angle() {
          _this.setAngle();
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$parentComponent = this.parentInstance.$amapComponent;
      return new Promise((resolve) => {
        let position = this.parentInstance.convertLngLat(options.position);
        let loader = new GLTFLoader(); // 读取模型
        loader.load(options.url, (gltf) => {
          let object = gltf.scene;
          object.isCustomGroup = true;
          object.$vue = this;
          let animations = gltf.animations;
          let scale = this.scale;
          object.position.set(position[0], position[1], 0);
          this.parentInstance.addEnvMap(object);
          this.parentInstance.addObject(object);
          this.$amapComponent = object;
          this.animations = animations;
          object.scale.set(scale, scale, scale);
          this.setRotation();
          this.setAngle();
          this.setVisible();
          this._refresh();
          resolve();
        });
      });
    },
    destroyComponent() {
      if (this.linerAnimationFrame) {
        cancelAnimationFrame(this.linerAnimationFrame);
      }
      this.parentInstance.removeObject(this.$amapComponent);
      if (this.$amapComponent) {
        this.$amapComponent.$vue = null;
        clearGroup(this.$amapComponent);
        this.$amapComponent = null;
      }
    },
    setPosition() {
      let position = this.$parent.convertLngLat(this.position);
      this.$amapComponent.position.setX(position[0]);
      this.$amapComponent.position.setY(position[1]);
      this._refresh();
    },
    setRotation() {
      if (this.rotation) {
        let x = Math.PI / 180 * (this.rotation.x || 0);
        let y = Math.PI / 180 * (this.rotation.y || 0);
        let z = Math.PI / 180 * (this.rotation.z || 0);
        this.$amapComponent.rotation.set(x, y, z);
        this._refresh();
      }
    },
    setAngle() {
      if (this.angle !== undefined) {
        let x = this.$amapComponent.rotation.x;
        let z = this.$amapComponent.rotation.z;
        let y = Math.PI / 180 * this.angle;
        this.$amapComponent.rotation.set(x, y, z);
        this._refresh();
      }
    },
    setVisible() {
      if (this.visible === false) {
        this.$amapComponent.visible = false;
      } else {
        this.$amapComponent.visible = true;
      }
      this._refresh();
    },
    _refresh() {
      this.$parentComponent.needsUpdate = true;
    },
    _animate(callback) {
      this.linerAnimationFrame = requestAnimationFrame(() => {
        this._animate(callback);
      });
      callback();
    },
    $$startAnimations() {
      if (this.animations) {
        let animations = this.animations;
        let mixer = new AnimationMixer(this.$amapComponent);
        let actions = {};
        for (let i = 0; i < animations.length; i++) {
          const clip = animations[ i ];
          actions[ clip.name ] = mixer.clipAction(clip);
        }
        let clock = new Clock();
        for (let name in actions) {
          actions[name].play();
        }
        this._animate(() => {
          const dt = clock.getDelta();
          if (mixer) mixer.update(dt);
          this._refresh();
        });
      }
    }
  }
};
</script>
