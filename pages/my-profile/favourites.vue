<template>
  <div class="wrapper p-4 text-white-main min-h-[Calc(100svh_-_var(--nav-height))]">
    <SongList v-if="songStore.getUsersFavourites" :songs="songStore.getUsersFavourites" />
    <div v-else class="flex flex-col items-center gap-4">
      <span class="text-lg">
        You haven't made any song your favourite.
      </span>
      <AppLink to="/xplore" styling="primary" text="Xplore" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'access-token']
})
const songStore = useSongStore()
const userStore = useUserStore()
if (userStore.auth && userStore.auth.favourites) {
  await songStore.fetchManySongs(userStore.auth.favourites)
}

</script>

<style scoped>

</style>
