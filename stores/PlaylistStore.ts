import type { Playlist } from '~/types/Playlist'
import type { User } from '~/types/User'
import { fetchCollection } from '~/services/fetch'

export const usePlaylistStore = defineStore('PlaylistStore', () => {
  const playlists = ref<Playlist[]>([])
  const fetchPlaylists = async () => {
    const fetchedPlaylists = await fetchCollection<Playlist>('playlists')
    if (fetchedPlaylists) {
      playlists.value = [...fetchedPlaylists]
    }
  }
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
    getPlaylistLengthText,
    getUsersPlaylists
  }
})
