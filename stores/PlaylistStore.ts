import cloneDeep from 'lodash/cloneDeep'
import type { Playlist, PlaylistForm } from '~/types/Playlist'
import type { User } from '~/types/User'
import { fetchCollection, fetchOne, fetchMany } from '~/services/fetch'
import { updateResource, createResource } from '~/services/save'

export const usePlaylistStore = defineStore('PlaylistStore', () => {
  const playlists = ref<Playlist[]>([])
  const userStore = useUserStore()
  const setOne = (fetchedPlaylist: Playlist) => {
    const isSet = playlists.value.find(playlist => playlist.id === fetchedPlaylist.id)
    if (!isSet) {
      playlists.value.push(cloneDeep(fetchedPlaylist))
    }
  }
  const fetchPlaylists = async () => {
    const fetchedPlaylists = await fetchCollection<Playlist>('playlists')
    if (fetchedPlaylists) {
      fetchedPlaylists.forEach(fetchedPlaylist => setOne(fetchedPlaylist))
    }
  }
  const fetchPlaylist = async (id: string) => {
    const fetchedPlaylist = await fetchOne<Playlist>('playlists', id)
    if (fetchedPlaylist) {
      setOne(fetchedPlaylist)
    }
  }
  const fetchManyPlaylists = async (ids: string[]) => {
    const fetchedPlaylists = await fetchMany<Playlist>('playlists', ids)
    if (fetchedPlaylists) {
      fetchedPlaylists.forEach(fetchedPlaylist => setOne(fetchedPlaylist))
    }
  }
  const updatePlaylist = async (id: string, data: Partial<Playlist>): Promise<Playlist | undefined> => {
    const updatedData = await updateResource<Playlist>('playlists', id, data)
    if (updatedData) {
      const playlistIndex = playlists.value.findIndex(playlist => playlist.id === id)
      if (playlistIndex !== -1) {
        const playlist = playlists.value[playlistIndex]
        const updatedPlaylist = {
          ...playlist,
          ...updatedData
        }
        playlists.value.splice(playlistIndex, 1, updatedPlaylist)
        return updatedPlaylist
      }
    }
  }
  const createPlaylist = async (data: PlaylistForm): Promise<Playlist | undefined> => {
    if (userStore.auth) {
      const id = crypto.randomUUID()
      const playlist: Playlist = {
        ...data,
        id,
        songs: [],
        comments: [],
        userId: userStore.auth.id,
        listenCounter: 0,
        updatedAt: new Date().getTime()
      }
      const created = await createResource<Playlist>('playlists', playlist, id)
      if (created) {
        setOne(created)
        const userPlaylists = userStore.auth.playlists ? [...userStore.auth.playlists, id] : [id]
        await userStore.updateUser(userStore.auth.id, {
          playlists: userPlaylists
        })
        return created
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
      if (playlist.songs) {
        if (playlist.songs.length === 1) {
          return '1 song'
        } else {
          return `${playlist.songs.length} songs`
        }
      } else {
        return 'no songs'
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
    fetchManyPlaylists,
    updatePlaylist,
    createPlaylist,
    getPlaylist,
    getPlaylistLengthText,
    getUsersPlaylists
  }
})
