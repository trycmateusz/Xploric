export interface Comment {
  id: string
  isResponse: boolean
  rating: number
  responses: string[] | null
  text: string
  timestamp: number
  userId: string
}
