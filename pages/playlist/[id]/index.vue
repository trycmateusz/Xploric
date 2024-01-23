<template>
  <div>
    <main v-if="playlist" class="flex flex-col wrapper p-4 text-white-main">
      <div class="grid grid-cols-1 gap-4 xs:grid-cols-2">
        <div class="bg-black-lighter rounded-2xl aspect-square overflow-hidden">
          <img
            v-if="playlist.coverImgUrl && coverLoaded"
            class="h-full object-cover object-center"
            :src="playlist.coverImgUrl"
            :alt="`${playlist.title}'s cover`"
          >
          <img
            v-else
            class="w-full p-4 border-black-lighter object-cover object-center"
            src="~/assets/img/playlist-placeholder.svg"
            alt="Playlist placeholder image"
          >
        </div>
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
              {{ title }}
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
        {{ description }}
      </span>
      <SongList
        :songs="songStore.getPlaylistsSongs(playlist)"
        :playlist-user-id="playlist.userId"
        :playlist-id="playlist.id"
        @remove-song="removeSongFromPlaylist"
        @move-song="(song: SpotifyApiSong) => movedSong = song"
      />
      <nuxt-link
        class="w-max mt-4 mb-8 mx-auto text-light-blue-lighter text-center main-transition"
        to="/xplore"
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
        Write a comment!
      </h2>
      <form class="flex flex-col" @submit.prevent="createComment">
        <textarea
          id="comment"
          v-model="comment"
          name="comment"
          class="bg-black-lighter text-white-main min-h-[10rem] rounded-xl p-4 resize-none overflow-y-auto main-transition"
        />
        <AppButton
          text="Comment"
          styling="primary"
          class="mt-4 ml-auto"
        />
      </form>
    </main>
    <teleport to="body">
      <div
        v-if="movedSong && userStore.auth && otherPlaylistsFetched"
        class="fixed top-[var(--nav-height)] w-full min-h-[Calc(100svh_-_var(--nav-height))] bg-black-main z-40 overflow-y-auto"
      >
        <div class="wrapper flex flex-col p-4 gap-4">
          <PlaylistList
            :for-moving="true"
            :playlists="playlistStore.getUsersPlaylists(userStore.auth).filter(playlist => playlist.id !== playlistId)"
            @move-song-to="moveSongTo"
          />
          <AppButton
            text="Cancel"
            styling="secondary"
            class="ml-auto"
            @click="movedSong = undefined"
          />
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { convertToDate } from '~/helpers/time'
import { copyLink } from '~/helpers/clipboard'
import type { Playlist } from '~/types/Playlist'
import type { AppOptionLink, AppOptionButton } from '~/types/App'
import type { SpotifyApiSong } from '~/types/Spotify'
definePageMeta({
  middleware: ['spotify-auth', 'auth']
})
const playlistStore = usePlaylistStore()
const userStore = useUserStore()
const songStore = useSongStore()
const commentStore = useCommentStore()
const route = useRoute()
const router = useRouter()
const { addNotification } = usePopupNotifications()
const { makeBodyFixed, removeFixedFromBody } = useFixedBody()
const playlistId = route.params.id.toString()
const playlistOptionsTogglerId = 'playlist-options-toggler'
const coverLoaded = ref(false)
const otherPlaylistsFetched = ref(false)
const playlistOptionsOpen = ref(false)
const movedSong = ref<SpotifyApiSong | undefined>(undefined)
const comment = ref('')
const playlist = computed(() => {
  return playlistStore.getPlaylist(playlistId)
})
const description = computed(() => {
  if (playlist.value && playlist.value.description.length > 0) {
    return playlist.value.description
  } else {
    return 'No description provided.'
  }
})
const title = computed(() => {
  if (playlist.value && playlist.value.title.length > 0) {
    return playlist.value.title
  } else {
    return 'Untitled'
  }
})
const user = computed(() => {
  if (playlist.value) {
    return userStore.getUser(playlist.value.userId)
  }
})
const defaultOptions: (AppOptionLink | AppOptionButton)[] = [
  {
    text: 'Copy link',
    id: Math.random().toString(),
    onClick: () => copyLink()
  }
]
const userOptions: (AppOptionLink | AppOptionButton)[] = [
  {
    text: 'Remove',
    id: Math.random().toString(),
    destructive: true,
    onClick: () => deletePlaylist()
  },
  {
    text: 'Disable Comments',
    id: Math.random().toString(),
    onClick: () => console.log('disable comments')
  },
  {
    text: 'Edit',
    id: Math.random().toString(),
    to: `/playlist/${playlistId}/edit`
  }
]
await playlistStore.fetchPlaylist(playlistId)
if (playlist.value) {
  if (playlist.value.comments) {
    await commentStore.fetchManyComments(playlist.value.comments)
  }
  if (playlist.value.songs) {
    await songStore.fetchManySongs(playlist.value.songs)
  }
}
const deletePlaylist = async () => {
  const deleted = await playlistStore.deletePlaylist(playlistId)
  if (deleted === null) {
    router.push('/my-profile')
  }
}
const createComment = async () => {
  await commentStore.createComment(comment.value, playlistId, undefined)
  comment.value = ''
}
const removeSongFromPlaylist = async (song: SpotifyApiSong) => {
  if (playlist.value) {
    const playlistSongs = playlist.value?.songs ? [...playlist.value.songs] : []
    const updated = await playlistStore.updatePlaylist(playlist.value.id, {
      songs: playlistSongs.filter(id => id !== song.id)
    })
    if (updated) {
      addNotification('Song removed')
    }
  }
}
const moveSongTo = async (otherPlaylist: Playlist) => {
  if (playlist.value && movedSong.value) {
    const movedToUpdated = await playlistStore.updatePlaylist(otherPlaylist.id, {
      songs: otherPlaylist.songs ? [...otherPlaylist.songs, movedSong.value.id] : [movedSong.value.id]
    })
    if (movedToUpdated) {
      const updated = await playlistStore.updatePlaylist(playlist.value.id, {
        songs: playlist.value.songs ? [...playlist.value.songs].filter(id => id !== movedSong.value?.id) : []
      })
      if (updated) {
        addNotification('Song moved')
      }
    }
    movedSong.value = undefined
  }
}
onMounted(() => {
  coverLoaded.value = true
})
onUnmounted(() => {
  if (userStore.auth) {
    if
    ((!userStore.auth.downvotes && commentStore.commentRatingsToUpdate.downvotes.length > 0) ||
    (!userStore.auth.upvotes && commentStore.commentRatingsToUpdate.upvotes.length > 0) ||
    (userStore.auth.upvotes && userStore.auth.upvotes.length !== commentStore.commentRatingsToUpdate.upvotes.length) ||
    (userStore.auth.downvotes && userStore.auth.downvotes.length !== commentStore.commentRatingsToUpdate.downvotes.length)) {
      userStore.updateUser(userStore.auth.id, {
        downvotes: commentStore.commentRatingsToUpdate.downvotes,
        upvotes: commentStore.commentRatingsToUpdate.upvotes
      })
    }
  }
})
watch(movedSong, async () => {
  if (movedSong.value) {
    makeBodyFixed()
  } else {
    removeFixedFromBody()
  }
  if (userStore.auth?.playlists && movedSong.value && !otherPlaylistsFetched.value) {
    const fetched = await playlistStore.fetchManyPlaylists(userStore.auth.playlists)
    if (fetched) {
      otherPlaylistsFetched.value = true
    }
  }
})
</script>

<style scoped>

</style>
