<template>
  <main>
    <div class="wrapper">
      <MusicPlayer
        v-if="song"
        :song="song"
        class="h-max"
        :from-playlist="true"
        @set-audio="(tag) => currentAudioStore.setCurrentAudio(tag, false)"
        @audio-data-loaded="currentAudioStore.currentAudioLoaded = true"
        @play-next="playNext"
        @play-previous="playPrevious"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Playlist } from '~/types/Playlist'
definePageMeta({
  layout: 'without-current-player',
  middleware: ['spotify-auth', 'auth']
})
const songStore = useSongStore()
const currentAudioStore = useCurrentAudioStore()
const playlistStore = usePlaylistStore()
const route = useRoute()
const router = useRouter()
const songId = route.params.id.toString()
const fromPlaylist = route.query.fromPlaylist?.toString()
const song = computed(() => {
  return songStore.getSong(songId)
})
await songStore.fetchOneSong(songId)
if (song.value) {
  currentAudioStore.setCurrent(song.value)
}
let playlist: Playlist | undefined
if (fromPlaylist) {
  playlist = await playlistStore.fetchPlaylist(fromPlaylist)
  if (playlist) {
    playlistStore.updatePlaylist(playlist.id, {
      listenCounter: playlist.listenCounter += 1
    })
  }
}
const playNext = () => {
  if (playlist?.songs && currentAudioStore.current) {
    const index = playlist.songs.findIndex(id => id === song.value?.id)
    if (index === playlist.songs.length - 1) {
      router.push({ path: `/player/${playlist.songs[0]}`, query: { fromPlaylist } })
    } else {
      router.push({ path: `/player/${playlist.songs[index + 1]}`, query: { fromPlaylist } })
    }
  }
}
const playPrevious = () => {
  if (playlist?.songs && currentAudioStore.current) {
    const index = playlist.songs.findIndex(id => id === song.value?.id)
    if (index === 0) {
      router.push({ path: `/player/${playlist.songs[playlist.songs.length - 1]}`, query: { fromPlaylist } })
    } else {
      router.push({ path: `/player/${playlist.songs[index - 1]}`, query: { fromPlaylist } })
    }
  }
}
</script>

<style scoped>

</style>
