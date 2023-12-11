<template>
  <ul v-if="playlists.length > 0" class="grid grid-cols-1 gap-4">
    <PlaylistListItem
      v-for="playlist in playlists"
      :key="playlist.id"
      :playlist="playlist"
      :for-saving="forSaving"
      @save="emit('save', playlist)"
    />
  </ul>
  <span v-else class="flex flex-col text-lg text-gray-main">
    No playlists found, unfortunately.
    <nuxt-link to="/" class="text-light-blue-lighter w-max main-transition">
      If you want to create some, click here!
    </nuxt-link>
  </span>
</template>

<script setup lang="ts">
import type { Playlist } from '~/types/Playlist'
defineProps<{
  playlists: Playlist[]
  forSaving: boolean
}>()
const emit = defineEmits<{
  (e: 'save', playlist: Playlist): void
}>()
</script>

<style scoped>

</style>
~/stores/types/Playlist
