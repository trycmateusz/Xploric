<template>
  <div>
    <TheNavigationBack />
    <main class="bg-black-main text-white-main">
      <form class="wrapper flex flex-col gap-4 p-4" @submit.prevent="playlistStore.createPlaylist(formData)">
        <PlaylistEditImage :cover-img-url="formData.coverImgUrl" @set-cover-url="(imgUrl: string) => formData.coverImgUrl = imgUrl" />
        <AppInputWithLabel
          type="text"
          name="title"
          label="Playlist title"
          autocomplete="off"
          :model-value="formData.title"
        />
        <AppTextareaWithLabel
          name="description"
          label="Description"
          :model-value="formData.description"
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
const isSongBeingSaved = route.query.saving
const formData = ref<PlaylistForm>({
  coverImgUrl: null,
  title: '',
  description: ''
})
const goBack = () => {
  if (isSongBeingSaved) {
    router.push('/xplore')
  }
}
</script>

<style scoped>

</style>
