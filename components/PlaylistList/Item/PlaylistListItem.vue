<template>
  <div class="flex p-4 rounded-2xl bg-black-lighter">
    <div>
      <img
        :src="playlist.coverImgUrl"
        class="rounded-xl aspect-square object-cover"
        :alt="`${playlist.title} image cover`"
      >
    </div>

    <div>
      123
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Playlist } from '~/types/Playlist'
defineProps<{
  playlist: Playlist
}>()
</script>

<style lang="scss" scoped>

</style>
