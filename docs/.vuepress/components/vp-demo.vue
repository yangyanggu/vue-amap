<script setup lang="ts">
import { computed, toRef, ref, getCurrentInstance } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useToggle } from '../composables/toggle'

import SourceCodeIcon from './icons/source-code.vue'
import CopyIcon from './icons/copy-icon.vue'

import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'

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
})

const vm = getCurrentInstance()

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible, setSourceVisible] = useToggle()

const decodedDescription = computed(() => decodeURIComponent(props.description))

const copyCode = async () => {
  if (!isSupported) {
    alert('复制失败');
  }
  try {
    await copy()
    alert('复制成功')
  } catch (e: Error) {
    alert(e.message)
  }
}

const demoPath = computed(() => props.path.replaceAll('/', '-'))
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
