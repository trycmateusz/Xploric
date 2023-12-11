import type { SpotifyApiSong } from '~/stores/types/Spotify'
import { fetchRandom } from '~/services/fetchSpotify'

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
  const getPlaylistsSongs = computed(() => {
    return (playlistId: string) => {
      return songs.value.filter(song => song.playlists.includes(playlistId))
    }
  })
  const getSong = computed(() => {
    return (songId: string) => {
      return songs.value.find(song => song.id === songId)
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

  return {
    songs,
    getPlaylistsSongs,
    getSong,
    fetchRandomSong
  }
})
