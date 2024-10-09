<template>
  <component
    :is="componentIs"
    :to="to"
    :href="href"
    class="link">
    <slot />
  </component>
</template>

<script setup lang="ts">
import {computed} from "vue";

interface Props {
  to?: { name: string },
  href?: string;
}

const { to, href } = defineProps<Props>();

const componentIs = computed(
  () => {
    if (to) return 'router-link';
    return 'a';
  },
);
</script>

<style scoped>
  .link {
    color: var(--color-text);
    font-family: var(--font-indivisible);
  }

  .link:hover {
    cursor: pointer;
    opacity: 0.7;
  }
</style>