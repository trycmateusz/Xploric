<template>
  <div>
    <main class="p-4 text-white-main">
      <div class="flex flex-col gap-4 wrapper">
        <AppEditImage class="mr-auto ml-auto">
          <PlaylistEditImage
            class="opacity-70"
            :cover-img-url="coverLocalUrl"
            @set-cover-url="(url) => coverLocalUrl = url"
            @set-image-file="(file) => newCover = file"
          />
        </AppEditImage>
        <form class="flex flex-col gap-4" @submit.prevent="updatePlaylist">
          <AppInputWithLabel
            v-model:modelValue="formData.title"
            autocomplete="off"
            label="Playlist title"
            name="title"
            type="text"
          />
          <AppInputWithLabel
            v-model:modelValue="formData.description"
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
definePageMeta({
  middleware: ['auth']
})
const route = useRoute()
const router = useRouter()
const playlistStore = usePlaylistStore()
const playlistId = route.params.id.toString()
await playlistStore.fetchPlaylist(playlistId)
const playlist = computed(() => {
  return playlistStore.getPlaylist(playlistId)
})
const formData = ref<PlaylistForm>({
  title: playlist.value?.title || '',
  description: playlist.value?.description || ''
})
const coverLocalUrl = ref<string | undefined>(playlist.value?.coverImgUrl)
const newCover = ref<File | undefined>(undefined)
const updatePlaylist = async () => {
  if (playlist.value) {
    const updated = await playlistStore.updatePlaylist(playlistId, formData.value, newCover.value)
    if (updated) {
      router.push(`/playlist/${playlistId}`)
    }
  }
}
</script>

<style scoped>

</style>
