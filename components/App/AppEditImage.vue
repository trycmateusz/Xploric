<template>
  <div
    class="background relative w-full main-transition focus:outline-none"
    aria-label="Change profile's background image"
  >
    <img
      class="absolute h-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
      src="~/assets/img/edit-white.svg"
      alt=""
    >
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
