<template>
  <div>
    <TheNavigationBack />
    <main class="p-4 text-white-main">
      <div class="flex flex-col gap-4 wrapper">
        <AppEditImage class="sm:max-w-[50%] mr-auto ml-auto">
          <img
            v-if="playlist?.coverImgUrl"
            class="w-full opacity-80 rounded-xl main-transition aspect-square"
            :src="playlist?.coverImgUrl"
            alt=""
          >
        </AppEditImage>
        <form class="flex flex-col gap-4" @submit.prevent>
          <AppInputWithLabel
            :model-value="formData.title"
            autocomplete="off"
            label="Playlist title"
            name="title"
            type="text"
          />
          <AppInputWithLabel
            :model-value="formData.description"
            autocomplete="off"
            label="Playlist description"
            name="Description"
            type="text"
          />
          <div class="flex flex-col gap-4 mt-4 ml-auto items-end sm:flex-row">
            <AppButton
              text="Discard"
              styling="secondary"
              @click="router.back()"
            />
            <AppButton
              text="Edit"
              styling="primary"
            />
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { PlaylistForm } from '~/types/Playlist'
const route = useRoute()
const router = useRouter()
const playlistStore = usePlaylistStore()
const playlistId = route.params.id.toString()
const playlist = computed(() => {
  return playlistStore.getPlaylist(playlistId)
})
const formData = ref<PlaylistForm>({
  image: null,
  title: playlist.value?.title || '',
  description: playlist.value?.description || ''
})
</script>

<style scoped>

</style>
~/stores/types/Playlist