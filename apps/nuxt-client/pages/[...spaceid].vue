<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLink class="back" to="/">首页</NuxtLink>
  <div>
    <ClientOnly>
      <World />
    </ClientOnly>
  </div>
</template>

<style scoped>
.back {
  color: aqua;
  z-index: 2147483645;
  position: fixed;
  left: 10vw;
  top: 5vh;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(0);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px !important;
}
</style>
