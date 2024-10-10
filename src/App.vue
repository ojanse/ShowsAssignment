<template>
  <router-view v-if="showStore.loadState === SHOWS_LOAD_STATE.ready" />
  <LoadingView v-else />
</template>


<script setup lang="ts">
import {SHOWS_LOAD_STATE, useShowStore} from "@/stores/show";
import LoadingView from "@/global/views/LoadingView.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";

const route = useRoute();
const router = useRouter();
const showStore = useShowStore();

onMounted(async () => {
  await router.isReady();
  if (route.query?.action === 'clear-cache') {
    await showStore.clearShows();
  }
  await showStore.loadShows();
});

</script>

<style scoped>
</style>