import type { Artist } from '~/types/Artist'

const example: Artist = {
  id: 'mac-demarco',
  name: 'Mac DeMarco'
}

export const useArtistStore = defineStore('ArtistStore', () => {
  const artists = ref<Artist[]>([
    { ...example }
  ])
  const getNamesOfArtists = computed(() => {
    return (artistIds: string[]) => {
      return artists.value.filter(artist => artistIds.includes(artist.id)).map(artist => artist.name)
    }
  })
  const getNamesOfArtistsFormatted = computed(() => {
    return (names: string[]) => {
      return names.join(' | ')
    }
  })
  return {
    artists,
    getNamesOfArtists,
    getNamesOfArtistsFormatted
  }
})
