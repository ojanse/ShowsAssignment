<template>
  <div class="dashboard-view">
    <div
      v-for="genre in allGenres"
      :key="genre"
      class="genre-container">
      <BaseTitle>
        <h2>{{ genre }}</h2>
      </BaseTitle>
      <ShowCardContainerSwiper>
        <ShowCard
          v-for="show in getSortedShows(genre)"
          :key="show.id"
          :show="show"
          tag="swiper-slide" />
      </ShowCardContainerSwiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useShowStore} from "@/stores/show";
import {storeToRefs} from "pinia";
import type {SimpleShow} from "@/api/shows";
import ShowCardContainerSwiper from "@/modules/dashboard/components/ShowCardContainerSwiper.vue";
import ShowCard from "@/global/components/ShowCard.vue";
import BaseTitle from "@/global/components/BaseTitle.vue";

const showStore = useShowStore();
const { allGenres } = storeToRefs(showStore);

function getSortedShows(genre: string) {
  const sortFunction = ((a: SimpleShow, b: SimpleShow) => {
    const aVal = a.rating?.average;
    const bVal = b.rating?.average;

    // Handle undefined and null, always return last
    if (aVal == null) {
      return 1;
    }
    if (bVal == null) {
      return -1;
    }

    const aValue = aVal as NonNullable<typeof aVal>;
    const bValue = bVal as NonNullable<typeof bVal>;

    if (aValue < bValue) return 1;
    if (aValue > bValue) return -1;
    return 0;
  });

  return showStore.getShowsByGenre(genre, sortFunction);
}
</script>

<style scoped>
.genre-container {
  margin-bottom: 40px;
}
</style>