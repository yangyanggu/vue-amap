<template>
  <div class="menu-container">
    <el-menu
      default-active="/"
      :router="true"
    >
      <el-menu-item
        v-for="item in menus"
        :key="item.path"
        :index="item.path"
      >
        {{ item.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {routes} from "../router";

export default defineComponent({
  name: "Menu",
  data() {
    return {
      menus: routes
    }
  }
})
</script>

<style scoped>
.menu-container{
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
