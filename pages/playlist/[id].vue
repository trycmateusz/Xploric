<template>
  <div>
    <TheNavigationBack />
    <main v-if="playlist" class="flex flex-col wrapper p-4 text-white-main">
      <div class="grid grid-cols-1 gap-4 xs:grid-cols-2">
        <img
          v-if="playlist.coverImgUrl && coverLoaded"
          class="rounded-2xl h-full aspect-square object-cover object-center"
          :src="playlist.coverImgUrl"
          :alt="`${playlist.title}'s cover`"
        >
        <img
          v-else
          class="rounded-2xl w-full border border-black-lighter aspect-square object-cover object-center"
          src="~/assets/img/playlist-placeholder.svg"
          alt="Playlist placeholder image"
        >
        <div class="relative flex flex-col justify-between gap-8">
          <button
            :id="playlistOptionsTogglerId"
            :aria-expanded="playlistOptionsOpen"
            aria-controls="playlist-options"
            class="main-transition absolute top-0 right-0 w-[2rem] sm:w-[2.5rem]"
            @click="playlistOptionsOpen = !playlistOptionsOpen"
          >
            <img
              class="w-full pointer-events-none"
              src="~/assets/img/more-options.svg"
              :alt="`Show options for playlist '${playlist.title}'`"
            >
          </button>
          <AppOptions
            v-if="playlistOptionsOpen"
            id="playlist-options"
            class="top-[1rem] right-[1rem] xs:right-[1.25rem] xs:top-[1.25rem]"
            :options="userStore.auth?.id === playlist.userId ? [...userOptions, ...defaultOptions] : defaultOptions"
            :toggler-id="playlistOptionsTogglerId"
            @close="playlistOptionsOpen = false"
          />
          <div class="mr-[2rem] sm:mr-[2.5rem]">
            <h1 class="text-2xl ">
              {{ playlist.title }}
            </h1>
            <nuxt-link v-if="user" :to="`/user/${user.id}`" class="text-light-blue-lighter main-transition">
              {{ user.username }}
            </nuxt-link>
          </div>
          <div class="flex flex-col text-gray-main">
            <span>
              {{ playlist.listenCounter }} listens
            </span>
            <span>
              {{ playlistStore.getPlaylistLengthText(playlist) }}
            </span>
          </div>
        </div>
      </div>
      <span class="inline-block mt-2 text-sm text-gray-main">
        Last updated at {{ convertToDate(playlist.updatedAt) }}
      </span>
      <span class="block mt-8 mb-8 text-lg">
        {{ playlist.description }}
      </span>
      <SongList
        :songs="songStore.getPlaylistsSongs(playlist.id)"
        :playlist-user-id="playlist.userId"
      />
      <nuxt-link
        class="w-max mt-4 mb-8 mx-auto text-light-blue-lighter text-center"
        to="/"
      >
        add some more!
      </nuxt-link>
      <h2 class="block text-2xl mb-4">
        Other's comments!
      </h2>
      <CommentList
        :comments="commentStore.getPlaylistsComments(playlist.id)"
        :for-responses="false"
      />
      <h2 class="block text-2xl mt-8 mb-4">
        Write a comment yourself!
      </h2>
      <form class="flex flex-col" @submit.prevent>
        <textarea
          id="comment"
          name="comment"
          class="bg-black-lighter text-white-main min-h-[10rem] rounded-xl p-4 resize-none overflow-y-auto main-transition"
        />
        <AppButton
          text="Submit"
          styling="primary"
          class="mt-4 ml-auto"
        />
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { convertToDate } from '~/helpers'
import type { AppOptionLink, AppOptionButton } from '~/types/App'
const playlistStore = usePlaylistStore()
const userStore = useUserStore()
const songStore = useSongStore()
const commentStore = useCommentStore()
const route = useRoute()
const playlistId = route.params.id.toString()
const playlistOptionsTogglerId = 'playlist-options-toggler'
const coverLoaded = ref(false)
const playlistOptionsOpen = ref(false)
const playlist = computed(() => {
  return playlistStore.getPlaylist(playlistId)
})
const user = computed(() => {
  if (playlist.value) {
    return userStore.getUser(playlist.value.userId)
  }
})
// @ts-ignore

const defaultOptions: (AppOptionLink | AppOptionButton)[] = [
  {
    text: 'Share',
    id: Math.random().toString(),
    onClick: () => console.log('share')
  }
]
const userOptions: (AppOptionLink | AppOptionButton)[] = [
  {
    text: 'Remove',
    id: Math.random().toString(),
    destructive: true,
    onClick: () => console.log('remove')
  },
  {
    text: 'Move',
    id: Math.random().toString(),
    onClick: () => console.log('move')
  },
  {
    text: 'Disable Comments',
    id: Math.random().toString(),
    onClick: () => console.log('disable comments')
  }
]
await playlistStore.fetchPlaylist(playlistId)
if (playlist.value) {
  await commentStore.fetchManyComments(playlist.value.comments)
}
// fetching songs later!!!!
onMounted(() => {
  coverLoaded.value = true
})
</script>

<style scoped>

</style>
