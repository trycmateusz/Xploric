<template>
  <div class="grid grid-cols-1 gap-4">
    <PlaylistListItem
      v-for="playlist in playlists"
      :key="playlist.id"
      :playlist="playlist"
    />
  </div>
</template>

<script setup lang="ts">
import type { Playlist } from '~/types/Playlist'
defineProps<{
  playlists: Playlist[]
}>()
</script>

<style scoped>

</style>
