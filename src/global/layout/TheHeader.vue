<template>
  <BaseContainer tag="header">
    <div class="header-content">
      <router-link :to="{ name: 'dashboard' }">
        <BaseTitle no-margin>
          <h1>Shows</h1>
        </BaseTitle>
      </router-link>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from "@/global/components/BaseContainer.vue";
import BaseTitle from "@/global/components/BaseTitle.vue";
</script>

<style scoped>
.header-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
}
</style>