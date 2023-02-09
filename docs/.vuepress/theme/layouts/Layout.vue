<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import {amap,loca, extra} from "../../data/config.json";
const amapPublishUrl = `https://img.shields.io/static/v1?label=更新日期&message=${amap}&color=green`
const locaPublishUrl = `https://img.shields.io/static/v1?label=更新日期&message=${loca}&color=green`
const extraPublishUrl = `https://img.shields.io/static/v1?label=更新日期&message=${extra}&color=green`
</script>

<template>
  <ParentLayout>
    <template #sidebar-top>
      <div class="version-container">
        <div class="comp-name">
          @vuemap/vue-amap
        </div>
        <a
          href="https://github.com/yangyanggu/vue-amap"
          target="_blank"
        >
          <img src="https://img.shields.io/npm/v/@vuemap/vue-amap">
        </a>
        <a
          href="https://github.com/yangyanggu/vue-amap"
          target="_blank"
        >
          <img :src="amapPublishUrl">
        </a>
      </div>
      <div class="version-container">
        <div class="comp-name">
          @vuemap/vue-amap-loca
        </div>
        <a
          href="https://github.com/yangyanggu/vue-amap"
          target="_blank"
        >
          <img src="https://img.shields.io/npm/v/@vuemap/vue-amap-loca">
        </a>
        <a
          href="https://github.com/yangyanggu/vue-amap"
          target="_blank"
        >
          <img :src="locaPublishUrl">
        </a>
      </div>
      <div class="version-container">
        <div class="comp-name">
          @vuemap/vue-amap-extra
        </div>
        <a
          href="https://github.com/yangyanggu/vue-amap"
          target="_blank"
        >
          <img src="https://img.shields.io/npm/v/@vuemap/vue-amap-extra">
        </a>
        <a
          href="https://github.com/yangyanggu/vue-amap"
          target="_blank"
        >
          <img :src="extraPublishUrl">
        </a>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="css" scoped>
.version-container{
  padding-top: 5px;
  text-align: center;
}
.version-container .comp-name{
  margin-bottom: 3px;
  font-weight: 600;
}
.version-container a{
  margin-right: 4px;
}
</style>
