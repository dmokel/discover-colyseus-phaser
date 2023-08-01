<template>
  <NuxtLoadingIndicator></NuxtLoadingIndicator>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to=""> </NuxtLink>
        <ul class="flex gap-4">
          <li>
            <NuxtLink to="/">首页</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/game">游戏</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/vue-tutorial">Vue Tutorial</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <div class="">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: rgb(76, 156, 76);
  font-weight: bold;
}
</style>
