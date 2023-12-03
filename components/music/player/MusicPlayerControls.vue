<template>
  <div class="flex justify-center gap-4">
    <button @click="currentAudioStore.playPreviousSongOrRewindToBeginning(fromPlaylist)">
      <img src="~/assets/img/previous-song.svg" alt="Play pervious song on the playlist or rewind to the beginning">
    </button>
    <button @click="currentAudioStore.goBackFiveSeconds()">
      <img src="~/assets/img/back-5-seconds.svg" alt="Rewind 5 seconds">
    </button>
    <button
      v-if="!currentAudioStore.currentPlaying"
      class="flex justify-center items-center w-8"
      @click="currentAudioStore.playCurrent()"
    >
      <img
        src="~/assets/img/play.svg"
        alt="Play song"
      >
    </button>
    <button
      v-else
      class="flex justify-center items-center w-8"
      @click="currentAudioStore.pauseCurrent()"
    >
      <img
        src="~/assets/img/pause.svg"
        alt="Pause song"
      >
    </button>
    <button @click="currentAudioStore.goForwardFiveSeconds()">
      <img src="~/assets/img/forward-5-seconds.svg" alt="Go forward 5 seconds">
    </button>
    <button @click="currentAudioStore.playNextSong()">
      <img src="~/assets/img/next-song.svg" alt="Play next song on the playlist">
    </button>
  </div>
</template>

<script setup lang="ts">
const currentAudioStore = useCurrentAudioStore()
defineProps<{
  fromPlaylist: boolean
}>()
</script>

<style scoped>

</style>
