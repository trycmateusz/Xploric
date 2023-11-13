<template>
  <div>
    <TheNavigationBack />
    <main class="bg-black-main text-white-main">
      <form class="wrapper flex flex-col gap-4 p-4" @submit.prevent>
        <button
          class="w-1/2 flex justify-center aspect-square ml-auto mr-auto main-transition"
          @click="() => console.log('edit playlist cover')"
        >
          <img v-if="!image" src="~/assets/img/playlist-add-placeholder.svg" alt="">
        </button>
        <AppInputWithLabel
          type="text"
          name="title"
          label="Playlist title"
          autocomplete="off"
          :model-value="title"
        />
        <AppTextareaWithLabel
          name="description"
          label="Description"
          :model-value="description"
        />
        <div class="flex flex-col gap-4 mt-4 items-end xs:flex-row xs:justify-end">
          <AppButton text="Discard" styling="secondary" @click="router.back()" />
          <AppButton text="Create" styling="primary" />
        </div>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const image = ref<string | null>(null)
const title = ref('')
const description = ref('')
</script>

<style scoped>

</style>
