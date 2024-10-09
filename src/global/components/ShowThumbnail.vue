<template>
  <figure>
    <img
      v-if="show.image"
      :src="show.image?.medium"
      :alt="show.name"
      :title="show.name">
    <div
      v-else
      :title="show.name" />
  </figure>
</template>

<script setup lang="ts">
import type {SimpleShow} from "@/api/shows";

interface Props {
  show: SimpleShow;
}

const { show } = defineProps<Props>();
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