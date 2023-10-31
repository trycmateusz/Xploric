export interface Playlist {
  id: string
  userId: string
  title: string
  description: string
  coverImgUrl: string | null
  listenCounter: number
  updatedAt: Date
  comments: string[]
  songs: string[]
}
