<template>
  <div class="grid-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.grid-container {
  display: grid;
  max-width: 1024px;
  grid-template-columns: 1fr;
  column-gap: 20px;
  row-gap: 40px;

  @media screen and (min-width:640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width:640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width:768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>