interface SpotiyfyApiSongAlbumCover {
  url: string
}

export interface SpotifyApiSongAlbum {
  id: string
  covers: SpotiyfyApiSongAlbumCover[]
  name: string
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
