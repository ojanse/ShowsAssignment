<template>
  <BaseLink class="link">
    <IconChevronLeft class="icon" />
    <slot />
  </BaseLink>
</template>

<script setup lang="ts">
import IconChevronLeft from "@/global/icons/IconChevronLeft.vue";
import BaseLink from "@/global/components/BaseLink.vue";
</script>

<style scoped>
.link {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
.icon {
  width: 15px;
  height: 15px;
  stroke: var(--color-text);
}
</style>