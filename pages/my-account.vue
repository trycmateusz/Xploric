<template>
  <div>
    <div class="min-h-[30vh] max-h-[500px] bg-center bg-cover bg-[url('~/crowd.jpg')]" />
    <div class="wrapper p-4 text-white">
      <h1 class="text-3xl text-light-blue-lighter mb-8">
        Hello, username
      </h1>
      <h2 class="text-xl mb-4">
        Your playlists
      </h2>
      <PlaylistList :playlists="playlistStore.playlists" />
    </div>
  </div>
</template>

<script setup lang="ts">
const playlistStore = usePlaylistStore()
await playlistStore.fetchPlaylists()
</script>

<style scoped>

</style>
