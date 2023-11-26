<template>
  <ul class="flex flex-col gap-4">
    <SongListItem
      v-for="song in songs"
      :key="song.id"
      :song="song"
      :playlist-user-id="playlistUserId"
    />
  </ul>
</template>

<script setup lang="ts">
import type { SpotifyApiSong } from '~/types/Song'
defineProps<{
  songs: SpotifyApiSong[]
  playlistUserId: string
}>()
</script>

<style scoped>

</style>
~/types/Spotify