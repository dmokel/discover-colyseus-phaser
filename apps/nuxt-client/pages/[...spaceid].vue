<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <ClientOnly>
      <World />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
