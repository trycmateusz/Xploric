<template>
  <ul v-if="playlists.length > 0" class="grid grid-cols-1 gap-4">
    <PlaylistListItem
      v-for="playlist in playlists"
      :key="playlist.id"
      :playlist="playlist"
      :for-saving="forSaving"
      :for-moving="forMoving"
      @save="emit('save', playlist)"
      @move="emit('move-song-to', playlist)"
    />
  </ul>
  <span v-else class="flex flex-col text-lg text-gray-main">
    No playlists found, unfortunately.
  </span>
</template>

<script setup lang="ts">
import type { Playlist } from '~/types/Playlist'
defineProps<{
  playlists: Playlist[]
  forSaving?: boolean
  forMoving?: boolean
}>()
const emit = defineEmits<{
  (e: 'save', playlist: Playlist): void
  (e: 'move-song-to', playlist: Playlist): void
}>()
</script>

<style scoped>

</style>
~/stores/types/Playlist
