<template>
  <div>
    <main class="p-4">
      123
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['spotify-connect']
})
const songStore = useSongStore()
await songStore.fetchRandomSong()
</script>

<style scoped>

</style>
