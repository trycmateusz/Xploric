<template>
  <ul v-if="songs.length > 0" class="flex flex-col gap-4">
    <SongListItem
      v-for="song in songs"
      :key="song.id"
      :song="song"
      :playlist-user-id="playlistUserId"
      :playlist-id="playlistId"
      @move="emit('move-song', song)"
      @remove="emit('remove-song', song)"
    />
  </ul>
  <span
    v-else
    class="text-center"
  >
    No songs added to the playlist for now.
  </span>
</template>

<script setup lang="ts">
import type { SpotifyApiSong } from '~/types/Spotify'
defineProps<{
  songs: SpotifyApiSong[]
  playlistUserId?: string
  playlistId?: string
}>()
const emit = defineEmits<{
  (e: 'move-song', song: SpotifyApiSong): void
  (e: 'remove-song', song: SpotifyApiSong): void
}>()
</script>

<style scoped>

</style>
