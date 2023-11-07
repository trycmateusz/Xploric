import type { Playlist } from '~/types/Playlist'
import type { User } from '~/types/User'
import { fetchCollection, fetchOne } from '~/services/fetch'

export const usePlaylistStore = defineStore('PlaylistStore', () => {
  const playlists = ref<Playlist[]>([])
  const fetchPlaylists = async () => {
    const fetchedPlaylists = await fetchCollection<Playlist>('playlists')
    if (fetchedPlaylists) {
      fetchedPlaylists.forEach((fetchedPlaylist) => {
        const isSet = playlists.value.find(playlist => playlist.id === fetchedPlaylist.id)
        if (!isSet) {
          playlists.value.push({ ...fetchedPlaylist })
        }
      })
    }
  }
  const fetchPlaylist = async (id: string) => {
    const fetchedPlaylist = await fetchOne<Playlist>('playlists', id)
    if (fetchedPlaylist) {
      const isSet = playlists.value.find(playlist => playlist.id === fetchedPlaylist.id)
      if (!isSet) {
        playlists.value.push({ ...fetchedPlaylist })
      }
    }
  }
  const getPlaylist = computed(() => {
    return (id: string) => {
      return playlists.value.find(playlist => playlist.id === id)
    }
  })
  const getPlaylistLengthText = computed(() => {
    return (playlist: Playlist) => {
      if (playlist.songs.length === 0) {
        return 'no songs'
      } else if (playlist.songs.length === 1) {
        return '1 song'
      } else {
        return `${playlist.songs.length} songs`
      }
    }
  })
  const getUsersPlaylists = computed(() => {
    return (user: User) => {
      return playlists.value.filter(playlist => playlist.userId === user.id)
    }
  })
  return {
    playlists,
    fetchPlaylists,
    fetchPlaylist,
    getPlaylist,
    getPlaylistLengthText,
    getUsersPlaylists
  }
})
