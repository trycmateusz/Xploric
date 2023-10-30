import type { Playlist } from '~/types/Playlist'
import { fetchCollection } from '~/services/fetch'

export const usePlaylistStore = defineStore('PlaylistStore', () => {
  const playlists = ref<Playlist[]>([])
  const fetchPlaylists = async () => {
    const fetchedPlaylists = await fetchCollection<Playlist>('playlists')
    if (fetchedPlaylists) {
      playlists.value = [...fetchedPlaylists]
    }
  }
  return {
    playlists,
    fetchPlaylists
  }
})
