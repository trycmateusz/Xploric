<template>
  <main>
    <MusicPlayer
      v-if="currentAudioStore.current"
      :song="currentAudioStore.current"
      :from-playlist="false"
      :without-next="true"
      class="min-h-[Calc(100svh_-_var(--nav-height))]"
      @save-song="isBeingSaved = true"
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
            <nuxt-link class="main-transition text-light-blue-lighter" :to="{ path:'/playlist/create', query: { saving: currentAudioStore.current?.id, redirect: route.path } }">
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
import type { Playlist } from '~/types/Playlist'
definePageMeta({
  layout: 'without-current-player',
  middleware: ['spotify-auth', 'auth']
})
const route = useRoute()
const songStore = useSongStore()
const playlistStore = usePlaylistStore()
const userStore = useUserStore()
const currentAudioStore = useCurrentAudioStore()
const { makeBodyFixed, removeFixedFromBody } = useFixedBody()
const isBeingSaved = ref(false)
const saveToPlaylist = async (playlist: Playlist) => {
  if (currentAudioStore.current) {
    if (!playlist.songs?.includes(currentAudioStore.current.id)) {
      const songs = playlist.songs || []
      const updated = await playlistStore.updatePlaylist(playlist.id, {
        songs: [...songs, currentAudioStore.current.id],
        updatedAt: new Date().getTime()
      })
      if (updated) {
        songStore.fetchRandomSong(true)
      }
    }
  }
  isBeingSaved.value = false
}
if (userStore.auth) {
  if (userStore.auth.playlists) {
    await playlistStore.fetchManyPlaylists(userStore.auth.playlists)
  }
}
await songStore.fetchRandomSong(true)
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
