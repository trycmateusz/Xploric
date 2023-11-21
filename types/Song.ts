export interface DeezerApiSongAlbum {
  id: string
  cover: string
}

export interface DeezerApiSongArtist {
  id: string
  name: string
}

export interface DeezerApiSong {
  id: string
  title: string
  artist: DeezerApiSongArtist
  playlists: string[]
  album: DeezerApiSongAlbum
  genre: string
  duration_ms: number
  preview: string
}
