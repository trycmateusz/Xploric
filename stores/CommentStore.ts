import type { Comment } from '~/types/Comment'
import { fetchMany } from '~/services/fetch'

export const useCommentStore = defineStore('CommentStore', () => {
  const comments = ref<Comment[]>([])
  const fetchManyComments = async (ids: string[]) => {
    const fetchedComments = await fetchMany<Comment>('comments', ids)
    console.log(fetchedComments)
  }
  return {
    comments,
    fetchManyComments
  }
})
