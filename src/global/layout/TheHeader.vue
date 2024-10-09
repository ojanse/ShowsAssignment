<template>
  <BaseContainer tag="header">
    <div class="header-content">
      <BaseLink :to="{ name: 'dashboard' }">
        <BaseTitle no-margin>
          <h1>Shows</h1>
        </BaseTitle>
      </BaseLink>
      <form @submit.prevent="handleSearchSubmit">
        <SearchInput v-model="searchQuery" />
      </form>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from "@/global/components/BaseContainer.vue";
import BaseTitle from "@/global/components/BaseTitle.vue";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";
import BaseLink from "@/global/components/BaseLink.vue";
import SearchInput from "@/global/components/SearchInput.vue";

const router = useRouter();
const route = useRoute();
const searchQuery = ref(route.query?.q?.toString() ?? '');

watch(
  () => route.query?.q,
   () => {
     if (!route.query?.q) {
       searchQuery.value = '';
     }
  },
);

function handleSearchSubmit() {
  if (searchQuery.value.length > 0) {
    router.push({ name: 'search', query: { q: searchQuery.value } });
  }
}
</script>

<style scoped>
.header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
</style>