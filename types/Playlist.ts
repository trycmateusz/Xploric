export interface Playlist {
  id: string
  userId: string
  title: string
  description: string
  coverImgUrl: string | null
  listenCounter: number
  updatedAt: number
  comments: string[]
  songs: string[]
}

export interface PlaylistForm {
  image: string | null
  title: string
  description: string
}
