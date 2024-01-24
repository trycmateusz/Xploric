<template>
  <div class="min-h-[100svh] bg-black-main">
    <TheNavigation />
    <TheSubnavigation />
    <TheToastList />
    <slot />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>

<style scoped>

</style>
