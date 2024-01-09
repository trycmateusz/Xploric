export interface Comment {
  id: string
  responseTo?: string
  rating: number
  responses?: string[]
  text: string
  createdAt: number
  userId: string
  playlistId: string
}
