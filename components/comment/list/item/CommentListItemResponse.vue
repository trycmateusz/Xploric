<template>
  <form class="w-1/2 flex flex-col" @submit.prevent="emit('close')">
    <textarea
      id="comment"
      ref="textarea"
      v-model="message"
      name="comment"
      class="bg-black-lighter text-white-main min-h-[10rem] rounded-xl p-4 resize-none overflow-y-auto main-transition"
    />
    <AppButton
      text="Respond"
      styling="primary"
      class="mt-4 ml-auto"
    />
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  username: string
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
const textarea = ref<HTMLTextAreaElement | undefined>(undefined)
const message = ref(`@${props.username}`)
onMounted(() => {
  if (textarea.value) {
    textarea.value.focus()
  }
})
</script>

<style scoped>

</style>
