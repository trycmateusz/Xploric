<template>
  <div class="min-h-[100svh] bg-black-main">
    <TheNavigation />
    <TheSubnavigation />
    <TheToastList />
    <slot />
    <TheCurrentPlayer
      v-if="currentAudioStore.current"
      :current="currentAudioStore.current"
    />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const currentAudioStore = useCurrentAudioStore()
</script>

<style scoped>

</style>
