import type { User } from '~/stores/types/User'
import { fetchOne } from '~/services/fetch'

export const useUserStore = defineStore('UserStore', () => {
  const users = ref<User[]>([])
  const auth = ref<User | null>(null)
  const setAuth = (user: User) => {
    if (!auth.value || auth.value.id !== user.id) {
      auth.value = { ...user }
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
  const getUser = computed(() => {
    return (userId: string) => {
      return users.value.find(user => user.id === userId)
    }
  })
  return {
    users,
    auth,
    setAuth,
    fetchUser,
    getUser
  }
})
