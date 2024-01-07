<template>
  <div>
    <TheNavigationBack />
    <main class="bg-black-main text-white-main">
      <form class="wrapper flex flex-col gap-4 p-4" @submit.prevent="createPlaylist">
        <PlaylistEditImage
          :cover-img-url="coverLocal"
          @set-cover-url="(imgUrl: string) => coverLocal = imgUrl"
          @set-image-file="(file: File) => cover = file"
        />
        <AppInputWithLabel
          v-model:modelValue="formData.title"
          type="text"
          name="title"
          label="Playlist title"
          autocomplete="off"
        />
        <AppTextareaWithLabel
          v-model:modelValue="formData.description"
          name="description"
          label="Description"
        />
        <div class="flex flex-col gap-4 mt-4 items-end xs:flex-row xs:justify-end">
          <AppButton
            text="Discard"
            styling="secondary"
            @click="router.back()"
          />
          <AppButton
            text="Create"
            styling="primary"
            @click="goBack"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { PlaylistForm } from '~/types/Playlist'
const playlistStore = usePlaylistStore()
const router = useRouter()
const route = useRoute()
const songSaved = route.query.saving?.toString()
const redirect = route.query.redirect?.toString()
const formData = ref<PlaylistForm>({
  title: '',
  description: ''
})
const coverLocal = ref<string | null>(null)
const cover = ref<File | undefined>(undefined)
const goBack = () => {
  if (songSaved) {
    if (redirect) {
      router.push(redirect)
    } else {
      router.push('/')
    }
  }
}
const createPlaylist = async () => {
  const created = await playlistStore.createPlaylist(formData.value, cover.value)
  if (created) {
    if (songSaved) {
      const playlistSongs = created.songs ? [...created.songs, songSaved] : [songSaved]
      await playlistStore.updatePlaylist(created.id, {
        songs: playlistSongs
      })
    }
    // if (redirect) {
    //   router.push(redirect)
    // } else {
    //   router.push('/')
    // }
  }
}
</script>

<style scoped>

</style>
