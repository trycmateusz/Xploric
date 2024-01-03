<template>
  <ul
    v-if="comments.length > 0"
    class="flex flex-col w-full gap-8 items-end"
  >
    <CommentListItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </ul>
  <span v-else>
    Noone left a comment for now.
  </span>
</template>

<script setup lang="ts">
import type { Comment } from '~/types/Comment'
defineProps<{
  comments: Comment[]
}>()
</script>

<style scoped>

</style>
~/stores/types/Comment
