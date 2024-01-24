import type { Toast, ToastType } from '~/types/Toast'

const toasts = ref<Toast[]>([])
const addToast = (message: string, timeout: number | null = 3500, type: ToastType = 'info') => {
  const id = crypto.randomUUID()
  toasts.value.push({
    id,
    message,
    type
  })
  if (timeout) {
    setTimeout(() => {
      removeToast(id)
    }, timeout)
  }
}
const removeToast = (id: string) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  toasts.value.splice(index, 1)
}
export const useToasts = () => {
  return {
    toasts,
    addToast,
    removeToast
  }
}
