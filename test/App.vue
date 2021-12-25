<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Menu from './components/Menu.vue'
import {defineComponent} from "vue";
export default defineComponent({
  name: 'app',
  components: {Menu}
})
</script>

<template>
  <div id="app">
    <div class="left-container">
      <Menu />
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
html,body{
  width: 100%;
  height: 100%;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  .left-container{
    width: 200px;
  }
  .container{
    flex: 1;
  }
}
</style>
