export interface SpotifyApiSong {
  id: string
  name: string
  artists: string[]
  playlists: string[]
  album: string
  genre: string
  duration_ms: number
  cover_img_url: string
  preview_url: string
}
