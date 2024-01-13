<template>
  <div class="sticky w-full top-[Calc(var(--nav-height)_+_1px)] border-b border-black-lighter bg-black-main z-40">
    <div class="wrapper">
      <button class="p-4 text-base" @click="customClose ? emit('close') : goBack()">
        <img
          class="h-[1.5em]"
          src="~/assets/img/arrow-left.svg"
        >
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
defineProps<{
  customClose?: boolean
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
const goBack = () => {
  if (router.options.history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>

</style>
