import type { Artist } from '~/stores/types/Artist'

const example: Artist = {
  id: 'mac-demarco',
  name: 'Mac DeMarco'
}

export const useArtistStore = defineStore('ArtistStore', () => {
  const artists = ref<Artist[]>([
    { ...example }
  ])
  return {
    artists
  }
})
