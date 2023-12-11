<template>
  <main>
    <TheNavigationBack />
    <div class="wrapper">
      <MusicPlayer
        v-if="song"
        :song="song"
        class="h-max"
        :from-playlist="true"
        @set-audio="(tag) => currentAudioStore.setCurrentAudio(tag)"
        @audio-data-loaded="currentAudioStore.currentAudioLoaded = true"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'without-current-player'
})
const songStore = useSongStore()
const currentAudioStore = useCurrentAudioStore()
const route = useRoute()
const songId = route.params.id.toString()
const song = computed(() => {
  return songStore.getSong(songId)
})
currentAudioStore.setExample()
</script>

<style scoped>

</style>
