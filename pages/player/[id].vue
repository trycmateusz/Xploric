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
  middleware: ['spotify-connect']
})
const songStore = useSongStore()
const currentAudioStore = useCurrentAudioStore()
const route = useRoute()
const songId = route.params.id.toString()
const song = computed(() => {
  return songStore.getSong(songId)
})
currentAudioStore.setExample()
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
