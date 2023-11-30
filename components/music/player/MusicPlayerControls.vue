<template>
  <div class="flex justify-center gap-4">
    <button @click="songStore.playPreviousSongOrRewindToBeginning(fromPlaylist)">
      <img src="~/assets/img/previous-song.svg" alt="Play pervious song on the playlist or rewind to the beginning">
    </button>
    <button @click="songStore.goBackFiveSeconds()">
      <img src="~/assets/img/back-5-seconds.svg" alt="Rewind 5 seconds">
    </button>
    <button class="flex justify-center items-center w-8" @click="songStore.pauseOrPlayCurrent()">
      <img
        :src="songStore.currentPlaying ? getAbsolutePath('~/assets/img/pause.svg') : getAbsolutePath('~/assets/img/play.svg')"
        :alt="songStore.currentPlaying ? 'Pause song' : 'Play song'"
      >
    </button>
    <button @click="songStore.goForwardFiveSeconds()">
      <img src="~/assets/img/forward-5-seconds.svg" alt="Go forward 5 seconds">
    </button>
    <button @click="songStore.playNextSong()">
      <img src="~/assets/img/next-song.svg" alt="Play next song on the playlist">
    </button>
  </div>
</template>

<script setup lang="ts">
const songStore = useSongStore()
const { getAbsolutePath } = useImages()
defineProps<{
  fromPlaylist: boolean
}>()
</script>

<style scoped>

</style>
