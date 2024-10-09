<template>
  <component
    :is="tag"
    class="show-card">
    <router-link
      :to="{ 
        name: 'show-details',
        params: {
          showId: show.id,
        },
      }">
      <ShowThumbnail
        class="thumbnail"
        :show="show">
        <div class="rating">
          <div class="icon">
            <IconStar />
          </div>
          {{ formattedRating }}
        </div>
      </ShowThumbnail>
      <BaseTitle
        class="card-title"
        no-margin>
        <h4>{{ show.name }}</h4>
      </BaseTitle>
    </router-link>
  </component>
</template>

<script setup lang="ts">
import type {SimpleShow} from "@/api/shows";
import ShowThumbnail from "@/global/components/ShowThumbnail.vue";
import BaseTitle from "@/global/components/BaseTitle.vue";
import IconStar from "@/global/icons/IconStar.vue";
import {computed} from "vue";

interface Props {
  show: SimpleShow,
  tag?: string;
}

const { show, tag = 'div' } = defineProps<Props>();

const formattedRating = computed(
  () => {
    if (!show.rating.average) return '??';
    return (Math.round(show.rating.average * 100) / 100).toFixed(1);
  }
);
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
  display: flex;
  flex-direction: row;
  gap: 5px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  background-color: var(--color-background);
  color: var(--color-text);
}

.icon {
  width: 12px;
  height: 12px;
  fill: var(--color-accent);
}
</style>