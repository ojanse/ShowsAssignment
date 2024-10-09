<template>
  <li>
    <span class="label">{{ label }}</span>
    <slot />
  </li>
</template>

<script setup lang="ts">
interface Props {
  label: string;
}

const { label } = defineProps<Props>();
</script>

<style scoped>
li {
  display: flex;
  flex-direction: column;
}

li:not(:last-of-type) {
  margin-bottom: 20px;
}

.label {
  font-weight: 500;
  margin-bottom: 5px;
}

@media screen and (min-width:768px) {
  li {
    flex-direction: row;
  }

  li:not(:last-of-type) {
    margin-bottom: 10px;
  }

  .label {
    width: 150px;
    margin-bottom: 0;
  }
}
</style>