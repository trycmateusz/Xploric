export interface Playlist {
  id: string
  userId: string
  title: string
  description: string
  coverImgUrl: string
  listenCounter: number
  updatedAt: Date
  comments: string[]
  songs: string[]
}
