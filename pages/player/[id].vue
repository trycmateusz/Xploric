<template>
  <main>
    <TheNavigationBack />
    <div class="wrapper">
      <MusicPlayer
        v-if="song"
        :song="song"
        class="h-max"
        :from-playlist="true"
        @set-audio="(tag) => setCurrentAudioIfDifferent(tag)"
        @audio-data-loaded="currentAudioStore.currentAudioLoaded = true"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'without-current-player',
  middleware: ['code-verifier']
})
const songStore = useSongStore()
const currentAudioStore = useCurrentAudioStore()
const playlistStore = usePlaylistStore()
const route = useRoute()
const songId = route.params.id.toString()
const fromPlaylist = route.query.fromPlaylist?.toString()
const song = computed(() => {
  return songStore.getSong(songId)
})
await songStore.fetchOneSong(songId)
if (song.value) {
  currentAudioStore.setCurrent(song.value)
}
if (fromPlaylist) {
  const playlist = await playlistStore.fetchPlaylist(fromPlaylist)
  if (playlist) {
    await playlistStore.updatePlaylist(playlist.id, {
      listenCounter: playlist.listenCounter += 1
    })
  }
}
const setCurrentAudioIfDifferent = (tag: HTMLAudioElement) => {
  if (!currentAudioStore.currentAudio) {
    currentAudioStore.setCurrentAudio(tag)
  } else if (currentAudioStore.current?.id !== songId) {
    currentAudioStore.setCurrentAudio(tag)
  }
}
</script>

<style scoped>

</style>
