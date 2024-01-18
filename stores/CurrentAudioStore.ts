import cloneDeep from 'lodash/cloneDeep'
import type { SpotifyApiSong } from '~/types/Spotify'
import { getDurationMinutesAndSecondsInProperFormatFromSeconds } from '~/helpers/time'

export const useCurrentAudioStore = defineStore('CurrentAudioStore', () => {
  const songStore = useSongStore()
  const playlistStore = usePlaylistStore()
  const ignoredAtFirst = ref(false)
  const maxProgressValue = 500
  const maxDurationInMs = 30000
  const volume = ref(0.1)
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
  const setCurrent = (song: SpotifyApiSong | null) => {
    if (song) {
      const maxDuration = song.duration_ms > maxDurationInMs ? maxDurationInMs : song.duration_ms
      if (!current.value || current.value?.id !== song.id) {
        current.value = cloneDeep({
          ...song,
          duration_ms: maxDuration
        })
        songStore.pushToLastTenLatest(song.id)
      }
    } else {
      current.value = null
    }
  }
  const setCurrentTime = (time: number) => {
    currentAudioTime.value = time
  }
  const setCurrentAudio = (tag: HTMLAudioElement, playNextAfterEnd: boolean) => {
    if (!currentAudio.value || currentAudio.value.id !== tag.id) {
      currentAudio.value = tag.cloneNode(true) as HTMLAudioElement
      currentAudio.value.volume = volume.value
      currentAudio.value.addEventListener('timeupdate', () => {
        if (currentAudio.value) {
          setCurrentTime(currentAudio.value.currentTime)
        }
      })
      if (playNextAfterEnd) {
        currentAudio.value.addEventListener('ended', () => {
          endCurrent()
          playAnotherSongFromPlaylist('next')
        })
      } else {
        currentAudio.value.addEventListener('ended', endCurrent)
      }
    }
  }
  const createAudioTag = (id: string, src: string, songName: string): HTMLAudioElement => {
    const tag = document.createElement('audio')
    tag.setAttribute('id', id)
    tag.setAttribute('src', src)
    tag.setAttribute('controls', '')
    tag.setAttribute('preload', 'metadata')
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', src)
    downloadAnchor.textContent = `Download ${songName}`
    tag.append(downloadAnchor)
    return tag
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
  const playAnotherSongFromPlaylist = async (order: 'next' | 'previous') => {
    if (current.value) {
      const playlist = playlistStore.playlists.find(playlist => playlist.songs?.includes(current.value!.id))
      if (playlist?.songs) {
        const index = playlist.songs.findIndex(id => id === current.value!.id)
        let songIndex: number
        if (order === 'next') {
          if (index === playlist.songs.length - 1) {
            songIndex = 0
          } else {
            songIndex = index + 1
          }
        } else if (index === 0) {
          songIndex = playlist.songs.length - 1
        } else {
          songIndex = index - 1
        }
        const song = await songStore.fetchOneSong(playlist.songs[songIndex])
        if (song) {
          const tag = createAudioTag(song.id, song.preview_url!, song.name)
          setCurrent(song)
          await nextTick()
          setCurrentAudio(tag, true)
        }
      }
    }
  }
  watch(current, () => {
    endCurrent()
    currentPlaying.value = false
    currentAudio.value = undefined
    currentAudioTime.value = 0
    currentAudioLoaded.value = false
  }, {
    deep: true
  })
  watch(currentAudio, () => {
    if (ignoredAtFirst.value) {
      playCurrent()
    } else {
      ignoredAtFirst.value = true
    }
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
    setCurrent,
    setCurrentTime,
    setCurrentAudio,
    setCurrentAudioTime,
    createAudioTag,
    pauseCurrent,
    playCurrent,
    endCurrent,
    playAnotherSongFromPlaylist,
    goForwardFiveSeconds,
    goBackFiveSeconds
  }
})
