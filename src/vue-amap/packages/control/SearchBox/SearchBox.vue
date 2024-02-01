<template>
  <div
    v-show="visible && !inputCustom"
    class="el-vue-search-box-container"
  >
    <input
      v-if="!inputCustom"
      :id="saveInputId"
      type="text"
      :placeholder="placeholder as string"
    >
  </div>
</template>
<script setup lang="ts">
import {defineOptions, ref} from 'vue';
import {useRegister} from "../../../mixins";
import {guid} from '../../../utils';
import {propsTypes} from './props';

defineOptions({
  name: 'ElAmapSearchBox',
  inheritAttrs: false
});
const props = defineProps(propsTypes);
const emits = defineEmits(['init']);

const saveInputId = ref<string>(guid());
const saveVisible = ref<boolean>(true);
let $amapComponent: AMap.AutoComplete;

const {$$getInstance} = useRegister<AMap.AutoComplete, AMap.Map>((options, parentComponent) => {
  if (options.inputId) {
    saveInputId.value = options.inputId;
    delete options.inputId;
  }
  if(options.visible){
    saveVisible.value = options.visible;
  }
  options.input = saveInputId.value;
  if (options.outputId) {
    options.output = options.outputId;
    delete options.outputId;
  }
  return new Promise<AMap.Autocomplete>((resolve) => {
    parentComponent.plugin(['AMap.AutoComplete'], () => {
      const debounce = props.debounce as number;
      AMap.Autocomplete.prototype.onInPut = function (){
        clearTimeout(this._inputTimer);
        this._inputTimer = setTimeout(() => {
          this.output && this.autoSearch();
        }, debounce);
      };
      $amapComponent = new AMap.AutoComplete(options);
      resolve($amapComponent);
    });
  });

}, {
  emits,
  watchRedirectFn: {
    __visible (flag: boolean) {
      saveVisible.value = flag;
    },
    __citylimit (flag: boolean) {
      $amapComponent.setCityLimit(flag);
    }
  }
});

defineExpose({
  $$getInstance
});
</script>
<style lang="scss">
.el-vue-search-box-container {
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 10;
  width: 360px;
  height: 45px;
  background: #fff;
  box-shadow: 0 2px 2px rgba(0,0,0,.15);
  border-radius: 2px 3px 3px 2px;

  input {
    height: 100%;
    width: 100%;
    line-height: 45px;
    letter-spacing: .5px;
    font-size: 14px;
    text-indent: 10px;
    box-sizing: border-box;
    border: none;
    outline: none;
  }

}
</style>
