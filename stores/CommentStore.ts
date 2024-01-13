import cloneDeep from 'lodash/cloneDeep'
import type { Comment } from '~/types/Comment'
import type { UserRatingsNonNullable } from '~/types/User'
import { fetchOne, fetchMany } from '~/services/fetch'
import { createResource, updateResource } from '~/services/save'
import { deleteResource, deleteMany } from '~/services/delete'

export const useCommentStore = defineStore('CommentStore', () => {
  const userStore = useUserStore()
  const playlistStore = usePlaylistStore()
  const comments = ref<Comment[]>([])
  const commentRatingsToUpdate = ref<UserRatingsNonNullable>({ // initial wartosc musi byc brana od auth usera
    downvotes: userStore.auth?.downvotes ? [...userStore.auth.downvotes] : [],
    upvotes: userStore.auth?.upvotes ? [...userStore.auth.upvotes] : []
  })
  const toggleCommentDownvote = (commentId: string) => {
    if (commentRatingsToUpdate.value.upvotes?.includes(commentId)) {
      const index = commentRatingsToUpdate.value.upvotes.findIndex(id => id === commentId)
      commentRatingsToUpdate.value.upvotes.splice(index, 1)
    }
    if (!commentRatingsToUpdate.value.downvotes?.includes(commentId)) {
      commentRatingsToUpdate.value.downvotes?.push(commentId)
    } else {
      const index = commentRatingsToUpdate.value.downvotes.findIndex(id => id === commentId)
      commentRatingsToUpdate.value.downvotes?.splice(index, 1)
    }
  }
  const toggleCommentUpvote = (commentId: string) => {
    if (commentRatingsToUpdate.value.downvotes?.includes(commentId)) {
      const index = commentRatingsToUpdate.value.downvotes.findIndex(id => id === commentId)
      commentRatingsToUpdate.value.downvotes.splice(index, 1)
    }
    if (!commentRatingsToUpdate.value.upvotes?.includes(commentId)) {
      commentRatingsToUpdate.value.upvotes?.push(commentId)
    } else {
      const index = commentRatingsToUpdate.value.upvotes.findIndex(id => id === commentId)
      commentRatingsToUpdate.value.upvotes?.splice(index, 1)
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
    const comment = await fetchOne<Comment>('comments', commentId)
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
  const deleteComment = async (id: string, responseTo?: string): Promise<null | undefined> => {
    const comment = comments.value.find(comment => comment.id === id)
    const deleted = await deleteResource('comments', id)
    if (deleted === null) {
      if (comment) {
        if (comment.responses) {
          await deleteMany('comments', comment.responses)
        }
        const playlist = playlistStore.getPlaylist(comment.playlistId)
        if (playlist?.comments) {
          await playlistStore.updatePlaylist(comment.playlistId, {
            comments: playlist.comments.filter(commentId => commentId !== comment.id)
          })
        }
      }
      if (responseTo) {
        const parentComment = comments.value.find(comment => comment.id === responseTo)
        if (parentComment) {
          const parentResponses = parentComment.responses ? [...parentComment.responses] : []
          await updateComment(parentComment.id, {
            responses: parentResponses.filter(responseId => responseId !== id)
          })
        }
      }
      const commentIndex = comments.value.findIndex(comment => comment.id === id)
      if (commentIndex !== -1) {
        comments.value.splice(commentIndex, 1)
        return null
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
    deleteComment,
    getPlaylistsComments,
    getResponses,
    getComment
  }
})
