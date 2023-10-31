<template>
  <div>
    <div class="min-h-[30vh] max-h-[500px] bg-center bg-cover bg-[url('~/crowd.jpg')]" />
    <div class="wrapper p-4 text-white">
      <div class="flex items-center gap-5 mb-8">
        <h1 class="text-3xl text-light-blue-lighter leading-none">
          Hello, username
        </h1>
        <ClientOnly>
          <button @click="() => console.log('edit your profile')">
            <img src="~/assets/img/edit-blue.svg" alt="Edit your profile">
          </button>
        </ClientOnly>
      </div>
      <h2 class="text-xl mb-4">
        Your playlists
      </h2>
      <PlaylistList :playlists="playlistStore.playlists" />
      <nuxt-link to="/" class="block mt-5 text-center text-light-blue-lighter text-xl">
        create a new playlist
      </nuxt-link>
      <div class="flex flex-col gap-5 mt-10">
        <AppButton
          text="Your favourite songs"
          styling="primary"
          @click="() => console.log('your favourite songs')"
        />
        <AppButton
          text="Check last 10 songs you listened to"
          styling="secondary"
          @click="() => console.log('10 songs before')"
        />
        <AppButton
          text="Edit your profile"
          styling="secondary"
          @click="() => console.log('edit profile')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const playlistStore = usePlaylistStore()
await playlistStore.fetchPlaylists()
</script>

<style scoped>

</style>
