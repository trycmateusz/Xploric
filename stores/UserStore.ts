import type { User } from '~/types/User'
import { fetchOne } from '~/services/fetch'
import { updateResource } from '~/services/save'

export const useUserStore = defineStore('UserStore', () => {
  const users = ref<User[]>([])
  const auth = ref<User | null>(null)
  const setAuth = (user: User) => {
    if (!auth.value || auth.value.id !== user.id) {
      auth.value = user
    }
  }
  const fetchUser = async (id: string) => {
    const fetchedUser = await fetchOne<User>('users', id)
    if (fetchedUser) {
      const isSet = users.value.find(user => fetchedUser.id === user.id)
      if (!isSet) {
        users.value.push({ ...fetchedUser })
      }
    }
  }
  const updateUser = async (id: string, data: Partial<User>): Promise<User | undefined> => {
    const updatedData = await updateResource<User>('users', id, data)
    if (updatedData) {
      const userIndex = users.value.findIndex(comment => comment.id === id)
      if (userIndex !== -1) {
        const user = users.value[userIndex]
        return Object.assign(user, {
          ...user,
          ...updatedData
        })
      }
    }
  }
  const getUser = computed(() => {
    return (userId: string) => {
      return users.value.find(user => user.id === userId)
    }
  })
  const getAuthCommentRating = computed(() => {
    return (commentId: string) => {
      if (auth.value) {
        if (auth.value.downvotes?.includes(commentId)) {
          return -1
        }
        if (auth.value.upvotes?.includes(commentId)) {
          return 1
        }
      }
      return 0
    }
  })
  return {
    users,
    auth,
    setAuth,
    fetchUser,
    updateUser,
    getUser,
    getAuthCommentRating
  }
})
