<template>
  <div class="search-view">
    <BackLink
      class="back-link"
      :to="{ name: 'dashboard' }">
      Back to dashboard
    </BackLink>
    <BaseTitle class="result-title">
      <h2>
        Results for: <span>{{ query }}</span>
      </h2>
    </BaseTitle>
    <ShowCardContainerGrid class="card-container">
      <ShowCard
        v-for="searchResult in searchResults"
        :key="searchResult.show.id"
        :show="searchResult.show" />
    </ShowCardContainerGrid>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {watchImmediate} from "@vueuse/core";
import {getShowByQuery, type ShowSearchResult} from "@/api/shows";
import {useRoute} from "vue-router";
import ShowCard from "@/global/components/ShowCard.vue";
import ShowCardContainerGrid from "@/modules/search/components/ShowCardContainerGrid.vue";
import BaseTitle from "@/global/components/BaseTitle.vue";
import BackLink from "@/global/components/BackLink.vue";

const route = useRoute();
const searchResults = ref<ShowSearchResult[]>([]);
const query = computed(() => route.query?.q?.toString());

watchImmediate(
  () => route.query?.q,
   () => {
     performSearch();
  },
);

async function performSearch() {
  if (query.value && query.value.length > 0) {
    searchResults.value = await getShowByQuery(query.value);
  }
}
</script>

<style scoped>
.back-link {
  margin-bottom: 20px;
}

.card-container {
  margin-top: 20px;
}

h2 > span {
  font-weight: 500;
  color: var(--color-accent);
}
</style>