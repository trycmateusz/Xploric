import type { SpotifyApiSong } from '~/types/Spotify'
import { fetchRandom } from '~/services/fetchSpotify'
import { getDurationMinutesAndSecondsInProperFormat } from '~/helpers'

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

export const useSongStore = defineStore('SongStore', () => {
  const songs = ref<SpotifyApiSong[]>([
    { ...example }
  ])
  const current = ref<SpotifyApiSong>({
    ...example
  })
  const currentPlaying = ref(false)
  const currentPlayingIntervalId = ref<NodeJS.Timeout | null>(null)
  const currentListenedDuration = ref(0)
  const getCurrentListenedDurationText = computed(() => {
    if (current.value) {
      return getDurationMinutesAndSecondsInProperFormat(currentListenedDuration.value)
    }
  })
  const getCurrentFullDurationText = computed(() => {
    if (current.value) {
      return getDurationMinutesAndSecondsInProperFormat(current.value.duration_ms)
    }
  })
  const getPlaylistsSongs = computed(() => {
    return (playlistId: string) => {
      return songs.value.filter(song => song.playlists.includes(playlistId))
    }
  })
  const fetchRandomSong = async () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz123456789+*()'
    const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length))
    const fetchedSong = await fetchRandom<SpotifyApiSong>('track', randomCharacter)
    if (fetchedSong) {
      const isSet = songs.value.find(song => song.id === fetchedSong.id)
      if (!isSet) {
        console.log('random song fetched')
      }
    }
  }
  const pauseOrPlayCurrent = () => {
    currentPlaying.value = !currentPlaying.value
  }
  const playCurrent = () => {
    currentPlayingIntervalId.value = setInterval(() => {
      currentListenedDuration.value += 1000
    }, 1000)
  }
  const pauseCurrent = () => {
    if (currentPlayingIntervalId.value) {
      clearInterval(currentPlayingIntervalId.value)
      currentPlayingIntervalId.value = null
    }
  }
  const goForwardFiveSeconds = () => {
    if (current.value) {
      if (currentListenedDuration.value + 5000 > current.value.duration_ms) {
        currentListenedDuration.value = current.value.duration_ms
      } else {
        currentListenedDuration.value += 5000
      }
    }
  }
  const goBackFiveSeconds = () => {
    if (currentListenedDuration.value - 5000 < 0) {
      currentListenedDuration.value = 0
    } else {
      currentListenedDuration.value -= 5000
    }
  }
  const playPreviousSongOrRewindToBeginning = (isFromPlaylist: boolean) => {
    if (!isFromPlaylist || (isFromPlaylist && currentListenedDuration.value < 5000)) {
      currentListenedDuration.value = 0
    } else {
      console.log('play previous')
    }
  }
  const playNextSong = () => {
    console.log('play next')
  }
  watch(currentListenedDuration, () => {
    if (current.value) {
      if (currentListenedDuration.value >= current.value.duration_ms) {
        currentPlaying.value = false
        currentListenedDuration.value = 0
        pauseCurrent()
      }
    }
  })
  watch(currentPlaying, () => {
    if (currentPlaying.value) {
      playCurrent()
    } else {
      pauseCurrent()
    }
  })
  return {
    songs,
    current,
    currentPlaying,
    currentListenedDuration,
    getCurrentFullDurationText,
    getCurrentListenedDurationText,
    getPlaylistsSongs,
    fetchRandomSong,
    pauseOrPlayCurrent,
    goForwardFiveSeconds,
    goBackFiveSeconds,
    playPreviousSongOrRewindToBeginning,
    playNextSong
  }
})
