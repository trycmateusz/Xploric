<template>
  <ul
    v-if="comments.length > 0"
    class="flex flex-col w-full gap-8 items-end"
  >
    <CommentListItem
      v-for="comment in commentsSorted"
      :key="comment.id"
      :comment="comment"
      :reply-open="openedReplyId === comment.id"
      @toggle-reply="toggleReply(comment.id)"
      @close-reply="openedReplyId = ''"
    />
  </ul>
  <span v-else>
    Noone left a comment for now.
  </span>
</template>

<script setup lang="ts">
import type { Comment } from '~/types/Comment'
const props = defineProps<{
  comments: Comment[]
}>()
const openedReplyId = ref('')
const toggleReply = (id: string) => {
  if (id !== openedReplyId.value) {
    openedReplyId.value = id
  } else {
    openedReplyId.value = ''
  }
}
const commentsSorted = computed(() => {
  return [...props.comments].sort((a, b) => a.createdAt - b.createdAt)
})
</script>

<style scoped>

</style>
~/stores/types/Comment
