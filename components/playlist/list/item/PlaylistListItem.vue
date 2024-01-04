<template>
  <li
    class="flex flex-col gap-4 p-4 rounded-2xl bg-black-lighter text-white-main xs:flex-row"
    tabindex="-1"
  >
    <div class="aspect-square xs:w-max">
      <img
        v-if="playlist.coverImgUrl"
        v-show="coverLoaded"
        :src="playlist.coverImgUrl"
        :alt="`${playlist.title} image cover`"
        class="w-full rounded-xl aspect-square object-cover xs:w-[7rem] "
      >
      <img
        v-show="!coverLoaded || !playlist.coverImgUrl"
        class="w-full xs:w-[7rem]"
        src="~/assets/img/playlist-placeholder.svg"
        alt=""
      >
    </div>
    <div class="flex flex-col flex-grow">
      <h3 class="text-lg">
        {{ playlist.title }}
      </h3>
      <span class="text-gray-main">
        {{ playlistStore.getPlaylistLengthText(playlist) }}
      </span>
      <AppButton
        v-if="forSaving"
        text="Save"
        styling="primary"
        class="mt-auto ml-auto"
        @click="emit('save')"
      />
      <AppLink
        v-else
        :to="`playlist/${playlist.id}`"
        text="Check"
        styling="primary"
        class="mt-auto ml-auto"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Playlist } from '~/types/Playlist'
const playlistStore = usePlaylistStore()
defineProps<{
  playlist: Playlist
  forSaving: boolean
}>()
const emit = defineEmits<{
  (e: 'save'): void
}>()
const coverLoaded = ref(false)
onMounted(() => {
  coverLoaded.value = true
})
</script>

<style lang="scss" scoped>

</style>
~/stores/types/Playlist
