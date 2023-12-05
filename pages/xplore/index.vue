<template>
  <main>
    <MusicPlayer
      v-if="song"
      :song="song"
      :from-playlist="false"
      @save-song="isBeingSaved = true, makeBodyFixed"
    />
    <teleport to="body">
      <div
        v-if="isBeingSaved && userStore.auth"
        class="fixed top-[var(--nav-height)] w-full h-full p-4 min-h-[100svh_-_Calc(var(--nav-height))] bg-black-main z-40"
      >
        <div class="wrapper flex flex-col">
          <PlaylistList
            :for-saving="true"
            :playlists="playlistStore.getUsersPlaylists(userStore.auth)"
            @save="saveToPlaylist"
          />
          <div class="mt-10 mb-4 text-lg text-white-main text-center">
            or
            <nuxt-link class="main-transition text-light-blue-lighter" to="/playlist/create">
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
const songStore = useSongStore()
const playlistStore = usePlaylistStore()
const userStore = useUserStore()
const currentAudioStore = useCurrentAudioStore()
const { makeBodyFixed } = useFixedBody()
const isBeingSaved = ref(false)
const song = computed<SpotifyApiSong | undefined>(() => {
  return songStore.songs[songStore.songs.length - 1]
})
const saveToPlaylist = (playlist: Playlist) => {
  isBeingSaved.value = false
  console.log('saving', playlist)
}
if (userStore.auth) {
  await playlistStore.fetchManyPlaylists(userStore.auth.playlists)
}
watch(isBeingSaved, () => {
  if (isBeingSaved.value) {
    currentAudioStore.pauseCurrent()
  } else {
    currentAudioStore.playCurrent()
  }
})
</script>

<style scoped>

</style>
