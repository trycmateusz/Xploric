import cloneDeep from 'lodash/cloneDeep'
import type { Comment } from '~/types/Comment'
import type { UserRatings } from '~/types/User'
import { fetchMany } from '~/services/fetch'
import { createResource, updateResource } from '~/services/save'

export const useCommentStore = defineStore('CommentStore', () => {
  const userStore = useUserStore()
  const playlistStore = usePlaylistStore()
  const comments = ref<Comment[]>([])
  const commentRatingsToUpdate = ref<UserRatings>({ // initial wartosc musi byc brana od auth usera
    downvotes: [],
    upvotes: []
  })
  const toggleCommentDownvote = (commentId: string) => {
    if (commentRatingsToUpdate.value.upvotes?.includes(commentId)) {
      const index = commentRatingsToUpdate.value.upvotes.findIndex(id => id === commentId)
      commentRatingsToUpdate.value.upvotes.splice(index, 1)
    }
    if (!commentRatingsToUpdate.value.downvotes?.includes(commentId)) {
      commentRatingsToUpdate.value.downvotes?.push(commentId)
    }
  }
  const toggleCommentUpvote = (commentId: string) => {
    if (commentRatingsToUpdate.value.downvotes?.includes(commentId)) {
      const index = commentRatingsToUpdate.value.downvotes.findIndex(id => id === commentId)
      commentRatingsToUpdate.value.downvotes.splice(index, 1)
    }
    if (!commentRatingsToUpdate.value.upvotes?.includes(commentId)) {
      commentRatingsToUpdate.value.upvotes?.push(commentId)
    }
  }
  const setOne = (fetchedComment: Comment) => {
    const isSet = comments.value.find(comment => comment.id === fetchedComment.id)
    if (!isSet) {
      comments.value.push(cloneDeep(fetchedComment))
    }
  }
  const fetchManyComments = async (ids: string[]) => {
    const fetchedComments = await fetchMany<Comment>('comments', ids)
    if (fetchedComments && fetchedComments.length > 0) {
      fetchedComments.forEach(fetchedComment => setOne(fetchedComment))
    }
  }
  const updateComment = async (id: string, data: Partial<Comment>): Promise<Comment | undefined> => {
    const updatedData = await updateResource<Comment>('comments', id, data)
    if (updatedData) {
      const commentIndex = comments.value.findIndex(comment => comment.id === id)
      if (commentIndex !== -1) {
        const comment = comments.value[commentIndex]
        return Object.assign(comment, {
          ...comment,
          ...updatedData
        })
      }
    }
  }
  const createComment = async (text: string, playlistId: string, responseTo?: string): Promise<Comment | undefined> => {
    const playlist = playlistStore.getPlaylist(playlistId)
    if (userStore.auth && playlist) {
      const id = crypto.randomUUID()
      const comment: Comment = {
        id,
        text,
        playlistId,
        responseTo,
        rating: 0,
        userId: userStore.auth.id,
        createdAt: new Date().getTime()
      }
      const created = await createResource<Comment>('comments', comment, id)
      if (created) {
        setOne(created)
        const userComments = userStore.auth.comments ? [...userStore.auth.comments, id] : [id]
        const playlistComments = playlist.comments ? [...playlist.comments, id] : [id]
        await userStore.updateUser(userStore.auth.id, {
          comments: userComments
        })
        await playlistStore.updatePlaylist(playlist.id, {
          comments: playlistComments
        })
        return created
      }
    }
  }
  const createResponse = async (text: string, commentId: string, playlistId: string): Promise<Comment | undefined> => {
    const comment = getComment.value(commentId)
    if (userStore.auth && comment) {
      const created = await createComment(text, playlistId, comment.id)
      if (created) {
        setOne(created)
        const commentResponses = comment.responses ? [...comment.responses, created.id] : [created.id]
        await updateComment(commentId, {
          responses: commentResponses
        })
        return created
      }
    }
  }
  const getPlaylistsComments = computed(() => {
    return (playlistId: string) => {
      return comments.value.filter(comment => comment.playlistId === playlistId && !comment.responseTo)
    }
  })
  const getResponses = computed(() => {
    return (commentIds: string[]) => {
      return comments.value.filter(comment => commentIds.includes(comment.id))
    }
  })
  const getComment = computed(() => {
    return (id: string) => {
      return comments.value.find(comment => comment.id === id)
    }
  })
  return {
    comments,
    commentRatingsToUpdate,
    toggleCommentDownvote,
    toggleCommentUpvote,
    fetchManyComments,
    createComment,
    createResponse,
    updateComment,
    getPlaylistsComments,
    getResponses
  }
})
