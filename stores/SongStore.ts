import cloneDeep from 'lodash/cloneDeep'
import type { SpotifyApiSong } from '~/types/Spotify'
import type { Playlist } from '~/types/Playlist'
import { fetchRandom, fetchMany, fetchOne } from '~/services/fetchSpotify'
import { getRandomIndex } from '~/helpers'

export const useSongStore = defineStore('SongStore', () => {
  const currentAudioStore = useCurrentAudioStore()
  const userStore = useUserStore()
  const songs = ref<SpotifyApiSong[]>([])
  const lastTenListenedTo = ref<string[]>([])
  const getPlaylistsSongs = computed(() => {
    return (playlist: Playlist) => {
      return songs.value.filter(song => playlist.songs?.includes(song.id))
    }
  })
  const getSong = computed(() => {
    return (songId: string) => {
      return songs.value.find(song => song.id === songId)
    }
  })
  const getTenLatest = computed(() => {
    return songs.value.filter(song => lastTenListenedTo.value.includes(song.id))
  })
  const getUsersFavourites = computed(() => {
    if (userStore.auth && userStore.auth.favourites) {
      return songs.value.filter(song => userStore.auth?.favourites?.includes(song.id))
    }
  })
  const setOneIfNotSetAlready = (fetchedSong: SpotifyApiSong, setToCurrent: boolean) => {
    const isSet = songs.value.find(song => song.id === fetchedSong.id)
    if (!isSet) {
      songs.value.push(cloneDeep(fetchedSong))
      if (setToCurrent) {
        currentAudioStore.setCurrent(fetchedSong)
      }
    }
  }
  const fetchRandomSong = async (setToCurrent: boolean) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz123456789'
    const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length))
    const fetchedSongs = await fetchRandom<SpotifyApiSong>('track', 'tracks', randomCharacter)
    if (fetchedSongs) {
      let randomIndex = getRandomIndex(fetchedSongs)
      let randomSong = fetchedSongs[randomIndex]
      let valid = false
      while (!valid) {
        if (randomSong.preview_url) {
          valid = true
        } else {
          randomIndex = getRandomIndex(fetchedSongs)
          randomSong = fetchedSongs[randomIndex]
        }
      }
      setOneIfNotSetAlready(randomSong, setToCurrent)
    }
  }
  const fetchOneSong = async (songId: string): Promise<SpotifyApiSong | undefined> => {
    const fetchedSong = await fetchOne<SpotifyApiSong>('tracks', songId)
    if (fetchedSong) {
      setOneIfNotSetAlready(fetchedSong, true)
      return fetchedSong
    }
  }
  const fetchManySongs = async (songIds: string[]) => {
    if (songIds.length > 0) {
      const fetchedSongs = await fetchMany<SpotifyApiSong>('tracks', songIds)
      if (fetchedSongs) {
        fetchedSongs.filter(song => song).forEach((fetchedSong) => {
          setOneIfNotSetAlready(fetchedSong, false)
        })
      }
    }
  }
  const pushToLastTenLatest = (songId: string) => {
    const isSetIndex = lastTenListenedTo.value.findIndex(id => id === songId)
    if (lastTenListenedTo.value.length === 10) {
      if (isSetIndex !== -1) {
        lastTenListenedTo.value.splice(isSetIndex, 1)
      } else {
        lastTenListenedTo.value.shift()
      }
    }
    lastTenListenedTo.value.push(songId)
  }
  return {
    songs,
    lastTenListenedTo,
    getPlaylistsSongs,
    getSong,
    getTenLatest,
    getUsersFavourites,
    pushToLastTenLatest,
    fetchRandomSong,
    fetchOneSong,
    fetchManySongs
  }
})
