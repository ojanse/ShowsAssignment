<template>
  <component
    :is="tag"
    class="container">
    <div>
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
interface Props {
  tag?: string;
}

const { tag = 'div' } = defineProps<Props>();
</script>

<style scoped>
  .container {
    position: relative;
    width: 100%;
  }

  .container > div {
    width: 100%;
  }

  .container > div {
    width: calc(100% - 40px);
    margin-left: 20px;
  }

  @media screen and (min-width:480px) {
    .container > div {
      width: calc(100% - 100px);
      margin-left: 50px;
    }
  }

  @media screen and (min-width:768px) {
    .container > div {
      width: calc(100% - 120px);
      margin-left: 60px;
    }
  }
</style>