<template>
  <button
    class="background relative w-full main-transition focus:outline-none"
    aria-label="Change profile's background image"
    @click="() => console.log('change image')"
  >
    <img
      class="absolute h-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
      src="~/assets/img/edit-white.svg"
      alt=""
    >
    <slot />
  </button>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
