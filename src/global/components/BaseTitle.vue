<template>
  <div
    class="title"
    :class="{ 'no-margin': noMargin }">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  noMargin?: boolean;
}

const { noMargin = false } = defineProps<Props>();
</script>

<style scoped>
  .title {
    color: var(--color-text);
  }

  .title:not(.no-margin) {
    margin-bottom: 10px;
  }

  .title > * {
    font-family: var(--font-indivisible);
    margin: 0;
  }

  :slotted(h1) {
    font-size: 39px;
    line-height: 40px;
    font-weight: 700;
  }

  :slotted(h2) {
    font-size: 27px;
    line-height: 30px;
    font-weight: 700;
  }

  :slotted(h3) {
    font-size: 20px;
    line-height: 20px;
    font-weight: 500;
  }

  :slotted(h4) {
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
  }
</style>