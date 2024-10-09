<template>
  <router-view v-if="showStore.loadState === SHOWS_LOAD_STATE.ready" />
  <LoadingView v-else />
</template>


<script setup lang="ts">
import {SHOWS_LOAD_STATE, useShowStore} from "@/stores/show";
import LoadingView from "@/global/views/LoadingView.vue";

const showStore = useShowStore();

async function init() {
  await showStore.loadShows();
}

init();

</script>

<style scoped>
</style>