<template>
  <RouterView />
</template>


<script setup lang="ts">
import {useShowStore} from "@/stores/show";

const showStore = useShowStore();

async function init() {
  await showStore.loadShows();
}

init();

</script>

<style scoped>
</style>