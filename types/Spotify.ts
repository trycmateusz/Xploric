interface SpotiyfyApiSongAlbumCover {
  url: string
}

export interface SpotifyApiSongAlbum {
  id: string
  images: SpotiyfyApiSongAlbumCover[]
  name: string
  album_type: 'single' | string
}

export interface SpotifyApiSongArtist {
  id: string
  name: string
}

export interface SpotifyApiSong {
  id: string
  name: string
  artists: SpotifyApiSongArtist[]
  playlists: string[]
  album: SpotifyApiSongAlbum
  genre: string
  duration_ms: number
  preview_url: string | null
}

export interface SpotifyApiAccessToken {
  access_token: string
  expires_in: string
}

const PossibleSpotifySearchResponseKeys = ['tracks', 'artists', 'albums', 'playlists', 'shows', 'episodes', 'audiobooks'] as const

export type SpotifySearchResponseKey = typeof PossibleSpotifySearchResponseKeys[number]
