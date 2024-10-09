<template>
  <div ref="container" class="swiper-container">
    <swiper-container
      v-if="firstTimeInView"
      :space-between="20"
      :slides-per-view="1.2"
      navigation="true"
      :centered-slides="true"
      :breakpoints="{
        640: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 3,
          centeredSlides: false,
        },
        1260: {
          slidesPerView: 5,
          centeredSlides: false,
        },
        1600: {
          slidesPerView: 7,
          centeredSlides: false,
        },
        2100: {
          slidesPerView: 9,
          centeredSlides: false,
        },
      }">
      <slot />
    </swiper-container>
    <div
      v-else
      class="loader" />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useElementVisibility, watchImmediate} from "@vueuse/core";

const container = ref(null);
const targetIsVisible = useElementVisibility(container);
const firstTimeInView = ref(false);

watchImmediate(targetIsVisible, () => {
  if (targetIsVisible.value) {
    firstTimeInView.value = true;
  }
});
</script>

<style scoped>
.loader {
  height: 200px;
}
</style>