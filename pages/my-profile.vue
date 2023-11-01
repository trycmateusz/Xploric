<template>
  <div>
    <ProfilePage
      :own-profile="true"
      :playlists="playlistStore.playlists"
    />
  </div>
</template>

<script setup lang="ts">
const playlistStore = usePlaylistStore()
await playlistStore.fetchPlaylists()
</script>

<style scoped>

</style>
