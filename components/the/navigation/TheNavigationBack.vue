<template>
  <div class="sticky top-0 border-b border-black-lighter">
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
