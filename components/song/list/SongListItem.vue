<template>
  <li class="flex flex-col gap-4 p-4 bg-black-lighter rounded-xl xs:flex-row">
    <img
      v-if="coverLoaded"
      :src="song.cover_img_url"
      :alt="`${song.name}'s cover`"
      class="rounded-lg xs:w-[7rem]"
    >
    <div class="xs:flex xs:flex-col xs:justify-between xs:mr-4">
      <span class="block text-lg leading-none">
        {{ song.name }}
      </span>
      <span class="block text-gray-main">
        {{ artistStore.getNamesOfArtistsFormatted(artistStore.getNamesOfArtists(song.artists)) }}
      </span>
    </div>
    <div class="flex gap-4 justify-between xs:flex-col xs:ml-auto">
      <button
        class="w-[2rem] main-transition"
      >
        <img
          src="~/assets/img/more-options.svg"
          :alt="`Show more options for song '${song.name}'`"
        >
      </button>
      <button
        class="w-[2rem] main-transition"
      >
        <img
          src="~/assets/img/play-circle.svg"
          :alt="`Play song ${song.name}`"
        >
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { SpotifyApiSong } from '~/types/Song'
defineProps<{
  song: SpotifyApiSong
}>()
const artistStore = useArtistStore()
const coverLoaded = ref(false)
onMounted(() => {
  coverLoaded.value = true
})
</script>

<style scoped>

</style>
