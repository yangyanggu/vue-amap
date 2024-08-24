<script setup lang="ts">
import { computed, toRef, ref, getCurrentInstance } from 'vue';
import { useClipboard } from '@vueuse/core';
import {ElMessage} from 'element-plus';
import { useToggle } from '../composables/toggle';

import SourceCodeIcon from './icons/source-code.vue';
import CopyIcon from './icons/copy-icon.vue';
import CodepenIcon from './icons/codepen.vue';

import Example from './demo/vp-example.vue';
import SourceCode from './demo/vp-source-code.vue';

const name = 'Demo';

const props = defineProps({
  // source is encoded via encodeURIComponent
  source: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  rawSource: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  importJson: {
    type: String
  }
});

const vm = getCurrentInstance();

const decodeSource = decodeURIComponent(props.rawSource);

const { copy, isSupported } = useClipboard({
  source: decodeSource,
  read: false,
});

const [sourceVisible, setSourceVisible] = useToggle();

const decodedDescription = computed(() => decodeURIComponent(props.description as string));

const copyCode = async () => {
  if (!isSupported) {
    ElMessage.error('复制失败');
  }
  try {
    await copy();
    ElMessage.success('复制成功');
  } catch (e: any) {
    ElMessage.error(e.message);
  }
};

const demoPath = computed(() => props.path.replaceAll('/', '-'));

function utoa (data: string): string {
  return btoa(unescape(encodeURIComponent(data)));
}

const openInPlayground = () => {
  const originCode: Record<string, string> = {
    'App.vue': decodeSource,
  };
  
  if(props.importJson){
    originCode['import-map.json'] = decodeURIComponent(props.importJson);
  }
  const encoded = utoa(JSON.stringify(originCode));
  const link = `https://amap-run.guyixi.cn/#${encoded}`;
  window.open(link);
};
</script>

<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p
      class="example-description"
      v-html="decodedDescription"
    />
    <div class="example">
      <div class="op-btns">
        <div
          class="op-btn"
          title="在playground中打开"
          @click="openInPlayground"
        >
          <CodepenIcon />
        </div>
        <div
          class="op-btn"
          title="拷贝代码"
          @click="copyCode"
        >
          <CopyIcon />
        </div>
        <div
          class="op-btn"
          title="查看原码"
          @click="setSourceVisible"
        >
          <SourceCodeIcon />
        </div>
      </div>
      <div
        v-if="sourceVisible"
        class="split-line"
      />
      <Example
        :file="path"
        :demo="demoPath"
      />
      <SourceCode
        v-show="sourceVisible"
        :source="source"
      />
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.example-description {
  font-size: 14px;
}
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);
  overflow: hidden;

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 3rem;
    line-height: 3rem;

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color);
      width: 20px;
      height: 20px;

      &.github a {
        color: var(--text-color);
      }
    }
  }
  .el-divider {
    margin: 0;
  }
  .split-line{
    height: 1px;
    background: #dcdcdc;
    margin: 8px 0;
  }
}
</style>
