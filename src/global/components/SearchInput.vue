<template>
  <div class="search-input">
    <IconSearch class="icon" />
    <input
      v-model="model"
      type="text">
  </div>
</template>

<script setup lang="ts">
import IconSearch from "@/global/icons/IconSearch.vue";

const model = defineModel<string>();
</script>

<style scoped>
.search-input {
  position: relative;
}

input {
  padding-left: 30px;
  font-family: var(--font-indivisible);
  color: var(--color-background);
  font-size: 16px;
  outline: none;
  height: 30px;
}

.icon {
  position: absolute;
  width: 20px;
  height: 20px;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  stroke: var(--color-background);
  fill: transparent;
}
</style>