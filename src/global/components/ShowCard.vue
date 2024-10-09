<template>
  <component
    :is="tag"
    class="show-card">
    <ShowThumbnail
      class="thumbnail"
      :show="show" />
    <BaseTitle
      class="card-title"
      no-margin>
      <h4>{{ show.name }}</h4>
    </BaseTitle>
  </component>
</template>

<script setup lang="ts">
import type {SimpleShow} from "@/api/shows";
import ShowThumbnail from "@/global/components/ShowThumbnail.vue";
import BaseTitle from "@/global/components/BaseTitle.vue";

interface Props {
  show: SimpleShow,
  tag?: string;
}

const { show, tag = 'div' } = defineProps<Props>();
</script>

<style scoped>
.show-card {
  user-select: none;
}
.card-title {
  margin-top: 5px;
}
.thumbnail:hover {
  box-shadow: rgba(0,0,0,0.2) 0 1px 3px 0;
  opacity: 0.7;
}
</style>