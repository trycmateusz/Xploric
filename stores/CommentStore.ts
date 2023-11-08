import type { Comment } from '~/types/Comment'
import { fetchMany } from '~/services/fetch'

export const useCommentStore = defineStore('CommentStore', () => {
  const comments = ref<Comment[]>([])
  const fetchManyComments = async (ids: string[]) => {
    const fetchedComments = await fetchMany<Comment>('comments', ids)
    if (fetchedComments) {
      fetchedComments.forEach((fetchedComment) => {
        const isSet = comments.value.find(comment => comment.id === fetchedComment.id)
        if (!isSet) {
          comments.value.push({ ...fetchedComment })
        }
      })
    }
  }
  const getPlaylistsComments = computed(() => {
    return (playlistId: string) => {
      return comments.value.filter(comment => comment.playlistId === playlistId && !comment.isResponse)
    }
  })
  const getResponses = computed(() => {
    return (commentIds: string[]) => {
      return comments.value.filter(comment => commentIds.includes(comment.id))
    }
  })
  return {
    comments,
    fetchManyComments,
    getPlaylistsComments,
    getResponses
  }
})
