export interface PlaylistForm {
  title: string
  description: string
}

export interface Playlist extends PlaylistForm {
  id: string
  userId: string
  coverImgUrl?: string
  listenCounter: number
  updatedAt: number
  comments?: string[]
  songs?: string[]
}
