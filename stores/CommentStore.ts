import type { Comment } from '~/types/Comment'
import { fetchMany } from '~/services/fetch'

export const useCommentStore = defineStore('CommentStore', () => {
  const comments = ref<Comment[]>([])
  const fetchManyComments = async (ids: string[]) => {
    const fetchedComments = await fetchMany<Comment>('comments', ids)
    if (fetchedComments && fetchedComments.length > 0) {
      fetchedComments.forEach((fetchedComment) => {
        const isSet = comments.value.find(comment => comment.id === fetchedComment.id)
        if (!isSet) {
          comments.value.push({
            ...fetchedComment,
            replyOpen: false
          })
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
  const closeAllRepliesButOne = (commentToToggle: Comment) => {
    if (comments.value) {
      const toClose = comments.value.filter(comment => comment.id !== commentToToggle.id)
      toClose.forEach((comment) => {
        comment.replyOpen = false
      })
    }
    commentToToggle.replyOpen = !commentToToggle.replyOpen
  }
  const closeOneReply = (comment: Comment) => {
    comment.replyOpen = false
  }
  return {
    comments,
    closeAllRepliesButOne,
    closeOneReply,
    fetchManyComments,
    getPlaylistsComments,
    getResponses
  }
})
