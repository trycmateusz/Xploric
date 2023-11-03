<template>
  <div>
    <ProfilePage
      v-if="userStore.auth"
      :own-profile="true"
      :user="userStore.auth"
    />
  </div>
</template>

<script setup lang="ts">
const playlistStore = usePlaylistStore()
const userStore = useUserStore()
await playlistStore.fetchPlaylists()
userStore.fetchUser('user1')
userStore.setAuth(userStore.users[0])
</script>

<style scoped>

</style>
