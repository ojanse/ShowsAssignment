<template>
  <div class="rating">
    <div class="icon">
      <IconStar />
    </div>
    {{ formattedRating }}
  </div>
</template>

<script setup lang="ts">
import IconStar from "@/global/icons/IconStar.vue";
import type {SimpleShow} from "@/api/shows";
import {computed} from "vue";

interface Props {
  show: SimpleShow,
}

const { show } = defineProps<Props>();

const formattedRating = computed(
  () => {
    if (!show.rating.average) return '??';
    return (Math.round(show.rating.average * 100) / 100).toFixed(1);
  }
);
</script>

<style scoped>
.rating {
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-size: 14px;
  color: var(--color-text);
}

.icon {
  width: 12px;
  height: 12px;
  fill: var(--color-accent);
}
</style>