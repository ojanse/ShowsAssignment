<template>
  <component
    :is="tag"
    class="show-card">
    <BaseLink
      :to="{ 
        name: 'show-details',
        params: {
          showId: show.id,
        },
      }">
      <ShowThumbnail
        class="thumbnail"
        :show="show">
        <ShowRating
          class="rating"
          :show="show" />
      </ShowThumbnail>
      <BaseTitle
        class="card-title"
        no-margin>
        <h4>{{ show.name }}</h4>
      </BaseTitle>
    </BaseLink>
  </component>
</template>

<script setup lang="ts">
import type {SimpleShow} from "@/api/shows";
import ShowThumbnail from "@/global/components/ShowThumbnail.vue";
import BaseTitle from "@/global/components/BaseTitle.vue";
import ShowRating from "@/global/components/ShowRating.vue";
import BaseLink from "@/global/components/BaseLink.vue";

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

.thumbnail {
  position: relative;
}

.card-title {
  margin-top: 5px;
}

.thumbnail:hover {
  box-shadow: rgba(0,0,0,0.2) 0 1px 3px 0;
  opacity: 0.7;
}

.rating {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: var(--color-background);
}
</style>