<template>
  <main>
    <MusicPlayer
      v-if="song"
      :song="song"
      :from-playlist="false"
      class="min-h-[Calc(100svh_-_var(--nav-height))]"
      @save-song="isBeingSaved = true"
      @set-audio="(tag) => currentAudioStore.setCurrentAudio(tag)"
      @audio-data-loaded="currentAudioStore.currentAudioLoaded = true"
    />
    <teleport to="body">
      <div
        v-if="isBeingSaved && userStore.auth"
        class="fixed top-[var(--nav-height)] w-full min-h-[Calc(100svh_-_var(--nav-height))] bg-black-main z-40 overflow-y-auto"
      >
        <div class="wrapper flex flex-col p-4">
          <PlaylistList
            :for-saving="true"
            :playlists="playlistStore.getUsersPlaylists(userStore.auth)"
            @save="saveToPlaylist"
          />
          <div class="mt-10 mb-4 text-lg text-white-main text-center">
            or
            <nuxt-link class="main-transition text-light-blue-lighter" :to="{ path:'/playlist/create', query: { saving: song?.id } }">
              add to a new one
            </nuxt-link>
          </div>
          <AppButton
            text="Cancel"
            styling="secondary"
            class="ml-auto"
            @click="isBeingSaved = false"
          />
        </div>
      </div>
    </teleport>
  </main>
</template>

<script setup lang="ts">
import type { SpotifyApiSong } from '~/types/Spotify'
import type { Playlist } from '~/types/Playlist'
definePageMeta({
  layout: 'without-current-player'
})
const songStore = useSongStore()
const playlistStore = usePlaylistStore()
const userStore = useUserStore()
const currentAudioStore = useCurrentAudioStore()
const { makeBodyFixed, removeFixedFromBody } = useFixedBody()
const isBeingSaved = ref(false)
const song = computed<SpotifyApiSong | undefined>(() => {
  return songStore.songs[songStore.songs.length - 1]
})
currentAudioStore.setCurrent(null)
currentAudioStore.setExample()
const saveToPlaylist = (playlist: Playlist) => {
  isBeingSaved.value = false
  console.log('saving', playlist)
}
if (userStore.auth) {
  await playlistStore.fetchManyPlaylists(userStore.auth.playlists)
}
watch(isBeingSaved, () => {
  if (isBeingSaved.value) {
    makeBodyFixed()
  } else {
    removeFixedFromBody()
  }
})
onUnmounted(() => {
  removeFixedFromBody()
  currentAudioStore.setCurrent(null)
})
</script>

<style scoped>

</style>
~/stores/types/Spotify~/stores/types/Playlist
