export interface PlaylistForm {
  coverImgUrl: string | null
  title: string
  description: string
}

export interface Playlist extends PlaylistForm {
  id: string
  userId: string
  listenCounter: number
  updatedAt: number
  comments: string[] | null
  songs: string[] | null
}
