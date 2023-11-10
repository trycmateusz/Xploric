<template>
  <div class="sticky w-full top-[var(--nav-height)] border-b border-black-lighter bg-black-main">
    <div class="wrapper">
      <button class="p-4 text-base" @click="router.back()">
        <img
          class="h-[1.5em]"
          src="~/assets/img/arrow-left.svg"
        >
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style scoped>

</style>
