<script>
import {defineComponent} from "vue";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {AnimationMixer, Clock} from 'three';
import registerMixin from '../../../mixins/register-component';
import {clearGroup} from '../../../utils/threeUtil';

export default defineComponent({
  name: 'ElAmapThreeGltf',
  mixins: [registerMixin],
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
      type: [Number, Array],
      default: 1
    },
    angle: {
      type: Number
    }
  },
  emits: ['click', 'mousemove', 'mouseover', 'mouseout'],
  data() {
    return {};
  },
  methods: {
    __initComponent(options) {
      return new Promise((resolve) => {
        const position = this.$parent.convertLngLat(options.position);
        const loader = new GLTFLoader(); // 读取模型
        loader.load(options.url, (gltf) => {
          const object = gltf.scene;
          object.isCustomGroup = true;
          object.$vue = this;
          const animations = gltf.animations;
          const scale = this.scale;
          let scaleArray = [];
          if(typeof scale === 'number') {
            scaleArray = [scale, scale, scale];
          }else{
            scaleArray = scale;
          }
          object.position.set(position[0], position[1], 0);
          this.$parent.addEnvMap(object);
          this.$parent.addObject(object);
          this.$amapComponent = object;
          this.animations = animations;
          object.scale.set(...scaleArray);
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
      this.$parent.removeObject(this.$amapComponent);
      if (this.$amapComponent) {
        this.$amapComponent.$vue = null;
        clearGroup(this.$amapComponent);
        this.$amapComponent = null;
      }
    },
    setPosition() {
      const position = this.$parent.convertLngLat(this.position);
      this.$amapComponent.position.setX(position[0]);
      this.$amapComponent.position.setY(position[1]);
      this._refresh();
    },
    setRotation() {
      if (this.rotation) {
        const x = Math.PI / 180 * (this.rotation.x || 0);
        const y = Math.PI / 180 * (this.rotation.y || 0);
        const z = Math.PI / 180 * (this.rotation.z || 0);
        this.$amapComponent.rotation.set(x, y, z);
        this._refresh();
      }
    },
    setAngle() {
      if (this.angle !== undefined) {
        const x = this.$amapComponent.rotation.x;
        const z = this.$amapComponent.rotation.z;
        const y = Math.PI / 180 * this.angle;
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
        const animations = this.animations;
        const mixer = new AnimationMixer(this.$amapComponent);
        const actions = {};
        for (let i = 0; i < animations.length; i++) {
          const clip = animations[ i ];
          actions[ clip.name ] = mixer.clipAction(clip);
        }
        const clock = new Clock();
        for (const name in actions) {
          actions[name].play();
        }
        this._animate(() => {
          const dt = clock.getDelta();
          if (mixer) mixer.update(dt);
          this._refresh();
        });
      }
    },
    __position(){
      this.setPosition();
    },
    __visible(){
      this.setVisible();
    },
    __rotation() {
      this.setRotation();
    },
    __angle() {
      this.setAngle();
    }
  },
  render(){
    return null;
  }
});
</script>
