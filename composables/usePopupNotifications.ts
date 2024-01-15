import type { PopupNotification, PopupNotificationType } from '~/types/PopupNotification'

const notifications = ref<PopupNotification[]>([])
const addNotification = (message: string, timeout: number | null = 3500, type: PopupNotificationType = 'info') => {
  const id = crypto.randomUUID()
  notifications.value.push({
    id,
    message,
    type
  })
  if (timeout) {
    setTimeout(() => {
      removeNotification(id)
    }, timeout)
  }
}
const removeNotification = (id: string) => {
  const index = notifications.value.findIndex(notification => notification.id === id)
  notifications.value.splice(index, 1)
}
export const usePopupNotifications = () => {
  return {
    notifications,
    addNotification,
    removeNotification
  }
}
