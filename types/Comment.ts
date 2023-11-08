export interface CommentRatedBy {
  [userId: string]: 1 | -1
}

export interface Comment {
  id: string
  isResponse: boolean
  ratedBy: CommentRatedBy
  rating: number
  responses: string[] | null
  text: string
  timestamp: number
  userId: string
  playlistId: string
}
