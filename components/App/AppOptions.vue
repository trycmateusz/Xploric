<template>
  <ul ref="optionsList" class="absolute rounded-xl border border-black-lighter overflow-hidden z-30">
    <li
      v-for="option in options"
      :key="option.id"
      class="bg-black-main border-b border-black-lighter text-center last:border-b-0 "
      :class="{ 'text-red-main': option.destructive }"
    >
      <nuxt-link
        v-if="'to' in option"
        :to="option.to"
        class="block w-full p-4 main-transition focus:-outline-offset-4"
      >
        {{ option.text }}
      </nuxt-link>
      <button
        v-if="'onClick' in option"
        class="w-full p-4 main-transition focus:-outline-offset-4"
        @click="handleOnClick(option)"
      >
        {{ option.text }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { AppOptionLink, AppOptionButton } from '~/types/App'
const props = defineProps<{
  options: (AppOptionLink | AppOptionButton)[]
  togglerId: string
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
const optionsList = ref<HTMLUListElement | undefined>(undefined)
const handleOnClick = (option: AppOptionButton) => {
  option.onClick()
  emit('close')
}
const closeIfClickedOutside = (e: Event) => {
  if (optionsList.value) {
    // @ts-ignore
    if (!(e.target === optionsList.value || optionsList.value.contains(e.target) || e.target?.id === props.togglerId)) {
      emit('close')
    }
  }
}
onMounted(() => {
  window.addEventListener('click', closeIfClickedOutside)
})
onUnmounted(() => {
  window.removeEventListener('click', closeIfClickedOutside)
})
</script>

<style scoped>
</style>
