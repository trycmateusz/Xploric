<template>
  <div class="sticky bottom-0 bg-black-main border-t border-black-lighter text-white-main z-40">
    <div class="wrapper md:pb-4">
      <div class="flex gap-4 p-4">
        <div class="relative max-w-[25%] w-24 aspect-square">
          <img class="absolute top-0 left-0 opacity-50" :src="current.album.images[0].url" alt="">
          <MusicPlayerControlsPlayPause class="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square main-transition" />
        </div>
        <div
          class="flex flex-grow flex-col justify-between"
        >
          <nuxt-link :to="`/player/${current.id}`" class="flex flex-col main-transition">
            <span class="text-lg leading-none">
              {{ current.name }}
            </span>
            <span class="text-gray-main">
              {{ current.artists[0].name }}
            </span>
          </nuxt-link>
          <div class="flex">
            <MusicPlayerControls
              :from-playlist="true"
              :without-play="true"
            />
          </div>
        </div>
      </div>
      <MusicPlayerProgress :on-whole-wrapper="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SpotifyApiSong } from '~/types/Spotify'
defineProps<{
  current: SpotifyApiSong
}>()
</script>

<style scoped>

</style>
