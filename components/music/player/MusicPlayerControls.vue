<template>
  <div class="flex justify-center gap-4">
    <button @click="playPreviousSongOrRewindToBeginning">
      <img src="~/assets/img/previous-song.svg" alt="Play pervious song on the playlist or rewind to the beginning">
    </button>
    <button @click="currentAudioStore.goBackFiveSeconds()">
      <img src="~/assets/img/back-5-seconds.svg" alt="Rewind 5 seconds">
    </button>
    <MusicPlayerControlsPlayPause v-if="!withoutPlay" class="w-8" />
    <button @click="currentAudioStore.goForwardFiveSeconds()">
      <img src="~/assets/img/forward-5-seconds.svg" alt="Go forward 5 seconds">
    </button>
    <button v-if="!withoutNext" @click="playNextSong">
      <img src="~/assets/img/next-song.svg" alt="Play next song on the playlist">
    </button>
  </div>
</template>

<script setup lang="ts">
const currentAudioStore = useCurrentAudioStore()
const props = defineProps<{
  fromPlaylist: boolean
  withoutPlay: boolean
  withoutNext?: boolean
}>()
const emit = defineEmits<{
  (e: 'play-next'): void
  (e: 'play-previous'): void
}>()
const playNextSong = () => {
  if (currentAudioStore.currentAudio) {
    if (!props.fromPlaylist) {
      currentAudioStore.currentAudio.currentTime = 0
    }
  }
  emit('play-next')
}
const playPreviousSongOrRewindToBeginning = () => {
  if (currentAudioStore.currentAudio) {
    if (!props.fromPlaylist || (props.fromPlaylist && currentAudioStore.currentAudio.currentTime > 5)) {
      currentAudioStore.currentAudio.currentTime = 0
    }
  }
  emit('play-previous')
}
</script>

<style scoped>
button {
  @apply main-transition
}
</style>
