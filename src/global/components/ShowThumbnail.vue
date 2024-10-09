<template>
  <figure class="show-thumbnail">
    <img
      v-if="show.image"
      :src="validatedImgSrc"
      :alt="show.name"
      :title="show.name">
    <div
      v-else
      :title="show.name" />
    <slot />
  </figure>
</template>

<script setup lang="ts">
import type {SimpleShow} from "@/api/shows";
import {computed} from "vue";

interface Props {
  show: SimpleShow;
  quality?: string, // Should validate this, but let's just use a computed for now
}

const validatedImgSrc = computed(
  () => {
    if (quality === 'original') return show.image?.original;
    return show.image?.medium;
  }
);

const { show, quality = 'medium' } = defineProps<Props>();
</script>

<style scoped>
figure {
  display: flex;
  margin: 0;
  background-color: var(--c-dark-blue);
}

figure > img, div {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}
</style>