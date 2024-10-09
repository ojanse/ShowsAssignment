<template>
  <ul>
    <slot />
  </ul>
</template>

<script setup lang="ts">
</script>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
    color: var(--color-text);
    font-family: var(--font-indivisible);
  }
</style>