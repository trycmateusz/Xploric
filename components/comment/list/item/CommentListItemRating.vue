<template>
  <button
    class="vote-btn main-transition"
    @click="emit('toggle-rating', -1)"
  >
    <img
      :src="rated === -1 ? getAbsolutePath('~/assets/img/downvote-filled.svg') : getAbsolutePath('~/assets/img/downvote-border.svg')"
      :alt="`Downvote ${username}'s comment`"
    >
  </button>
  <span class="rating">
    {{ rating }}
  </span>
  <button
    class="vote-btn main-transition"
    @click="emit('toggle-rating', 1)"
  >
    <img
      :src="rated === 1 ? getAbsolutePath('~/assets/img/upvote-filled.svg') : getAbsolutePath('~/assets/img/upvote-border.svg')"
      :alt="`Upvote ${username}'s comment`"
    >
  </button>
</template>

<script setup lang="ts">
import type { CommentRatingOptions } from '~/types/Comment'
defineProps<{
  username: string
  rating: number
  rated: CommentRatingOptions
}>()
const emit = defineEmits<{
  (e: 'toggle-rating', rating: 1 | -1): void
}>()
const { getAbsolutePath } = useImages()
</script>

<style scoped>

</style>
