<template>
  <main>
    <ProfilePage
      v-if="userStore.auth"
      :own-profile="true"
      :user="userStore.auth"
    />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
const playlistStore = usePlaylistStore()
const userStore = useUserStore()
await playlistStore.fetchPlaylists()
</script>

<style scoped>

</style>
