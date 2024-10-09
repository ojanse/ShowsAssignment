<template>
  <div class="page-container">
    <BaseTitle>
      <h4>Loading tv shows, one moment...</h4>
    </BaseTitle>
    <BaseText v-if="showStore.loadingPage > 0">
      <p>
        Fetching page: 
        <span class="page-number">
          {{ showStore.loadingPage }}
        </span>
      </p>
    </BaseText>
  </div>
</template>

<script setup lang="ts">
import BaseText from "@/global/components/BaseText.vue";
import {useShowStore} from "@/stores/show";
import BaseTitle from "@/global/components/BaseTitle.vue";

const showStore = useShowStore();
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  height: 100vh;
}

.page-number {
  color: var(--color-accent);
}

</style>