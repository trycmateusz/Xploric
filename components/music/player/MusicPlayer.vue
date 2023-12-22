<template>
  <div
    v-if="song"
    ref="musicPlayer"
    class="wrapper p-4 text-white-main overflow-hidden"
  >
    <div class="flex flex-col items-center text-xl text-center min-h-[4.8rem]">
      <span class="text-2xl">
        {{ song.name }}
      </span>
      <span
        v-if="song.album.album_type !== 'single'"
        class="flex gap-2 items-center"
        :class="{ 'opacity-70': song.album.album_type === 'single' }"
      >
        <img src="~/assets/img/album-light.svg" class="h-[1em]" alt="">
        <span>
          {{ song.album.name }}
        </span>
      </span>
      <span class="flex gap-2 items-center text-gray-main">
        <img src="~/assets/img/artist.svg" alt="">
        <span>
          {{ song.artists[0].name }}
        </span>
      </span>
    </div>
    <div class="relative ml-auto mr-auto mt-8 max-w-[400px] aspect-square">
      <img
        ref="cover"
        class="w-full absolute touch-none z-10"
        :style="distanceTransform"
        :src="song.album.images[0].url"
        :alt="`Cover from album ${song.album.name}`"
        @touchstart.passive="(e: TouchEvent) => {
          if(!fromPlaylist){
            startFollowingTouch(e)
          }
        }"
        @touchend.passive="(e: TouchEvent) => {
          if(!fromPlaylist){
            stopFollowingTouch()
          }
        }"
      >
      <img class="absolute top-1/2 left-1/2 max-w-none h-[130%] opacity-40 aspect-square blur-[50px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" :src="song.album.images[0].url" alt="">
    </div>
    <div v-if="song.preview_url" class="mt-8">
      <MusicPlayerAudio
        :key="audioRerenderKey"
        :preview-url="song.preview_url"
        :song-name="song.name"
        @set-audio="(tag) => currentAudioStore.setCurrentAudio(tag)"
        @audio-data-loaded="emit('audio-data-loaded')"
      />
      <MusicPlayerDuration />
      <MusicPlayerProgress class="mb-4" :on-whole-wrapper="false" />
      <MusicPlayerControls
        :from-playlist="fromPlaylist"
        :without-play="false"
      />
    </div>
    <div v-if="!fromPlaylist" class="flex justify-between mt-8">
      <div class="flex-shrink grid items-center grid-cols-2 gap-2">
        <button @click="songStore.fetchRandomSong(true)">
          <img class="h-full" src="~/assets/img/x.svg" alt="Skip current song">
        </button>
        <button class="relative aspect-square" @click="isFavourited = !isFavourited">
          <transition name="opacity">
            <img v-if="isFavourited" class="absolute top-0 h-full" src="~/assets/img/heart.svg" alt="Unfavourite current song">
            <img v-else class="absolute top-0 h-full" src="~/assets/img/heart-empty.svg" alt="Unfavourite current song">
          </transition>
        </button>
      </div>
      <AppButton
        text="Save"
        styling="primary"
        @click="emit('save-song')"
      />
    </div>
    <teleport to="body">
      <transition name="opacity">
        <div
          v-if="aboutToSkipOrSave"
          class="fixed top-0 flex items-center justify-center w-full h-full uppercase text-5xl bg-black-shadow z-50"
        >
          <div v-if="aboutToSkipOrSave === 'save'" class="text-light-blue-lighter font-bold">
            save
          </div>
          <div v-else class="text-white-main">
            pass
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import type { SpotifyApiSong } from '~/types/Spotify'
const songStore = useSongStore()
const currentAudioStore = useCurrentAudioStore()
const props = defineProps<{
  song: SpotifyApiSong
  fromPlaylist: boolean
}>()
const emit = defineEmits<{
  (e: 'save-song'): void
  (e: 'set-audio', tag: HTMLAudioElement): void
  (e: 'audio-data-loaded'): void
}>()
const rotateMultiplier = 15
const audioRerenderKey = ref(0)
const isFavourited = ref(false)
const isCoverHeld = ref(false)
const musicPlayer = ref<HTMLDivElement | undefined>(undefined)
const cover = ref<HTMLImageElement | undefined>(undefined)
const xPointerInitialPosition = ref<number | null>(null)
const xPointerPosition = ref<number | null>(null)
const xDistance = computed<number | undefined>(() => {
  if (xPointerInitialPosition.value && xPointerPosition.value) {
    return xPointerInitialPosition.value - xPointerPosition.value
  }
})
const coverImageRotate = computed(() => {
  if (xDistance.value) {
    return (xDistance.value + document.body.clientWidth) * rotateMultiplier / document.body.clientWidth - rotateMultiplier
  }
})
const aboutToSkipOrSave = computed<'skip' | 'save' | undefined>(() => {
  if (xPointerPosition.value && musicPlayer.value) {
    if (xPointerPosition.value <= document.body.clientWidth * 0.25) {
      return 'skip'
    } else if (xPointerPosition.value >= document.body.clientWidth * 0.75) {
      return 'save'
    }
  }
})
const distanceTransform = computed(() => {
  if (xDistance.value && coverImageRotate.value) {
    return `transform: translate(${-xDistance.value}px, 0) rotate(${-coverImageRotate.value}deg);`
  } else {
    return ''
  }
})
const followTouch = (e: PointerEvent) => {
  if (isCoverHeld.value) {
    xPointerPosition.value = e.clientX
  }
}
const debouncedFollowTouch = debounce(followTouch, 4)
const startFollowingTouch = (e: TouchEvent) => {
  isCoverHeld.value = true
  xPointerInitialPosition.value = e.touches[0].pageX
  document.body.addEventListener('pointermove', debouncedFollowTouch)
}
const stopFollowingTouch = () => {
  isCoverHeld.value = false
  document.body.removeEventListener('pointermove', debouncedFollowTouch)
  if (aboutToSkipOrSave.value === 'save') {
    emit('save-song')
  }
  if (aboutToSkipOrSave.value === 'skip') {
    songStore.fetchRandomSong(true)
  }
  xPointerInitialPosition.value = null
  xPointerPosition.value = null
}
watch(props, () => {
  audioRerenderKey.value++
})
</script>

<style scoped>
audio {
  display: none;
}
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity .3s;
}
.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
~/stores/types/Spotify
