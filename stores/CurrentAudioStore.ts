import type { SpotifyApiSong } from '~/stores/types/Spotify'
import { getDurationMinutesAndSecondsInProperFormatFromSeconds } from '~/helpers'

const example: SpotifyApiSong = {
  album: {
    id: 'another-one',
    name: 'Another One',
    covers: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/xploric-326b5.appspot.com/o/song_cover.png?alt=media&token=113f71f7-2654-42b5-ad0d-9f6c3c03a9a8'
      }
    ]
  },
  artists: [
    {
      id: 'mac-demarco',
      name: 'Mac DeMarco'
    }
  ],
  playlists: ['playlist1'],
  id: 'song1',
  name: 'The Way You\'d Love Her',
  genre: 'indie',
  duration_ms: 30000,
  preview_url: 'https://firebasestorage.googleapis.com/v0/b/xploric-326b5.appspot.com/o/song_audio.mp3?alt=media&token=158e2b9a-8697-4fb8-8b1c-f8efa56baf81'
}

export const useCurrentAudioStore = defineStore('CurrentAudioStore', () => {
  const maxProgressValue = 200
  const current = ref<SpotifyApiSong | null>(null)
  const currentAudio = ref<HTMLAudioElement | undefined>(undefined)
  const currentAudioLoaded = ref(false)
  const currentAudioTime = ref(0)
  const currentPlaying = ref(false)
  const getCurrentListenedDurationText = computed(() => {
    if (currentAudio.value) {
      return getDurationMinutesAndSecondsInProperFormatFromSeconds(currentAudioTime.value)
    } else {
      return '0:00'
    }
  })
  const getCurrentFullDurationText = computed(() => {
    if (current.value) {
      return getDurationMinutesAndSecondsInProperFormatFromSeconds(current.value.duration_ms / 1000)
    }
  })
  const getCurrentProgress = computed(() => {
    if (current.value) {
      return Math.floor(currentAudioTime.value / (current.value.duration_ms / 1000) * maxProgressValue)
    }
  })
  const setExample = () => {
    current.value = { ...example }
  }
  const setCurrent = (song: SpotifyApiSong | null) => {
    if (song) {
      current.value = { ...song }
    } else {
      current.value = null
    }
  }
  const setCurrentTime = (time: number) => {
    currentAudioTime.value = time
  }
  const setCurrentAudio = (tag: HTMLAudioElement) => {
    currentAudio.value = tag
  }
  const setCurrentAudioTime = (time: number) => {
    if (currentAudio.value) {
      currentAudio.value.currentTime = time
    }
  }
  const playCurrent = () => {
    if (currentAudio.value) {
      currentAudio.value.play()
      currentPlaying.value = true
    }
  }
  const pauseCurrent = () => {
    if (currentAudio.value) {
      currentAudio.value.pause()
      currentPlaying.value = false
    }
  }
  const endCurrent = () => {
    if (currentAudio.value) {
      currentAudio.value.currentTime = 0
      currentAudioTime.value = 0
      currentAudio.value.pause()
      currentPlaying.value = false
    }
  }
  const goForwardFiveSeconds = () => {
    if (current.value && currentAudio.value) {
      if (currentAudio.value.currentTime + 5 > current.value.duration_ms / 1000) {
        currentAudio.value.currentTime = Math.floor(current.value.duration_ms / 1000)
      } else {
        currentAudio.value.currentTime += 5
      }
    }
  }
  const goBackFiveSeconds = () => {
    if (currentAudio.value) {
      if (currentAudio.value.currentTime - 5 < 0) {
        currentAudio.value.currentTime = 0
      } else {
        currentAudio.value.currentTime -= 5
      }
    }
  }
  const playPreviousSongOrRewindToBeginning = (isFromPlaylist: boolean) => {
    if (currentAudio.value) {
      if (!isFromPlaylist || (isFromPlaylist && currentAudio.value.currentTime < 5)) {
        currentAudio.value.currentTime = 0
      } else {
        console.log('play previous')
      }
    }
  }
  const playNextSong = () => {
    console.log('play next')
  }
  watch(current, () => {
    currentPlaying.value = false
    currentAudio.value = undefined
    currentAudioTime.value = 0
    currentAudioLoaded.value = false
  })
  return {
    maxProgressValue,
    current,
    currentPlaying,
    currentAudio,
    currentAudioTime,
    currentAudioLoaded,
    getCurrentProgress,
    getCurrentFullDurationText,
    getCurrentListenedDurationText,
    setExample,
    setCurrent,
    setCurrentTime,
    setCurrentAudio,
    setCurrentAudioTime,
    pauseCurrent,
    playCurrent,
    endCurrent,
    goForwardFiveSeconds,
    goBackFiveSeconds,
    playPreviousSongOrRewindToBeginning,
    playNextSong
  }
})
