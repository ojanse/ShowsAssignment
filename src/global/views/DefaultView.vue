<template>
  <div class="page-container">
    <div class="gradient-wrapper">
      <div class="backdrop-gradient" />
    </div>
    <TheHeader
      class="header"
      :class="{ 'opaque': isScrolledDown }" />
    <TheMain class="main">
      <router-view />
    </TheMain>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/global/layout/TheHeader.vue";
import TheMain from "@/global/layout/TheMain.vue";
import {useWindowScroll} from "@vueuse/core";
import {computed} from "vue";

const { y } = useWindowScroll();
const isScrolledDown = computed(() => y.value > 40);
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  min-height: 100vh;
  background: var(--color-background);
}

.gradient-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.backdrop-gradient {
  position: fixed;
  width: clamp(400px, 100%, 1000px);
  padding-top: 100%;
  height: 0;
  background: transparent;
  background: radial-gradient(at -200px -200px, var(--color-background-gradient) 0%, transparent 70%);
}

.header {
  position: fixed;
  top: 0;
  height: 60px;
  z-index: 2;
}

.header.opaque {
  background-color: var(--color-background-transparent);
  box-shadow: rgba(0,0,0,0.2) 0 2px 3px 0;
  backdrop-filter: blur(2px);
}

.main {
  flex: 1 0 auto;
  padding-top: 20px;
}
</style>