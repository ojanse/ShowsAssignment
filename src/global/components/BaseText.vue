<template>
  <div class="text">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
  .text {
    font-family: var(--font-indivisible);
    color: var(--color-text);
    font-size: 16px;
  }

  :slotted(p + p) {
    margin-top: 10px;
  }
</style>