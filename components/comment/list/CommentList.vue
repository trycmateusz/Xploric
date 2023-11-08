<template>
  <ul class="flex flex-col gap-8 items-end">
    <CommentListItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </ul>
</template>

<script setup lang="ts">
import type { Comment } from '~/types/Comment'
defineProps<{
  comments: Comment[]
}>()
</script>

<style scoped>

</style>
