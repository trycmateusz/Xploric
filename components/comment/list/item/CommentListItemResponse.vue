<template>
  <form class="w-1/2 flex flex-col" @submit.prevent="emit('reply', text)">
    <textarea
      id="comment"
      ref="textarea"
      v-model="text"
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
  commentId: string
  playlistId: string
  username: string
}>()
const emit = defineEmits<{
  (e: 'reply', text: string): void
}>()
const textarea = ref<HTMLTextAreaElement | undefined>(undefined)
const text = ref(`@${props.username} `)

onMounted(() => {
  if (textarea.value) {
    textarea.value.focus()
  }
})
</script>

<style scoped>

</style>
