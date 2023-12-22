<template>
  <div>
    <TheNavigationBack />
    <main class="bg-black-main text-white-main">
      <form class="wrapper flex flex-col gap-4 p-4" @submit.prevent>
        <button
          class="w-1/2 flex justify-center aspect-square ml-auto mr-auto main-transition"
          @click="() => console.log('edit playlist cover')"
        >
          <img v-if="!formData.image" src="~/assets/img/playlist-add-placeholder.svg" alt="">
        </button>
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
const router = useRouter()
const route = useRoute()
const isSongBeingSaved = route.query.saving
const formData = ref<PlaylistForm>({
  image: null,
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
