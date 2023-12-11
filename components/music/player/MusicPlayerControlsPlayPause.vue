<template>
  <div class="flex items-center justify-center">
    <button
      v-if="!currentAudioStore.currentPlaying"
      @click="currentAudioStore.playCurrent()"
    >
      <img
        src="~/assets/img/play.svg"
        alt="Play song"
      >
    </button>
    <button
      v-else
      @click="currentAudioStore.pauseCurrent()"
    >
      <img
        src="~/assets/img/pause.svg"
        alt="Pause song"
      >
    </button>
  </div>
</template>

<script setup lang="ts">
const currentAudioStore = useCurrentAudioStore()
</script>

<style scoped>
button {
  @apply flex justify-center items-center w-full h-full
}
</style>
